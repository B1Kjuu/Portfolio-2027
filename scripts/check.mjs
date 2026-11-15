// Real-browser checks for the portfolio. Start the site first (npm run dev -- --port 3027),
// then: node scripts/check.mjs [outDir]
// Drives the installed Chrome through playwright-core; writes screenshots and a JSON report.
import { chromium } from "playwright-core";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3027";
const OUT = process.argv[2] ?? "check-output";
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "laptop", width: 1366, height: 700 },
  { name: "wide", width: 2560, height: 1440 },
  { name: "tablet", width: 820, height: 1180, isMobile: true, hasTouch: true },
  { name: "phone", width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  { name: "landscape", width: 844, height: 390, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
];
const PAGES = [
  { name: "landing", path: "/" },
  { name: "tech", path: "/tech" },
  { name: "editor", path: "/editor" },
  { name: "about", path: "/about" },
  { name: "contact", path: "/contact" },
];

// Runs in the page: structural checks that need no judgement.
const inspect = () => {
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none";
  };
  const label = (el) => (el.getAttribute("aria-label") || el.textContent || el.tagName).trim().replace(/\s+/g, " ").slice(0, 40);

  const lum = (rgb) => {
    const [r, g, b] = rgb.map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const parse = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
    return { rgb: p.slice(0, 3), a: p[3] ?? 1 };
  };
  const bgOf = (el) => {
    for (let n = el; n; n = n.parentElement) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c && c.a > 0.95) return c.rgb;
    }
    return null;
  };

  const targets = [...document.querySelectorAll("a, button")].filter(visible);
  const smallTargets = targets
    .map((el) => ({ el, r: el.getBoundingClientRect() }))
    .filter(({ r }) => r.height < 44 || r.width < 44)
    .map(({ el, r }) => `${label(el)} (${Math.round(r.width)}x${Math.round(r.height)})`);

  const lowContrast = [];
  for (const el of document.querySelectorAll("p, span, a, button, h1, h2, h3, li, small, strong")) {
    if (!visible(el) || ![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
    const cs = getComputedStyle(el);
    const fg = parse(cs.color);
    const bg = bgOf(el);
    if (!fg || !bg || fg.a < 0.95) continue;
    const [a, b] = [lum(fg.rgb), lum(bg)].sort((x, y) => y - x);
    const ratio = (a + 0.05) / (b + 0.05);
    const size = parseFloat(cs.fontSize);
    const large = size >= 24 || (size >= 18.66 && Number(cs.fontWeight) >= 700);
    if (ratio < (large ? 3 : 4.5)) lowContrast.push(`${label(el)} ${ratio.toFixed(2)}:1 @${Math.round(size)}px`);
  }

  return {
    overflowX: document.documentElement.scrollWidth - window.innerWidth,
    headings: [...document.querySelectorAll("h1,h2,h3,h4")].filter(visible).map((h) => `${h.tagName} ${label(h)}`),
    h1Count: document.querySelectorAll("h1").length,
    imagesMissingAlt: [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length,
    unnamedControls: targets.filter((el) => !label(el) || label(el) === el.tagName).length,
    smallTargets: [...new Set(smallTargets)],
    lowContrast: [...new Set(lowContrast)].slice(0, 12),
    smallText: [...new Set([...document.querySelectorAll("p, span, a, li")].filter(visible).map((e) => parseFloat(getComputedStyle(e).fontSize)).filter((s) => s < 14))],
    hasSkipLink: !!document.querySelector('a[href="#main"], a.skip'),
    landmarks: { main: document.querySelectorAll("main").length, nav: document.querySelectorAll("nav").length },
  };
};

const ENTERED = () => { try { sessionStorage.setItem("b1-entered", "1"); } catch {} };
const report = {};
const browser = await chromium.launch({ channel: "chrome", args: ["--autoplay-policy=no-user-gesture-required"] });

for (const vp of VIEWPORTS) {
  const { name, ...opts } = vp;
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: opts.isMobile, hasTouch: opts.hasTouch, deviceScaleFactor: opts.deviceScaleFactor ?? 1 });
  await context.addInitScript(ENTERED); // skip the opening curtain and the landing-first gate
  for (const pg of PAGES) {
    const page = await context.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 200)));
    page.on("pageerror", (e) => errors.push(String(e).slice(0, 200)));
    await page.goto(BASE + pg.path, { waitUntil: "networkidle" });
    await page.waitForTimeout(3500); // entrance animations and 3D settle
    const key = `${pg.name}-${name}`;
    await page.screenshot({ path: join(OUT, `${key}.png`) });
    const r = (report[key] = { ...(await page.evaluate(inspect)), errors });

    if (pg.name === "landing") {
      r.canvases = await page.$$eval(".sp-stage canvas", (cs) => cs.map((c) => [c.width, c.height]));
      if (name === "desktop") {
        const share = () => page.evaluate(() => getComputedStyle(document.querySelector(".sp-root")).getPropertyValue("--p"));
        const pull = async (dx) => {
          const h = await page.locator(".sp-grip").boundingBox();
          const cx = h.x + h.width / 2, cy = h.y + h.height / 2;
          await page.mouse.move(cx, cy);
          await page.mouse.down();
          await page.mouse.move(cx + dx, cy, { steps: 12 });
        };
        // a click on the portrait opens About
        await page.locator(".sp-handle").click();
        await page.waitForURL("**/about", { timeout: 5000 }).catch(() => {});
        r.clickOpens = new URL(page.url()).pathname;
        await page.goBack();
        await page.waitForTimeout(1200);
        // a short pull springs back
        await pull(-90);
        r.midDragBuildShare = await share();
        await page.mouse.up();
        await page.waitForTimeout(700);
        r.shortPullSettles = await share();
        // a long pull opens that side; after going BACK the portrait must still work
        await pull(-380);
        await page.waitForTimeout(400);
        await page.screenshot({ path: join(OUT, `${key}-dragged.png`) });
        await page.mouse.up();
        await page.waitForURL("**/tech", { timeout: 5000 }).catch(() => {});
        r.pullLeftOpens = new URL(page.url()).pathname;
        await page.goBack();
        await page.waitForTimeout(1500);
        r.afterBackShare = await share();
        await pull(380);
        await page.mouse.up();
        await page.waitForURL("**/editor", { timeout: 5000 }).catch(() => {});
        r.afterBackPullRightOpens = new URL(page.url()).pathname;
        await page.goBack();
        await page.waitForTimeout(1500);
        await pull(-380);
        await page.mouse.up();
        await page.waitForURL("**/tech", { timeout: 5000 }).catch(() => {});
        r.secondBackPullLeftOpens = new URL(page.url()).pathname;
      } else if (name === "phone" || name === "tablet") {
        // the split is on its side here: pull the portrait up to open Build, down to open Cut
        const pullY = async (dy) => {
          const h = await page.locator(".sp-grip").boundingBox();
          const cx = h.x + h.width / 2, cy = h.y + h.height / 2;
          await page.mouse.move(cx, cy);
          await page.mouse.down();
          await page.mouse.move(cx, cy + dy, { steps: 12 });
        };
        r.fitsOneScreen = await page.evaluate(() => document.documentElement.scrollHeight <= window.innerHeight + 1);
        await pullY(-Math.round(vp.height * 0.28));
        await page.waitForTimeout(400);
        await page.screenshot({ path: join(OUT, `${key}-dragged.png`) });
        await page.mouse.up();
        await page.waitForURL("**/tech", { timeout: 5000 }).catch(() => {});
        r.pullUpOpens = new URL(page.url()).pathname;
        await page.goBack();
        await page.waitForTimeout(1500);
        await pullY(Math.round(vp.height * 0.28));
        await page.mouse.up();
        await page.waitForURL("**/editor", { timeout: 5000 }).catch(() => {});
        r.pullDownOpens = new URL(page.url()).pathname;
      }
    }

    if (pg.name === "tech") {
      await page.locator(".tp-row").nth(1).scrollIntoViewIfNeeded();
      await page.waitForTimeout(900);
      await page.screenshot({ path: join(OUT, `${key}-rows.png`) });
      await page.locator(".cb").scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      await page.screenshot({ path: join(OUT, `${key}-end.png`) });
      r.projects = await page.locator(".tp-row h2").allTextContents();
    }

    if (pg.name === "editor") {
      if (name === "desktop") {
        await page.locator(".ep-pick").first().scrollIntoViewIfNeeded();
        await page.locator(".ep-pick").first().hover();
        await page.waitForTimeout(900);
        r.framePlaysOnHover = (await page.locator(".ep-pick video").count()) === 1;
        await page.locator(".ep-row").nth(2).scrollIntoViewIfNeeded();
        await page.locator(".ep-row").nth(2).hover();
        await page.waitForTimeout(900);
        r.rowShowsPreview = (await page.locator(".ep-preview video").count()) === 1;
        await page.screenshot({ path: join(OUT, `${key}-hover.png`) });
        await page.mouse.move(2, 2);
        await page.waitForTimeout(300);
        r.previewGoneAfterLeave = (await page.locator(".ep-preview").count()) === 0 && (await page.locator(".ep-pick video").count()) === 0;
        await page.evaluate(() => window.scrollTo(0, 0));
      }
      r.heroReel = await page.$eval(".phone video", (v) => ({ paused: v.paused, time: +v.currentTime.toFixed(2), muted: v.muted }));
      await page.locator(".ep-section").first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
      await page.screenshot({ path: join(OUT, `${key}-list.png`) });
      await page.locator(".ep-row").nth(1).click();
      await page.waitForTimeout(4500);
      r.player = await page.evaluate(() => {
        const d = document.querySelector("dialog");
        const v = d.querySelector("video");
        const b = v?.getBoundingClientRect();
        return { open: d.open, ready: v?.readyState, time: v ? +v.currentTime.toFixed(2) : null, box: b ? [Math.round(b.width), Math.round(b.height)] : null, fitsViewport: b ? b.bottom <= innerHeight && b.right <= innerWidth : null };
      });
      await page.screenshot({ path: join(OUT, `${key}-player.png`) });
      await page.keyboard.press("Escape");
      await page.waitForTimeout(400);
      await page.locator(".ep-row").nth(1).click(); // reopen: the player was closed just above
      await page.waitForTimeout(600);
      const before = await page.locator("#ep-playing").textContent();
      await page.locator(".ep-step").last().click();
      await page.waitForTimeout(500);
      r.nextChangesVideo = before !== (await page.locator("#ep-playing").textContent());
      await page.keyboard.press("Escape");
      await page.waitForTimeout(400);
      await page.locator(".ep-field input").fill("coffee");
      await page.waitForTimeout(300);
      r.searchBunny = { rows: await page.locator(".ep-row").count(), status: await page.locator(".ep-found").textContent() };
      await page.locator(".ep-field input").fill("zzzz");
      await page.waitForTimeout(300);
      r.searchEmpty = await page.locator(".ep-empty").count();
      await page.screenshot({ path: join(OUT, `${key}-search.png`) });
      r.playerClosed = await page.evaluate(() => ({ open: document.querySelector("dialog").open, videos: document.querySelectorAll("dialog video").length }));
    }
    await page.close();
  }
  await context.close();
}

// Reduced motion: the page must still show everything.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  await context.addInitScript(ENTERED);
  const page = await context.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: join(OUT, "landing-reduced-motion.png") });
  await page.goto(BASE + "/editor", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  report["reduced-motion"] = { heroReelPaused: await page.$eval(".phone video", (v) => v.paused) };
  await context.close();
}

// A first-time visitor who opens an inner page is sent to the landing page, sees the curtain
// once, and can then move around freely.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(BASE + "/tech", { waitUntil: "networkidle" });
  const g = (report["first-visit"] = { deepLinkLandsOn: new URL(page.url()).pathname });
  g.curtainShown = (await page.locator('.in[data-phase="hold"]').count()) > 0;
  await page.screenshot({ path: join(OUT, "intro-hold.png") });
  await page.waitForTimeout(1900);
  await page.screenshot({ path: join(OUT, "intro-open.png") });
  await page.waitForTimeout(1600);
  g.curtainGone = (await page.locator(".in").count()) === 0;
  await page.screenshot({ path: join(OUT, "intro-done.png") });
  // the colour wipe covers the screen while the page changes
  await page.locator(".sp-links a:visible", { hasText: "About" }).click();
  await page.waitForTimeout(250);
  g.wipeShown = await page.evaluate(() => document.querySelector(".wp")?.getAttribute("data-tone"));
  await page.screenshot({ path: join(OUT, "wipe-mid.png") });
  await page.waitForURL("**/about", { timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(900);
  g.wipeOpens = new URL(page.url()).pathname;
  g.wipeCleared = await page.evaluate(() => !document.querySelector(".wp")?.hasAttribute("data-phase"));
  await page.locator(".sn-contact:visible").click();
  await page.waitForURL("**/contact", { timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(900);
  g.contactOpens = new URL(page.url()).pathname;
  await page.locator(".sn-mark:visible").click();
  await page.waitForURL(BASE + "/", { timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(1200);
  await page.locator(".sp-tech .sp-enter:visible").click();
  await page.waitForURL("**/tech", { timeout: 5000 }).catch(() => {});
  g.afterLandingCanOpen = new URL(page.url()).pathname;
  await page.reload({ waitUntil: "networkidle" });
  g.reloadStaysOn = new URL(page.url()).pathname;
  await page.locator(".st-top").waitFor({ state: "attached" });
  await page.evaluate(() => window.scrollTo(0, 3000));
  await page.waitForTimeout(400);
  await page.locator(".st-top").click();
  await page.waitForTimeout(250);
  g.scrollMidway = await page.evaluate(() => Math.round(window.scrollY));
  await page.waitForTimeout(1500);
  g.scrollEnd = await page.evaluate(() => Math.round(window.scrollY));
  await context.close();
}

await browser.close();
writeFileSync(join(OUT, "report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 1));

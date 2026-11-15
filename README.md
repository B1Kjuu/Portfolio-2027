# Portfolio 2027

Personal portfolio of Joebeck Andrew Gusi (b1kjuu): developer and video editor.

The landing page is a split screen. One half is **Build** (web, mobile and embedded
hardware projects), the other is **Cut** (client video edits). Drag the seam, or use the
arrow keys, to give one side more room; double-click it to recentre.

## Pages

| Route | What it is |
|---|---|
| `/` | Split-screen landing with two three.js scenes and a draggable seam |
| `/tech` | Build: project list with screenshots and links |
| `/editor` | Cut: video index by category with a pop-up player |

## Stack

- Next.js 16 (App Router) and React 19, TypeScript
- Tailwind CSS 4 plus plain CSS files per area
- three.js through React Three Fiber and drei (landing page only)

## Run it

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Where things live

- `lib/content.ts`: every project and video. Edit this to add or change work.
- `components/split/`: the landing page (layout, seam, 3D stage).
- `components/site/`: shared nav, contact band, footer, phone reel, tilt.
- `app/tech/`, `app/editor/`: the two inner pages and their styles.
- `assets/`: screenshots, reel stills, avatar. `public/`: CV and the hero reel loop.

## Notes

- CSS Modules are not used: the Tailwind Turbopack loader in `next.config.ts` strips
  their class exports, so styles are plain CSS with prefixed class names (`sp-`, `tp-`,
  `ep-`, `sn-`).
- Videos are streamed from external storage; the URLs are in `lib/content.ts`.

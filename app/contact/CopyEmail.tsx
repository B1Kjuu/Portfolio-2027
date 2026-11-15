"use client";

import { useRef, useState } from "react";

// Copies the address and says so for a moment. Falls back to selecting the text if the
// browser refuses clipboard access.
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);
  const text = useRef<HTMLAnchorElement>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      const range = document.createRange();
      if (text.current) {
        range.selectNodeContents(text.current);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  };

  return (
    <div className="ct-email">
      <a ref={text} href={`mailto:${email}`} className="ct-address">{email}</a>
      <div className="ct-acts">
        <button type="button" className="ct-copy" onClick={copy}>
          {copied ? "Copied" : "Copy address"}
        </button>
        <a className="ct-write" href={`mailto:${email}`}>
          Write an email
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
      <p className="ct-status" role="status">{copied ? "Email address copied." : ""}</p>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

/** スクロールで下に来ると現れる「ページ先頭へ戻る」フローティングボタン。 */
export function BackToTop({ label = "トップへ" }: { label?: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="ページの先頭へ戻る"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-1.5 rounded-full bg-brand px-4 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95 print:hidden"
    >
      <span aria-hidden className="text-base leading-none">↑</span>
      {label}
    </button>
  );
}

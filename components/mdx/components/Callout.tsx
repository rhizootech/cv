import type { ReactNode } from "react";

export function Callout({
  children,
  label = "Note",
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <aside className="my-6 rounded-md border-l-2 border-accent bg-panel/40 px-4 py-3">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
        // {label}
      </div>
      <div className="mt-2 text-sm leading-relaxed text-fg-muted [&>*:first-child]:mt-0">
        {children}
      </div>
    </aside>
  );
}

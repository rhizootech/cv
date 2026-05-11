"use client";

import { useEffect, useState } from "react";

export type NavItem = { id: string; label: string };

/**
 * Side-nav with IntersectionObserver-driven scrollspy. The active item is the
 * section closest to the trigger line (~30% from the top of the viewport).
 * Falls back to the first item before any sections are visible.
 */
export function ScrollspyNav({ items }: { items: NavItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (intersecting.length > 0) {
          setActiveId(intersecting[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0,
      },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="In-page navigation"
      className="nav mt-16 hidden lg:block"
    >
      <ul className="w-max">
        {items.map((item, i) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`group flex items-center py-3 font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                  isActive ? "text-fg" : "text-fg-faint hover:text-accent"
                }`}
              >
                <span
                  className={`mr-4 inline-block h-px transition-all duration-300 ${
                    isActive
                      ? "w-16 bg-accent"
                      : "w-8 bg-edge group-hover:w-16 group-hover:bg-accent"
                  }`}
                />
                {String(i + 1).padStart(2, "0")}.{" "}
                <span className="ml-1">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

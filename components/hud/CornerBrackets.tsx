/**
 * Thin teal L-shaped brackets at the four corners of a container.
 * Parent must be `position: relative`. Decorative only — `aria-hidden`.
 */
export function CornerBrackets({
  size = "size-3",
  color = "border-accent",
}: {
  size?: string;
  color?: string;
}) {
  const cls = "pointer-events-none absolute z-10";
  return (
    <>
      <span aria-hidden="true" className={`${cls} left-0 top-0 ${size} border-l border-t ${color}`} />
      <span aria-hidden="true" className={`${cls} right-0 top-0 ${size} border-r border-t ${color}`} />
      <span aria-hidden="true" className={`${cls} bottom-0 left-0 ${size} border-b border-l ${color}`} />
      <span aria-hidden="true" className={`${cls} bottom-0 right-0 ${size} border-b border-r ${color}`} />
    </>
  );
}

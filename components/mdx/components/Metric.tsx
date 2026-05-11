export function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="my-4 flex items-baseline gap-3">
      <span className="font-mono text-2xl font-bold tracking-tight text-accent">{value}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-muted">
        {label}
      </span>
    </div>
  );
}

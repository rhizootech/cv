import { CornerBrackets } from "@/components/hud/CornerBrackets";

export function MediaFrame({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <div className="relative overflow-hidden rounded-md border border-edge bg-panel">
        <CornerBrackets />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="block w-full" loading="lazy" />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-fg-faint">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

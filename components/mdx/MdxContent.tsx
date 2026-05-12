import type { ReactNode, ComponentType } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Callout } from "./components/Callout";
import { MediaFrame } from "./components/MediaFrame";
import { Metric } from "./components/Metric";
import { ImageGallery, GalleryImage } from "./components/ImageGallery";

type Props = { children?: ReactNode; href?: string };

const mdxComponents: Record<string, ComponentType<Props>> = {
  h2: ({ children }) => (
    <h2 className="mt-10 text-2xl font-semibold tracking-tight text-fg">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 text-lg font-semibold tracking-tight text-fg">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mt-4 leading-relaxed text-fg-muted">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mt-4 ml-5 list-disc space-y-2 text-fg-muted marker:text-accent">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 ml-5 list-decimal space-y-2 text-fg-muted marker:text-accent">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-fg">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-fg">{children}</em>,
  a: ({ children, href }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className="text-fg underline decoration-accent decoration-2 underline-offset-2 transition-colors hover:text-accent"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="my-10 border-edge" />,
  code: ({ children }) => (
    <code className="rounded bg-panel px-1.5 py-0.5 font-mono text-[0.92em] text-accent">
      {children}
    </code>
  ),
  // Custom MDX-embeddable components
  Callout: Callout as ComponentType<Props>,
  MediaFrame: MediaFrame as ComponentType<Props>,
  Metric: Metric as ComponentType<Props>,
  ImageGallery: ImageGallery as ComponentType<Props>,
  GalleryImage: GalleryImage as ComponentType<Props>,
};

export function MdxContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={mdxComponents} />;
}

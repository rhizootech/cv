import { aboutParagraphs } from "@/content/about";

export function AboutSection() {
  return (
    <section
      id="about"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
    >
      <h3 className="sr-only">About</h3>
      {aboutParagraphs.map((paragraph, i) => (
        <p
          key={i}
          className={
            i === 0
              ? "leading-relaxed text-fg-muted"
              : "mt-4 leading-relaxed text-fg-muted"
          }
        >
          {paragraph}
        </p>
      ))}
    </section>
  );
}

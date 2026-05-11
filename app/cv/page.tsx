import Link from "next/link";
import type { Metadata } from "next";
import { composeCv } from "@/lib/cv/composition";
import "./cv-print.css";

export const metadata: Metadata = {
  title: "Dewald Scholtz — CV",
  description: "Printable CV — composed from the same source as the home page.",
};

export default async function CvPage() {
  const cv = await composeCv();

  return (
    <>
      <Link href="/" className="cv-back" aria-label="Back to site">
        ← back
      </Link>

      <div className="cv-shell">
        <article className="cv-page">
          <header>
            <h1>{cv.identity.name}</h1>
            <p className="cv-subtitle">{cv.identity.title}</p>
            <p className="cv-meta">{cv.identity.location}</p>
            <p className="cv-meta cv-contact">
              <a href={cv.identity.linkedinUrl}>{cv.identity.linkedinHandle}</a>
              {" · "}
              <a href={cv.identity.githubUrl}>{cv.identity.githubHandle}</a>
              {" · "}
              {cv.identity.websites.map((w, i) => (
                <span key={w.url}>
                  {i > 0 ? " · " : null}
                  <a href={w.url}>{w.label}</a>
                </span>
              ))}
            </p>
            <p className="cv-tagline">{cv.identity.tagline}</p>
          </header>

          <section>
            <h2>Summary</h2>
            <p>{cv.summary}</p>
          </section>

          <section>
            <h2>Experience</h2>
            {cv.experience.map((exp) => (
              <div key={`${exp.company}-${exp.order}`} className="cv-entry">
                <div className="cv-entry-header">
                  <h3>
                    {exp.role}
                    {exp.current && " — current"}
                  </h3>
                  <span className="cv-entry-dates">{exp.dateRange}</span>
                </div>
                <p className="cv-entry-meta">
                  {exp.company} · {exp.location}
                </p>
                <p>{exp.description}</p>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul>
                    {exp.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}
                {exp.engagements && exp.engagements.length > 0 && (
                  <div className="cv-engagements">
                    <p className="cv-engagements-label">Notable engagements</p>
                    {exp.engagements.map((eng) => (
                      <div key={eng.client} className="cv-engagement">
                        <p className="cv-engagement-title">
                          {eng.client} <span style={{ color: "#4a5258", fontWeight: 400 }}>· {eng.dateRange}</span>
                        </p>
                        <p className="cv-engagement-summary">{eng.summary}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>

          <section>
            <h2>Selected Projects</h2>
            {cv.projects.map((p) => (
              <div key={p.slug} className="cv-entry">
                <div className="cv-entry-header">
                  <h3>{p.title}</h3>
                  <span className="cv-entry-dates">{p.dateRange ?? p.year ?? ""}</span>
                </div>
                <p className="cv-entry-meta">{p.industry}</p>
                <p>{p.summary}</p>
                {p.stack.length > 0 && (
                  <p className="cv-stack-line">
                    <strong>Stack:</strong>
                    {p.stack.join(" · ")}
                  </p>
                )}
              </div>
            ))}
          </section>

          <section>
            <h2>Stack</h2>
            <dl>
              {cv.stack.map((g) => (
                <div key={g.label} className="cv-stack-group">
                  <dt>{g.label}</dt>
                  <dd>{g.items.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </section>
        </article>

        <p className="cv-print-hint">
          Press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>P</kbd> to save as PDF.
        </p>
      </div>
    </>
  );
}

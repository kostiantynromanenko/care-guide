import { site, needs } from "@/data/demo-content";

/**
 * Temporary placeholder homepage.
 *
 * This intentionally has no final visual design applied yet — the
 * homepage design direction (see /preview) is still pending owner
 * approval per docs/APPROVAL_WORKFLOW.md. This page only proves that
 * the typed demo-content data layer is wired up correctly.
 */
export default function Home() {
  return (
    <main>
      <h1>{site.name}</h1>
      <p>{site.tagline}</p>
      <p>{site.description}</p>

      <h2>Потреби (демо-дані)</h2>
      <ul>
        {needs.map((need) => (
          <li key={need.slug}>
            <strong>{need.title}</strong> — {need.description}
          </li>
        ))}
      </ul>
    </main>
  );
}

---
version: "alpha"
name: "Pulse"
description: "Pulse as the Pulse codebase renders it, from the manifest root /pulse."
packageId: "e7e2920e-acd5-5d05-8628-6a7b947e39c0"
---

# Pulse — Pulse

Design system **Pulse** ships one theme, on a light facet and a dark one. Values live in `styles.css` as role-named custom properties (oklch), with the dark facet under `prefers-color-scheme: dark`. Colour roles: background, surface, elevated, foreground, muted, primary/on-primary, ring, border, input. Type: Inter with a system fallback; scale `--text-xs`…`--text-4xl` with `--leading-*`. Spacing: `--spacing` 0.25rem ladder. Radius: `--radius` 0.625rem. Motion: `--duration-fast|base|slow` 120/180/240ms, `--ease-standard|entrance|exit`.

The counter is the page: one large number, set with tabular numerals so it never shifts width as it ticks, with the Pause/Resume button beneath it and nothing else competing for attention.

Do drive every styled property off these tokens; do not hardcode a value a token covers; give every named font family a system fallback.

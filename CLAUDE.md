@AGENTS.md

# Cafe Botanica — Design Constitution

These rules are permanent. They govern every visual and copy decision in this repository. When a request conflicts with them, the constitution wins unless the user overrides it explicitly.

## 1. Visual Vernacular
Reject generic corporate SaaS templates. Ground Cafe Botanica in a 1970s analog espresso-bar aesthetic: warm Kodachrome film tones, raw linen surfaces, rich espresso text, faded terracotta accents.

Palette (exact):
- Linen background — `#F7F4EE`
- Espresso text — `#2C2A29`
- Faded terracotta accent — `#B5562F`

Use the terracotta sparingly. It marks one thing at a time, never fills a region.

## 2. Typography as UI
Pair an assertive editorial display serif for headings with a strict monospace for prices and body copy. The monospace simulates a tactile, hand-typed bakery receipt. Type carries the personality; it is never a neutral delivery vehicle.

- Display serif: headings only.
- Monospace: prices, menu descriptions, labels, body.
- Dramatic scale jumps: massive H1, compact 13px receipt-style descriptions. No timid middle ground.

## 3. Spatial Composition
- No rounded corners larger than 4px.
- Raw 1px structural borders only. Borders encode actual data hierarchy. No floating drop-shadow decoration.
- Deliberate layout asymmetry. Avoid centered, evenly-padded SaaS symmetry.

## 4. Copy Governance (stop-slop)
Write like a quietly confident barista. Short, grounded sentences with varied rhythm.
- Zero exclamation points.
- Zero introductory fluff ("Welcome to…").
- Zero false agency ("the menu boasts", "the space invites").
- Active voice, human subjects, specific nouns. No em dashes. No adverbs doing vague work.

## 5. Stack Notes
- Next.js 16 (App Router), React 19, Tailwind CSS v4.
- Tailwind v4 has no `tailwind.config.js`. Theme tokens live in `src/app/globals.css` inside an `@theme` block.
- Read `AGENTS.md` and `node_modules/next/dist/docs/` before relying on older Next.js conventions.

## Note on the design-default tension
The `frontend-design` skill warns that "cream background + high-contrast serif + terracotta accent" is a common AI default. This brief pins those tokens deliberately, so the brief wins. The aesthetic risk is spent on the signature element: a real receipt ledger where monospace alignment and hard 1px rules carry the menu's structure.

# AGENTS.md

This file defines the conventions for AI coding agents working on the Healtie frontend.

Follow these instructions unless a task explicitly requires a different approach.

## 1. Product

Healtie is a public-facing healthcare information platform for Brazil.

Its primary responsibilities include:

- finding healthcare establishments;
- displaying establishment information;
- showing establishments on maps;
- exposing public healthcare data;
- displaying establishment status and indicators;
- publishing health campaigns and informational content;
- allowing users to contribute information.

Healthcare information can affect real-world decisions.

Prioritize:

1. accuracy;
2. clarity;
3. accessibility;
4. reliability;
5. performance;
6. visual polish.

Never fabricate health or establishment information.

Healtie is an informational product, not a diagnosis system.

---

## 2. Stack

The frontend uses:

- Next.js 16
- React 19
- TypeScript
- App Router
- Panda CSS
- SWR
- Axios
- native `fetch`
- React Hook Form
- Zod
- Mapbox GL
- react-map-gl
- MDX
- Motion
- Phosphor Icons
- date-fns
- Vercel Analytics

Do not introduce another library when the current stack can reasonably solve the problem.

---

## 3. Project Structure

Respect the existing structure:

```text
src/
├── app/
├── assets/
├── components/
├── content/
├── context/
├── hooks/
├── interfaces/
├── lib/
├── types/
└── utils/
```

### `src/app`

Contains routes and route-specific implementation.

Keep route-specific:

- views;
- components;
- loading states;
- utilities;
- metadata logic

near the route when they are not reusable elsewhere.

Example:

```text
src/app/estabelecimento/[cnes]/
├── page.tsx
├── views/
└── utils/
```

### `src/components`

Contains components that are genuinely reusable across features.

Do not move page-specific components here simply to reduce the size of a route folder.

### `src/lib`

Contains shared infrastructure such as:

- API clients;
- SWR fetchers;
- framework integrations;
- common low-level services.

### `src/hooks`

Contains reusable client-side behaviour.

### `src/context`

Contains React contexts.

Keep state local unless multiple unrelated areas genuinely need access to it.

### `src/interfaces` and `src/types`

Contain shared TypeScript contracts.

Prefer domain-specific file names.

Avoid generic files such as:

```text
types.ts
helpers.ts
utils.ts
```

when a more descriptive name is possible.

---

## 4. Commands

Use Node.js 20 or newer.

Common commands:

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

Panda CSS generation:

```bash
npm run prepare
```

Before finishing substantial work, run:

```bash
npm run lint
npm run build
```

Do not regenerate lockfiles unnecessarily.

---

## 5. TypeScript

TypeScript strict mode is enabled.

Do not weaken it.

Avoid `any`.

Prefer:

- explicit domain types;
- discriminated unions;
- narrow types;
- `unknown` followed by validation;
- typed API responses;
- Zod inference where appropriate.

Use the configured alias:

```ts
@/*
```

Prefer:

```ts
import { Something } from '@/components/Something'
```

over deep relative paths.

---

## 6. Server Components First

Server Components are the default.

Only add:

```ts
'use client'
```

when client functionality is actually required.

Examples:

- event handlers;
- React state;
- effects;
- browser APIs;
- geolocation;
- SWR;
- Mapbox interaction;
- client-side animation.

Keep client boundaries small.

Prefer:

```text
Server page
└── Client interactive component
```

instead of making an entire page client-rendered.

Public establishment and editorial pages should remain server-rendered whenever possible.

---

## 7. Next.js Dynamic Routes

Follow Next.js 16 asynchronous route APIs.

Example:

```ts
export default async function Page({
    params,
}: {
    params: Promise<{ cnes: string }>
}) {
    const { cnes } = await params
}
```

The same applies to `generateMetadata`.

Do not reintroduce old synchronous `params` patterns.

---

## 8. Server Data Fetching

Prefer native `fetch` for Server Components and server utilities.

Example:

```ts
const response = await fetch(url, {
    next: {
        revalidate: 3600,
    },
})
```

Choose cache behaviour intentionally.

Consider:

- how frequently the source changes;
- whether stale information creates user risk;
- API cost;
- traffic;
- SEO;
- whether the data is operational or informational.

Do not use `no-store` everywhere by default.

Stable establishment information should generally be cached.

Real-time or operational information may require shorter revalidation.

---

## 9. Client Data Fetching

Use SWR when client data needs:

- revalidation;
- polling;
- refresh;
- cache sharing;
- user-triggered revalidation.

Reuse the shared fetch infrastructure.

Do not create isolated Axios clients throughout the application.

User-facing errors should be understandable Brazilian Portuguese.

Never expose:

- stack traces;
- infrastructure details;
- raw Axios errors;
- internal URLs.

---

## 10. API Contracts

Backend configuration should come from environment variables.

Use the existing API configuration instead of hardcoding production URLs.

Do not silently change response contracts expected from `healtie.backend`.

When an API contract changes:

1. identify the backend change;
2. update the shared frontend contract;
3. update all consumers;
4. handle migration states if necessary.

Keep API access outside large JSX trees whenever possible.

Prefer:

```text
View
 ↓
hook / server fetch function
 ↓
shared client
 ↓
Healtie API
```

---

## 11. Health Data Integrity

Never fabricate:

- opening hours;
- occupancy;
- waiting time;
- availability;
- services;
- emergency capabilities;
- ratings;
- establishment status;
- medication information;
- healthcare statistics.

Missing information must remain missing.

Prefer:

```text
Informação não disponível
```

over an inferred value.

Where possible distinguish:

- official data;
- community-contributed data;
- calculated indicators;
- estimated information;
- unknown information.

Preserve data source and update timestamps when available.

---

## 12. Medical Safety

Do not write UI copy that presents Healtie as a diagnostic tool.

Avoid claims such as:

```text
Você está com...
```

or:

```text
Este tratamento é indicado para você...
```

unless an explicitly approved product feature and authoritative source support them.

Health content should be informational and source-based.

---

## 13. SEO

SEO is important for public healthcare discovery.

Public routes should consider:

- `generateMetadata`;
- descriptive titles;
- meta descriptions;
- canonical URLs;
- Open Graph;
- structured data;
- semantic HTML;
- crawlable server-rendered content.

Establishment routes should preserve structured data such as:

```text
MedicalOrganization
PostalAddress
identifier
```

Do not convert an SEO-critical route into a completely client-rendered page without a strong reason.

Avoid duplicate backend requests between page rendering and metadata generation when caching or request memoization can solve it.

---

## 14. UI Direction

Healtie should feel like a trustworthy healthcare information product.

It should not resemble:

- a generic SaaS dashboard;
- an admin template;
- a marketing landing page;
- a collection of unrelated cards.

Prefer hierarchy through:

- typography;
- spacing;
- alignment;
- content grouping.

Use containers only when they help comprehension.

Avoid excessive:

- cards;
- borders;
- shadows;
- gradients;
- glass effects;
- pill-shaped elements;
- decorative motion.

Information should remain the primary visual element.

---

## 15. Panda CSS

Use Panda CSS for application styling.

Generated files live under:

```text
styled-system/
```

Never manually edit generated files.

Use existing tokens whenever their semantics match the design.

Prefer semantic tokens over repeated raw values.

Larger components may continue using:

```text
styles.ts
```

Use `cva` for components with meaningful reusable variants.

Do not introduce another CSS abstraction.

---

## 16. Typography

Preserve the existing Healtie typography system.

Use typography to establish hierarchy.

Prefer consistent roles such as:

- display;
- page title;
- section title;
- body;
- supporting text;
- metadata;
- labels.

Avoid arbitrary font sizes and unnecessary bold text.

---

## 17. Components

Components should have clear responsibilities.

Split components when:

- behaviour is independent;
- part is reused;
- client/server responsibilities differ;
- state becomes difficult to understand.

Do not split components just to reduce line count.

Use meaningful domain names.

Avoid generic names such as:

```text
Box
Thing
Wrapper2
GenericCard
Component1
```

---

## 18. Icons

Use Phosphor Icons when possible.

Do not add another general-purpose icon library for isolated icons.

Icons should reinforce meaning.

Do not place an icon beside every label merely as decoration.

---

## 19. Accessibility

Accessibility is mandatory.

Consider:

- keyboard navigation;
- visible focus;
- screen readers;
- semantic headings;
- colour contrast;
- touch targets;
- reduced motion;
- accessible names.

Use semantic elements.

A navigation action should generally use `<a>`.

An action should generally use `<button>`.

Do not create clickable `div`s.

Icon-only buttons require accessible labels.

Do not rely only on colour to communicate:

- success;
- failure;
- waiting time;
- occupancy;
- establishment status.

Maps must not be the only way to access establishment information.

---

## 20. Maps

Mapbox is a core feature and a potentially expensive client dependency.

Avoid:

- unnecessary map remounts;
- unnecessary marker renders;
- duplicate geographic requests;
- large geographic payloads;
- recalculating marker datasets on every render.

Memoize expensive transformations where useful.

Keep map-specific state isolated.

Support touch devices and desktop.

Never assume hover exists.

For viewport queries, prefer bounded geographic requests rather than loading every establishment.

---

## 21. Responsive Design

Design mobile-first when practical.

Support:

- small phones;
- large phones;
- tablets;
- laptops;
- desktops.

Pay particular attention to:

- map interfaces;
- search;
- establishment details;
- bottom sheets;
- dialogs;
- navigation.

Test long Brazilian healthcare establishment names.

Do not design only with short placeholder content.

---

## 22. Forms

Use React Hook Form for non-trivial forms.

Use Zod when schema validation is appropriate.

Validation messages should be specific and actionable.

Prefer:

```text
Informe um CEP válido.
```

instead of:

```text
Campo inválido.
```

Frontend validation improves UX but must not be treated as a security boundary.

---

## 23. State

Prefer, in order:

1. server state;
2. URL state;
3. local component state;
4. React Context;
5. additional state-management libraries only when clearly necessary.

Do not add global state for simple component communication.

Search and filter state should often live in the URL when users may need to:

- share results;
- bookmark;
- reload;
- use browser navigation.

---

## 24. Loading, Empty and Error States

Treat these states separately.

Loading:

```text
Carregando...
```

Empty:

```text
Nenhum estabelecimento encontrado
```

Unavailable data:

```text
Informação não disponível
```

Request failure:

```text
Não foi possível carregar os estabelecimentos
```

Do not treat an empty result as an API error.

Avoid full-page spinners for small asynchronous sections.

Prefer skeletons when the final layout is predictable.

---

## 25. Routes

Public URLs should remain stable.

Be careful when changing routes such as:

```text
/estabelecimento/[cnes]
/buscar
/mapa
/noticias
/campanhas
```

Changing public URLs affects:

- search indexing;
- bookmarks;
- analytics;
- external links.

Use redirects when a public route must move.

---

## 26. Brazilian Identifiers

Treat identifiers as identifiers, not arithmetic values.

This applies to:

- CNES;
- CPF;
- CNPJ;
- CEP;
- telephone numbers;
- IBGE codes.

Prefer strings for new contracts unless arithmetic is genuinely needed.

Do not remove leading zeroes through unnecessary numeric conversion.

Do not silently change existing backend contracts while migrating an identifier type.

---

## 27. Performance

Before adding client JavaScript, ask whether the feature can run on the server.

Pay special attention to:

- Mapbox;
- Motion;
- images;
- geographic datasets;
- third-party scripts;
- repeated requests.

Prefer:

- Server Components;
- cached requests;
- dynamic imports for heavy client libraries;
- lazy loading;
- small client boundaries.

Optimize large costs before micro-optimizing trivial code.

---

## 28. Content and MDX

Keep editorial content separate from presentation logic.

Health-related articles must use reliable source material.

Preserve:

- slug stability;
- metadata;
- heading hierarchy;
- publication dates;
- update dates;
- image descriptions.

Do not bury application business logic inside MDX.

---

## 29. Security

Treat all external input as untrusted.

Be careful with:

- route params;
- query params;
- URLs;
- form data;
- MDX;
- JSON-LD;
- API content.

Avoid `dangerouslySetInnerHTML`.

When required for JSON-LD, serialize controlled data safely.

Never render arbitrary user HTML without sanitization.

Never expose credentials through `NEXT_PUBLIC_*`.

---

## 30. Code Style

Follow the repository Prettier configuration:

- 4 spaces;
- single quotes;
- no semicolons;
- ES5 trailing commas.

Do not reformat unrelated files.

Use descriptive names.

Keep diffs focused.

Comments should explain why, not what.

---

## 31. Dependencies

Before adding a dependency, check whether the feature can be implemented with:

- React;
- Next.js;
- Panda CSS;
- browser APIs;
- existing utilities;
- already installed dependencies.

A new dependency must justify:

- maintenance cost;
- bundle cost;
- security risk;
- complexity.

---

## 32. Verification

For meaningful changes run:

```bash
npm run lint
npm run build
```

Also verify:

- affected routes;
- responsive states;
- loading;
- empty state;
- failures;
- keyboard access;
- SEO where relevant.

Map changes should be tested both on initial load and after the map is already mounted.

---

## 33. Do Not

Do not:

- invent health data;
- invent establishment status;
- weaken TypeScript;
- use `any` to bypass errors;
- hardcode production API URLs;
- expose secrets;
- turn entire routes into Client Components unnecessarily;
- fetch the same data repeatedly without reason;
- use maps as the only discovery mechanism;
- manually edit `styled-system`;
- add unnecessary dependencies;
- silently change API contracts;
- silently change public URLs;
- display backend stack traces;
- make unsupported medical claims.

---

## 34. Agent Workflow

Before changing code:

1. inspect the affected route;
2. inspect nearby components;
3. inspect relevant types;
4. inspect existing hooks and fetch utilities;
5. determine server vs client responsibility;
6. understand the API contract;
7. identify SEO implications;
8. identify healthcare data implications.

During implementation:

1. make the smallest coherent change;
2. preserve existing patterns;
3. keep client boundaries small;
4. reuse existing infrastructure;
5. handle loading, empty and failure states;
6. preserve accessibility.

Before finishing:

```bash
npm run lint
npm run build
```

Review the diff for:

- duplicated styles;
- accidental API changes;
- hardcoded configuration;
- exposed secrets;
- unnecessary client rendering;
- accessibility regressions;
- SEO regressions;
- fabricated healthcare information.

## Guiding Principle

When multiple solutions are technically valid, choose the one that makes Healtie easier to understand, safer to trust, faster to use and easier to maintain.

Product clarity beats technical cleverness.
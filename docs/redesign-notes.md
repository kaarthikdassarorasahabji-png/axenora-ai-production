# Axenora Redesign

## Direction

White and charcoal with a restrained coral accent, editorial typography and custom animated workflow concepts. The Axenora logo is unchanged. Software screenshots are not displayed.

The public ecosystem includes Elvori, EmpMetria, custom AI chatbots, AI calling agents, CRM dashboards, WhatsApp automation, Instagram automation, office automation, employee monitoring and Meloqis Music. Each project has a dedicated feature, workflow, configuration and access-controls page.

## Hero Asset

Built-in image-generation tool was used, not an API CLI.

Final project asset: `D:/axenora-production/public/images/studio-hero-v2.jpg`.
The generated PNG was encoded as a JPEG at quality 85 without changing its composition. The final file is approximately 150 KB.

Generation prompt:

> Use case: photorealistic-natural. Asset type: full bleed website hero photograph for Axenora AI software studio, landscape 1536x1024 or wider. A striking close perspective of a real elegant silver desktop monitor and open laptop on a white desk in a sunlit minimal contemporary software studio. On the right half two casually dressed Indian product designers working together, naturally, looking at a clear monitor with an understated white business dashboard, believable small text not readable. Bright architectural white walls, brushed metal, a single vermillion desk accessory, tactile natural detail, sophisticated editorial commercial photography, crisp realistic natural light. Composition: entire left 55 percent is calm clean very light white wall with subtle light shadows, completely empty for dark website typography overlay. Main objects and people in right 45 percent; not a split collage. Wide continuous photograph, eye level, no dark overlay. No lettering, logos, watermarks, floating UI or decorative orbs. Not futuristic or neon. This is new imagery, not a screenshot or UI mockup.

The workflow illustrations are code-native concepts, not claims to show the real software. They use transform-based motion, voice waveforms and conversation typing. Reduced-motion preferences disable continuous animation and smooth-scroll interception.

## Verification

- TypeScript, Vite production build and prerender of 20 public pages passed.
- 46 desktop/mobile checks passed locally and on the production domain.
- 18 additional checks cover 320px, tablet and wide desktop layouts.
- Search, category filters, empty results, navigation dismissal, visible animation and reduced motion passed.
- Chatbot scrolling and clear-chat were tested with a mocked long response.
- Two real production LLM calls returned HTTP 200 after selecting a verified specific free model.
- API health returned 200; malformed JSON and invalid lead requests returned 400.
- Database-backed services still return HTTP 500. Vercel does not have the frontend Supabase auth settings. These workflows have not been marked production-ready.
- No valid test lead was submitted and no test email was sent.

Free-model availability and rate limits remain an external dependency. Search rankings are not guaranteed.

Meloqis features were verified from https://meloqis.axenoraai.in; Elvori identity and features were verified from https://elovri.axenoraai.in.

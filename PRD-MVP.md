# Open Learn Lab — Front-end MVP PRD (v0.2)

## Product goal
A polished, welcoming browser playground with eight self-contained experiences. The MVP is front-end only: no login, backend, database, or external API. User-created work and session scores stay local/in-memory unless the user explicitly exports an image.

## Audience and principles
- Broad audience: curious people looking for creative play, calm, exploration, or short games.
- Each experience has its own visual mood while the overall site shares typography, navigation, cards, and interaction patterns.
- Fast to understand, responsive, keyboard/touch-aware where applicable, and honest about simulated science.
- Component boundaries should allow a future service layer and REST API without rewriting the UI.

## Eight experiences
1. **Flow State** — interactive generative art with modes/palettes, adjustable movement/trails, and PNG export. This is a key differentiator and should be preserved.
2. **Sound Garden** — exactly four listening modes: Calm, Steady, Sleep, Read. A 0–100% master slider and play/stop. MVP uses distinct filtered noise textures generated in the browser, not melodies or claimed field recordings. It must not claim to reproduce actual rain/ocean/space recordings.
3. **Gravity Room** — three modes: Planet Gravity (planetary surface gravity, mass, weight, drop height and ideal fall-time estimate), Solar System (illustrative eight-planet view), and Universe Sandbox (playful interactive body simulation). Earth is shown as approximately 9.81 m/s². Explain scale and simulation limitations.
4. **Quick Reflex** — reaction test, false-start handling, result and best score for the current session.
5. **Draw Studio** — canvas drawing, color/brush controls, undo, clear and PNG export.
6. **Memory Match** — eight matching pairs, move counter, reset, win state.
7. **Pattern Pulse** — visual sequence-memory game with increasing sequence length and restart.
8. **Word Sprint** — timed casual word challenge with timer, score, attempts and restart.

## Shared requirements
- Keep the current landing page identity and creator credit: Mohammed Ibaad · 4NI24IS106.
- Modal experiences close via close button, Escape, or clicking the overlay.
- No account or network requirement for core interactions.
- Responsive layouts at mobile and desktop widths.
- No hidden persistence claims: state is session-only unless exported.

## Future-ready architecture
Keep each experience in a separate React component. When persistence is needed, introduce a small service module (e.g. `services/experienceService`) between UI and REST API. Future API/database candidates: saved artwork metadata, saved sound presets, user profiles, durable game statistics, and shared creations. Do not add backend abstractions before a real use case requires them.

## MVP acceptance criteria
- Eight cards render and category filters work.
- Each card opens its correct experience and can be closed cleanly.
- Sound Garden offers only Calm/Steady/Sleep/Read and volume values from 0% to 100%; mode changes work during playback.
- Planet Gravity displays Earth as 9.81 m/s² and calculations update from selected world, mass, and height. Formula notes are visible.
- Solar System view labels itself illustrative, not scale-accurate. Universe sandbox labels its limitations.
- Quick Reflex, Memory Match, Pattern Pulse, Word Sprint and Draw Studio can be restarted without refreshing the page.
- Draw Studio and Flow State export PNGs.
- Build succeeds and the interface remains usable at narrow viewport widths before deployment.

## Explicit non-goals for this cycle
No authentication, database, REST APIs, analytics backend, cloud save, AI integration, real-time collaboration, or promise of scientifically validated n-body simulation.

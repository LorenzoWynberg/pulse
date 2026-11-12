# Counter

The page shows one number (`#count`, `data-testid="count"`) that rises by one each second, and a button (`#toggle`) that reads Pause while counting and Resume while paused. A visually hidden `h1` gives the page its heading.

## State

- `app.js` keeps `baseCount`, `paused` and `startedAt`. While running, the shown value is `baseCount + floor((now - startedAt) / 1000)`, with the elapsed part clamped to at least 0 so a backward clock step never lowers the count.
- A `setInterval` at 250 ms calls `render`, which updates the text and persists only when the value changed.
- Pause folds the elapsed time into `baseCount`. Resume resets `startedAt` to now.

## Reset

`#reset` (Reset) sets `baseCount` to 0 and `startedAt` to now, and clears the `shown` cache so `render` rewrites the text and persists `{count: 0, paused}` even when 0 was already shown. The paused flag, the toggle label and the pulsing class are untouched. There is no confirmation.

## Persistence

- `localStorage` key `pulse:state` holds `{ "count": <int>, "paused": <bool> }`.
- Saved on every value change, on toggle, on `pagehide` and when the document turns hidden.
- On load, stored data is accepted only when `count` is a safe integer of 0 or more and `paused` is a boolean. Anything else (missing, unparseable, wrong shape, `1e21`) starts at 0 running.
- A throwing `localStorage` is swallowed: the counter keeps counting in memory.
- A reload while running resumes from the saved count and restarts the clock; time spent away is not added.

## Animation

The `pulsing` class on `#count` restarts its beat animation on each new second and is removed while paused. Styling uses the tokens in `styles.css` with a dark facet under `prefers-color-scheme: dark`.

## Tests

`tests/counter.spec.js` covers ticking, pause and resume, reload persistence in both states, corrupt storage and unavailable storage.

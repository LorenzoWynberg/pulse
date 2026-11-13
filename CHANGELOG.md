# Changelog

## 1.1.1 - 2026-11-12

### New

#### See the count from any tab

The browser tab title now shows Pulse's count, so you can check it without switching to the Pulse tab. While the counter runs, the title updates with the live count, for example "42 · Pulse". When you pause the counter, the title reads "Paused · 42 · Pulse", so a glance at your tab bar tells you whether it's running and where the count stands. The title also shows the right state when you reload the page while paused.

## 1.1.0 - 2026-11-12

### New: Pulse is live

Pulse is a single page with one job: it shows a large number that goes up by one every second, like a steady heartbeat. Open the page and the count starts.

#### Pause and resume

A **Pause/Resume** button sits under the counter. Pause stops the count at its current value and Resume carries on from that value. It never resets and never skips ahead to make up for paused time.

#### Your count is kept

Reloading the page, closing the tab or coming back later doesn't lose your number. Pulse saves the count and whether it was paused, and restores both when you return. The count stays accurate while the tab is in the background too. Browsers often slow timers in hidden tabs, but Pulse works out the count from how much time has actually passed, so it's correct when you look again. Time while the page is closed doesn't count: when you come back, the counter carries on from the number you left, running or paused as you left it.

#### Where to find it

Pulse runs on GitHub Pages. It goes live as soon as this release lands, with nothing to install and no account needed.

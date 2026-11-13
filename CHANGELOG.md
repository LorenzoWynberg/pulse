# Changelog

## 1.2.0 - 2026-11-12

### New

#### Reset the counter

A **Reset** button now sits next to Pause/Resume. One click sets the counter back to 0 right away. You no longer need to reload the page or clear your browser storage to start over, and no confirmation dialog appears.

Reset changes only the count. A running counter restarts from 0, keeps counting, and keeps its pulse. A paused counter shows 0 and stays paused until you press Resume.

The reset count is saved along with whether the counter was paused, so a reload still shows 0 in the same state. If your browser blocks storage, such as in some private modes, Reset still sets the display to 0 and the page shows no errors.

#### Built to work everywhere Pause does

Reset looks and behaves like the Pause/Resume button. It uses the same colours and the same visible focus outline in light and dark mode. You can reach it with Tab right after Pause/Resume and press it with Enter or Space. On narrow screens down to 320px wide, the two buttons wrap onto separate lines, so both stay fully visible and the page doesn't scroll sideways.

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

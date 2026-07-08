# Running Late Dynasty CFB 27 — Easy Update Guide

Use this file when you want to update the GitHub Pages prototype without rebuilding the design.

## Main file to edit

`data/league-history.json`

## Common weekly edits

| What changed? | Edit this JSON path | What updates on the site? |
|---|---|---|
| New cover teaser | `dashboard.coverLines` | Magazine splash page |
| New advance/GOTW/reward status | `dashboard.signals` | Hub signal cards |
| New top story | `dashboard.headlines` | Hub headline stack |
| Team owner or school changed | `teams` | Teams page, conference map, claimed count |
| New game/result/schedule note | `schedule` | Schedule page and featured slate |
| Rule update | `rules` | Rules page |

## Local fallback note

GitHub Pages can fetch `data/league-history.json`. When opening files directly from your computer, the site uses `data/league-history.js` as a fallback. After changing the JSON, mirror the same object into `league-history.js` as:

```js
window.RLD_DATA = { ...your JSON here... };
```

# Running Late Dynasty CFB 27

Live Site:
https://professorzoom45.github.io/RunningLate/

Discord:
https://discord.gg/8sXA2RQPnm

Static GitHub Pages site for the Running Late Dynasty CFB 27 league hub.

## Pages

- `index.html` - magazine-cover splash gate that links and auto-loads into the hub.
- `hub.html` - Dynasty command center, league health, signals, featured games, and conference overview.
- `teams.html` - searchable coach/team board with mini profile cards and Open Teams / Waitlist status.
- `schedule.html` - searchable user-vs-user schedule grouped by week.
- `rules.html` - public rule summary.
- `history.html` - league history and CFB 26 to CFB 27 carryover context.
- `rewards.html` - rewards and boost tracker shell.
- `media.html` - streams, clips, and highlights center.
- `archive.html` - magazine issue archive shell.
- `updates.html` - weekly update guide.
- `sitemap.html` - human-readable sitemap and publishing checklist.

## Update Path

Most public league content is powered by `data/league-history.json` and the local fallback in `data/league-history.js`. CSS loads from `assets/styles.css`, JavaScript loads from `assets/app.js`, and media assets live under `assets/`.

GitHub Pages should be configured as:

- Source: Deploy from a branch
- Branch: `main`
- Folder: `/ (root)`

# Running Late Dynasty CFB 27

Live Site:
https://professorzoom45.github.io/RunningLate/

Discord:
https://discord.gg/8sXA2RQPnm

Static GitHub Pages site for the Running Late Dynasty CFB 27 league hub.

## Pages

- `index.html` - full magazine-cover splash gate that links into the hub.
- `hub.html` - Dynasty command center, league health, signals, featured games, and conference overview.
- `coaches.html` - public preseason coach cards with team, user, conference, record, scheme, and ranking slots.
- `teams.html` - merged Team/User Hub with coach-card links, detailed team cards, conference board, and Open Teams / Waitlist status.
- `schedule.html` - searchable 83-game user-vs-user schedule grouped by week.
- `team-schedules.html` - individual user-game schedule slates by team, with full official schedules marked coming soon.
- `history.html` - league history and CFB 26 to CFB 27 carryover context.
- `media.html` - merged streams, clips, highlights, YouTube playlist, and collaborator invite center.
- `archive.html` - database of past index splash covers and weekly issue images.
- `SSL.html` - links to related Professor Zoom simulation sports league websites.
- `updates.html` - Running Late Feed news articles and launch updates.
- `sitemap.html` - human-readable sitemap and publishing checklist.

## Update Path

Most public league content is powered by `data/league-history.json` and the local fallback in `data/league-history.js`. CSS loads from `assets/styles.css`, JavaScript loads from `assets/app.js`, and media assets live under `assets/`.

GitHub Pages should be configured as:

- Source: Deploy from a branch
- Branch: `main`
- Folder: `/ (root)`

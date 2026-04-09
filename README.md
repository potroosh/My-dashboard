# FORFX Content Studio Dashboard

A single-page content management dashboard built for the FORFX brand. Tracks upcoming posts, scripts, filming progress, content ideas, and platform analytics — all in one glassmorphism dark-theme interface.

---

## Overview

This dashboard is designed for a content creator managing the FORFX prop trading brand across Instagram, YouTube, and LinkedIn. It provides a real-time operational view of the content pipeline: from idea to script to filming to publishing.

---

## Features

| Feature | Description |
|---|---|
| **Auth screen** | Login and sign-up with localStorage persistence |
| **Dashboard** | Welcome banner, stat cards, upcoming posts, script queue, filming tracker, engagement charts, goals, and quick note |
| **Content Calendar** | Upcoming scheduled posts with platform tags and times |
| **Script Library** | Full script queue with status pills (Approved / In Review / Draft) |
| **Ideas Board** | Content idea cards with platform chips |
| **Analytics** | Weekly engagement bar charts for Instagram and YouTube |
| **Filming Tracker** | Toggle filmed/not-filmed per item with live counter |
| **Profile Page** | Creator profile with avatar, role, company stats, and edit button |
| **Notification Dropdown** | Bell icon shows a glass-style dropdown with live notifications pulled from content data |
| **Live Search** | Search bar filters across upcoming posts, scripts, filming tracker, and ideas; highlights matches and navigates on click |
| **Logo Home Route** | Clicking the FORFX sidebar logo always returns to Dashboard |

---

## File Structure

```
my-dashboard/
├── index.html      # HTML structure only — all pages and components
├── style.css       # All CSS — variables, layout, components, responsive
├── app.js          # All JavaScript — routing, auth, search, notifications, interactions
└── README.md       # This file
```

---

## Routing System

Pages are routed via hash (`#dashboard`, `#profile`, `#scripts`, etc.) and managed by `navigateTo(page)` in `app.js`. Every nav link, the logo, and the header avatar are wired into this system.

Available routes:

| Route | Page |
|---|---|
| `#dashboard` | Main overview |
| `#calendar` | Upcoming posts |
| `#analytics` | Engagement charts |
| `#scripts` | Script library |
| `#ideas` | Ideas board |
| `#videos` | Video projects |
| `#assets` | Brand assets |
| `#instagram` | Instagram |
| `#youtube` | YouTube |
| `#linkedin` | LinkedIn |
| `#profile` | Creator profile |
| `#preferences` | Preferences |

---

## How to Edit Data

All content is hardcoded in `app.js` and `index.html`. Here is where to find each section:

### Upcoming Posts / Calendar
Edit the `<ul class="calendar-list">` blocks in `index.html` inside `#page-dashboard` and `#page-calendar`.

### Script Queue
Edit the `<ul class="script-list">` blocks in `#page-dashboard` and `#page-scripts`. Change `pill-approved`, `pill-review`, or `pill-draft` to update a script's status.

### Filming Tracker
Edit `<ul id="filming-list">` in `#page-dashboard`. Set `.filming-toggle` class to `filmed` or `not-filmed` and update `.filming-status` text accordingly.

### Content Ideas
Edit `.idea-cards` inside `#page-dashboard` and `#page-ideas`.

### Notifications
Edit the `NOTIFICATIONS` array at the top of `app.js`:

```js
const NOTIFICATIONS = [
  {
    title: '📝 Script in review: FORFX vs Competitors',
    sub:   'Awaiting approval · Script Library',
    page:  'scripts'   // page to navigate to on click
  },
  // add more here
];
```

The badge count updates automatically to match the array length.

### Search Index
Edit the `SEARCH_DATA` array at the top of `app.js`:

```js
const SEARCH_DATA = [
  { text: 'Item title', sub: 'Subtitle / meta', page: 'scripts', section: 'Scripts' },
  // add more here
];
```

### Profile Info
Edit `#page-profile` in `index.html` to update the name, role, company, or stats.

---

## GitHub Pages

This project deploys directly from the `main` branch root. No build step required.

To deploy:
1. Push to `main`
2. Go to **Settings → Pages** in your GitHub repo
3. Set source to **Deploy from branch → main → / (root)**
4. The site will be live at `https://<username>.github.io/<repo-name>/`

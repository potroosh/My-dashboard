/* ─────────────────────────────────────────────
   STATE
───────────────────────────────────────────── */
let currentUser = { name: 'Content Creator', email: '' };

/* ─────────────────────────────────────────────
   SEARCH DATA
   Searchable items across all sections
───────────────────────────────────────────── */
const SEARCH_DATA = [
  // Upcoming Posts / Calendar
  { text: 'FORFX Prop Firm Overview – Reel',         sub: 'Apr 10 · 9:00 AM · Instagram Reel',         page: 'calendar', section: 'Calendar' },
  { text: 'How to Pass a Prop Firm Challenge',       sub: 'Apr 11 · 12:00 PM · YouTube Long-form',     page: 'calendar', section: 'Calendar' },
  { text: 'Risk Management for Funded Traders',      sub: 'Apr 13 · 6:00 PM · IG Carousel',            page: 'calendar', section: 'Calendar' },
  { text: 'FORFX April Challenge Promo',             sub: 'Apr 15 · 10:00 AM · LinkedIn + Story',       page: 'calendar', section: 'Calendar' },
  // Scripts
  { text: 'Why Most Traders Blow Funded Accounts',   sub: 'YouTube · ~8 min · Approved',                page: 'scripts',  section: 'Scripts' },
  { text: 'FORFX vs Competitors – Short',            sub: 'IG Reel · ~45 sec · In Review',              page: 'scripts',  section: 'Scripts' },
  { text: '5 Rules Every Funded Trader Follows',     sub: 'YouTube Shorts · ~60 sec · In Review',       page: 'scripts',  section: 'Scripts' },
  { text: 'April Monthly Wrap — FORFX Recap',        sub: 'IG + LinkedIn · 600 words · Draft',          page: 'scripts',  section: 'Scripts' },
  { text: "Beginner's Guide to Prop Trading",        sub: 'YouTube · ~12 min · 1,800 words · Draft',    page: 'scripts',  section: 'Scripts' },
  // Filming Tracker
  { text: 'FORFX Prop Firm Overview – 30s Reel',     sub: 'IG Reel · Deadline: Apr 10 · Filmed',        page: 'dashboard', section: 'Filming' },
  { text: 'Why Most Traders Blow Funded Accounts',   sub: 'YouTube Long-form · Deadline: Apr 11 · Filmed', page: 'dashboard', section: 'Filming' },
  { text: '5 Rules Every Funded Trader Follows',     sub: 'YouTube Shorts · Deadline: Apr 13',          page: 'dashboard', section: 'Filming' },
  { text: 'Risk Management Carousel – Voiceover',    sub: 'IG Carousel · Deadline: Apr 13',             page: 'dashboard', section: 'Filming' },
  { text: 'FORFX vs Competitors – Short Comparison', sub: 'IG Reel · ~45 sec · Deadline: Apr 14',       page: 'dashboard', section: 'Filming' },
  { text: 'FORFX April Challenge Promo – Announcement', sub: 'LinkedIn + IG Story · Deadline: Apr 15',  page: 'dashboard', section: 'Filming' },
  { text: "Beginner's Guide to Prop Trading – Full Video", sub: 'YouTube · ~12 min · Deadline: Apr 18', page: 'dashboard', section: 'Filming' },
  // Content Ideas
  { text: 'Day in the life of a FORFX funded trader', sub: 'IG Reel · YT Short',                        page: 'ideas',    section: 'Ideas' },
  { text: 'Reacting to trader mistakes on social media', sub: 'YouTube · Educational',                  page: 'ideas',    section: 'Ideas' },
  { text: '"Before FORFX vs After FORFX" testimonial series', sub: 'IG Series · Social Proof',          page: 'ideas',    section: 'Ideas' },
];

/* ─────────────────────────────────────────────
   NOTIFICATIONS DATA
───────────────────────────────────────────── */
const NOTIFICATIONS = [
  {
    title: '📝 Script in review: FORFX vs Competitors',
    sub:   'Awaiting approval · Script Library',
    page:  'scripts'
  },
  {
    title: '📅 Post scheduled: Apr 10 – FORFX Prop Firm Overview',
    sub:   '9:00 AM · Instagram Reel',
    page:  'calendar'
  },
  {
    title: '🎬 Filming due: Risk Management Carousel – Apr 13',
    sub:   'IG Carousel · Not yet filmed',
    page:  'dashboard'
  },
  {
    title: '✅ Script approved: Why Most Traders Blow Funded Accounts',
    sub:   'Ready to film · YouTube Long-form',
    page:  'scripts'
  },
];

/* ─────────────────────────────────────────────
   SCREEN ROUTING
───────────────────────────────────────────── */
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function showSignUp() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('signup-form').style.display = 'block';
  clearMessages();
}

function showLogin() {
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
  clearMessages();
}

function clearMessages() {
  ['login-error', 'signup-error', 'signup-success'].forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
}

/* ─────────────────────────────────────────────
   AUTH
───────────────────────────────────────────── */
function handleLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-pass').value;
  if (!email || !pass) {
    document.getElementById('login-error').textContent = 'Please enter your email and password.';
    document.getElementById('login-error').style.display = 'block';
    return;
  }
  const stored = JSON.parse(localStorage.getItem('forfx_user') || 'null');
  if (stored && stored.email === email) {
    currentUser = stored;
  } else {
    currentUser = { name: email.split('@')[0].replace(/[._]/g, ' '), email };
  }
  document.getElementById('login-error').style.display = 'none';
  enterDashboard();
}

function handleSignUp() {
  const name  = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const pass  = document.getElementById('signup-pass').value;
  document.getElementById('signup-error').style.display = 'none';
  if (!name || !email || !pass) {
    document.getElementById('signup-error').style.display = 'block';
    return;
  }
  localStorage.setItem('forfx_user', JSON.stringify({ name, email }));
  document.getElementById('signup-success').style.display = 'block';
  setTimeout(() => {
    document.getElementById('signup-success').style.display = 'none';
    showLogin();
    document.getElementById('login-email').value = email;
  }, 1800);
}

function handleLogout() {
  show('auth-screen');
  showLogin();
  document.getElementById('login-email').value = '';
  document.getElementById('login-pass').value  = '';
}

/* ─────────────────────────────────────────────
   DASHBOARD INIT
───────────────────────────────────────────── */
function enterDashboard() {
  const initials    = currentUser.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const displayName = capitalize(currentUser.name);

  document.getElementById('header-name').textContent    = displayName;
  document.getElementById('welcome-name').textContent   = displayName.split(' ')[0];
  document.getElementById('sidebar-name').textContent   = displayName;
  document.getElementById('header-avatar').textContent  = initials;
  document.getElementById('sidebar-avatar').textContent = initials;

  const h = new Date().getHours();
  document.getElementById('time-greeting').textContent = h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening';
  document.getElementById('header-date').textContent =
    new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const saved = localStorage.getItem('forfx_note');
  if (saved) document.getElementById('quick-note-text').value = saved;

  buildNotifications();

  show('dashboard-screen');
  const hash = location.hash.replace('#', '') || 'dashboard';
  navigateTo(hash);
  showToast('Welcome back, ' + displayName.split(' ')[0] + '! ✓');
}

/* ─────────────────────────────────────────────
   PAGE ROUTING
───────────────────────────────────────────── */
function navigateTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === page);
  });

  const link = document.querySelector(`.nav-link[data-page="${page}"]`);
  const labels = {
    dashboard:   'Dashboard',
    calendar:    'Content Calendar',
    analytics:   'Analytics',
    scripts:     'Script Library',
    ideas:       'Ideas Board',
    videos:      'Video Projects',
    assets:      'Brand Assets',
    instagram:   'Instagram',
    youtube:     'YouTube',
    linkedin:    'LinkedIn',
    preferences: 'Preferences',
    profile:     'Profile',
  };
  document.getElementById('header-title').textContent =
    link ? link.dataset.label : (labels[page] || 'Dashboard');
  history.replaceState(null, '', '#' + page);
}

function setNav(el) {
  const page = el.dataset.page;
  if (!page) return;
  navigateTo(page);
  closeSidebar();
}

/* ─────────────────────────────────────────────
   HAMBURGER / SIDEBAR
───────────────────────────────────────────── */
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('active');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('active');
}

window.addEventListener('hashchange', () => {
  const page = location.hash.replace('#', '');
  if (page && document.getElementById('dashboard-screen').classList.contains('active')) {
    navigateTo(page);
  }
});

/* ─────────────────────────────────────────────
   NOTIFICATIONS
───────────────────────────────────────────── */
function buildNotifications() {
  const list  = document.getElementById('notif-list');
  const badge = document.getElementById('notif-badge');
  const count = document.getElementById('notif-count');
  if (!list) return;

  list.innerHTML = NOTIFICATIONS.map(n => `
    <div class="notif-item" onclick="notifClick('${n.page}')">
      <div class="notif-dot-indicator"></div>
      <div class="notif-body">
        <div class="notif-item-title">${n.title}</div>
        <div class="notif-item-sub">${n.sub}</div>
      </div>
    </div>
  `).join('');

  const c = NOTIFICATIONS.length;
  if (badge)  badge.textContent  = c;
  if (count)  count.textContent  = c;
}

function toggleNotif() {
  document.getElementById('notif-dropdown').classList.toggle('open');
}

function notifClick(page) {
  closeNotif();
  navigateTo(page);
}

function closeNotif() {
  document.getElementById('notif-dropdown').classList.remove('open');
}

/* ─────────────────────────────────────────────
   SEARCH
───────────────────────────────────────────── */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function handleSearch() {
  const input = document.getElementById('search-input');
  const dd    = document.getElementById('search-dropdown');
  const q     = input.value.trim();

  if (!q) {
    dd.classList.remove('open');
    dd.innerHTML = '';
    return;
  }

  const ql = q.toLowerCase();
  const matches = SEARCH_DATA.filter(item => item.text.toLowerCase().includes(ql));

  if (matches.length === 0) {
    dd.innerHTML = '<div class="search-no-results">No results for "<strong>' + q + '</strong>"</div>';
    dd.classList.add('open');
    return;
  }

  const rx = new RegExp(`(${escapeRegex(q)})`, 'gi');
  dd.innerHTML = matches.map(item => {
    const highlighted = item.text.replace(rx, '<mark>$1</mark>');
    return `<div class="search-result-item" onclick="navigateToResult('${item.page}')">
      <div class="search-result-text">
        ${highlighted}
        <div class="search-result-sub">${item.sub}</div>
      </div>
      <span class="search-result-section">${item.section}</span>
    </div>`;
  }).join('');

  dd.classList.add('open');
}

function handleSearchKey(e) {
  if (e.key === 'Escape') {
    document.getElementById('search-input').value = '';
    document.getElementById('search-dropdown').classList.remove('open');
    document.getElementById('search-input').blur();
  }
}

function navigateToResult(page) {
  document.getElementById('search-input').value = '';
  document.getElementById('search-dropdown').classList.remove('open');
  navigateTo(page);
  closeSidebar();
}

/* ─────────────────────────────────────────────
   OUTSIDE CLICK → CLOSE DROPDOWNS
───────────────────────────────────────────── */
document.addEventListener('click', e => {
  const notifWrapper  = document.getElementById('notif-wrapper');
  const searchWrapper = document.getElementById('search-wrapper');

  if (notifWrapper && !notifWrapper.contains(e.target)) {
    closeNotif();
  }
  if (searchWrapper && !searchWrapper.contains(e.target)) {
    const dd = document.getElementById('search-dropdown');
    if (dd) dd.classList.remove('open');
  }
});

/* ─────────────────────────────────────────────
   QUICK NOTE
───────────────────────────────────────────── */
function saveNote() {
  const val = document.getElementById('quick-note-text').value;
  localStorage.setItem('forfx_note', val);
  showToast('Note saved!');
}

/* ─────────────────────────────────────────────
   TOAST
───────────────────────────────────────────── */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function capitalize(str) {
  return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

/* ─────────────────────────────────────────────
   FILMING TRACKER
───────────────────────────────────────────── */
function toggleFilm(row) {
  const toggle = row.querySelector('.filming-toggle');
  const pill   = row.querySelector('.filming-status');
  const filmed = toggle.classList.contains('filmed');
  toggle.classList.toggle('filmed',    !filmed);
  toggle.classList.toggle('not-filmed', filmed);
  pill.textContent = filmed ? 'Not Filmed' : 'Filmed';
  pill.className   = 'filming-status ' + (filmed ? 'status-not-filmed' : 'status-filmed');
  updateFilmCounts();
}

function updateFilmCounts() {
  const rows = document.querySelectorAll('.filming-item');
  let f = 0;
  rows.forEach(r => { if (r.querySelector('.filming-toggle').classList.contains('filmed')) f++; });
  document.getElementById('filmed-count').textContent   = f;
  document.getElementById('unfilmed-count').textContent = rows.length - f;
}

function resetFilming() {
  document.querySelectorAll('.filming-item').forEach(row => {
    const toggle = row.querySelector('.filming-toggle');
    const pill   = row.querySelector('.filming-status');
    toggle.classList.remove('filmed');
    toggle.classList.add('not-filmed');
    pill.textContent = 'Not Filmed';
    pill.className   = 'filming-status status-not-filmed';
  });
  updateFilmCounts();
  showToast('Filming tracker reset.');
}

/* ─────────────────────────────────────────────
   ENTER KEY SUPPORT (auth forms)
───────────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  if (!document.getElementById('auth-screen').classList.contains('active')) return;
  const lf = document.getElementById('login-form');
  const sf = document.getElementById('signup-form');
  if (lf.style.display !== 'none') handleLogin();
  if (sf.style.display !== 'none') handleSignUp();
});

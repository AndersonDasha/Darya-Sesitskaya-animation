/* ─── State ────────────────────────────────────────────── */
const state = {
  stage: null,
  goal: '',
  hours: 5,
  startDate: new Date(),
  currentWeekOffset: 0,
  wins: [],
  focusScore: 0,
  planningChecked: {},
  notifDismissed: false,
};

/* ─── Goal suggestions by stage ────────────────────────── */
const suggestions = {
  career: [
    'Land 3 interviews at companies I'm excited about',
    'Get a job offer in my target field',
    'Complete 2 portfolio projects and update my resume',
  ],
  family: [
    'Establish a daily routine with the new baby',
    'Complete all third-trimester appointments and prep',
    'Build a 6-week parental-leave coverage plan at work',
  ],
  health: [
    'Lose 8 lbs through consistent workouts and diet',
    'Run a 5K without stopping',
    'Work out 4 times per week every week for 12 weeks',
  ],
  learning: [
    'Finish the course and earn my certification',
    'Build and ship a side project using the new skill',
    'Study 1 hour every day for 12 weeks',
  ],
  finance: [
    'Save $3,000 in an emergency fund',
    'Pay off my credit card balance completely',
    'Invest $500/month consistently for 12 weeks',
  ],
  creative: [
    'Write and publish the first draft of my book chapter',
    'Launch my product to 100 users',
    'Complete 12 pieces for my portfolio — one per week',
  ],
};

/* ─── Suggested events by stage ────────────────────────── */
const suggestedEventsByStage = {
  career: [
    { icon: '📝', title: 'Resume review session', desc: '90 min deep-dive on tailoring your CV', urgency: 'High priority' },
    { icon: '🤝', title: 'Networking coffee chat', desc: 'Reach out and schedule 1 informational interview', urgency: 'This week' },
    { icon: '💻', title: 'Apply to 5 jobs', desc: '2-hour focused application block', urgency: 'High priority' },
    { icon: '🎤', title: 'Mock interview practice', desc: '45 min with a friend or Pramp', urgency: 'Recommended' },
  ],
  family: [
    { icon: '🏥', title: 'Prenatal / pediatric check-up', desc: 'Schedule your next medical appointment', urgency: 'High priority' },
    { icon: '🛏', title: 'Nursery prep session', desc: '2 hours on setup or supplies', urgency: 'This week' },
    { icon: '📖', title: 'Read 2 chapters of parenting book', desc: '30 min evening reading block', urgency: 'Recommended' },
    { icon: '🤗', title: 'Partner check-in', desc: '30-min honest conversation about division of labor', urgency: 'This week' },
  ],
  health: [
    { icon: '🏋️', title: 'Workout session ×4', desc: 'Block your 4 gym or home workout slots', urgency: 'High priority' },
    { icon: '🥗', title: 'Meal prep Sunday', desc: '1.5 hours cooking for the week ahead', urgency: 'This week' },
    { icon: '📏', title: 'Weigh-in & measurements', desc: 'Monday morning tracking ritual', urgency: 'Recommended' },
    { icon: '🚶', title: 'Daily 20-min walk', desc: 'Add to every weekday — morning or lunch', urgency: 'Recommended' },
  ],
  learning: [
    { icon: '📚', title: 'Study blocks ×5', desc: '1-hour focused study, no phone', urgency: 'High priority' },
    { icon: '🔨', title: 'Project work session', desc: '2 hours building your hands-on project', urgency: 'This week' },
    { icon: '🃏', title: 'Flashcard review', desc: '15 min daily spaced-repetition review', urgency: 'Recommended' },
    { icon: '🧑‍🏫', title: 'Find an accountability partner', desc: 'Message one person to check in weekly', urgency: 'Recommended' },
  ],
  finance: [
    { icon: '📊', title: 'Budget review', desc: '45 min reviewing last month's spending', urgency: 'High priority' },
    { icon: '🏦', title: 'Set up auto-transfer', desc: 'Automate your savings or debt payment', urgency: 'This week' },
    { icon: '📉', title: 'Track all spending', desc: 'Log every expense — use an app or sheet', urgency: 'Recommended' },
    { icon: '📞', title: 'Call to negotiate a bill', desc: 'Pick one recurring bill to try to reduce', urgency: 'Recommended' },
  ],
  creative: [
    { icon: '✍️', title: 'Deep work session ×3', desc: '2-hour creative focus blocks, no distractions', urgency: 'High priority' },
    { icon: '🔍', title: 'Research & inspiration', desc: '1 hour studying the work you admire most', urgency: 'This week' },
    { icon: '👥', title: 'Share draft for feedback', desc: 'Send work-in-progress to 2 trusted people', urgency: 'Recommended' },
    { icon: '📣', title: 'Post one update publicly', desc: 'Share progress on social or community', urgency: 'Recommended' },
  ],
};

/* ─── Weekly events skeleton ───────────────────────────── */
const weeklyGoalEvents = {
  career: ['Apply to jobs (2hr)', 'LinkedIn outreach', 'Interview prep'],
  family: ['Prenatal yoga', 'Nursery prep', 'Partner check-in'],
  health: ['Workout', 'Meal prep', 'Weigh-in'],
  learning: ['Study block', 'Project work', 'Flashcard review'],
  finance: ['Expense tracking', 'Budget review', 'Bill audit'],
  creative: ['Deep work', 'Feedback session', 'Publish update'],
};

/* ─── Insight messages ─────────────────────────────────── */
const insights = {
  career: 'You have 3 unscheduled goal blocks this week. Research shows applicants who apply 5+ days a week get offers 2× faster.',
  family: 'This week has good space for prep — you\'ve got 2 unblocked mornings perfect for errands and appointments.',
  health: 'You\'re on track — but Thursday looks packed. Consider moving one workout to Wednesday morning.',
  learning: 'Your study streak is building momentum. Block tomorrow\'s 8–9 AM before anything fills it.',
  finance: 'No budget review scheduled yet this week. 45 minutes now saves you hours of stress later.',
  creative: 'Your best creative hours are mornings. Two deep-work blocks this week would put you ahead of schedule.',
};

/* ─── Daily notification messages ──────────────────────── */
const dailyNotifs = {
  career: [
    'Today\'s focus: Apply to 2 jobs before noon. You\'ve got this.',
    'Your daily goal: Reach out to 1 person in your network.',
    'Reminder: 45-min interview prep scheduled for 3 PM — don\'t skip it.',
  ],
  family: [
    'Morning check-in: Did you drink water and take your prenatal vitamin?',
    'Today\'s priority: 20 minutes on the nursery checklist.',
    'Partner check-in tonight — 30 min, no phones.',
  ],
  health: [
    'Workout day! You\'ve hit 2 of 4 this week — one more after work?',
    'Meal prep reminder: 1 hour in the kitchen saves 5 hours of bad choices.',
    'Daily walk: 20 minutes counts. Lunch break is perfect.',
  ],
  learning: [
    'Study block at 8 AM: close Slack, open your course. 1 focused hour.',
    'You\'re 60% through your course. This week\'s sessions keep you on track.',
    'Flashcard review: 15 minutes before bed — your brain consolidates overnight.',
  ],
  finance: [
    'Log yesterday\'s spending before you check your phone.',
    'Auto-transfer day: make sure your savings move happened.',
    'Challenge: find one subscription you don\'t use and cancel it today.',
  ],
  creative: [
    'Deep work starts now: 2 hours, phone in another room, create.',
    'Share something today — even rough drafts build momentum.',
    'Creative block? Set a 25-min timer and just start. You can stop after.',
  ],
};

/* ─── Onboarding ───────────────────────────────────────── */
function goToStep(stepId) {
  document.querySelectorAll('.onboarding-step').forEach(s => s.classList.remove('active'));
  document.getElementById(stepId).classList.add('active');

  if (stepId === 'step-goal') populateGoalStep();
  if (stepId === 'step-confirm') populateConfirm();
}

function selectStage(el) {
  document.querySelectorAll('.stage-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  state.stage = el.dataset.stage;
  document.getElementById('btn-next-stage').disabled = false;
}

function populateGoalStep() {
  const endDate = new Date(state.startDate);
  endDate.setDate(endDate.getDate() + 84);
  document.getElementById('goal-end-date').textContent = endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const container = document.getElementById('suggested-goals');
  container.innerHTML = '';
  (suggestions[state.stage] || []).forEach(text => {
    const btn = document.createElement('button');
    btn.className = 'suggestion-chip';
    btn.textContent = text;
    btn.onclick = () => {
      document.querySelectorAll('.suggestion-chip').forEach(c => c.classList.remove('used'));
      btn.classList.add('used');
      document.getElementById('goal-input').value = text;
      syncGoalInput();
    };
    container.appendChild(btn);
  });
}

function syncGoalInput() {
  const val = document.getElementById('goal-input').value;
  state.goal = val;
  document.getElementById('char-count').textContent = val.length;
  document.getElementById('btn-next-goal').disabled = val.trim().length < 10;
}

function adjustHours(delta) {
  state.hours = Math.max(1, Math.min(40, state.hours + delta));
  document.getElementById('hours-val').textContent = state.hours;
}

function populateConfirm() {
  const endDate = new Date(state.startDate);
  endDate.setDate(endDate.getDate() + 84);
  document.getElementById('goal-summary').innerHTML =
    `<strong>Goal:</strong> ${state.goal}<br>` +
    `<strong>Commitment:</strong> ${state.hours} hours/week<br>` +
    `<strong>Deadline:</strong> ${endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
}

function launchApp() {
  document.getElementById('onboarding').classList.remove('active');
  document.getElementById('app').classList.add('active');
  initApp();
  setTimeout(showDailyNotification, 800);
}

/* ─── App init ─────────────────────────────────────────── */
function initApp() {
  document.getElementById('sidebar-goal-text').textContent = state.goal;
  document.getElementById('progress-fill').style.width = '8%';
  document.getElementById('progress-label').textContent = 'Week 1 of 12';
  renderWeekGrid();
  renderInsight();
  renderSuggestedEvents();
  renderPlanningChecklist();
  renderAlignmentMeters();
  renderReviewProgress();
  renderStars();
}

/* ─── Week Grid ────────────────────────────────────────── */
function getWeekDates(offset) {
  const now = new Date();
  const day = now.getDay();
  const sunday = new Date(now);
  sunday.setDate(now.getDate() - day + offset * 7);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    return d;
  });
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function renderWeekGrid() {
  const dates = getWeekDates(state.currentWeekOffset);
  const today = new Date();
  const grid = document.getElementById('week-grid');
  grid.innerHTML = '';

  const goalEvents = weeklyGoalEvents[state.stage] || [];

  dates.forEach((date, i) => {
    const isToday = date.toDateString() === today.toDateString();
    const isSunday = i === 0;
    const isSat = i === 6;

    const col = document.createElement('div');
    col.className = `day-col${isToday ? ' today' : ''}${isSunday ? ' sunday' : ''}`;

    const label = document.createElement('div');
    label.className = 'day-label';
    label.textContent = DAYS[i];
    const num = document.createElement('div');
    num.className = 'day-num';
    num.textContent = date.getDate();
    col.appendChild(label);
    col.appendChild(num);

    if (isSunday) {
      col.appendChild(makeChip('🗓 Sunday Planning', 'sunday-plan'));
      col.appendChild(makeChip('⭐ Weekly Review', 'sunday-plan'));
    }

    if (!isSunday && !isSat) {
      const evIdx = (i - 1) % goalEvents.length;
      col.appendChild(makeChip('🎯 ' + goalEvents[evIdx], 'goal'));
      if (i % 3 === 0) col.appendChild(makeChip('📋 Team standup', 'normal'));
    }

    if (i === 3) col.appendChild(makeChip('⚡ ' + (goalEvents[1] || 'Goal block'), 'suggested'));

    const addBtn = document.createElement('button');
    addBtn.className = 'add-event-btn';
    addBtn.textContent = '+ Add event';
    col.appendChild(addBtn);

    grid.appendChild(col);
  });

  const start = dates[0];
  const end = dates[6];
  const fmt = d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  document.getElementById('week-range-label').textContent = `${fmt(start)} – ${fmt(end)}, ${end.getFullYear()}`;
}

function makeChip(text, type) {
  const chip = document.createElement('div');
  chip.className = `event-chip ${type}`;
  chip.textContent = text;
  return chip;
}

function prevWeek() { state.currentWeekOffset--; renderWeekGrid(); }
function nextWeek() { state.currentWeekOffset++; renderWeekGrid(); }

/* ─── Insight bar ──────────────────────────────────────── */
function renderInsight() {
  document.getElementById('insight-text').textContent = insights[state.stage] || 'Keep up the good work this week!';
}

/* ─── Suggested events panel ───────────────────────────── */
function renderSuggestedEvents() {
  const list = document.getElementById('suggested-events-list');
  list.innerHTML = '';
  const events = suggestedEventsByStage[state.stage] || [];
  events.forEach((ev, i) => {
    const row = document.createElement('div');
    row.className = 'suggested-event-row';
    row.innerHTML = `
      <div class="sug-ev-icon">${ev.icon}</div>
      <div class="sug-ev-body">
        <div class="sug-ev-title">${ev.title}</div>
        <div class="sug-ev-desc">${ev.desc}</div>
      </div>
      <div class="sug-ev-badge">${ev.urgency}</div>
      <button class="btn-add-ev" id="add-ev-${i}" onclick="addSuggestedEvent(${i})">Add to week</button>
    `;
    list.appendChild(row);
  });
}

function addSuggestedEvent(i) {
  const btn = document.getElementById(`add-ev-${i}`);
  btn.textContent = '✓ Added';
  btn.classList.add('added');
  btn.disabled = true;
}

/* ─── Planning ─────────────────────────────────────────── */
function renderPlanningChecklist() {
  const events = suggestedEventsByStage[state.stage] || [];
  const container = document.getElementById('planning-events-checklist');
  container.innerHTML = '';
  events.forEach((ev, i) => {
    const row = document.createElement('div');
    row.className = 'checklist-item';
    row.innerHTML = `
      <input type="checkbox" id="plan-check-${i}" ${state.planningChecked[i] ? 'checked' : ''} onchange="state.planningChecked[${i}]=this.checked" />
      <label for="plan-check-${i}">${ev.icon} ${ev.title}</label>
    `;
    container.appendChild(row);
  });
}

function renderAlignmentMeters() {
  const meters = [
    { label: 'Goal-related blocks', pct: 65, cls: 'mid' },
    { label: 'Deep work time', pct: 40, cls: 'low' },
    { label: 'Recovery & rest', pct: 80, cls: 'high' },
  ];
  const container = document.getElementById('alignment-meters');
  container.innerHTML = '';
  meters.forEach(m => {
    container.innerHTML += `
      <div class="meter-row">
        <div class="meter-label"><span>${m.label}</span><span>${m.pct}%</span></div>
        <div class="meter-track"><div class="meter-fill ${m.cls}" style="width:${m.pct}%"></div></div>
      </div>`;
  });
}

function savePlanning() {
  const btn = event.target;
  btn.textContent = '✓ Saved';
  btn.style.background = 'var(--success)';
  setTimeout(() => { btn.textContent = 'Save planning session'; btn.style.background = ''; }, 2000);
}

/* ─── Review ───────────────────────────────────────────── */
function renderReviewProgress() {
  const container = document.getElementById('review-progress');
  const items = [
    { label: 'Goal blocks completed', pct: 75 },
    { label: 'Hours on goal', pct: 60 },
    { label: 'Week-over-week growth', pct: 85 },
  ];
  container.innerHTML = '';
  items.forEach(item => {
    container.innerHTML += `
      <div class="snap-row">
        <span style="width:180px;flex-shrink:0;font-size:13px">${item.label}</span>
        <div class="snap-bar"><div class="snap-fill" style="width:${item.pct}%"></div></div>
        <span style="font-size:12px;color:var(--text-2);white-space:nowrap">${item.pct}%</span>
      </div>`;
  });
}

function addWin() {
  const input = document.getElementById('new-win');
  const text = input.value.trim();
  if (!text) return;
  state.wins.push(text);
  input.value = '';
  const list = document.getElementById('wins-list');
  const li = document.createElement('li');
  li.textContent = text;
  list.appendChild(li);
}

function renderStars() {
  const container = document.getElementById('star-rating');
  container.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.className = `star${state.focusScore >= i ? ' lit' : ''}`;
    star.textContent = '⭐';
    star.onclick = () => setScore(i);
    container.appendChild(star);
  }
}

function setScore(n) {
  state.focusScore = n;
  renderStars();
  const labels = ['', 'Rough week — but you showed up', 'Below target — keep adjusting', 'Solid effort — nearly there', 'Strong week — great momentum', 'Perfect execution — amazing!'];
  document.getElementById('score-label').textContent = labels[n];
}

function saveReview() {
  const btn = event.target;
  btn.textContent = '✓ Review complete';
  btn.style.background = 'var(--success)';
  setTimeout(() => { btn.textContent = 'Complete review'; btn.style.background = ''; }, 2000);
}

/* ─── Navigation ───────────────────────────────────────── */
function showView(name, navEl) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + name).classList.add('active');
  if (navEl) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    navEl.classList.add('active');
  }
}

/* ─── Daily Notification ───────────────────────────────── */
function showDailyNotification() {
  if (state.notifDismissed) return;
  const notifs = dailyNotifs[state.stage] || ['Stay focused on your goal today.'];
  const msg = notifs[Math.floor(Math.random() * notifs.length)];
  document.getElementById('notif-text').textContent = msg;
  document.getElementById('notification-banner').classList.remove('hidden');
}

function dismissNotification() {
  state.notifDismissed = true;
  document.getElementById('notification-banner').classList.add('hidden');
}

/* ─── Demo shortcut (skip onboarding) ─────────────────────
   Press 'D' to jump straight into the app with a sample goal. */
document.addEventListener('keydown', e => {
  if (e.key === 'd' || e.key === 'D') {
    if (document.getElementById('onboarding').classList.contains('active')) {
      state.stage = 'career';
      state.goal = 'Land 3 interviews at companies I\'m excited about';
      state.hours = 8;
      launchApp();
    }
  }
});

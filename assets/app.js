(function(){
  const DISCORD = 'https://discord.gg/8sXA2RQPnm';
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const state = { data: window.RLD_DATA || null };
  const AUDIO_TRACKS = [
    {src:'assets/audio/diners.mp3', title:'Juice WRLD - Diners (Unreleased)'},
    {src:'assets/audio/newz-daily-news.mp3', title:'Newz - Daily News'},
    {src:'assets/audio/daze-man-of-my-word.mp3', title:'Daze, The Leader - Man Of My Word'},
    {src:'assets/audio/ab-honcho-daze-jungle.mp3', title:'AB Honcho x Daze, The Leader - Jungle'}
  ];
  const HEALTH_METRICS = [
    ['Games Completed','71/79','Games submitted or marked complete'],
    ['Users Active','31/31','Current active coach count'],
    ['Streams Posted','12','Clips, VODs, and stream links logged'],
    ['Rewards Claimed','8','Boosts and rewards submitted'],
    ['Admin Reviews','1','Open review item'],
    ['Open Teams','69 pool','Available schools listed by conference']
  ];
  const AVAILABLE_TEAMS = [
    ['Mountain West Available', [
      'AIR FORCE FALCONS ✈️',
      'HAWAI’I RAINBOW WARRIORS 🌈',
      'NEVADA WOLF PACK 🐺',
      'NEW MEXICO LOBOS 🐺',
      'NORTH DAKOTA STATE BISON 🦬',
      'NORTHERN ILLINOIS HUSKIES 🐺',
      'SAN JOSE STATE SPARTANS 🪖',
      'UNLV REBELS 🎰',
      'UTEP MINERS ⛏️',
      'WYOMING COWBOYS 🤠'
    ]],
    ['PAC-12 Available', [
      'BOISE STATE BRONCOS 🐴',
      'COLORADO STATE RAMS 🐏',
      'FRESNO STATE BULLDOGS 🐶',
      'OREGON STATE BEAVERS 🦫',
      'SAN DIEGO STATE AZTECS 🗡️',
      'TEXAS STATE BOBCATS 🐱',
      'UTAH STATE AGGIES 🐂',
      'WASHINGTON STATE COUGARS 🐾'
    ]],
    ['Sun Belt Available', [
      'APP STATE MOUNTAINEERS ⛰️',
      'ARKANSAS STATE RED WOLVES 🐺',
      'COASTAL CAROLINA CHANTICLEERS 🐓',
      'GEORGIA SOUTHERN EAGLES 🦅',
      'GEORGIA STATE PANTHERS 🐆',
      'JAMES MADISON DUKES 🐶',
      'LOUISIANA RAGIN’ CAJUNS 🌶️',
      'LOUISIANA TECH BULLDOGS 🐶',
      'MARSHALL THUNDERING HERD 🦬',
      'OLD DOMINION MONARCHS 🦁',
      'SOUTH ALABAMA JAGUARS 🐆',
      'SOUTHERN MISS GOLDEN EAGLES 🦅',
      'TROY TROJANS ⚔️',
      'UL MONROE WARHAWKS 🦅'
    ]],
    ['ACC Available', [
      'BOSTON COLLEGE EAGLES 🦅',
      'CALIFORNIA GOLDEN BEARS 🐻',
      'DUKE BLUE DEVILS 😈',
      'GEORGIA TECH YELLOW JACKETS 🐝',
      'LOUISVILLE CARDINALS 🐦',
      'NC STATE WOLFPACK 🐺',
      'NORTH CAROLINA TAR HEELS 🐏',
      'PITT PANTHERS 🐆',
      'STANFORD CARDINAL 🌲',
      'SYRACUSE ORANGE 🍊',
      'VIRGINIA CAVALIERS ⚔️',
      'WAKE FOREST DEMON DEACONS 🎩'
    ]],
    ['Big Ten Available', [
      'ILLINOIS FIGHTING ILLINI 🔶',
      'IOWA HAWKEYES 🐤',
      'MARYLAND TERRAPINS 🐢',
      'MICHIGAN STATE SPARTANS 🪖',
      'MINNESOTA GOLDEN GOPHERS 🐿️',
      'NORTHWESTERN WILDCATS 🟣',
      'PURDUE BOILERMAKERS 🚂',
      'RUTGERS SCARLET KNIGHTS 🛡️',
      'UCLA BRUINS 🐻',
      'WISCONSIN BADGERS 🦡'
    ]],
    ['Big XII Available', [
      'ARIZONA WILDCATS 🐻',
      'ARIZONA STATE SUN DEVILS 🔱',
      'BAYLOR BEARS 🐻',
      'CINCINNATI BEARCATS 🐾',
      'IOWA STATE CYCLONES 🌪️',
      'KANSAS JAYHAWKS 🐦',
      'KANSAS STATE WILDCATS 🐱',
      'OKLAHOMA STATE COWBOYS 🤠',
      'UCF KNIGHTS ⚔️',
      'UTAH UTES 🪶',
      'WEST VIRGINIA MOUNTAINEERS ⛰️'
    ]],
    ['SEC Available', [
      'ARKANSAS RAZORBACKS 🐗',
      'KENTUCKY WILDCATS 🐱',
      'MISSOURI TIGERS 🐯',
      'VANDERBILT COMMODORES ⚓'
    ]]
  ];

  async function loadData(){
    if(state.data) return state.data;
    try{
      const res = await fetch('data/league-history.json', {cache:'no-store'});
      state.data = await res.json();
    }catch(e){
      console.warn('Running Late data could not be loaded. Using page fallback only.', e);
      state.data = window.RLD_DATA || {teams:[],schedule:[],timeline:[],settings:[],rules:[],derived:{},dashboard:{}};
    }
    return state.data;
  }
  function esc(v){ return String(v ?? '').replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s])); }
  function weekNumber(w){ const m=String(w).match(/\d+/); return m?Number(m[0]):999; }
  function slug(v){ return String(v||'section').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') || 'section'; }
  function byWeek(schedule){ return schedule.reduce((acc,g)=>{(acc[g.week] ||= []).push(g); return acc;},{}); }
  function groupedTeams(teams){ return teams.reduce((acc,t)=>{(acc[t.conference] ||= []).push(t); return acc;},{}); }
  function confOrder(a,b){ const order=['ACC','Big Ten','BIG XII','SEC','Independent']; return (order.indexOf(a)+99)%99 - (order.indexOf(b)+99)%99 || a.localeCompare(b); }
  function teamLookup(data){ return Object.fromEntries((data.teams||[]).map(t=>[t.school.toLowerCase(), t])); }
  function cleanDisplay(value){ return String(value||'').replace(/[^\w\s&.'-]/g,'').replace(/\s+/g,' ').trim(); }
  function teamSearchText(t, data){
    const games = (data.schedule||[]).filter(g => g.away===t.school || g.home===t.school).map(g => `${g.week} ${g.matchup}`).join(' ');
    return `${t.school} ${t.display} ${t.coach} ${t.conference} ${games}`.toLowerCase();
  }
  function coachForTeam(data, school){
    const t = teamLookup(data)[String(school||'').toLowerCase()];
    return t?.coach || '';
  }
  function gameSearchText(g, data){
    return `${g.week} ${g.matchup} ${g.venue||''} ${g.away} ${g.home} ${coachForTeam(data,g.away)} ${coachForTeam(data,g.home)}`.toLowerCase();
  }
  function gamesForTeam(data, school){
    return (data.schedule||[]).filter(g => g.away===school || g.home===school).sort((a,b)=>weekNumber(a.week)-weekNumber(b.week));
  }
  function nextGameForTeam(data, school){
    const game = gamesForTeam(data, school)[0];
    if(!game) return 'Schedule TBD';
    const opponent = game.away===school ? game.home : game.away;
    const at = game.neutral ? 'vs' : (game.home===school ? 'vs' : '@');
    return `${game.week}: ${at} ${opponent}`;
  }
  function rivalryNote(data, school){
    const rivalry = gamesForTeam(data, school).find(g => /Alabama|Auburn|Florida State|Florida|Texas A&M|Texas|Ohio State|Michigan|Oregon|Washington|Oklahoma|Clemson|South Carolina/i.test(g.matchup));
    return rivalry ? rivalry.matchup : 'Build the rivalry board';
  }

  function renderStats(data){
    $$('[data-stat]').forEach(el=>{
      const key = el.getAttribute('data-stat');
      const d = data.derived || {};
      const map = {
        teams: d.claimed_count || data.teams?.length || 0,
        games: d.projected_user_games || data.schedule?.length || 0,
        carryovers: d.legacy_carryover_count || data.legacy?.carryover_programs?.length || 0,
        channels: d.channel_count || data.channel_stats?.length || 0,
        discord: 'LIVE'
      };
      el.textContent = map[key] ?? '';
    });
  }
  function renderScorebug(data){
    const root = $('[data-render="scorebug"]'); if(!root) return;
    const items = data.dashboard?.scorebar || [];
    root.innerHTML = `<div class="scorebug-brand"><b>RLD</b><span>CFB 27 NOW</span></div>` + items.map(x=>`<div class="scorebug-item"><span>${esc(x.label)}</span><b>${esc(x.value)}</b></div>`).join('') + `<a class="scorebug-link" href="${DISCORD}" target="_blank" rel="noopener">Discord</a>`;
  }
  function renderStatusText(data){
    const s = data.dashboard?.status || {};
    const set = (sel,val) => { const el=$(sel); if(el) el.textContent = val || ''; };
    set('[data-render="status-label"]', s.leagueState || 'LIVE');
    set('[data-render="current-week"]', s.currentWeek || 'Week TBD');
    set('[data-render="next-advance"]', s.nextAdvance || 'Advance TBD');
  }
  function renderCoverLines(data){
    const root = $('[data-render="cover-lines"]'); if(!root) return;
    const lines = data.dashboard?.coverLines || [];
    root.innerHTML = lines.map((line,i)=>`<article class="cover-line cover-line--${i+1}"><span>${esc(line.kicker)}</span><h2>${esc(line.title)}</h2><p>${esc(line.detail)}</p></article>`).join('');
  }
  function renderHeadlines(data){
    const root = $('[data-render="headlines"]'); if(!root) return;
    const headlines = data.dashboard?.headlines || [];
    root.innerHTML = headlines.map((h,i)=>`<article class="headline-card ${i===0?'headline-card--main':''}"><span>${esc(h.kicker)}</span><h2>${esc(h.title)}</h2><p>${esc(h.summary)}</p><a href="${esc(h.href||'hub.html')}">${esc(h.cta||'Open')}</a></article>`).join('');
  }
  function signalMarkup(s, i, compact=false){
    return `<article class="signal-card signal-card--${esc(s.tone||'gold')} ${compact?'signal-card--compact':''}">
      <div><span>${esc(s.label)}</span><strong>${esc(s.value)}</strong></div>
      <b>${esc(s.status)}</b>
      <p>${esc(s.detail)}</p>
      <small>EDIT: ${esc(s.editKey || `dashboard.signals[${i}]`)}</small>
    </article>`;
  }
  function renderSignals(data){
    const all = data.dashboard?.signals || [];
    const rail = $('[data-render="signals"]');
    const cards = $('[data-render="signal-cards"]');
    if(rail) rail.innerHTML = all.slice(0,4).map((s,i)=>signalMarkup(s,i,true)).join('');
    if(cards) cards.innerHTML = all.map((s,i)=>signalMarkup(s,i,false)).join('');
  }
  function renderWatchlist(data){
    const root = $('[data-render="watchlist"]'); if(!root) return;
    root.innerHTML = (data.dashboard?.watchlist || []).map(x=>`<article class="watch-card"><b>${esc(x.rank)}</b><div><h3>${esc(x.title)}</h3><p>${esc(x.detail)}</p></div></article>`).join('');
  }
  function renderFeaturedGames(data){
    const root = $('[data-render="featured-games"]'); if(!root) return;
    const weeks = byWeek(data.schedule || []);
    const orderedWeeks = Object.keys(weeks).sort((a,b)=>weekNumber(a)-weekNumber(b));
    const week = orderedWeeks[0] || 'Week 1';
    const games = (weeks[week] || []).slice(0,6);
    root.innerHTML = `<div class="mini-slate-head"><b>${esc(week)}</b><span>${games.length} featured user games</span></div>` + games.map(g=>`<a class="mini-game" href="schedule.html"><span>${esc(g.neutral?'Neutral Site':'User vs User')}</span><strong>${esc(g.matchup)}</strong>${g.venue?`<em>${esc(g.venue)}</em>`:''}</a>`).join('');
  }
  function renderUpdateGuide(data){
    const root = $('[data-render="update-guide"]'); if(!root) return;
    root.innerHTML = (data.dashboard?.updateGuide || []).map((x,i)=>`<article class="update-card reveal"><b>${String(i+1).padStart(2,'0')}</b><h3>${esc(x.area)}</h3><p><strong>Edit:</strong> <code>${esc(x.edit)}</code></p><p>${esc(x.result)}</p></article>`).join('');
  }
  function renderSettings(data){
    const root = $('[data-render="settings"]'); if(!root) return;
    root.innerHTML = (data.settings || []).map(s => `<article class="stat-card reveal"><span>${esc(s.label)}</span><strong>${esc(s.value)}</strong></article>`).join('');
  }
  function renderLeagueHealth(){
    const root = $('[data-render="league-health"]'); if(!root) return;
    root.innerHTML = HEALTH_METRICS.map(([label,value,detail]) => `
      <article class="health-card reveal">
        <span>${esc(label)}</span>
        <strong>${esc(value)}</strong>
        <p>${esc(detail)}</p>
      </article>`).join('');
  }
  function renderOpenTeams(data){
    const root = $('[data-render="open-teams"]'); if(!root) return;
    const claimed = data.derived?.claimed_count || data.teams?.length || 0;
    const availableCount = AVAILABLE_TEAMS.reduce((sum, group) => sum + group[1].length, 0);
    const rows = [
      ['Claimed', `${claimed} programs`, 'All current coaches are marked active.'],
      ['Open', `${availableCount} teams`, 'Available school pool is listed below by conference.'],
      ['Reserved', '0 holds', 'Reserved claims can be added here by admins.'],
      ['Waitlist', 'Join Discord', 'Replacement coaches should enter through the league invite.'],
      ['Needs Confirmation', '0 users', 'No confirmation issues are listed publicly.']
    ];
    root.innerHTML = `
      <div class="panel-header">
        <div><span class="eyebrow">Open Teams / Waitlist</span><h2>Recruiting Board</h2><p>Quick public status for replacements, reserves, and new coach interest.</p></div>
        <a class="btn btn--red" href="${DISCORD}" target="_blank" rel="noopener">Discord</a>
      </div>
      <div class="status-board">${rows.map(([status,value,detail]) => `
        <article class="status-card reveal">
          <span>${esc(status)}</span>
          <strong>${esc(value)}</strong>
          <p>${esc(detail)}</p>
        </article>`).join('')}</div>
      <div class="available-board">${AVAILABLE_TEAMS.map(([group, teams]) => `
        <article class="available-card reveal">
          <h3>${esc(group)} <span>${teams.length}</span></h3>
          <div class="chip-row">${teams.map(team => `<span class="chip">${esc(team)}</span>`).join('')}</div>
        </article>`).join('')}</div>`;
  }
  function renderConferenceCards(data){
    const root = $('[data-render="conferences"]'); if(!root) return;
    const groups = groupedTeams(data.teams || []);
    root.innerHTML = Object.keys(groups).sort(confOrder).map(conf => `
      <article class="glass-card reveal">
        <div class="panel-header"><div><span class="eyebrow">${esc(conf)}</span><h3>${groups[conf].length} claimed</h3></div></div>
        <div class="chip-row">${groups[conf].map(t=>`<span class="chip" style="--team-primary:${esc(t.primary)};border-color:${esc(t.primary)}66">${esc(t.display)}</span>`).join('')}</div>
      </article>`).join('');
  }
  function renderTimeline(data){
    const root = $('[data-render="timeline"]'); if(!root) return;
    root.innerHTML = (data.timeline || []).map(t => `
      <div class="timeline-item reveal"><article class="timeline-card"><time>${esc(t.date)}</time><h3>${esc(t.title)}</h3><p>${esc(t.detail)}</p></article></div>`).join('');
  }
  function renderTeams(data){
    const root = $('[data-render="teams"]'); if(!root) return;
    const search = $('#teamSearch'); const conf = $('#confFilter');
    const render = () => {
      const q = (search?.value || '').toLowerCase().trim();
      const cf = conf?.value || 'All';
      const teams = (data.teams || []).filter(t => (cf==='All'||t.conference===cf) && teamSearchText(t,data).includes(q));
      const groups = groupedTeams(teams);
      const ordered = Object.keys(groups).sort(confOrder);
      const jumper = ordered.length > 1 ? `<nav class="section-jumper" aria-label="Team sections">${ordered.map(group=>`<a href="#teams-${slug(group)}">${esc(group)} <span>${groups[group].length}</span></a>`).join('')}</nav>` : '';
      const result = q ? `<p class="finder-result">${teams.length ? `${teams.length} coach profile${teams.length===1?'':'s'} found.` : 'No teams match that filter.'}</p>` : '';
      root.innerHTML = result + jumper + (ordered.map(group => `
        <section id="teams-${slug(group)}" class="week-block reveal"><div class="week-head"><h3>${esc(group)}</h3><span class="chip chip--gold">${groups[group].length} programs</span></div>
        <div class="grid grid--3 team-grid">${groups[group].map(t=>teamCard(t,data)).join('')}</div></section>`).join('') || '<p class="lead">No teams match that filter.</p>');
      observe();
    };
    if(conf){
      const conferences = ['All',...Object.keys(groupedTeams(data.teams || [])).sort(confOrder)];
      conf.innerHTML = conferences.map(c=>`<option>${esc(c)}</option>`).join('');
    }
    search?.addEventListener('input', render); conf?.addEventListener('change', render); render();
  }
  function teamCard(t, data){
    return `<article class="team-card" style="--team-primary:${esc(t.primary)};--team-accent:${esc(t.accent)}">
      <span class="conf">${esc(t.conference)}</span>
      <h3>${esc(t.display)}</h3>
      <p class="coach">${esc(t.coach)}</p>
      <div class="coach-meta">
        <span><b>Team</b>${esc(cleanDisplay(t.school))}</span>
        <span><b>Status</b>Active</span>
        <span><b>Record</b>0-0</span>
        <span><b>Next Game</b>${esc(nextGameForTeam(data,t.school))}</span>
        <span><b>Twitch/YouTube</b><a href="${DISCORD}" target="_blank" rel="noopener">Add Link</a></span>
        <span><b>Rivalry Note</b>${esc(rivalryNote(data,t.school))}</span>
        <span><b>Last Result</b>No result yet</span>
      </div>
      <div class="swatches"><i class="swatch" style="background:${esc(t.primary)}"></i><i class="swatch" style="background:${esc(t.accent)}"></i></div>
    </article>`;
  }
  function renderSchedule(data){
    const root = $('[data-render="schedule"]'); if(!root) return;
    const search = $('#scheduleSearch'); const weekFilter = $('#weekFilter');
    const render = () => {
      const q = (search?.value || '').toLowerCase().trim();
      const wf = weekFilter?.value || 'All';
      const games = (data.schedule || []).filter(g => (wf==='All'||g.week===wf) && gameSearchText(g,data).includes(q));
      const groups = byWeek(games);
      const ordered = Object.keys(groups).sort((a,b)=>weekNumber(a)-weekNumber(b));
      const jumper = ordered.length > 1 ? `<nav class="section-jumper" aria-label="Schedule sections">${ordered.map(w=>`<a href="#schedule-${slug(w)}">${esc(w.replace('Week ','W'))} <span>${groups[w].length}</span></a>`).join('')}</nav>` : '';
      const result = q ? `<p class="finder-result">${games.length ? `${games.length} game${games.length===1?'':'s'} found.` : 'No games match that filter.'}</p>` : '';
      root.innerHTML = result + jumper + (ordered.map(w => `
        <section id="schedule-${slug(w)}" class="week-block reveal"><div class="week-head"><h3>${esc(w)}</h3><span class="chip chip--gold">${groups[w].length} user games</span></div>
        <div class="match-grid">${groups[w].map(g=>matchCard(g,data)).join('')}</div></section>`).join('') || '<p class="lead">No games match that filter.</p>');
      observe();
    };
    if(weekFilter){
      const weeks = ['All', ...Object.keys(byWeek(data.schedule || [])).sort((a,b)=>weekNumber(a)-weekNumber(b))];
      weekFilter.innerHTML = weeks.map(w=>`<option>${esc(w)}</option>`).join('');
    }
    search?.addEventListener('input', render); weekFilter?.addEventListener('change', render); render();
  }
  function matchCard(g, data){
    const awayCoach = coachForTeam(data,g.away);
    const homeCoach = coachForTeam(data,g.home);
    return `<article class="match-card"><div><small>${esc(g.neutral?'Neutral Site':'User vs User')}</small><b>${esc(g.matchup)}</b>${g.venue?`<small>${esc(g.venue)}</small>`:''}<small>${esc(g.away)}: ${esc(awayCoach||'Coach TBD')} | ${esc(g.home)}: ${esc(homeCoach||'Coach TBD')}</small></div><span class="chip">${g.neutral?'VS':'@'}</span></article>`;
  }
  function renderRules(data){
    const root = $('[data-render="rules"]'); if(!root) return;
    root.innerHTML = (data.rules || []).map(r => `<article class="rule-item reveal">${esc(r)}</article>`).join('');
  }
  function renderTopGames(data){
    const root = $('[data-render="top-games"]'); if(!root) return;
    const rows = data.derived?.top_user_game_counts || [];
    root.innerHTML = rows.map((r,i)=>`<div class="leader-row reveal"><b>${i+1}</b><span>${esc(r.team)}</span><span class="chip chip--gold">${r.games} games</span></div>`).join('');
  }
  function renderChannelStats(data){
    const root = $('[data-render="channels"]'); if(!root) return;
    root.innerHTML = `<div class="table-wrap"><table><thead><tr><th>Channel</th><th>Messages</th><th>First</th><th>Last</th><th>Top Author</th></tr></thead><tbody>${(data.channel_stats||[]).map(c=>`<tr><td>${esc(c.channel)}</td><td>${esc(c.messages)}</td><td>${esc(c.first)}</td><td>${esc(c.last)}</td><td>${esc(c.top_author)}</td></tr>`).join('')}</tbody></table></div>`;
  }
  function renderSitemap(data){
    const root = $('[data-render="sitemap"]'); if(!root) return;
    root.innerHTML = (data.sitemap || []).map(p=>`<article class="glass-card reveal"><span class="eyebrow">${esc(p.type)}</span><h3><a href="${esc(p.file)}">${esc(p.title)}</a></h3><p>${esc(p.summary)}</p><span class="chip">/${esc(p.file)}</span></article>`).join('');
  }
  function renderArchive(data){
    const root = $('[data-render="archive"]'); if(!root) return;
    const cards = [
      ['Issue 01','Launch Desk','Week 0 / onboarding shell for the CFB 27 era.'],
      ['Issue 02','Week 1 War Room','First user-vs-user slate and early league storylines.'],
      ['Issue 03','Game of the Week','GOTW voting, rivalry heat, and boost tracker space.'],
      ['Issue 04','Conference Heat Check','ACC, Big Ten, BIG XII, SEC, and Independent race notes.'],
      ['Issue 05','Playoff Push','Late-season contender board and trophy race placeholder.']
    ];
    root.innerHTML = cards.map(c=>`<article class="glass-card reveal"><span class="eyebrow">${c[0]}</span><h3>${c[1]}</h3><p>${c[2]}</p><span class="chip">Prototype Slot</span></article>`).join('');
  }
  function renderLegacy(data){
    const root = $('[data-render="legacy"]'); if(!root) return;
    const legacy = data.legacy || {};
    root.innerHTML = `
      <article class="glass-card reveal"><h3>CFB 26 Roots</h3><p>${esc((legacy.culture_notes||[])[0]||'')}</p><div class="chip-row">${(legacy.cfb26_user_programs||[]).map(t=>`<span class="chip">${esc(t)}</span>`).join('')}</div></article>
      <article class="glass-card reveal"><h3>Carryover Programs</h3><p>${esc(legacy.carryover_programs?.length || 0)} programs appear on both the legacy CFB 26 list and the CFB 27 claimed board.</p><div class="chip-row">${(legacy.carryover_programs||[]).map(t=>`<span class="chip chip--gold">${esc(t)}</span>`).join('')}</div></article>
      <article class="glass-card reveal"><h3>New CFB 27 Claimed Programs</h3><p>Fresh names on the current board compared with the saved CFB 26 list.</p><div class="chip-row">${(legacy.new_cfb27_claims_vs_legacy_list||[]).map(t=>`<span class="chip">${esc(t)}</span>`).join('')}</div></article>`;
  }
  function formatTime(seconds){
    if(!Number.isFinite(seconds) || seconds < 0) return '--:--';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${String(secs).padStart(2,'0')}`;
  }
  function mountAudioPlayer(){
    if($('.audio-player')) return;
    let index = Math.floor(Math.random() * AUDIO_TRACKS.length);
    const player = document.createElement('aside');
    player.className = 'audio-player';
    player.setAttribute('aria-label','Running Late music player');
    player.innerHTML = `
      <div class="audio-player__meta">
        <span>Now Playing</span>
        <strong data-audio-title></strong>
        <small data-audio-time>--:-- remaining</small>
      </div>
      <div class="audio-player__controls">
        <button type="button" data-audio-restart title="Start over" aria-label="Start over">&#8634;</button>
        <button type="button" data-audio-play title="Play or pause" aria-label="Play">&#9654;</button>
        <button type="button" data-audio-next title="Next song" aria-label="Next song">&#9197;</button>
      </div>`;
    document.body.appendChild(player);
    const audio = new Audio();
    audio.preload = 'metadata';
    const title = $('[data-audio-title]', player);
    const time = $('[data-audio-time]', player);
    const play = $('[data-audio-play]', player);
    const restart = $('[data-audio-restart]', player);
    const next = $('[data-audio-next]', player);
    const syncTime = () => {
      const remaining = audio.duration - audio.currentTime;
      time.textContent = `${formatTime(remaining)} remaining`;
    };
    const syncPlay = () => {
      play.innerHTML = audio.paused ? '&#9654;' : '&#9208;';
      play.setAttribute('aria-label', audio.paused ? 'Play' : 'Pause');
    };
    const loadTrack = (tryPlay=true) => {
      const track = AUDIO_TRACKS[index];
      audio.src = track.src;
      title.textContent = track.title;
      time.textContent = '--:-- remaining';
      if(tryPlay){
        audio.play().then(syncPlay).catch(()=>{ player.classList.add('audio-player--ready'); syncPlay(); });
      } else {
        syncPlay();
      }
    };
    restart.addEventListener('click', () => { audio.currentTime = 0; audio.play().catch(()=>{}); });
    play.addEventListener('click', () => { audio.paused ? audio.play().catch(()=>{}) : audio.pause(); });
    next.addEventListener('click', () => { index = (index + 1) % AUDIO_TRACKS.length; loadTrack(true); });
    audio.addEventListener('loadedmetadata', syncTime);
    audio.addEventListener('durationchange', syncTime);
    audio.addEventListener('timeupdate', syncTime);
    audio.addEventListener('play', syncPlay);
    audio.addEventListener('pause', syncPlay);
    audio.addEventListener('ended', () => { index = (index + 1) % AUDIO_TRACKS.length; loadTrack(true); });
    loadTrack(true);
  }
  function wireMobileBottomNav(){
    if($('.mobile-bottom-nav')) return;
    const page = document.body.dataset.page || '';
    const items = [
      ['hub','hub.html','&#127968;','Hub'],
      ['schedule','schedule.html','&#128197;','Schedule'],
      ['teams','teams.html','&#127944;','Teams'],
      ['discord',DISCORD,'&#128172;','Discord']
    ];
    const nav = document.createElement('nav');
    nav.className = 'mobile-bottom-nav';
    nav.setAttribute('aria-label','Mobile navigation');
    nav.innerHTML = items.map(([key,href,icon,label]) => `<a class="${page===key?'is-active':''}" href="${href}" ${key==='discord'?'target="_blank" rel="noopener"':''}><span>${icon}</span><b>${label}</b></a>`).join('');
    document.body.appendChild(nav);
  }
  function observe(){
    const items = $$('.reveal:not(.is-visible)');
    if(!('IntersectionObserver' in window)){ items.forEach(x=>x.classList.add('is-visible')); return; }
    const io = new IntersectionObserver(entries => entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); }}), {threshold:.08});
    items.forEach(x=>io.observe(x));
  }
  function wireNav(){
    const btn = $('.menu-toggle'), nav = $('#site-nav');
    btn?.addEventListener('click',()=>{ const open=nav.classList.toggle('is-open'); btn.setAttribute('aria-expanded', open?'true':'false'); });
  }
  function wireSplash(){
    if(document.body.dataset.page !== 'splash') return;
    const noAuto = new URLSearchParams(location.search).has('noauto');
    let seconds = 8;
    const count = $('#countdown');
    if(noAuto){ if(count) count.textContent='manual'; return; }
    const interval = setInterval(()=>{ seconds--; if(count) count.textContent = seconds; if(seconds<=0) clearInterval(interval); }, 1000);
    setTimeout(()=>{ location.href='hub.html'; }, 8200);
  }
  async function init(){
    wireNav(); wireMobileBottomNav(); mountAudioPlayer(); wireSplash();
    const data = await loadData();
    renderStats(data); renderScorebug(data); renderStatusText(data); renderCoverLines(data); renderHeadlines(data); renderSignals(data); renderWatchlist(data); renderFeaturedGames(data); renderUpdateGuide(data);
    renderSettings(data); renderLeagueHealth(data); renderOpenTeams(data); renderConferenceCards(data); renderTimeline(data); renderTeams(data); renderSchedule(data); renderRules(data); renderTopGames(data); renderChannelStats(data); renderSitemap(data); renderArchive(data); renderLegacy(data);
    observe();
  }
  document.addEventListener('DOMContentLoaded', init);
})();

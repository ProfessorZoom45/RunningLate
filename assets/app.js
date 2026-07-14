(function(){
  const DISCORD = 'https://discord.gg/8sXA2RQPnm';
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const state = { data: window.RLD_DATA || null };
  const AUDIO_TRACKS = [
    {src:'assets/audio/diners.mp3', title:'Juice WRLD - Diners (Unreleased)'},
    {src:'assets/audio/newz-daily-news.mp3', title:'Newz - Daily News'},
    {src:'assets/audio/daze-man-of-my-word.mp3', title:'Daze, The Leader - Man Of My Word'},
    {src:'assets/audio/ab-honcho-daze-jungle.mp3', title:'AB Honcho x Daze, The Leader - Jungle'},
    {src:'assets/audio/wave-keonte.mp3', title:"Wave - Keonte'"}
  ];
  const HEALTH_METRICS = [
    ['User Games Completed','0/83','Games submitted or marked complete'],
    ['Users Active','32/32','Confirmed dynasty join count'],
    ['Streams Posted','0','Clips, VODs, and stream links logged'],
    ['Admin Reviews','1','Open items to review'],
    ['Open Teams','68 pool','Available schools listed by conference']
  ];
  const SOCIAL_LINKS = {
    'ole miss': [
      {type:'Twitch', label:'Twitch', url:'https://www.twitch.tv/grodys_spot'}
    ],
    'washington': [
      {type:'YouTube', label:'YouTube', url:'https://youtube.com/@hoezayw?si=CUhF3AKRn5fLipzq'},
      {type:'Twitch', label:'Twitch', url:'https://www.twitch.tv/hoezay4'}
    ],
    'miami': [
      {type:'Twitch', label:'Twitch', url:'https://www.twitch.tv/lakedogg32?sr=a'}
    ],
    'oregon': [
      {type:'Twitch', label:'Twitch', url:'https://m.twitch.tv/vuetv117'}
    ],
    'oklahoma': [
      {type:'YouTube', label:'YouTube', url:'https://youtube.com/@youngtweet3068?si=pBrbaIiiFXk1is32'}
    ],
    'byu': [
      {type:'Twitch', label:'Twitch 1', url:'https://m.twitch.tv/changethewrld45'},
      {type:'YouTube', label:'YouTube', url:'https://www.youtube.com/@ZOOMvsTHEWORLD'},
      {type:'Twitch', label:'Twitch 2', url:'https://twitch.tv/ZoomPTG'}
    ]
  };
  const RIVALRY_MASTER = {
    'Alabama': ['Auburn','LSU','Mississippi State','Tennessee'],
    'Auburn': ['Alabama','Florida','Georgia','LSU'],
    'BYU': ['Utah','Utah State','Wyoming'],
    'Clemson': ['Boston College','Florida State','Georgia','Georgia Tech','NC State','South Carolina'],
    'Colorado': ['Colorado State','Nebraska','Utah'],
    'Florida': ['Auburn','Florida State','Georgia','LSU','Miami','Tennessee'],
    'Florida State': ['Clemson','Florida','Miami'],
    'Georgia': ['Auburn','Clemson','Florida','Georgia Tech','South Carolina','Tennessee'],
    'Houston': ['Rice','Tulsa'],
    'Indiana': ['Kentucky','Michigan State','Purdue'],
    'LSU': ['Alabama','Arkansas','Auburn','Florida','Mississippi State','Ole Miss','Texas A&M','Tulane'],
    'Miami': ['Florida','Florida State','Virginia Tech'],
    'Michigan': ['Michigan State','Minnesota','Northwestern','Notre Dame','Ohio State'],
    'Mississippi State': ['Alabama','LSU','Ole Miss'],
    'Missouri': ['Arkansas','Illinois','Kansas','Nebraska','Oklahoma','South Carolina'],
    'Nebraska': ['Colorado','Iowa','Minnesota','Missouri','Oklahoma','Texas','Wisconsin'],
    'Notre Dame': ['Army','Boston College','Michigan','Michigan State','Navy','Northwestern','Pittsburgh','Purdue','Stanford','USC'],
    'Ohio State': ['Illinois','Michigan','Penn State'],
    'Oklahoma': ['Missouri','Nebraska','Oklahoma State','Texas'],
    'Ole Miss': ['LSU','Memphis','Mississippi State'],
    'Oregon': ['Oregon State','Washington'],
    'Penn State': ['Maryland','Michigan State','Minnesota','Ohio State','Pittsburgh','Syracuse','Temple'],
    'SMU': ['Navy','North Texas','Rice','TCU'],
    'South Carolina': ['Clemson','Georgia','Missouri','North Carolina','Texas A&M'],
    'TCU': ['Baylor','SMU','Texas','Texas Tech'],
    'Tennessee': ['Alabama','Florida','Georgia','Kentucky','Vanderbilt'],
    'Texas': ['Arkansas','Nebraska','Oklahoma','TCU','Texas A&M','Texas Tech'],
    'Texas A&M': ['Arkansas','Baylor','LSU','South Carolina','Texas'],
    'Texas Tech': ['Baylor','Oklahoma State','TCU','Texas'],
    'UCLA': ['California','USC'],
    'USC': ['Notre Dame','Stanford','UCLA'],
    'Virginia Tech': ['Georgia Tech','Miami','Virginia','West Virginia'],
    'Washington': ['Oregon','Washington State']
  };
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
      'MINNESOTA GOLDEN GOPHERS 🐿️',      'NORTHWESTERN WILDCATS 🟣',
      'PURDUE BOILERMAKERS 🚂',
      'RUTGERS SCARLET KNIGHTS 🛡️',
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
      'MISSOURI TIGERS',
      'ARKANSAS RAZORBACKS 🐗',
      'KENTUCKY WILDCATS 🐱',
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
  function teamAlpha(a,b){ return cleanDisplay(a.school).localeCompare(cleanDisplay(b.school)); }
  function teamLookup(data){ return Object.fromEntries((data.teams||[]).map(t=>[t.school.toLowerCase(), t])); }
  function cleanDisplay(value){ return String(value||'').replace(/[^\w\s&.'-]/g,'').replace(/\s+/g,' ').trim(); }
  function teamSearchText(t, data){
    const games = (data.schedule||[]).filter(g => g.away===t.school || g.home===t.school).map(g => `${g.week} ${g.matchup}`).join(' ');
    return `${t.school} ${t.display} ${t.coach} ${t.coachName || ''} ${t.realName || ''} ${t.gamertag || ''} ${t.platform || ''} ${t.conference} ${games}`.toLowerCase();
  }
  function coachForTeam(data, school){
    const t = teamLookup(data)[String(school||'').toLowerCase()];
    return t?.coach || '';
  }
  function gameSearchText(g, data){
    const gameType = g.conference ? 'conference game red' : 'non-conference game white';
    return `${g.week} ${g.matchup} ${g.venue||''} ${g.away} ${g.home} ${coachForTeam(data,g.away)} ${coachForTeam(data,g.home)} ${gameType}`.toLowerCase();
  }
  function teamLogoPath(school){ return `assets/images/team-logos/${slug(school)}.png`; }
  function teamLink(data, school, className='team-link'){
    const t = teamLookup(data)[String(school||'').toLowerCase()];
    if(!t) return esc(school);
    return `<a class="${esc(className)}" href="teams.html#hub-team-${slug(t.school)}" style="--team-primary:${esc(t.primary)};--team-accent:${esc(t.accent)}">${esc(cleanDisplay(t.school))}</a>`;
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
  function teamScheduleHref(school){ return `team-schedules.html#team-${slug(school)}`; }
  function socialLinksForTeam(t){
    return SOCIAL_LINKS[String(t?.school || '').toLowerCase()] || [];
  }
  function socialLinksHtml(t){
    const links = socialLinksForTeam(t);
    if(!links.length) return `<a href="${DISCORD}" target="_blank" rel="noopener">Add Link</a>`;
    return `<span class="social-links">${links.map(link => `<a href="${esc(link.url)}" target="_blank" rel="noopener">${esc(link.label || link.type)}</a>`).join('')}</span>`;
  }
  function pendingValue(value, fallback='PENDING'){
    const v = String(value ?? '').trim();
    return v ? v : fallback;
  }
  function dynastyGamertag(t){ return pendingValue(t?.gamertag); }
  function dynastyPlatform(t){ return pendingValue(t?.platform); }
  function rivalryNote(data, school){
    const rivals = RIVALRY_MASTER[cleanDisplay(school)] || [];
    return rivals.length ? rivals.join(', ') : 'CFB 26 rivalry list pending';
  }
  function cleanAvailableTeamLabel(value){
    return String(value || '')
      .replace(/\u00e2\u20ac\u2122/g, "'")
      .replace(/[^\x20-\x7e]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function renderStats(data){
    $$('[data-stat]').forEach(el=>{
      const key = el.getAttribute('data-stat');
      const d = data.derived || {};
      const map = {
        teams: d.claimed_count || data.teams?.length || 0,
        games: d.projected_user_games || data.schedule?.length || 0,
        carryovers: d.legacy_carryover_count || data.legacy?.carryover_programs?.length || 0,
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
    const groups = AVAILABLE_TEAMS.slice().sort((a,b) => a[0].localeCompare(b[0]));
    root.innerHTML = `
      <div class="panel-header">
        <div><span class="eyebrow">Open Teams / Waitlist</span><h2>AI Controlled Teams</h2><p>Quick Reference Guide to All AI Controlled Teams Who Are Available To Be Picked By replacement users.</p></div>
        <a class="btn btn--red" href="${DISCORD}" target="_blank" rel="noopener">Discord</a>
      </div>
      <div class="available-board ai-controlled-teams">${groups.map(([group, teams]) => `
        <article class="available-card reveal">
          <h3>${esc(group)} <span>${teams.length}</span></h3>
          <div class="chip-row">${teams.map(team => `<span class="chip open-team-chip"><b>${esc(cleanAvailableTeamLabel(team))}</b><small>Record: 0-0</small></span>`).join('')}</div>
        </article>`).join('')}</div>`;
  }
  function renderConferenceCards(data){
    const root = $('[data-render="conferences"]'); if(!root) return;
    const groups = groupedTeams(data.teams || []);
    root.innerHTML = Object.keys(groups).sort(confOrder).map(conf => `
      <article class="glass-card reveal">
        <div class="panel-header"><div><span class="eyebrow">${esc(conf)}</span></div></div>
        <div class="chip-row">${groups[conf].map(t=>`<a class="chip conference-team-link" href="teams.html#hub-team-${slug(t.school)}" style="--team-primary:${esc(t.primary)};--team-accent:${esc(t.accent)}" aria-label="Open ${esc(cleanDisplay(t.school))} team hub">${esc(t.display)}</a>`).join('')}</div>
      </article>`).join('');
  }
  function renderTimeline(data){
    const root = $('[data-render="timeline"]'); if(!root) return;
    const rows = (data.timeline || []).slice().sort((a,b)=>String(b.date).localeCompare(String(a.date)));
    root.innerHTML = rows.map(t => `
      <div class="timeline-item reveal"><article class="timeline-card"><time>${esc(t.date)}</time><h3>${esc(t.title)}</h3><p>${esc(t.detail)}</p></article></div>`).join('');
  }
  function renderTeams(data){
    const root = $('[data-render="teams"]'); if(!root) return;
    const search = $('#teamSearch') || $('#teamPageSearch'); const conf = $('#confFilter');
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
    return `<article id="team-card-${slug(t.school)}" class="team-card" style="--team-primary:${esc(t.primary)};--team-accent:${esc(t.accent)}">
      <span class="conf">${esc(t.conference)}</span>
      <h3>${esc(t.display)}</h3>
      <p class="coach">${esc(t.coach)}</p>
      <div class="coach-meta">
        <span><b>Team</b>${esc(cleanDisplay(t.school))}</span>
        <span><b>Status</b>${esc(pendingValue(t.status, 'Joined Dynasty'))}</span>
        <span><b>Dynasty Gamertag</b>${esc(dynastyGamertag(t))}</span>
        <span><b>Platform</b>${esc(dynastyPlatform(t))}</span>
        <span><b>Record</b>${esc(pendingValue(t.teamRecord, '0-0'))}</span>
        <span><b>Next User Game</b><a href="${teamScheduleHref(t.school)}">${esc(nextGameForTeam(data,t.school))}</a></span>
        <span><b>Twitch/YouTube</b>${socialLinksHtml(t)}</span>
        <span><b>Rivalry Note</b>${esc(rivalryNote(data,t.school))}</span>
        <span><b>Last Result</b>${esc(pendingValue(t.lastGameResult, 'No result yet'))}</span>
      </div>
      <a class="btn btn--profile" href="coaches.html#team-${slug(t.school)}">Open Coach Card</a>
      <a class="btn btn--profile btn--schedule" href="${teamScheduleHref(t.school)}">Team Schedule</a>
      <div class="swatches"><i class="swatch" style="background:${esc(t.primary)}"></i><i class="swatch" style="background:${esc(t.accent)}"></i></div>
    </article>`;
  }
  function conferenceBadge(conf){
    const logos = {
      'ACC': {src:'assets/images/acc-logo.png', label:'ACC'},
      'Big Ten': {src:'assets/images/big-ten-logo.png', label:'BIG 10'},
      'BIG XII': {src:'assets/images/big-xii-logo.png', label:'BIG XII'},
      'SEC': {src:'assets/images/sec-logo.png', label:'SEC'},
      'Independent': {src:'assets/images/fbs-independent-logo.png', label:'FBS Independent'}
    };
    const logo = logos[conf];
    if(logo){
      return `<span class="conf-badge conf-badge--${slug(conf)} conf-badge--logo"><img src="${esc(logo.src)}" alt="" aria-hidden="true"><span>${esc(logo.label)}</span></span>`;
    }
    const map = {'ACC':'ACC','Big Ten':'B1G','BIG XII':'XII','SEC':'SEC','Independent':'IND'};
    return `<span class="conf-badge conf-badge--${slug(conf)}">${esc(map[conf] || conf)}</span>`;
  }
  function conferenceField(conf){
    return conferenceBadge(conf);
  }
  function coachProfileData(t, data){
    return [
      ['User Name', t.coach],
      ['Dynasty Gamertag', dynastyGamertag(t)],
      ['Platform', dynastyPlatform(t)],
      ['Conference', conferenceField(t.conference), true],
      ['Coach Name', pendingValue(t.coachName)],
      ['Prestige', pendingValue(t.prestige)],
      ['Level & Archetype', pendingValue(t.levelArchetype)],
      ['Job Security', pendingValue(t.jobSecurity)],
      ['Off. Scheme', pendingValue(t.offScheme)],
      ['Def. Scheme', pendingValue(t.defScheme)],
      ['Alma Mater', pendingValue(t.almaMater)],
      ['Team Record', pendingValue(t.teamRecord, '0-0')],
      ['Career Record', pendingValue(t.careerRecord, '0-0')],
      ['Record vs Rivals', pendingValue(t.rivalsRecord, '0-0')],
      ['Bowl Record', pendingValue(t.bowlRecord, '0-0')],
      ['Record vs Top 25', pendingValue(t.top25Record, '0-0')],
      ['Twitch/YouTube', socialLinksHtml(t), true],
      ['Next User Game', `<a href="${teamScheduleHref(t.school)}">${esc(nextGameForTeam(data, t.school))}</a>`, true],
      ['Last Game Result', pendingValue(t.lastGameResult, 'No result yet')]
    ];
  }
  function renderTeamHub(data){
    const root = $('[data-render="team-hub"]'); if(!root) return;
    const search = $('#teamHubSearch') || $('#teamPageSearch');
    const draw = () => {
      const q = (search?.value || '').toLowerCase().trim();
      const teams = (data.teams || []).slice().sort(teamAlpha).filter(t => teamSearchText(t,data).includes(q));
      root.innerHTML = `
        <p class="finder-result">${teams.length} coach card${teams.length===1?'':'s'} ready</p>
        <div class="team-hub-grid">${teams.map((t,i)=>`
          <a id="hub-team-${slug(t.school)}" class="team-hub-card reveal" href="coaches.html#team-${slug(t.school)}" style="--team-primary:${esc(t.primary)};--team-accent:${esc(t.accent)}">
            <span class="team-hub-card__logo"><img src="${esc(teamLogoPath(t.school))}" alt="${esc(cleanDisplay(t.school))} logo" loading="lazy"></span>
            <div>
              <h3>${esc(cleanDisplay(t.school))}</h3>
              <p>${esc(t.coach)}</p>
              <div class="team-hub-card__meta">${conferenceBadge(t.conference)}<span><b>GT:</b> ${esc(dynastyGamertag(t))}</span><span><b>Platform:</b> ${esc(dynastyPlatform(t))}</span><span><b>Next User Game:</b> ${esc(nextGameForTeam(data,t.school))}</span></div>
            </div>
          </a>`).join('')}</div>`;
      observe();
      if(location.hash){
        setTimeout(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView({behavior:'smooth',block:'start'}), 120);
      }
    };
    search?.addEventListener('input', draw);
    draw();
  }
  function coachCard(t, data){
    const fields = coachProfileData(t, data);
    return `<article id="team-${slug(t.school)}" class="coach-profile-card reveal" style="--team-primary:${esc(t.primary)};--team-accent:${esc(t.accent)}">
      <div class="coach-profile-card__mast">
        <div>
          <span class="eyebrow">Team / Coach Details</span>
          <h2>${esc(cleanDisplay(t.school))}</h2>
          <p>${esc(t.coach)}</p>
        </div>
        ${conferenceBadge(t.conference)}
      </div>
      <div class="coach-profile-card__body">
        ${fields.map(([label,value,html])=>`<div class="coach-field"><b>${esc(label)}</b><span>${html ? value : esc(value)}</span></div>`).join('')}
      </div>
      <div class="coach-profile-card__actions">
        <a class="btn btn--primary" href="${teamScheduleHref(t.school)}">Team Schedule</a>
        ${socialLinksForTeam(t).map(link => `<a class="btn" href="${esc(link.url)}" target="_blank" rel="noopener">${esc(link.label || link.type)}</a>`).join('')}
        <a class="btn" href="teams.html">Teams</a>
      </div>
    </article>`;
  }
  function renderCoachCards(data){
    const root = $('[data-render="coach-cards"]'); if(!root) return;
    const jumper = $('[data-render="coach-jumper"]');
    const search = $('#coachSearch');
    const draw = () => {
      const q = (search?.value || '').toLowerCase().trim();
      const teams = (data.teams || []).slice().sort(teamAlpha).filter(t => teamSearchText(t,data).includes(q));
      if(jumper){
        jumper.innerHTML = teams.map(t=>`<a href="#team-${slug(t.school)}">${esc(cleanDisplay(t.school))}</a>`).join('');
        jumper.hidden = teams.length === 0;
      }
      root.innerHTML = teams.length ? teams.map(t=>coachCard(t,data)).join('') : '<p class="lead">No coach cards match that search.</p>';
      observe();
    };
    search?.addEventListener('input', draw);
    draw();
    if(location.hash){
      setTimeout(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView({behavior:'smooth',block:'start'}), 120);
    }
  }
  function renderSchedule(data){
    const root = $('[data-render="schedule"]'); if(!root) return;
    const search = $('#scheduleSearch'); const weekFilter = $('#weekFilter');
    const scheduleTotal = $('[data-render="schedule-total"]');
    if(scheduleTotal) scheduleTotal.textContent = data.derived?.projected_user_games || (data.schedule || []).length;
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
      linkTeamMentions(data, root);
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
    const gameType = g.conference ? 'Conference Game' : 'Non-Conference Game';
    const kindClass = g.conference ? 'game-kind--conference' : 'game-kind--non';
    return `<article class="match-card ${g.conference ? 'match-card--conference' : 'match-card--non'}">
      <div class="match-card__body">
        <small class="game-kind ${kindClass}">${esc(gameType)}</small>
        <div class="match-card__teams">
          ${teamLink(data,g.away,'team-link team-link--away')}
          <span>${g.neutral?'VS':'@'}</span>
          ${teamLink(data,g.home,'team-link team-link--home')}
        </div>
        ${g.venue?`<small class="match-card__venue">${esc(g.venue)}</small>`:''}
        <small class="match-card__coaches">${esc(g.away)}: ${esc(awayCoach||'Coach TBD')} | ${esc(g.home)}: ${esc(homeCoach||'Coach TBD')}</small>
      </div>
      <span class="chip">${g.neutral?'VS':'@'}</span>
    </article>`;
  }
  function teamScheduleCard(t, data){
    const games = gamesForTeam(data, t.school);
    const cleanSchool = cleanDisplay(t.school);
    return `<article id="team-${slug(t.school)}" class="team-schedule-card reveal" style="--team-primary:${esc(t.primary)};--team-accent:${esc(t.accent)}">
      <div class="team-schedule-card__head">
        <div>
          <span class="eyebrow">Individual Team Slate</span>
          <h2>${esc(cleanSchool)}</h2>
          <p>${esc(t.coach)} - ${esc(t.conference)}</p>
        </div>
        ${conferenceBadge(t.conference)}
      </div>
      <div class="team-schedule-card__games">
        ${games.length ? games.map(g => {
          const opponent = g.away===t.school ? g.home : g.away;
          const location = g.neutral ? 'Neutral Site' : (g.home===t.school ? 'Home' : 'Away');
          const prefix = g.neutral ? 'vs' : (g.home===t.school ? 'vs' : '@');
          const tag = g.neutral ? 'VS' : (g.home===t.school ? 'HOME' : 'AWAY');
          const gameType = g.conference ? 'Conference Game' : 'Non-Conference Game';
          const kindClass = g.conference ? 'game-kind--conference' : 'game-kind--non';
          return `<article class="match-card ${g.conference ? 'match-card--conference' : 'match-card--non'}">
            <div>
              <small class="game-kind ${kindClass}">${esc(gameType)}</small>
              <small>${esc(g.week)} - ${esc(location)}</small>
              <b>${esc(prefix)} ${esc(opponent)}</b>
              ${g.venue ? `<small>${esc(g.venue)}</small>` : ''}
              <small>${esc(g.matchup)}</small>
            </div>
            <span class="chip">${esc(tag)}</span>
          </article>`;
        }).join('') : `<article class="match-card">
          <div>
            <small>Coming Soon</small>
            <b>User-game slate pending</b>
            <small>This team has no projected user-vs-user matchup in the current export.</small>
          </div>
          <span class="chip">TBD</span>
        </article>`}
      </div>
      <div class="team-schedule-card__footer">
        <b>Full 2026 User-vs-User Schedule</b>
      </div>
    </article>`;
  }
  function renderTeamSchedules(data){
    const root = $('[data-render="team-schedules"]'); if(!root) return;
    const search = $('#teamScheduleSearch');
    const draw = () => {
      const q = (search?.value || '').toLowerCase().trim();
      const teams = (data.teams || []).slice().sort(teamAlpha).filter(t => teamSearchText(t,data).includes(q));
      const jumper = teams.length ? `<nav class="section-jumper" aria-label="Team schedule sections">${teams.map(t=>`<a href="#team-${slug(t.school)}">${esc(cleanDisplay(t.school))} <span>${gamesForTeam(data,t.school).length}</span></a>`).join('')}</nav>` : '';
      const result = q ? `<p class="finder-result">${teams.length ? `${teams.length} team schedule${teams.length===1?'':'s'} found.` : 'No team schedules match that search.'}</p>` : '';
      root.innerHTML = result + jumper + (teams.length ? `<div class="team-schedule-grid">${teams.map(t=>teamScheduleCard(t,data)).join('')}</div>` : '<p class="lead">No team schedules match that search.</p>');
      observe();
      if(location.hash){
        setTimeout(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView({behavior:'smooth',block:'start'}), 120);
      }
    };
    search?.addEventListener('input', draw);
    draw();
  }
  function renderRules(data){
    const root = $('[data-render="rules"]'); if(!root) return;
    root.innerHTML = (data.rules || []).map(r => `<article class="rule-item reveal">${esc(r)}</article>`).join('');
  }
  function renderTopGames(data){
    const root = $('[data-render="top-games"]'); if(!root) return;
    const counts = new Map((data.teams || []).map(t => [t.school, 0]));
    (data.schedule || []).forEach(g => {
      counts.set(g.away, (counts.get(g.away) || 0) + 1);
      counts.set(g.home, (counts.get(g.home) || 0) + 1);
    });
    const seeded = data.derived?.top_user_game_counts || [];
    const used = new Set(seeded.map(r => r.team));
    const seededRows = seeded.map(r => ({team:r.team, games:counts.get(r.team) || r.games || 0}));
    const remainingRows = (data.teams || [])
      .filter(t => !used.has(t.school))
      .map(t => ({team:t.school, games:counts.get(t.school) || 0}))
      .sort((a,b) => b.games - a.games || a.team.localeCompare(b.team));
    const rows = seededRows.concat(remainingRows).slice(0, 15);
    root.innerHTML = rows.map((r,i)=>`<div class="leader-row reveal"><b>${i+1}</b><a class="leader-team" href="teams.html#hub-team-${slug(r.team)}">${esc(r.team)}</a><span class="chip chip--gold">${r.games} games</span></div>`).join('');
  }
  function renderSitemap(data){
    const root = $('[data-render="sitemap"]'); if(!root) return;
    root.innerHTML = (data.sitemap || []).map(p=>`<article class="glass-card reveal"><span class="eyebrow">${esc(p.type)}</span><h3><a href="${esc(p.file)}">${esc(p.title)}</a></h3><p>${esc(p.summary)}</p><span class="chip">/${esc(p.file)}</span></article>`).join('');
  }
  function renderArchive(data){
    const root = $('[data-render="archive"]'); if(!root) return;
    const covers = [
      {
        issue: 'Issue 1',
        title: 'Running Late Dynasty CFB 27',
        date: 'Summer 2025',
        image: 'assets/images/running-late-dynasty-issue-1.png',
        detail: 'Original index splash cover for the CFB 27 launch issue.'
      }
    ];
    root.innerHTML = `<div class="splash-archive-grid">${covers.map(c=>`
      <article class="splash-archive-card reveal">
        <a class="splash-archive-card__media" href="${esc(c.image)}" target="_blank" rel="noopener">
          <img src="${esc(c.image)}" alt="${esc(c.title)} ${esc(c.issue)} splash cover">
        </a>
        <div class="splash-archive-card__body">
          <span class="eyebrow">${esc(c.issue)}</span>
          <h2>${esc(c.title)}</h2>
          <p>${esc(c.detail)}</p>
          <span class="chip chip--gold">${esc(c.date)}</span>
        </div>
      </article>`).join('')}</div>`;
  }
  function renderLegacy(data){
    const root = $('[data-render="legacy"]'); if(!root) return;
    const legacy = data.legacy || {};
    root.innerHTML = `
      <article class="glass-card reveal"><h3>CFB 26 Roots</h3><p>${esc((legacy.culture_notes||[])[0]||'')}</p><div class="chip-row">${(legacy.cfb26_user_programs||[]).map(t=>`<span class="chip">${esc(t)}</span>`).join('')}</div></article>
      <article class="glass-card reveal"><h3>Carryover Programs</h3><p>${esc(legacy.carryover_programs?.length || 0)} programs appear on both the legacy CFB 26 list and the CFB 27 active member board.</p><div class="chip-row">${(legacy.carryover_programs||[]).map(t=>`<span class="chip chip--gold">${esc(t)}</span>`).join('')}</div></article>
      <article class="glass-card reveal"><h3>New CFB 27 Active Programs</h3><p>Fresh names on the current board compared with the saved CFB 26 list.</p><div class="chip-row">${(legacy.new_cfb27_claims_vs_legacy_list||[]).map(t=>`<span class="chip">${esc(t)}</span>`).join('')}</div></article>`;
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
        <button type="button" class="audio-player__minimize" data-audio-minimize title="Hide player" aria-label="Hide music player" aria-expanded="true"><span data-audio-minimize-icon>&#10094;</span></button>
      </div>`;
    document.body.appendChild(player);
    const audio = new Audio();
    audio.preload = 'metadata';
    const title = $('[data-audio-title]', player);
    const time = $('[data-audio-time]', player);
    const play = $('[data-audio-play]', player);
    const restart = $('[data-audio-restart]', player);
    const next = $('[data-audio-next]', player);
    const minimize = $('[data-audio-minimize]', player);
    const minimizeIcon = $('[data-audio-minimize-icon]', player);
    const setMinimized = (minimized, persist=true) => {
      player.classList.toggle('audio-player--minimized', minimized);
      minimize.title = minimized ? 'Show player' : 'Hide player';
      minimize.setAttribute('aria-label', minimized ? 'Show music player' : 'Hide music player');
      minimize.setAttribute('aria-expanded', String(!minimized));
      minimizeIcon.innerHTML = minimized ? '&#10095;' : '&#10094;';
      if(persist){
        try { localStorage.setItem('rldAudioMinimized', minimized ? '1' : '0'); } catch(e) {}
      }
    };
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
    minimize.addEventListener('click', () => setMinimized(!player.classList.contains('audio-player--minimized')));
    audio.addEventListener('loadedmetadata', syncTime);
    audio.addEventListener('durationchange', syncTime);
    audio.addEventListener('timeupdate', syncTime);
    audio.addEventListener('play', syncPlay);
    audio.addEventListener('pause', syncPlay);
    audio.addEventListener('ended', () => { index = (index + 1) % AUDIO_TRACKS.length; loadTrack(true); });
    try { setMinimized(localStorage.getItem('rldAudioMinimized') === '1', false); } catch(e) {}
    loadTrack(false);
  }
  function wireMobileBottomNav(){
    if($('.mobile-bottom-nav')) return;
    const page = document.body.dataset.page || '';
    let activePage = page;
    if(page === 'team-schedules') activePage = 'schedule';
    if(['teamhub','teams','coaches'].includes(page)) activePage = 'teams';
    const items = [
      ['hub','hub.html','&#127968;','Hub'],
      ['schedule','schedule.html','&#128197;','Schedule'],
      ['teams','teams.html','&#127944;','Teams'],
      ['updates','updates.html','&#128293;','Updates'],
      ['discord',DISCORD,'&#128172;','Discord']
    ];
    const nav = document.createElement('nav');
    nav.className = 'mobile-bottom-nav';
    nav.setAttribute('aria-label','Mobile navigation');
    nav.innerHTML = items.map(([key,href,icon,label]) => `<a class="${activePage===key?'is-active':''}" href="${href}" ${key==='discord'?'target="_blank" rel="noopener"':''}><span>${icon}</span><b>${label}</b></a>`).join('');
    document.body.appendChild(nav);
  }
  function observe(){
    const items = $$('.reveal:not(.is-visible)');
    if(!('IntersectionObserver' in window)){ items.forEach(x=>x.classList.add('is-visible')); return; }
    const io = new IntersectionObserver(entries => entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); }}), {threshold:.08});
    items.forEach(x=>io.observe(x));
  }
  function linkTeamMentions(data, root=document.body){
    if(!root || !['hub','schedule'].includes(document.body.dataset.page || '')) return;
    const teams = (data.teams || []).filter(t => t.school).slice().sort((a,b) => b.school.length - a.school.length);
    if(!teams.length) return;
    const byName = new Map(teams.map(t => [String(t.school).toLowerCase(), t]));
    const skipSelector = 'a,script,style,textarea,input,select,option,.audio-player,.available-card,.ai-controlled-teams';
    const escaped = teams.map(t => String(t.school).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const rx = new RegExp(`\\b(?:${escaped.join('|')})\\b`, 'gi');
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node){
        const parent = node.parentElement;
        if(!parent || parent.closest(skipSelector)) return NodeFilter.FILTER_REJECT;
        rx.lastIndex = 0;
        return rx.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      rx.lastIndex = 0;
      const text = node.nodeValue;
      const frag = document.createDocumentFragment();
      let last = 0, match;
      while((match = rx.exec(text))){
        if(match.index > last) frag.append(document.createTextNode(text.slice(last, match.index)));
        const team = byName.get(match[0].toLowerCase());
        const a = document.createElement('a');
        a.className = 'team-mention-link';
        a.href = `teams.html#hub-team-${slug(team?.school || match[0])}`;
        a.style.setProperty('--team-primary', team?.primary || '#bf5700');
        a.style.setProperty('--team-accent', team?.accent || '#7a3300');
        a.textContent = match[0];
        frag.append(a);
        last = match.index + match[0].length;
      }
      if(last < text.length) frag.append(document.createTextNode(text.slice(last)));
      node.replaceWith(frag);
    });
  }
  function wireNav(){
    const btn = $('.menu-toggle'), nav = $('#site-nav');
    btn?.addEventListener('click',()=>{ const open=nav.classList.toggle('is-open'); btn.setAttribute('aria-expanded', open?'true':'false'); });
  }
  function wireSplash(){
    if(document.body.dataset.page !== 'splash') return;
    const noAuto = new URLSearchParams(location.search).has('noauto');
    let seconds = 30;
    const count = $('#countdown');
    if(noAuto){ if(count) count.textContent='manual'; return; }
    const interval = setInterval(()=>{ seconds--; if(count) count.textContent = seconds; if(seconds<=0) clearInterval(interval); }, 1000);
    setTimeout(()=>{ location.href='hub.html'; }, 30200);
  }
  async function init(){
    wireNav(); wireMobileBottomNav(); mountAudioPlayer(); wireSplash();
    const data = await loadData();
    renderStats(data); renderScorebug(data); renderStatusText(data); renderCoverLines(data); renderHeadlines(data); renderSignals(data); renderWatchlist(data); renderFeaturedGames(data); renderUpdateGuide(data);
    renderSettings(data); renderLeagueHealth(data); renderOpenTeams(data); renderConferenceCards(data); renderTimeline(data); renderTeams(data); renderTeamHub(data); renderCoachCards(data); renderSchedule(data); renderTeamSchedules(data); renderRules(data); renderTopGames(data); renderSitemap(data); renderArchive(data); renderLegacy(data);
    linkTeamMentions(data);
    observe();
  }
  document.addEventListener('DOMContentLoaded', init);
})();

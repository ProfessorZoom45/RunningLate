(function(){
  const DISCORD = 'https://discord.gg/8sXA2RQPnm';
  const LIVE_SHEET_ID = '1y1H-IfZk5Ry1A91-CuiSP2TdHBy_vMHp7-eEfF4BPXQ';
  const LIVE_API_URL = String(window.RUNNING_LATE_LIVE_API_URL || '').trim();
  const LIVE_SHEET_TABS = Object.freeze({
    dashboard:'Dashboard',
    results:'Game Results',
    gotw:'GOTW History',
    standings:'Standings',
    coaches:'Coach Records',
    poll:'TOP-25 Poll'
  });
  const POLL_CHANNEL = 'https://discord.com/channels/1382826467683205180/1407980310158905448';
  const RUNNING_LATE_FEED = {
    recentUserGames: [
      { winner:'Florida State', winnerScore:31, loser:'SMU', loserScore:27, label:'Week 1 GOTW' },
      { winner:'LSU', winnerScore:14, loser:'Clemson', loserScore:3, label:'Week 1 result' }
    ],
    pollLabel:'Week 3 Media Top-25 Poll',
    top25: [
      { rank:1, team:'Texas Longhorns', user:'jrob9179' },
      { rank:2, team:'Oregon', user:'rainey84480' },
      { rank:3, team:'Notre Dame', user:'malepatternballedness' },
      { rank:4, team:'Georgia', user:'mikecmd_856' },
      { rank:5, team:'Indiana', user:'grinch_is_here' },
      { rank:6, team:'Miami', user:'lakedogg32' },
      { rank:7, team:'Texas A&M', user:'selfmadezay.' },
      { rank:8, team:'Ole Miss', user:'grody365' },
      { rank:9, team:'Oklahoma', user:'tweetybirrrd' },
      { rank:10, team:'LSU', user:'bignutt195' },
      { rank:11, team:'BYU', user:'Zo0o_0oM' },
      { rank:12, team:'Alabama', user:'charlesmullins412' },
      { rank:13, team:'Ohio State', user:'zig8875' },
      { rank:14, team:'USC', user:'mrrolltide' },
      { rank:15, team:'Texas Tech', user:'lifesgood0688' },
      { rank:16, team:'Penn State', user:'ulost2sway' },
      { rank:17, team:'Utah', user:'CPU' },
      { rank:18, team:'Tennessee', user:'cmledet969829' },
      { rank:19, team:'Houston', user:'marjaan_' },
      { rank:20, team:'Washington', user:'hoezay_hndrxx' },
      { rank:21, team:'Florida', user:'taybby0814' },
      { rank:22, team:'Missouri', user:'CPU' },
      { rank:23, team:'Michigan', user:'grap.12_58536' },
      { rank:24, team:'TCU', user:'john5564415' },
      { rank:25, team:'South Carolina', user:'cmledet97' }
    ]
  };
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
      state.data = window.RLD_DATA || {teams:[],schedule:[],timeline:[],settings:[],derived:{},dashboard:{}};
    }
    return state.data;
  }
  function sheetCellValue(cell){
    if(!cell) return '';
    return String(cell.f ?? cell.v ?? '').trim();
  }
  function siteApiPayload(data){
    if(!data?.ok || !Array.isArray(data.values)) throw new Error(data?.error || 'Website data feed returned an invalid response.');
    return {
      status:'ok',
      updatedAt:data.updatedAt || '',
      table:{
        cols:[],
        rows:data.values.map(row => ({c:(row || []).map(value => ({v:value}))}))
      }
    };
  }
  async function requestLiveApiSheet(sheetName){
    const url = new URL(LIVE_API_URL);
    url.searchParams.set('api','site');
    url.searchParams.set('sheet',sheetName);
    url.searchParams.set('_',Date.now());
    const response = await fetch(url, {cache:'no-store', redirect:'follow'});
    if(!response.ok) throw new Error(`Website data feed returned HTTP ${response.status}.`);
    return siteApiPayload(await response.json());
  }
  function requestVisualizationSheet(sheetName){
    return new Promise((resolve, reject) => {
      const callbackName = `runningLateSheet_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const script = document.createElement('script');
      let settled = false;
      const finish = (fn, value) => {
        if(settled) return;
        settled = true;
        clearTimeout(timer);
        script.remove();
        try{ delete window[callbackName]; }catch(_){ window[callbackName] = undefined; }
        fn(value);
      };
      window[callbackName] = payload => payload?.status === 'ok'
        ? finish(resolve, payload)
        : finish(reject, new Error('Spreadsheet returned a non-OK response.'));
      script.onerror = () => finish(reject, new Error('Spreadsheet script could not be loaded.'));
      script.src = `https://docs.google.com/spreadsheets/d/${LIVE_SHEET_ID}/gviz/tq?sheet=${encodeURIComponent(sheetName)}&tqx=responseHandler:${callbackName}&_=${Date.now()}`;
      const timer = setTimeout(() => finish(reject, new Error('Spreadsheet request timed out.')), 8000);
      document.head.append(script);
    });
  }
  function requestLiveSheet(sheetName){
    return LIVE_API_URL ? requestLiveApiSheet(sheetName) : requestVisualizationSheet(sheetName);
  }
  async function loadLiveSheet(sheetName){
    let lastError;
    for(let attempt=0; attempt<2; attempt++){
      try{ return await requestLiveSheet(sheetName); }
      catch(error){
        lastError = error;
        if(attempt === 0) await new Promise(resolve => setTimeout(resolve, 350));
      }
    }
    throw new Error(`${sheetName} could not be refreshed from the league spreadsheet.`, {cause:lastError});
  }
  async function liveDashboardStatus(){
    const payload = await loadLiveSheet(LIVE_SHEET_TABS.dashboard);
    const rows = (payload.table?.rows || []).map(row => (row.c || []).map(sheetCellValue));
    const compact = value => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
    const seasonRow = rows.find(row => compact(row[0]) === 'seasonyear') || [];
    const readinessRow = rows.find(row => compact(row[0]) === 'advancereadinessuserchecklist') || [];
    const contextRow = rows.find(row => compact(row[0]) === 'currentweekuserreadycpuresults') || [];
    const context = contextRow.find((value, index) => index > 0 && value) || '';
    const contextMatch = context.match(/Season\s+(.+?)\s*\|\s*(Week\s+[^|]+)/i);
    const seasonLabel = contextMatch?.[1]?.trim() || seasonRow[1] || '';
    const dynastyYear = seasonRow[3] || '';
    const season = seasonLabel && dynastyYear && !seasonLabel.includes(dynastyYear) ? `${seasonLabel} (${dynastyYear})` : seasonLabel;
    const labelValue = (row, label) => {
      const index = row.findIndex(value => compact(value) === compact(label));
      return index >= 0 ? row[index + 1] || '' : '';
    };
    const week = contextMatch?.[2]?.trim() || labelValue(seasonRow, 'Current Week');
    const nextAdvance = labelValue(seasonRow, 'Advance Deadline');
    const readyUsers = Number(labelValue(readinessRow, 'Ready Users')) || 0;
    const activeUsers = Number(labelValue(readinessRow, 'Active Users')) || 0;
    const readiness = labelValue(readinessRow, 'Readiness %');
    if(!season || !week) throw new Error('Live season or week was not found on the Dashboard tab.');
    return {season, week, nextAdvance, readyUsers, activeUsers, readiness};
  }

  function applyLiveDashboardData(data, status, games, poll){
    if(!status) return;
    data.dashboard ||= {};
    data.dashboard.status ||= {};
    data.dashboard.status.currentWeek = status.week;
    data.dashboard.status.nextAdvance = status.nextAdvance || data.dashboard.status.nextAdvance;
    const scorebar = data.dashboard.scorebar ||= [];
    const setScore = (label, value) => {
      const item = scorebar.find(entry => entry.label === label);
      if(item) item.value = value;
      else scorebar.push({label, value});
    };
    if(status.activeUsers) setScore('Users Ready', `${status.readyUsers}/${status.activeUsers}`);
    const weekThreeGotw = games.find(game => /florida state/i.test(game.winner) && /alabama/i.test(`${game.away} ${game.home}`));
    const weekTwoGotw = games.find(game => game.week === 'Week 2' && /texas/i.test(game.winner) && /ohio state/i.test(`${game.away} ${game.home}`));
    const top = poll?.entries?.[0];
    const headlines = [];
    const gotwScore = weekThreeGotw
      ? (/florida state/i.test(weekThreeGotw.away) ? `${weekThreeGotw.awayScore}-${weekThreeGotw.homeScore}` : `${weekThreeGotw.homeScore}-${weekThreeGotw.awayScore}`)
      : '';
    headlines.push({
      kicker:`${status.week.toUpperCase()} GOTW FINAL`,
      title:'Florida State defeats Alabama in the Game of the Week',
      summary:`The Seminoles earned the Week 3 showcase win over Alabama${gotwScore ? `, ${gotwScore}` : ''}.`,
      href:'results.html', cta:'View Results'
    });
    headlines.push({
      kicker:'WEEK 2 GOTW WINNER',
      title:'🎉 Congratulations to jrob9179 (Texas)',
      summary:weekTwoGotw
        ? `Texas defeated Ohio State ${weekTwoGotw.homeScore}-${weekTwoGotw.awayScore} to win the Week 2 Game of the Week.`
        : 'Congratulations to jrob9179 and Texas on winning the Week 2 Game of the Week!',
      href:'results.html', cta:'View Results'
    });
    if(top) headlines.push({
      kicker:`${poll.week || status.week} TOP-25`,
      title:`${top.team} holds the No. 1 ranking`,
      summary:`The live ${poll.pollType || 'Media'} poll lists ${top.team} at No. 1 with ${top.points || '—'} points and a ${top.record || 'current'} record.`,
      href:'teams.html#top-25', cta:'View Top 25'
    });
    if(status.activeUsers) headlines.push({
      kicker:'ADVANCE READINESS',
      title:`${status.readyUsers} of ${status.activeUsers} users are ready`,
      summary:`The live checklist is ${status.readiness || Math.round(status.readyUsers/status.activeUsers*100)+'%'} complete. Next advance: ${status.nextAdvance || 'TBD'}.`,
      href:'hub.html', cta:'League Status'
    });
    if(headlines.length) data.dashboard.headlines = headlines;
  }
  async function liveGotwInfo(){
    const payload = await loadLiveSheet('Game of the Week');
    const rows = (payload.table?.rows || []).map(row => (row.c || []).map(sheetCellValue));
    const compact = value => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
    const settings = new Map();
    rows.slice(0,40).forEach(row => { if(row[0] && row[1]) settings.set(compact(row[0]), row[1]); });
    const get = (name, fallback='PENDING') => settings.get(compact(name)) || fallback;
    const awayTeam = get('Away Team'), homeTeam = get('Home Team');
    const summary = {away:0, home:0};
    rows.slice(0,12).forEach(row => {
      const side = compact(row[4]), team = compact(row[5]);
      if(side === 'away' && team === compact(awayTeam)) summary.away = Number(row[6]) || 0;
      if(side === 'home' && team === compact(homeTeam)) summary.home = Number(row[6]) || 0;
    });
    if(compact(awayTeam) === 'pending' || compact(homeTeam) === 'pending') throw new Error('Active GOTW teams were not found.');
    return {
      gotwId:get('GOTW ID'), displayWeek:get('Week'), awayTeam, homeTeam,
      awayUser:get('Away User'), homeUser:get('Home User'), awayRank:get('Away Rank',''), homeRank:get('Home Rank',''),
      awayRecord:get('Away Record'), homeRecord:get('Home Record'), nominationStatus:get('Candidate Poll Status'),
      predictionStatus:get('Prediction Poll Status'), pollOpenedAt:get('Prediction Poll Opens'),
      pollClosedAt:get('Prediction Poll Closes'), pollUrl:get('Prediction Poll URL',''), notes:get('Notes',''),
      awayVotes:summary.away, homeVotes:summary.home, totalVotes:summary.away + summary.home
    };
  }
  async function liveTop25Poll(){
    const payload = await loadLiveSheet(LIVE_SHEET_TABS.poll);
    const rows = (payload.table?.rows || []).map(row => (row.c || []).map(sheetCellValue));
    const compact = value => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
    const sheetHeaders = (payload.table?.cols || []).map(column => compact(column.label));
    const headerIndex = rows.findIndex(row => {
      const cells = row.map(compact);
      return cells.includes('season') && cells.includes('polltype') && cells.includes('rank') && cells.includes('team');
    });
    const headers = sheetHeaders.includes('team') && sheetHeaders.includes('season')
      ? sheetHeaders
      : headerIndex >= 0 ? rows[headerIndex].map(compact) : [];
    const dataRows = sheetHeaders.includes('team') && sheetHeaders.includes('season') ? rows : rows.slice(headerIndex + 1);
    if(!headers.length) throw new Error('TOP-25 Poll headers were not found.');
    const col = name => headers.indexOf(compact(name));
    const value = (row, name) => col(name) >= 0 ? row[col(name)] : '';
    const entries = dataRows.map(row => ({
      season: row[col('Season')] || '',
      week: row[col('Week')] || '',
      pollType: row[col('Poll Type')] || '',
      rank: Number(row[col('Rank')]),
      team: row[col('Team')] || '',
      userTeam: row[col('User Team?')] || '',
      userId: row[col('User ID')] || '',
      record: value(row,'W-L') || (value(row,'Wins') !== '' && value(row,'Losses') !== '' ? `${value(row,'Wins')}-${value(row,'Losses')}` : ''),
      points: row[col('Points')] || '',
      lastWeek: value(row,'Last Week') || value(row,"Last Week's Rank"),
      startingRank: value(row,'Starting Rank'),
      thisWeek: row[col('This Week')] || '',
      source: row[col('Source')] || ''
    })).filter(row => row.team && Number.isFinite(row.rank) && row.rank >= 1 && row.rank <= 25);
    if(!entries.length) return {season:'', week:'', pollType:'', entries:[]};
    const key = row => `${row.season}|${row.week}|${row.pollType}`;
    const groups = new Map();
    entries.forEach(row => {
      const group = groups.get(key(row)) || new Map();
      group.set(row.rank,row);
      groups.set(key(row),group);
    });
    const completeGroups = [...groups.entries()].filter(([,group]) => group.size >= 25);
    const [,byRank] = completeGroups.at(-1) || [...groups.entries()].at(-1);
    const latest = byRank.values().next().value;
    return {
      season: latest.season,
      week: latest.week,
      pollType: latest.pollType,
      entries: [...byRank.values()].sort((a,b) => a.rank - b.rank).slice(0,25)
    };
  }
  async function liveTeamRecords(){
    const [standingsPayload, coachPayload] = await Promise.all([
      loadLiveSheet(LIVE_SHEET_TABS.standings), loadLiveSheet(LIVE_SHEET_TABS.coaches)
    ]);
    const tableRows = payload => (payload.table?.rows || []).map(row => (row.c || []).map(sheetCellValue));
    const compact = value => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
    const parse = (payload, required) => {
      const rows = tableRows(payload);
      const labels = (payload.table?.cols || []).map(column => compact(column.label));
      const headerIndex = rows.findIndex(row => required.every(name => row.map(compact).includes(compact(name))));
      const headers = required.every(name => labels.includes(compact(name))) ? labels : headerIndex >= 0 ? rows[headerIndex].map(compact) : [];
      const dataRows = required.every(name => labels.includes(compact(name))) ? rows : rows.slice(headerIndex + 1);
      if(!headers.length) throw new Error(`Live headers were not found for ${required.join(', ')}.`);
      const col = name => headers.indexOf(compact(name));
      const value = (row, name) => col(name) >= 0 ? row[col(name)] : '';
      return {dataRows, value};
    };
    const standings = parse(standingsPayload, ['Team','User','W','L']);
    const coaches = parse(coachPayload, ['User','Current Team','Overall Wins','Overall Losses']);
    const records = new Map();
    standings.dataRows.forEach(row => {
      const user = standings.value(row,'User');
      if(!user) return;
      records.set(user.toLowerCase(), {
        team: standings.value(row,'Team'),
        teamRecord: `${standings.value(row,'W') || 0}-${standings.value(row,'L') || 0}`,
        currentRank: standings.value(row,'Current Rank')
      });
    });
    coaches.dataRows.forEach(row => {
      const user = coaches.value(row,'User');
      if(!user) return;
      const key = user.toLowerCase();
      const current = records.get(key) || {};
      records.set(key, {
        ...current,
        careerRecord: `${coaches.value(row,'Overall Wins') || 0}-${coaches.value(row,'Overall Losses') || 0}`,
        coachName: coaches.value(row,'Coach'),
        prestige: coaches.value(row,'Prestige'),
        levelArchetype: coaches.value(row,'Level & Archetype'),
        jobSecurity: coaches.value(row,'Job Security'),
        offScheme: coaches.value(row,'Off. Scheme'),
        defScheme: coaches.value(row,'Def. Scheme'),
        almaMater: coaches.value(row,'Alma Mater')
      });
    });
    return records;
  }
  function applyLiveTeamData(data, records, games){
    const normalizeUser = value => String(value || '').trim().toLowerCase();
    const latestFor = user => games.filter(game => normalizeUser(game.awayUser) === user || normalizeUser(game.homeUser) === user)
      .sort((a,b) => weekNumber(b.week) - weekNumber(a.week) || String(b.createdAt).localeCompare(String(a.createdAt)))[0];
    (data.teams || []).forEach(team => {
      const user = normalizeUser(team.coach);
      const live = records?.get(user);
      if(live) Object.assign(team, live);
      const game = latestFor(user);
      if(game){
        const away = normalizeUser(game.awayUser) === user;
        const teamScore = away ? game.awayScore : game.homeScore;
        const opponentScore = away ? game.homeScore : game.awayScore;
        const opponent = away ? game.home : game.away;
        team.lastGameResult = `${teamScore > opponentScore ? 'W' : 'L'} ${teamScore}-${opponentScore} vs ${opponent}`;
      }
    });
  }
  function gameResultRecap(game){
    const awayWon = game.winner.toLowerCase() === game.away.toLowerCase() || game.awayScore > game.homeScore;
    const winningTeam = awayWon ? game.away : game.home;
    const losingTeam = awayWon ? game.home : game.away;
    const winningUser = awayWon ? game.awayUser : game.homeUser;
    const winningScore = awayWon ? game.awayScore : game.homeScore;
    const losingScore = awayWon ? game.homeScore : game.awayScore;
    const margin = Math.abs(winningScore - losingScore);
    const verb = margin <= 3 ? 'survived' : margin <= 7 ? 'edged' : margin <= 14 ? 'beat' : margin <= 24 ? 'handled' : 'rolled past';
    const owner = game.isUser && winningUser && winningUser.toLowerCase() !== 'cpu' ? `${winningUser}'s ` : '';
    return `FINAL — ${owner}${winningTeam} ${verb} ${losingTeam}, ${winningScore}-${losingScore} (${game.week}, ${game.isUser ? 'USER vs USER' : 'USER vs CPU'}).`;
  }
  async function liveGameResults(){
    const resultsPayload = await loadLiveSheet(LIVE_SHEET_TABS.results);
    const [gotwHistoryResult] = await Promise.allSettled([loadLiveSheet(LIVE_SHEET_TABS.gotw)]);
    const gotwHistoryPayload = gotwHistoryResult.status === 'fulfilled' ? gotwHistoryResult.value : {table:{rows:[]}};
    const resultRows = (resultsPayload.table?.rows || []).map(row => (row.c || []).map(sheetCellValue));
    const gotwHistoryRows = (gotwHistoryPayload.table?.rows || []).map(row => (row.c || []).map(sheetCellValue));
    const humanUser = value => Boolean(String(value || '').trim()) && !/^(cpu|cpu team|computer|ai)$/i.test(String(value).trim());
    const classify = (gameType, awayUser, homeUser) => (/user/i.test(gameType) && !/cpu/i.test(gameType)) || (humanUser(awayUser) && humanUser(homeUser));
    const games = resultRows.map(row => {
      const awayUser = row[4] || '', homeUser = row[7] || '', gameType = row[2] || '';
      return {season:row[0]||'',week:row[1]||'Week ?',gameType,away:row[3]||'',awayUser,awayScore:Number(row[5]),home:row[6]||'',homeUser,homeScore:Number(row[8]),winner:row[9]||'',loser:row[10]||'',conference:row[11]||'',overtime:row[12]||'',notes:row[13]||'',createdAt:row[19]||'',isUser:classify(gameType,awayUser,homeUser)};
    }).concat(gotwHistoryRows.map(row => {
      const away = row[3] || '', home = row[5] || '', note = row[23] || '';
      const score = String(note).match(/Final:\s*(.+?)\s+(\d+),\s*(.+?)\s+(\d+)/i);
      const scoreFor = team => {
        if(!score) return NaN;
        const target=String(team).toLowerCase(), first=score[1].toLowerCase(), second=score[3].toLowerCase();
        if(target.startsWith(first)||first.startsWith(target)) return Number(score[2]);
        if(target.startsWith(second)||second.startsWith(target)) return Number(score[4]);
        return NaN;
      };
      return {season:row[1]||'',week:row[2]||'Week ?',gameType:'User vs User',away,awayUser:row[4]||'',awayScore:scoreFor(away),home,homeUser:row[6]||'',homeScore:scoreFor(home),winner:row[14]||'',loser:'',conference:'',overtime:'',notes:note,createdAt:row[21]||'',isUser:true};
    })).filter(game => game.away && game.home && Number.isFinite(game.awayScore) && Number.isFinite(game.homeScore));
    const byGame = new Map();
    games.forEach(game => { const key=`${game.season}|${game.week}|${game.away}|${game.home}`.toLowerCase(); if(!byGame.has(key)) byGame.set(key,game); });
    return [...byGame.values()].sort((a,b) => Number(b.isUser)-Number(a.isUser) || String(b.createdAt).localeCompare(String(a.createdAt)) || weekNumber(b.week)-weekNumber(a.week));
  }
  function renderLiveSeasonWeek(status){
    const text = status ? `${status.season} - Current Week: ${status.week}` : 'Year 1 (2026) - Current Week: Week 3';
    $$('[data-render="live-season-week"]').forEach(el => { el.textContent = text; });
  }
  function renderLiveGameResults(recaps){
    const fallback = RUNNING_LATE_FEED.recentUserGames.map(game => `${game.label}: ${game.winner} ${game.winnerScore}-${game.loserScore} ${game.loser}`);
    const items = recaps?.length ? recaps : fallback;
    $$('[data-render="live-game-results"]').forEach(el => {
      const frag=document.createDocumentFragment();
      items.forEach(recap => { const span=document.createElement('span'); span.className='ticker__result'; span.textContent=recap; frag.append(span); });
      el.replaceWith(frag);
    });
  }
  function renderGameResultsPage(games){
    const root = $('[data-render="game-results-page"]'); if(!root) return;
    const userGames=games.filter(game=>game.isUser), cpuGames=games.filter(game=>!game.isUser);
    $('[data-render="result-total"]')?.replaceChildren(document.createTextNode(String(games.length)));
    $('[data-render="result-user-total"]')?.replaceChildren(document.createTextNode(String(userGames.length)));
    $('[data-render="result-cpu-total"]')?.replaceChildren(document.createTextNode(String(cpuGames.length)));
    const gameCard = game => {
      const awayWon=game.winner.toLowerCase()===game.away.toLowerCase()||game.awayScore>game.homeScore;
      return `<article class="result-card reveal ${game.isUser?'result-card--user':''}"><div class="result-card__head"><span class="game-kind ${game.isUser?'':'game-kind--non'}">${game.isUser?'USER vs USER':'USER vs CPU'}</span><b>FINAL</b></div><div class="result-team ${awayWon?'is-winner':''}"><span><strong>${esc(game.away)}</strong><small>${esc(game.awayUser||'CPU')}</small></span><b>${game.awayScore}</b></div><div class="result-team ${awayWon?'':'is-winner'}"><span><strong>${esc(game.home)}</strong><small>${esc(game.homeUser||'CPU')}</small></span><b>${game.homeScore}</b></div><p class="result-recap">${esc(gameResultRecap(game))}</p></article>`;
    };
    const section=(title,subtitle,list)=>`<section class="result-section"><div class="result-section__head"><div><span class="eyebrow">${esc(subtitle)}</span><h2>${esc(title)}</h2></div><strong>${list.length} FINAL${list.length===1?'':'S'}</strong></div>${list.length?`<div class="result-grid">${list.map(gameCard).join('')}</div>`:'<div class="result-empty">No completed games are logged in this category yet.</div>'}</section>`;
    root.innerHTML=section('User vs User Results','Priority Results',userGames)+section('User vs CPU Results','All Other Finals',cpuGames);
  }
  function renderTop25Poll(data, poll, error){
    const root = $('[data-render="top-25-poll"]');
    if(!root) return;
    const pollTitle = $('[data-render="top25-title"]');
    const pollFreshness = $('[data-render="top25-freshness"]');
    if(error){
      root.innerHTML = '<div class="top25-state"><strong>Live poll temporarily unavailable.</strong><span>Refresh the page to try the spreadsheet again.</span></div>';
      return;
    }
    if(!poll?.entries?.length){
      root.innerHTML = '<div class="top25-state"><strong>No Top-25 poll has been posted yet.</strong><span>The board will populate automatically after the spreadsheet receives ranked rows.</span></div>';
      return;
    }
    if(pollTitle) pollTitle.textContent = `${poll.week || 'Current'} ${poll.pollType || 'Media'} Top-25 Poll`;
    if(pollFreshness) pollFreshness.textContent = 'Updated From Spreadsheet';
    const lookup = teamLookup(data);
    const movement = row => {
      const baseline = row.lastWeek && !/^[-—]+$/.test(String(row.lastWeek).trim()) ? row.lastWeek : row.startingRank;
      const previous = Number(String(baseline).replace(/[^0-9]/g,''));
      if(!Number.isFinite(previous) || previous <= 0) return 'NEW';
      const delta = previous - row.rank;
      return delta > 0 ? `▲ ${delta}` : delta < 0 ? `▼ ${Math.abs(delta)}` : '—';
    };
    root.innerHTML = `
      <div class="top25-meta"><span><b>Season</b>${esc(poll.season || 'Current')}</span><span><b>Week</b>${esc(poll.week || 'Current')}</span><span><b>Poll</b>${esc(poll.pollType || 'Top 25')}</span><span><b>Updated</b>Fresh on this visit</span></div>
      <div class="top25-board">${poll.entries.map(row => {
        const team = lookup[String(row.team).toLowerCase()];
        const colors = team ? ` style="--team-primary:${esc(team.primary)};--team-accent:${esc(team.accent)}"` : '';
        return `<article class="top25-row${row.rank <= 5 ? ' top25-row--elite' : ''}"${colors}>
          <strong class="top25-rank">${esc(row.rank)}</strong>
          <div class="top25-team">${teamLink(data,row.team,'team-link')}<small>${/^yes$/i.test(row.userTeam) ? 'User-controlled' : /^no$/i.test(row.userTeam) ? 'CPU team' : esc(row.userTeam || 'National poll')}</small></div>
          <span class="top25-record"><b>${esc(row.record || '—')}</b><small>Record</small></span>
          <span class="top25-points"><b>${esc(row.points || '—')}</b><small>Points</small></span>
          <span class="top25-move">${esc(movement(row))}</span>
        </article>`;
      }).join('')}</div>`;
  }
  function esc(v){ return String(v ?? '').replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s])); }
  function mountRunningLateFeed(feed = RUNNING_LATE_FEED){
    const ticker = $('.ticker');
    if(ticker){
      const label = $('.ticker__label', ticker);
      const track = $('.ticker__track', ticker);
      if(label){
        label.href = POLL_CHANNEL;
        label.target = '_blank';
        label.rel = 'noopener';
        label.setAttribute('aria-label','Open the Running Late Discord poll channel');
      }
      if(track){
        const games = feed.recentUserGames.map(game =>
          `<span><b>${esc(game.label)}:</b> ${esc(game.winner)} ${esc(game.winnerScore)}–${esc(game.loserScore)} ${esc(game.loser)}</span>`
        ).join('');
        const ranked = feed.top25.map(entry =>
          `<span class="ticker-rank"><b>#${esc(entry.rank)} ${esc(entry.team)}</b> — ${esc(entry.user)}</span>`
        ).join('');
        track.innerHTML = `<span data-render="live-game-results">Loading latest game results...</span><span data-render="live-season-week">Loading live season...</span><span class="ticker-poll-label"><a href="teams.html#top-25">${esc(feed.pollLabel)} • Updated From Spreadsheet</a></span>${ranked}<span class="ticker-poll"><a href="${POLL_CHANNEL}" target="_blank" rel="noopener">Vote &amp; follow official polls in the Discord Poll Channel</a></span>${games}`;
      }
    }

    const board = $('[data-render="running-late-feed"]');
    if(!board) return;
    board.innerHTML = `
      <article class="feed-card feed-card--poll">
        <span class="eyebrow">Official Discord Polls</span>
        <h2>League voting lives in the Poll Channel</h2>
        <p>Open nominations, GOTW selections, prediction polls, and official poll results from one direct channel.</p>
        <a class="btn btn--red" href="${POLL_CHANNEL}" target="_blank" rel="noopener">Open Poll Channel</a>
      </article>
      <article class="feed-card">
        <span class="eyebrow">Recent User vs. User Results</span>
        <div class="feed-results">${feed.recentUserGames.map(game => `
          <div><small>${esc(game.label)}</small><strong>${esc(game.winner)} ${esc(game.winnerScore)}–${esc(game.loserScore)} ${esc(game.loser)}</strong></div>`).join('')}</div>
      </article>
      <article class="feed-card feed-card--rankings">
        <span class="eyebrow">${esc(feed.pollLabel)}</span>
        <ol>${feed.top25.map(entry => `
          <li><b>#${esc(entry.rank)}</b><span><strong>${esc(entry.team)}</strong><small>${esc(entry.user)}</small></span></li>`).join('')}</ol>
      </article>`;
  }
  function liveFeed(games, poll, data){
    const recentUserGames = games.filter(game => game.isUser).slice(0,2).map(game => {
      const awayWon = game.awayScore > game.homeScore;
      return {winner:awayWon ? game.away : game.home,winnerScore:awayWon ? game.awayScore : game.homeScore,loser:awayWon ? game.home : game.away,loserScore:awayWon ? game.homeScore : game.awayScore,label:`${game.week} final`};
    });
    const lookup = teamLookup(data);
    const top25 = (poll?.entries || []).slice(0,25).map(entry => ({rank:entry.rank,team:entry.team,user:/^no$/i.test(entry.userTeam) ? 'CPU' : lookup[String(entry.team).toLowerCase()]?.coach || entry.userId || 'User team'}));
    const pollLabel = poll?.entries?.length ? `${poll.week || 'Current'} ${poll.pollType || 'Media'} Top-25 Poll` : RUNNING_LATE_FEED.pollLabel;
    return {recentUserGames:recentUserGames.length ? recentUserGames : RUNNING_LATE_FEED.recentUserGames,pollLabel,top25:top25.length ? top25 : RUNNING_LATE_FEED.top25};
  }
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
  function renderStatusText(data, liveStatus){
    const s = data.dashboard?.status || {};
    const set = (sel,val) => { const el=$(sel); if(el) el.textContent = val || ''; };
    set('[data-render="status-label"]', s.leagueState || 'LIVE');
    set('[data-render="current-week"]', liveStatus?.week || s.currentWeek || 'Week TBD');
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
    root.innerHTML = headlines.map((h,i)=>`<article class="headline-card ${i===0?'headline-card--main':i===1?'headline-card--celebration':''}"><span>${esc(h.kicker)}</span><h2>${esc(h.title)}</h2><p>${esc(h.summary)}</p><a href="${esc(h.href||'hub.html')}">${esc(h.cta||'Open')}</a></article>`).join('');
  }
  function statusCardMarkup(s, i, compact=false){
    return `<article class="status-card status-card--${esc(s.tone||'gold')} ${compact?'status-card--compact':''}">
      <div><span>${esc(s.label)}</span><strong>${esc(s.value)}</strong></div>
      <b>${esc(s.status)}</b>
      <p>${esc(s.detail)}</p>
    </article>`;
  }
  function renderStatusCards(data){
    const all = data.dashboard?.statusCards || [];
    const cards = $('[data-render="status-cards"]');
    if(cards) cards.innerHTML = all.map((s,i)=>statusCardMarkup(s,i,false)).join('');
  }
  function renderGotwPreview(data){
    const root = $('[data-render="gotw-preview"]'), g = data.gotw;
    if(!root || !g) return;
    const rank = value => value && !/^pending$/i.test(String(value)) ? `#${esc(value)} ` : '';
    const predictionVotes = Number(g.totalVotes || 0) > 0
      ? `${esc(g.awayTeam)} ${esc(g.awayVotes || 0)}–${esc(g.homeVotes || 0)} ${esc(g.homeTeam)}`
      : 'Individual predictions are pending';
    const pollHref = g.pollUrl || 'https://discord.com/channels/1382826467683205180/1407980310158905448';
    root.innerHTML = `
      <div class="gotw-preview__head">
        <div><span class="eyebrow">${esc(g.displayWeek)} Preview</span><h2 id="gotw-preview-title">${esc(g.gotwId)}</h2><p>The league is currently in <strong>${esc(g.leagueCurrentWeek)}</strong>. This matchup is loaded directly from the live dynasty spreadsheet.</p></div>
        <div class="gotw-status"><b>${esc(g.nominationStatus || 'Matchup Active')}</b><span>Prediction status: ${esc(g.predictionStatus || 'Pending')}</span></div>
      </div>
      <div class="gotw-matchup" aria-label="Active Game of the Week matchup">
        <div><span class="gotw-rank">${rank(g.awayRank)}</span><strong>${esc(g.awayTeam)}</strong><small>${esc(g.awayUser || 'Away')} · ${esc(g.awayRecord || '')}</small></div>
        <span class="gotw-at">at</span>
        <div><span class="gotw-rank">${rank(g.homeRank)}</span><strong>${esc(g.homeTeam)}</strong><small>${esc(g.homeUser || 'Home')} · ${esc(g.homeRecord || '')}</small></div>
      </div>
      <p class="gotw-result"><strong>Active matchup:</strong> ${rank(g.awayRank)}${esc(g.awayTeam)} at ${rank(g.homeRank)}${esc(g.homeTeam)}. <b>${predictionVotes}</b>.</p>
      <div class="gotw-details">
        <span><b>Away Predictions</b>${esc(g.awayVotes || 0)}</span>
        <span><b>Home Predictions</b>${esc(g.homeVotes || 0)}</span>
        <span><b>Nomination</b>${esc(g.nominationStatus || 'Pending')}</span>
        <span><b>Prediction</b>${esc(g.predictionStatus || 'Pending')}</span>
      </div>
      <div class="gotw-poll-meta"><span>Opened: ${esc(g.pollOpenedAt || 'Pending')}</span><span>Closes: ${esc(g.pollClosesAt || g.pollClosedAt || 'Pending')}</span><a class="btn" href="${esc(pollHref)}" target="_blank" rel="noopener noreferrer">Open GOTW poll channel</a></div>`;
  }
  function renderCommandDocs(data){
    const root = $('[data-render="command-docs"]'), docs = data.discordCommands;
    if(!root || !docs) return;
    const commandChips = commands => commands.map(c=>`<code>${esc(c)}</code>`).join(' ');
    root.innerHTML = `
      <div class="glass-card"><h3>Rankings</h3><p class="command-names">${commandChips(docs.ranks.commands)}</p><p>${esc(docs.ranks.description)}</p><ol class="command-example">${docs.ranks.example.map(line=>`<li>${esc(line.replace(/^\d+\.\s*/,''))}</li>`).join('')}</ol><p>${esc(docs.ranks.note)}</p><p><strong>${esc(docs.ranks.omissionNotice)}</strong></p></div>
      <div class="glass-card"><h3>Game of the Week</h3><p class="command-names">${commandChips(docs.gotw.commands)}</p><p>${esc(docs.gotw.description)}</p></div>`;
  }
  function renderWatchlist(data){
    const root = $('[data-render="watchlist"]'); if(!root) return;
    root.innerHTML = (data.dashboard?.watchlist || []).map(x=>`<article class="watch-card"><b>${esc(x.rank)}</b><div><h3>${esc(x.title)}</h3><p>${esc(x.detail)}</p></div></article>`).join('');
  }
  function renderFeaturedGames(data){
    const root = $('[data-render="featured-games"]'); if(!root) return;
    const weeks = byWeek(data.schedule || []);
    const orderedWeeks = Object.keys(weeks).sort((a,b)=>weekNumber(a)-weekNumber(b));
    const currentWeek = data.season?.currentWeek;
    const week = weeks[currentWeek] ? currentWeek : orderedWeeks[0] || 'Week 1';
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
  function renderLeagueHealth(completedUserGames=0){
    const root = $('[data-render="league-health"]'); if(!root) return;
    root.innerHTML = HEALTH_METRICS.map(([label,value,detail], index) => `
      <article class="health-card reveal">
        <span>${esc(label)}</span>
        <strong>${esc(index === 0 ? `${completedUserGames}/83` : value)}</strong>
        <p>${esc(detail)}</p>
      </article>`).join('');
  }
  function renderOpenTeams(data){
    const root = $('[data-render="open-teams"]'); if(!root) return;
    const groups = AVAILABLE_TEAMS.slice().sort((a,b) => a[0].localeCompare(b[0]));
    root.innerHTML = `
      <div class="panel-header">
        <div><span class="eyebrow">Open Teams / Waitlist</span><h2>Available CPU Teams</h2><p>Programs currently available to replacement users.</p></div>
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
              <div class="team-hub-card__meta">${conferenceBadge(t.conference)}<span><b>Record:</b> ${esc(pendingValue(t.teamRecord, '0-0'))}</span><span><b>GT:</b> ${esc(dynastyGamertag(t))}</span><span><b>Platform:</b> ${esc(dynastyPlatform(t))}</span><span><b>Next User Game:</b> ${esc(nextGameForTeam(data,t.school))}</span></div>
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
    if(scheduleTotal) scheduleTotal.textContent = (data.schedule || []).length;
    const render = () => {
      const q = (search?.value || '').toLowerCase().trim();
      const wf = weekFilter?.value || 'All';
      const games = (data.schedule || []).filter(g => (wf==='All'||g.week===wf) && gameSearchText(g,data).includes(q));
      const groups = byWeek(games);
      const ordered = Object.keys(groups).sort((a,b)=>weekNumber(a)-weekNumber(b));
      const jumper = ordered.length > 1 ? `<nav class="section-jumper" aria-label="Schedule sections">${ordered.map(w=>`<a href="#schedule-${slug(w)}">${esc(w.replace('Week ','W'))} <span>${groups[w].length}</span></a>`).join('')}</nav>` : '';
      const result = q ? `<p class="finder-result">${games.length ? `${games.length} game${games.length===1?'':'s'} found.` : 'No games match that filter.'}</p>` : '';
      root.innerHTML = result + jumper + (ordered.map(w => `
        <section id="schedule-${slug(w)}" class="week-block reveal"><div class="week-head"><h3>${esc(w)}</h3><span class="chip chip--gold">${groups[w].length} games</span></div>
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
    const gameType = g.isUser ? 'USER vs USER' : 'USER vs CPU';
    const kindClass = g.isUser ? 'game-kind--conference' : 'game-kind--non';
    return `<article class="match-card ${g.conference ? 'match-card--conference' : 'match-card--non'}">
      <div class="match-card__body">
        <small class="game-kind ${kindClass}">${esc(gameType)}${g.status === 'Final' ? ' • FINAL' : ''}</small>
        <div class="match-card__teams">
          ${teamLink(data,g.away,'team-link team-link--away')}
          <span>${g.neutral?'VS':'@'}</span>
          ${teamLink(data,g.home,'team-link team-link--home')}
        </div>
        ${g.venue?`<small class="match-card__venue">${esc(g.venue)}</small>`:''}
        <small class="match-card__coaches">${esc(g.away)}: ${esc(g.awayUser || awayCoach || 'CPU')} | ${esc(g.home)}: ${esc(g.homeUser || homeCoach || 'CPU')}</small>
        ${g.status === 'Final' && Number.isFinite(g.awayScore) && Number.isFinite(g.homeScore) ? `<strong class="match-card__score">FINAL — ${esc(g.away)} ${g.awayScore}, ${esc(g.home)} ${g.homeScore}</strong>` : ''}
      </div>
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
            <small>No Games Listed</small>
            <b>No current matchup</b>
            <small>The live schedule does not list a game for this team.</small>
          </div>
          <span class="chip">—</span>
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
      ['results','results.html','&#127942;','Results'],
      ['updates','updates.html','&#128293;','Updates'],
      ['teams','teams.html','&#127944;','Teams'],
      ['discord',DISCORD,'&#128172;','Discord']
    ];
    const nav = document.createElement('nav');
    nav.className = 'mobile-bottom-nav';
    nav.setAttribute('aria-label','Mobile navigation');
    nav.innerHTML = items.map(([key,href,icon,label]) => `<a class="${activePage===key?'is-active':''}" href="${href}" ${key==='discord'?'target="_blank" rel="noopener"':''}><span>${icon}</span><b>${label}</b></a>`).join('') + '<button type="button" class="mobile-overlay-toggle" aria-pressed="false"><span>&#10005;</span><b>Hide</b></button>';
    document.body.appendChild(nav);
    const toggle = $('.mobile-overlay-toggle', nav);
    const setOverlaysHidden = hidden => {
      document.body.classList.toggle('mobile-overlays-hidden', hidden);
      toggle.setAttribute('aria-pressed', hidden ? 'true' : 'false');
      toggle.querySelector('span').innerHTML = hidden ? '&#8634;' : '&#10005;';
      toggle.querySelector('b').textContent = hidden ? 'Show' : 'Hide';
      try { localStorage.setItem('rldMobileOverlaysHidden', hidden ? '1' : '0'); } catch(e) {}
    };
    let hidden = false;
    try { hidden = localStorage.getItem('rldMobileOverlaysHidden') === '1'; } catch(e) {}
    setOverlaysHidden(hidden);
    toggle.addEventListener('click', () => setOverlaysHidden(!document.body.classList.contains('mobile-overlays-hidden')));
  }
  function observe(){
    const items = $$('.reveal:not(.is-visible)');
    if(!('IntersectionObserver' in window)){ items.forEach(x=>x.classList.add('is-visible')); return; }
    const io = new IntersectionObserver(entries => entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); }}), {threshold:.08});
    items.forEach(x=>io.observe(x));
  }
  function linkTeamMentions(data, root=document.body){
    if(!root || !['hub','schedule','results'].includes(document.body.dataset.page || '')) return;
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
    const addNavLink = (href, label, afterHref) => {
      if(!nav || nav.querySelector(`a[href="${href}"]`)) return;
      const link = document.createElement('a');
      link.className = `nav-link${document.body.dataset.page === href.replace('.html','') ? ' is-active' : ''}`;
      link.href = href;
      link.textContent = label;
      const after = nav.querySelector(`a[href="${afterHref}"]`);
      after ? after.insertAdjacentElement('afterend', link) : nav.prepend(link);
    };
    addNavLink('updates.html', 'Updates', 'hub.html');
    addNavLink('results.html', 'Results', 'schedule.html');
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
    wireNav(); wireMobileBottomNav(); mountAudioPlayer(); wireSplash(); mountRunningLateFeed();
    const data = await loadData();
    const [statusResult, gameResultsResult, top25Result, teamRecordsResult, gotwResult] = await Promise.allSettled([liveDashboardStatus(), liveGameResults(), liveTop25Poll(), liveTeamRecords(), liveGotwInfo()]);
    const liveStatus = statusResult.status === 'fulfilled' ? statusResult.value : null;
    const liveGames = gameResultsResult.status === 'fulfilled' ? gameResultsResult.value : [];
    if(liveStatus){
      data.season ||= {}; data.season.label = liveStatus.season; data.season.currentWeek = liveStatus.week;
      data.dashboard ||= {}; data.dashboard.status ||= {}; data.dashboard.status.currentWeek = liveStatus.week;
    }else console.warn('Live spreadsheet season/week could not be loaded.', statusResult.reason);
    if(gotwResult.status === 'fulfilled'){
      data.gotw = {...(data.gotw || {}), ...gotwResult.value, leagueCurrentWeek:liveStatus?.week || data.season?.currentWeek || 'PENDING'};
    }else console.warn('Live spreadsheet GOTW information could not be loaded; using local fallback data.', gotwResult.reason);
    if(gameResultsResult.status === 'rejected') console.warn('Live spreadsheet game results could not be loaded.', gameResultsResult.reason);
    // The complete 83-game user schedule is intentionally owned by the versioned
    // local data file. Live sheet requests update changing stats and final scores,
    // but never replace or shorten the published schedule.
    if(teamRecordsResult.status === 'fulfilled') applyLiveTeamData(data, teamRecordsResult.value, liveGames);
    else console.warn('Live spreadsheet standings and coach records could not be loaded.', teamRecordsResult.reason);
    applyLiveDashboardData(data, liveStatus, liveGames, top25Result.status === 'fulfilled' ? top25Result.value : null);
    mountRunningLateFeed(liveFeed(liveGames, top25Result.status === 'fulfilled' ? top25Result.value : null, data));
    renderLiveSeasonWeek(liveStatus);
    renderLiveGameResults(liveGames.slice(0,3).map(gameResultRecap));
    renderGameResultsPage(liveGames);
    renderTop25Poll(data, top25Result.status === 'fulfilled' ? top25Result.value : null, top25Result.status === 'rejected' ? top25Result.reason : null);
    renderStats(data); renderScorebug(data); renderStatusText(data, liveStatus); renderCoverLines(data); renderHeadlines(data); renderStatusCards(data); renderGotwPreview(data); renderCommandDocs(data); renderWatchlist(data); renderFeaturedGames(data); renderUpdateGuide(data);
    renderSettings(data); renderLeagueHealth(liveGames.filter(game=>game.isUser).length); renderOpenTeams(data); renderConferenceCards(data); renderTimeline(data); renderTeams(data); renderTeamHub(data); renderCoachCards(data); renderSchedule(data); renderTeamSchedules(data); renderTopGames(data); renderSitemap(data); renderArchive(data); renderLegacy(data);
    linkTeamMentions(data);
    observe();
  }
  document.addEventListener('DOMContentLoaded', init);
})();

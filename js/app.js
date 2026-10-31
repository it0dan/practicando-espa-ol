/**
 * Pronunciación diaria - Lógica Principal da Aplicação
 * Client-side Single Page Application para GitHub Pages
 */

/* Client ID de Google para sincronizar com Drive (opcional).
   Cole aqui ou em Ajustes → Google Drive. Se ficar vazio, a sincronização é desativada. */
const GOOGLE_CLIENT_ID = '';

/* ---------- Utilidades Básicas ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const LS = {
  get(k, d) {
    try {
      const v = localStorage.getItem(k);
      return v ? JSON.parse(v) : d;
    } catch (e) {
      return d;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {}
  }
};
const pad = n => String(n).padStart(2, '0');
const dayStr = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const today = () => dayStr(new Date());
const normW = w => w.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const WORD_RE = /([A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)/;

/* ---------- Estado e Configuração ---------- */
let cfg = Object.assign({
  key: '',
  region: 'brazilsouth',
  lang: 'es-MX',
  voice: '',
  saveAudio: true,
  limStt: 5,
  limTts: 500000
}, LS.get('pron-cfg', {}));

let hist = LS.get('pron-hist', []);
let custom = LS.get('pron-custom', null);
let usage = LS.get('pron-usage', {});

/* ---------- Monitoramento de Uso Mensal (Estimativa F0) ---------- */
const ym = () => today().slice(0, 7);
let meta = Object.assign({ clearedAt: 0, lastSync: 0, connected: false, clientId: '' }, LS.get('pron-meta', {}));
const saveMeta = () => LS.set('pron-meta', meta);
const DEV = (() => {
  let d = LS.get('pron-dev', null);
  if (!d) {
    d = Math.random().toString(36).slice(2, 8);
    LS.set('pron-dev', d);
  }
  return d;
})();

function umonth() {
  const k = ym();
  if (!usage[k]) usage[k] = {};
  return usage[k];
}

function umine() {
  const m = umonth();
  if (!m[DEV]) m[DEV] = { stt: 0, tts: 0, t: 0 };
  return m[DEV];
}

function uget() {
  const m = umonth();
  let stt = 0, tts = 0;
  for (const d in m) {
    stt += m[d].stt || 0;
    tts += m[d].tts || 0;
  }
  return { stt, tts };
}

(function migrate() {
  let ch = false;
  for (const k of Object.keys(usage)) {
    const m = usage[k];
    if (m && typeof m.stt === 'number') {
      usage[k] = { [DEV]: { stt: m.stt, tts: m.tts || 0, t: Date.now() } };
      ch = true;
    }
  }
  hist.forEach((h, i) => {
    if (!h.id) {
      h.id = 'l' + (h.ts || i);
      ch = true;
    }
  });
  if (ch) {
    LS.set('pron-usage', usage);
    LS.set('pron-hist', hist);
  }
})();

function addUsage(kind, n) {
  const me = umine();
  me[kind] += n;
  me.t = Date.now();
  const keys = Object.keys(usage).sort();
  while (keys.length > 12) delete usage[keys.shift()];
  LS.set('pron-usage', usage);
  renderUsage();
  syncSoon();
}

const fmtHMS = sec => {
  sec = Math.round(sec);
  return Math.floor(sec / 3600) + ':' + pad(Math.floor((sec % 3600) / 60)) + ':' + pad(sec % 60);
};
const fmtN = n => Math.round(n).toLocaleString('es');

function usageState() {
  const u = uget(),
    limS = (cfg.limStt || 5) * 3600,
    limT = cfg.limTts || 500000;
  return { u, limS, limT, ps: u.stt / limS, pt: u.tts / limT };
}

function renderUsage() {
  const el = $('#usage');
  if (!el) return;
  const { u, limS, limT, ps, pt } = usageState();
  const row = (label, txt, p) => `
    <div class="um">
      <div class="uh"><span>${label}</span><b>${txt}</b></div>
      <div class="ubar" role="progressbar" aria-label="${label}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.min(100, Math.round(p * 100))}">
        <i class="${p >= 1 ? 'bad' : p >= 0.8 ? 'warn' : ''}" style="width:${Math.min(100, p * 100).toFixed(1)}%"></i>
      </div>
    </div>`;
  const worst = Math.max(ps, pt);
  const mes = new Date().toLocaleDateString('es', { month: 'long', year: 'numeric' });
  el.innerHTML =
    `<p class="ucap">Uso de ${esc(mes)} · Estimado</p>` +
    row('Grabaciones', fmtHMS(u.stt) + ' de ' + fmtHMS(limS) + ' (' + Math.round(ps * 100) + '%)', ps) +
    row('Voz del modelo', fmtN(u.tts) + ' de ' + fmtN(limT) + ' car. (' + Math.round(pt * 100) + '%)', pt) +
    (worst >= 1
      ? `<div class="uwarn bad">Llegaste al límite del mes. ${ps >= 1 ? 'Ya no puedes grabar.' : ''} ${pt >= 1 ? 'El modelo usa la voz del navegador.' : ''} Puedes cambiar el límite en «Ajustes».</div>`
      : worst >= 0.8
      ? `<div class="uwarn">Estás cerca del límite del mes (${Math.round(worst * 100)}%).</div>`
      : '');
}

/* ---------- Fonética Guiada para Hablantes de Portugués ---------- */
const F = {
  j: ['J / G (ge, gi)', 'Sonido fuerte, desde la garganta: trabajo, jefe, gente. No es la J de «jogo».'],
  rr: ['RR / R inicial', 'La lengua vibra varias veces: perro, Rosa, arroz. No es la erre de garganta.'],
  e: ['E y O finales', '«noche» termina en E, no en I. «libro» termina en O, no en U.'],
  dt: ['D / T', 'Siempre dentales y secas: día, tiempo, tarde. Nunca «djia» ni «tchiempo».'],
  ll: ['LL / Y', 'Suena como «ye»: llamo, playa, pollo. No es «lh».'],
  nas: ['Vocales limpias', 'Sin nasalizar: canción, también, mano. La N final se oye nítida.'],
  ger: ['-ANDO / -IENDO', 'Sílabas claras y abiertas: tra-ba-jan-do, co-mien-do, le-yen-do.'],
  c: ['C (ce, ci) y Z', 'En Latinoamérica suenan como S: ciudad, azul, hacer.'],
  v: ['B = V', 'Suenan exactamente igual, con los dos labios: vivo, vuelvo, autobús.'],
  h: ['H muda', 'No suena nunca: hoy, hace, hay, helado.'],
  cion: ['-CIÓN', 'Suena «sión», con O pura: solución, reunión. No es «ção».'],
  s: ['S final', 'Siempre se pronuncia sibilante, no es «ch»: más, tres, gracias.'],
  l: ['L final', 'Es L alveolar, no U: ideal, sol, papel. No «ideau».'],
  n: ['Ñ', 'Similar a «nh»: año, mañana, España.']
};

/* ---------- Textos Diarios (Nivel A1) ---------- */
const TEXTS = [
  { t: 'Trabajando en casa', tema: 'Gerundio', f: ['ger', 'j', 'h'],
    txt: 'Hoy estoy trabajando en casa. Estoy tomando café y escribiendo un correo para un cliente. Mi hija está jugando en el jardín. Más tarde, comemos juntos.' },
  { t: 'La reunión', tema: 'Trabajo', f: ['cion', 'j', 'dt'],
    txt: 'Buenos días a todos. Hoy tenemos una reunión con un cliente nuevo. El cliente necesita una solución de integración. Yo presento la arquitectura y mi jefe habla del precio.' },
  { t: 'El perro de Rosa', tema: 'Vida diaria', f: ['rr', 'e'],
    txt: 'Rosa tiene un perro muy rápido. El perro corre por la calle y llega hasta el río. Rosa grita: ¡Ramón, ven aquí! El perro regresa corriendo, muy contento.' },
  { t: 'Por la noche', tema: 'Rutina', f: ['e', 'dt'],
    txt: 'Por la noche ceno con mi familia. Después, leo un libro o veo una película. Antes de dormir, tomo un té con leche. Me gusta la noche tranquila.' },
  { t: 'Mi ciudad', tema: 'Lugares', f: ['c', 'dt', 'l'],
    txt: 'Vivo en una ciudad pequeña y tranquila. En el centro hay una plaza, una iglesia y muchos cafés. Los sábados, la gente camina por el parque. Es un lugar ideal para vivir.' },
  { t: 'Música latina', tema: 'Cultura', f: ['nas', 'j', 'dt'],
    txt: 'Me gusta mucho la música latina. Escucho a Jorge Drexler y a Natalia Lafourcade. Sus canciones hablan del amor, del tiempo y de los viajes. Con la música, también aprendo palabras nuevas.' },
  { t: 'Una llamada', tema: 'Trabajo', f: ['ll', 's', 'dt'],
    txt: 'Hola, buenas tardes. Le llamo de parte de la empresa. Quisiera agendar una llamada con usted para el lunes. ¿Tiene tiempo por la mañana? Muchas gracias, hasta luego.' },
  { t: 'En el restaurante', tema: 'Vida diaria', f: ['rr', 'll', 'j'],
    txt: 'Buenas tardes. Quisiera una mesa para tres personas, por favor. Para tomar, un jugo de naranja. Para comer, arroz con pollo y una ensalada. Al final, la cuenta, por favor.' },
  { t: 'Mi rutina', tema: 'Rutina', f: ['v', 'e'],
    txt: 'Me levanto temprano todos los días. Desayuno pan con queso y un café negro. Voy al trabajo en autobús. Vuelvo a casa a las seis de la tarde.' },
  { t: 'El fin de semana', tema: 'Ocio', f: ['ll', 'h', 's'],
    txt: 'El sábado voy a la playa con mi familia. Hace sol y el agua está muy rica. Los niños hacen castillos de arena. Por la tarde, comemos pescado y tomamos helado.' },
  { t: 'Me presento', tema: 'Trabajo', f: ['j', 'cion', 'll'],
    txt: 'Me llamo Dan y soy arquitecto de soluciones. Trabajo en una empresa de tecnología. Ayudo a los clientes a conectar sus sistemas. Me interesa mucho la inteligencia artificial.' },
  { t: 'El tiempo', tema: 'Vida diaria', f: ['c', 'll', 'h'],
    txt: 'Hoy hace mucho calor. El cielo está azul y no hay nubes. Mañana va a llover por la tarde. Tengo que llevar un paraguas al trabajo.' },
  { t: '¿Qué estás haciendo?', tema: 'Gerundio', f: ['ger', 'c'],
    txt: '¿Qué estás haciendo? Estoy leyendo un libro muy bueno. ¿Y tu hermano? Está durmiendo en el sofá. Mi madre está cocinando y mi padre está escuchando la radio.' },
  { t: 'Un viaje a México', tema: 'Cultura', f: ['j', 'n', 'nas'],
    txt: 'El próximo año quiero viajar a México. Quiero conocer la capital y probar los tacos. También quiero visitar las pirámides. Va a ser un viaje inolvidable.' }
];

const dayIdx = () => Math.floor((new Date(new Date().toDateString()) - new Date(2026, 0, 1)) / 864e5);
let offset = 0;

function currentText() {
  if (custom && custom.date === today() && offset === 0) return custom;
  const n = TEXTS.length;
  return TEXTS[(((dayIdx() + offset) % n) + n) % n];
}

/* ---------- Voz Modelo: Azure TTS & Fallback do Navegador ---------- */
const VOICES = {
  'es-MX': [['es-MX-DaliaNeural', 'Dalia (México)'], ['es-MX-JorgeNeural', 'Jorge (México)']],
  'es-ES': [['es-ES-ElviraNeural', 'Elvira (España)'], ['es-ES-AlvaroNeural', 'Álvaro (España)']]
};

function voiceName() {
  const l = VOICES[cfg.lang] || VOICES['es-MX'];
  return (l.find(v => v[0] === cfg.voice) || l[0])[0];
}

let voice = null;
function pickVoice() {
  if (!('speechSynthesis' in window)) return;
  const v = speechSynthesis.getVoices(),
    pre = cfg.lang.slice(0, 5);
  voice = v.find(x => x.lang.replace('_', '-') === pre) || v.find(x => /^es/i.test(x.lang)) || null;
}
if ('speechSynthesis' in window) {
  pickVoice();
  speechSynthesis.onvoiceschanged = pickVoice;
}

const player = { state: 'idle', audio: null, engine: '', cache: new Map(), token: 0 };

function showErr(m) {
  const e = $('#err');
  if (e) e.textContent = m;
}

function setPState(s) {
  player.state = s;
  updatePlayerUI();
}

function updatePlayerUI() {
  const g = id => document.getElementById(id),
    s = player.state;
  const play = g('pPlay');
  if (!play) return;
  play.disabled = (s === 'loading' || s === 'playing');
  g('pPause').disabled = (s !== 'playing');
  g('pStop').disabled = (s === 'idle');
  play.textContent = s === 'paused' ? '▶ Seguir' : '▶ Play';
  g('pStatus').textContent =
    s === 'loading'
      ? 'Cargando voz…'
      : s === 'playing'
      ? 'Reproduciendo · ' + player.engine
      : s === 'paused'
      ? 'En pausa'
      : '';
}

function stopModel() {
  player.token++;
  try {
    if (player.audio) {
      player.audio.pause();
      player.audio = null;
    }
  } catch (e) {}
  try {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
  } catch (e) {}
  setPState('idle');
}

function pauseModel() {
  if (player.state !== 'playing') return;
  if (player.audio) player.audio.pause();
  else if ('speechSynthesis' in window) speechSynthesis.pause();
  setPState('paused');
}

function resumeModel() {
  if (player.state !== 'paused') return;
  if (player.audio) player.audio.play();
  else if ('speechSynthesis' in window) speechSynthesis.resume();
  setPState('playing');
}

function speakBrowser(t, slow) {
  if (!('speechSynthesis' in window)) {
    setPState('idle');
    return;
  }
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = voice ? voice.lang : cfg.lang;
    if (voice) u.voice = voice;
    u.rate = slow ? 0.7 : 0.9;
    u.onend = () => setPState('idle');
    u.onerror = () => setPState('idle');
    player.audio = null;
    player.engine = 'Voz del navegador' + (voice ? ' · ' + voice.name : '');
    speechSynthesis.speak(u);
    setPState('playing');
  } catch (e) {
    setPState('idle');
  }
}

async function speak(t, slow) {
  stopModel();
  stopMine();
  const my = player.token;
  if (!cfg.key || typeof SpeechSDK === 'undefined') {
    speakBrowser(t, slow);
    return;
  }
  const vn = voiceName(),
    k = vn + '|' + (slow ? 1 : 0) + '|' + t;
  if (!player.cache.has(k) && usageState().pt >= 1) {
    showErr('Llegaste al límite mensual de voz del modelo. Usando voz del navegador.');
    speakBrowser(t, slow);
    return;
  }
  setPState('loading');
  try {
    let url = player.cache.get(k);
    if (!url) {
      const sc = SpeechSDK.SpeechConfig.fromSubscription(cfg.key, cfg.region);
      sc.speechSynthesisOutputFormat = SpeechSDK.SpeechSynthesisOutputFormat.Audio24Khz48KBitRateMonoMp3;
      const synth = new SpeechSDK.SpeechSynthesizer(sc, null);
      const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${cfg.lang}"><voice name="${vn}"><prosody rate="${slow ? '-25%' : '-10%'}">${esc(t)}</prosody></voice></speak>`;
      const r = await new Promise((ok, ko) => synth.speakSsmlAsync(ssml, ok, ko));
      synth.close();
      if (r.reason !== SpeechSDK.ResultReason.SynthesizingAudioCompleted) throw new Error(r.errorDetails || 'Sin audio');
      url = URL.createObjectURL(new Blob([r.audioData], { type: 'audio/mpeg' }));
      player.cache.set(k, url);
      addUsage('tts', t.length);
    }
    if (my !== player.token) return;
    const a = new Audio(url);
    player.audio = a;
    player.engine = 'Azure · ' + vn;
    a.onended = () => {
      player.audio = null;
      setPState('idle');
    };
    a.onerror = () => {
      player.audio = null;
      setPState('idle');
      showErr('No pude reproducir el audio.');
    };
    await a.play();
    setPState('playing');
  } catch (e) {
    if (my !== player.token) return;
    showErr('Azure no pudo generar la voz (' + String((e && e.message) || e).slice(0, 100) + '). Usando navegador.');
    speakBrowser(t, slow);
  }
}

/* ---------- Armazenamento Local de Áudio (IndexedDB) ---------- */
let dbp = null;
function idb() {
  if (!dbp) {
    dbp = new Promise((ok, ko) => {
      try {
        const r = indexedDB.open('pron-audio', 1);
        r.onupgradeneeded = () => r.result.createObjectStore('rec', { keyPath: 'id' });
        r.onsuccess = () => ok(r.result);
        r.onerror = () => ko(r.error);
      } catch (e) {
        ko(e);
      }
    });
  }
  return dbp;
}

async function audioPut(rec) {
  const d = await idb();
  return new Promise((ok, ko) => {
    const t = d.transaction('rec', 'readwrite');
    t.objectStore('rec').put(rec);
    t.oncomplete = () => ok();
    t.onerror = () => ko(t.error);
  });
}

async function audioGet(id) {
  const d = await idb();
  return new Promise((ok, ko) => {
    const q = d.transaction('rec').objectStore('rec').get(id);
    q.onsuccess = () => ok(q.result);
    q.onerror = () => ko(q.error);
  });
}

async function audioDel(id) {
  const d = await idb();
  return new Promise((ok, ko) => {
    const t = d.transaction('rec', 'readwrite');
    t.objectStore('rec').delete(id);
    t.oncomplete = () => ok();
    t.onerror = () => ko(t.error);
  });
}

async function audioClear() {
  const d = await idb();
  return new Promise((ok, ko) => {
    const t = d.transaction('rec', 'readwrite');
    t.objectStore('rec').clear();
    t.oncomplete = () => ok();
    t.onerror = () => ko(t.error);
  });
}

let myAudio = null,
  myUrl = null,
  myId = null;

function stopMine() {
  try {
    if (myAudio) myAudio.pause();
  } catch (e) {}
  myAudio = null;
  myId = null;
  if (myUrl) {
    URL.revokeObjectURL(myUrl);
    myUrl = null;
  }
  document.querySelectorAll('[data-play]').forEach(b => {
    b.textContent = b.dataset.label || '▶ Escuchar';
  });
}

async function toggleMine(id, btn) {
  if (myId === id) {
    stopMine();
    return;
  }
  stopMine();
  stopModel();
  let rec = null;
  try {
    rec = await audioGet(id);
  } catch (e) {}
  if (!rec) rec = await fetchRemoteAudio(id, btn);
  if (!rec) {
    if (!btn.dataset.msg) btn.textContent = meta.connected && !haveToken() ? 'Reconecta Drive' : 'Sin audio';
    setTimeout(() => {
      btn.textContent = btn.dataset.label || '▶ Escuchar';
    }, 2500);
    return;
  }
  myUrl = URL.createObjectURL(rec.blob);
  myId = id;
  const a = new Audio(myUrl);
  myAudio = a;
  a.onended = () => stopMine();
  try {
    await a.play();
    btn.textContent = btn.dataset.stop || '■ Parar';
  } catch (e) {
    stopMine();
  }
}

function armBtn(btn, fn) {
  const orig = btn.textContent;
  let armed = false,
    t = null;
  btn.addEventListener('click', () => {
    if (!armed) {
      armed = true;
      btn.textContent = '¿Confirmar?';
      t = setTimeout(() => {
        armed = false;
        btn.textContent = orig;
      }, 3500);
      return;
    }
    clearTimeout(t);
    armed = false;
    btn.textContent = orig;
    fn();
  });
}

/* ---------- Algoritmo de Alinhamento e Levenshtein ---------- */
function lev(a, b) {
  const m = a.length,
    n = b.length;
  if (!m) return n;
  if (!n) return m;
  let p = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const c = [i];
    for (let j = 1; j <= n; j++) {
      c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    p = c;
  }
  return p[n];
}

function align(ref, hyp) {
  const n = ref.length,
    m = hyp.length,
    D = [],
    B = [];
  for (let i = 0; i <= n; i++) {
    D.push(new Float32Array(m + 1));
    B.push(new Uint8Array(m + 1));
  }
  for (let i = 1; i <= n; i++) {
    D[i][0] = i;
    B[i][0] = 2;
  }
  for (let j = 1; j <= m; j++) {
    D[0][j] = j;
    B[0][j] = 3;
  }
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const a = ref[i - 1],
        b = hyp[j - 1];
      const sub = a === b ? 0 : Math.min(1.9, 0.2 + 1.6 * (lev(a, b) / Math.max(a.length, b.length)));
      let best = D[i - 1][j - 1] + sub,
        bk = 1;
      if (D[i - 1][j] + 1 < best) {
        best = D[i - 1][j] + 1;
        bk = 2;
      }
      if (D[i][j - 1] + 1 < best) {
        best = D[i][j - 1] + 1;
        bk = 3;
      }
      D[i][j] = best;
      B[i][j] = bk;
    }
  }
  const map = new Array(n).fill(-1),
    ins = [];
  let i = n,
    j = m;
  while (i > 0 || j > 0) {
    const bk = B[i][j];
    if (bk === 1) {
      map[i - 1] = j - 1;
      i--;
      j--;
    } else if (bk === 2) {
      i--;
    } else {
      ins.push(j - 1);
      j--;
    }
  }
  return { map, ins: ins.reverse() };
}

function refTokens(txt) {
  const parts = txt.split(WORD_RE),
    toks = [];
  parts.forEach((p, i) => {
    if (i % 2 === 1) toks.push(p);
  });
  return toks;
}

/* ---------- Gravação e Avaliação de Pronúncia (Azure) ---------- */
let reco = null,
  segs = [],
  result = null,
  selWord = -1;
let micStream = null,
  mediaRec = null,
  chunks = [],
  recStart = 0,
  recDur = 0,
  lastBlob = null;

function releaseMic() {
  try {
    if (micStream) micStream.getTracks().forEach(t => t.stop());
  } catch (e) {}
  micStream = null;
}

function startMedia() {
  chunks = [];
  mediaRec = null;
  if (cfg.saveAudio === false || typeof MediaRecorder === 'undefined' || !micStream) return;
  try {
    const mt = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/webm', 'audio/ogg'].find(m =>
      MediaRecorder.isTypeSupported(m)
    );
    mediaRec = mt ? new MediaRecorder(micStream, { mimeType: mt }) : new MediaRecorder(micStream);
    mediaRec.ondataavailable = e => {
      if (e.data && e.data.size) chunks.push(e.data);
    };
    mediaRec.start(1000);
  } catch (e) {
    mediaRec = null;
  }
}

async function startRec() {
  const err = $('#err');
  if (err) err.textContent = '';
  if (reco) return;
  if (!cfg.key) {
    showErr('Configura tu clave de Azure en «Ajustes» para empezar.');
    return;
  }
  if (typeof SpeechSDK === 'undefined') {
    showErr('No se cargó el SDK de Azure. Revisa tu conexión a internet.');
    return;
  }
  stopModel();
  stopMine();
  {
    const q = usageState();
    if (q.ps >= 1) {
      showErr('Llegaste al límite mensual de grabación (' + fmtHMS(q.limS) + '). Cambia el límite en «Ajustes».');
      return;
    }
  }
  const cur = currentText();
  segs = [];
  result = null;
  selWord = -1;
  lastBlob = null;
  $('#res').innerHTML = '';
  $('#reading').innerHTML = readingHTML(cur.txt, null);
  bindWords();
  const rb = $('#rec');
  rb.disabled = true;
  try {
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (e) {
    rb.disabled = false;
    showErr('El navegador no dio permiso al micrófono. Actívalo en los ajustes del sitio.');
    return;
  }
  try {
    const sc = SpeechSDK.SpeechConfig.fromSubscription(cfg.key, cfg.region);
    sc.speechRecognitionLanguage = cfg.lang;
    sc.setProperty(SpeechSDK.PropertyId.Speech_SegmentationSilenceTimeoutMs, '1500');
    const ac = SpeechSDK.AudioConfig.fromStreamInput(micStream);
    const pa = new SpeechSDK.PronunciationAssessmentConfig(
      cur.txt,
      SpeechSDK.PronunciationAssessmentGradingSystem.HundredMark,
      SpeechSDK.PronunciationAssessmentGranularity.Phoneme,
      false
    );
    reco = new SpeechSDK.SpeechRecognizer(sc, ac);
    pa.applyTo(reco);
    reco.recognizing = (s, e) => {
      const l = $('#live');
      if (l) l.textContent = 'Escuchando: ' + e.result.text;
    };
    reco.recognized = (s, e) => {
      if (e.result.reason !== SpeechSDK.ResultReason.RecognizedSpeech) return;
      try {
        const j = JSON.parse(e.result.properties.getProperty(SpeechSDK.PropertyId.SpeechServiceResponse_JsonResult));
        if (j.NBest && j.NBest[0]) segs.push(j.NBest[0]);
      } catch (x) {}
    };
    reco.canceled = (s, e) => {
      if (e.reason === SpeechSDK.CancellationReason.Error) {
        let msg = e.errorDetails || 'Error desconocido.';
        if (/401|1006|Unauthorized|authentication/i.test(msg)) {
          msg = 'Azure no aceptó tu clave o tu región. Revisa «Ajustes».';
        }
        showErr(msg);
        stopRec(true, true);
      }
    };
    reco.startContinuousRecognitionAsync(
      () => {
        recStart = Date.now();
        startMedia();
        setRecUI(true);
      },
      er => {
        releaseMic();
        showErr('No pude iniciar la grabación: ' + er);
        reco = null;
        setRecUI(false);
      }
    );
  } catch (e) {
    releaseMic();
    reco = null;
    rb.disabled = false;
    showErr('No pude iniciar la grabación: ' + e.message);
  }
}

function stopRec(aborted, noCount) {
  if (!reco) return;
  const r = reco;
  reco = null;
  recDur = recStart ? Math.round((Date.now() - recStart) / 1000) : 0;
  if (recStart && !noCount) addUsage('stt', Math.max(1, Math.ceil((Date.now() - recStart) / 1000)));
  recStart = 0;
  const rb = $('#rec');
  if (rb) {
    rb.disabled = true;
    rb.textContent = 'Evaluando…';
  }
  const mr = mediaRec;
  mediaRec = null;
  const blobP = new Promise(ok => {
    if (mr && mr.state !== 'inactive') {
      mr.onstop = () => ok(new Blob(chunks, { type: (mr.mimeType || 'audio/webm').split(';')[0] }));
      try {
        mr.stop();
      } catch (e) {
        ok(null);
      }
    } else ok(null);
  });
  r.stopContinuousRecognitionAsync(
    () => {
      r.close();
      blobP.then(b => {
        releaseMic();
        lastBlob = aborted ? null : b;
        setTimeout(() => {
          setRecUI(false);
          if (!aborted) finish();
        }, 400);
      });
    },
    () => {
      r.close();
      blobP.then(() => {
        releaseMic();
        setRecUI(false);
      });
    }
  );
}

function setRecUI(on) {
  const b = $('#rec');
  if (!b) return;
  b.disabled = false;
  b.classList.toggle('on', on);
  b.textContent = on ? '■ Terminar' : '● Grabar';
  if (!on) $('#live').textContent = '';
}

async function finish() {
  const cur = currentText();
  const toks = refTokens(cur.txt),
    refN = toks.map(normW);
  const hyp = [];
  let fl = [],
    flW = [];
  segs.forEach(s => {
    (s.Words || []).forEach(w =>
      hyp.push({
        w: w.Word,
        n: normW(w.Word),
        acc: w.PronunciationAssessment ? w.PronunciationAssessment.AccuracyScore : 0,
        ph: w.Phonemes || []
      })
    );
    if (s.PronunciationAssessment) {
      fl.push(s.PronunciationAssessment.FluencyScore);
      flW.push((s.Words || []).length || 1);
    }
  });
  if (!hyp.length) {
    showErr('No escuché nada. Habla más cerca del micrófono y prueba otra vez.');
    return;
  }
  const { map, ins } = align(refN, hyp.map(h => h.n));
  const words = toks.map((t, i) => {
    const k = map[i];
    if (k < 0) return { t, st: 'miss', sc: 0 };
    const h = hyp[k];
    if (h.n === refN[i]) return { t, st: 'ok', sc: Math.round(h.acc), ph: h.ph };
    return { t, st: 'sub', sc: Math.min(Math.round(h.acc), 45), heard: h.w, ph: h.ph };
  });
  const said = words.filter(w => w.st !== 'miss');
  const acc = said.length ? said.reduce((a, w) => a + w.sc, 0) / said.length : 0;
  const comp = (said.length / words.length) * 100;
  const flu = fl.length ? fl.reduce((a, v, i) => a + v * flW[i], 0) / flW.reduce((a, v) => a + v, 0) : 0;
  const nota = Math.round(0.6 * acc + 0.2 * flu + 0.2 * comp);
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const blob = lastBlob;
  lastBlob = null;
  let hasAudio = false;
  if (blob && blob.size > 0 && cfg.saveAudio !== false) {
    try {
      await audioPut({ id, blob, ts: Date.now(), dur: recDur });
      hasAudio = true;
    } catch (e) {}
  }
  result = {
    id,
    hasAudio,
    nota,
    acc: Math.round(acc),
    flu: Math.round(flu),
    comp: Math.round(comp),
    words,
    extra: ins.map(k => hyp[k].w),
    title: cur.t,
    txt: cur.txt
  };
  hist.push({
    id,
    hasAudio,
    dur: recDur,
    d: today(),
    ts: Date.now(),
    t: cur.t,
    nota,
    acc: result.acc,
    flu: result.flu,
    comp: result.comp,
    weak: words.filter(w => w.st === 'miss' || w.sc < 70).map(w => normW(w.t))
  });
  if (hist.length > 300) {
    hist.splice(0, hist.length - 300).forEach(h => {
      if (h.hasAudio) audioDel(h.id).catch(() => {});
    });
  }
  LS.set('pron-hist', hist);
  renderStat();
  renderResult();
  syncSoon();
}

/* ---------- Criptografia de Credenciais (Web Crypto API) ---------- */
const b64 = u => btoa(String.fromCharCode(...new Uint8Array(u)));
const unb64 = t => Uint8Array.from(atob(t), c => c.charCodeAt(0));

async function deriveKey(pass, salt) {
  const km = await crypto.subtle.importKey('raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 250000, hash: 'SHA-256' },
    km,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

async function encJSON(obj, pass) {
  const salt = crypto.getRandomValues(new Uint8Array(16)),
    iv = crypto.getRandomValues(new Uint8Array(12));
  const k = await deriveKey(pass, salt);
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, k, new TextEncoder().encode(JSON.stringify(obj)));
  return { v: 1, kdf: 'PBKDF2-SHA256-250000', cipher: 'AES-GCM-256', salt: b64(salt), iv: b64(iv), ct: b64(ct) };
}

async function decJSON(env, pass) {
  const k = await deriveKey(pass, unb64(env.salt));
  const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64(env.iv) }, k, unb64(env.ct));
  return JSON.parse(new TextDecoder().decode(pt));
}

/* ---------- Sincronização Google Drive (AppData Folder) ---------- */
const GIS_URL = 'https://accounts.google.com/gsi/client';
const SCOPE = 'https://www.googleapis.com/auth/drive.appdata';
let tok = null,
  syncing = false,
  syncDirty = false,
  syncTimer = null,
  remoteMap = null,
  syncNote = '',
  syncState = { st: 'off', msg: '' },
  gisP = null;

const clientId = () => (meta.clientId || GOOGLE_CLIENT_ID || '').trim();
const haveToken = () => !!(tok && Date.now() < tok.exp - 60000);
const stable = o =>
  JSON.stringify(o, (k, v) =>
    v && typeof v === 'object' && !Array.isArray(v)
      ? Object.keys(v).sort().reduce((a, x) => ((a[x] = v[x]), a), {})
      : v
  );

function loadGIS() {
  if (window.google && google.accounts && google.accounts.oauth2) return Promise.resolve();
  if (!gisP) {
    gisP = new Promise((ok, ko) => {
      const sc = document.createElement('script');
      sc.src = GIS_URL;
      sc.async = true;
      sc.onload = () => ok();
      sc.onerror = () => {
        gisP = null;
        ko(new Error('gis'));
      };
      document.head.appendChild(sc);
    });
  }
  return gisP;
}

function getToken(interactive) {
  return new Promise(async (ok, ko) => {
    if (haveToken()) return ok(tok.access_token);
    if (!clientId()) return ko(new Error('Falta el Client ID de Google.'));
    try {
      await loadGIS();
    } catch (e) {
      return ko(new Error('No pude cargar Google. Revisa tu conexión.'));
    }
    try {
      const c = google.accounts.oauth2.initTokenClient({
        client_id: clientId(),
        scope: SCOPE,
        callback: r => {
          if (r.error) return ko(new Error(r.error_description || r.error));
          tok = { access_token: r.access_token, exp: Date.now() + (r.expires_in || 3600) * 1000 };
          ok(tok.access_token);
        },
        error_callback: e =>
          ko(
            new Error(
              e && e.type === 'popup_closed'
                ? 'Cerraste la ventana de Google.'
                : e && e.type === 'popup_failed_to_open'
                ? 'El navegador bloqueó la ventana de Google.'
                : 'No pude iniciar sesión con Google.'
            )
          )
      });
      c.requestAccessToken(interactive ? {} : { prompt: '' });
    } catch (e) {
      ko(e);
    }
  });
}

async function gfetch(url, opt) {
  opt = opt || {};
  if (!haveToken()) throw new Error('La sesión de Google venció. Toca Reconectar.');
  const r = await fetch(
    url,
    Object.assign({}, opt, {
      headers: Object.assign({}, opt.headers || {}, { Authorization: 'Bearer ' + tok.access_token })
    })
  );
  if (r.status === 401) {
    tok = null;
    throw new Error('La sesión de Google venció. Toca Reconectar.');
  }
  if (!r.ok) throw new Error('Drive respondió ' + r.status);
  return r;
}

async function driveList() {
  const files = [];
  let pt = '';
  do {
    const r = await gfetch(
      'https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&pageSize=1000&fields=nextPageToken,files(id,name,modifiedTime)' +
        (pt ? '&pageToken=' + encodeURIComponent(pt) : '')
    );
    const j = await r.json();
    files.push(...(j.files || []));
    pt = j.nextPageToken || '';
  } while (pt);
  const m = {};
  files.forEach(f => {
    m[f.name] = f;
  });
  return m;
}

async function driveGet(id, as) {
  const r = await gfetch('https://www.googleapis.com/drive/v3/files/' + id + '?alt=media');
  return as === 'blob' ? r.blob() : as === 'json' ? r.json() : r.text();
}

async function drivePut(name, blob, type, existing) {
  if (existing) {
    await gfetch('https://www.googleapis.com/upload/drive/v3/files/' + existing.id + '?uploadType=media', {
      method: 'PATCH',
      headers: { 'Content-Type': type },
      body: blob
    });
    return existing;
  }
  const bd = 'pron' + Math.random().toString(36).slice(2);
  const body = new Blob([
    `--${bd}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n`,
    JSON.stringify({ name, parents: ['appDataFolder'] }),
    `\r\n--${bd}\r\nContent-Type: ${type}\r\n\r\n`,
    blob,
    `\r\n--${bd}--`
  ]);
  const r = await gfetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,modifiedTime',
    { method: 'POST', headers: { 'Content-Type': 'multipart/related; boundary=' + bd }, body }
  );
  return r.json();
}

async function driveDel(id) {
  try {
    await gfetch('https://www.googleapis.com/drive/v3/files/' + id, { method: 'DELETE' });
  } catch (e) {
    if (!/404/.test(e.message)) throw e;
  }
}

function mergeData(L, R) {
  const clearedAt = Math.max(L.clearedAt || 0, R.clearedAt || 0);
  const map = new Map();
  [...(R.hist || []), ...(L.hist || [])].forEach(h => {
    if (!h || !h.id || (h.ts || 0) < clearedAt) return;
    const o = map.get(h.id);
    if (!o) {
      map.set(h.id, Object.assign({}, h));
      return;
    }
    const m = Object.assign({}, o, h);
    m.adel = !!(o.adel || h.adel);
    m.hasAudio = !m.adel && !!(o.hasAudio || h.hasAudio);
    if (!m.adel) delete m.adel;
    map.set(h.id, m);
  });
  const hist = [...map.values()].sort((a, b) => (a.ts || 0) - (b.ts || 0)).slice(-300);
  const usage = {};
  [R.usage || {}, L.usage || {}].forEach(U => {
    for (const mo in U) {
      for (const d in U[mo]) {
        usage[mo] = usage[mo] || {};
        const cur = usage[mo][d],
          nw = U[mo][d];
        if (!cur || (nw.t || 0) >= (cur.t || 0)) usage[mo][d] = nw;
      }
    }
  });
  const ks = Object.keys(usage).sort();
  while (ks.length > 12) delete usage[ks.shift()];
  return { hist, usage, clearedAt };
}

function markAudioDeleted(id) {
  const h = hist.find(x => x.id === id);
  if (h) {
    h.hasAudio = false;
    h.adel = true;
    LS.set('pron-hist', hist);
  }
  syncSoon();
}

async function fetchRemoteAudio(id, btn) {
  if (!meta.connected || !haveToken()) return null;
  try {
    btn.textContent = '…';
    btn.dataset.msg = '1';
    let files = remoteMap;
    if (!files || !files['a-' + id]) {
      files = await driveList();
      remoteMap = files;
    }
    const f = files['a-' + id];
    if (!f) return null;
    const blob = await driveGet(f.id, 'blob');
    const rec = { id, blob, ts: Date.now() };
    try {
      await audioPut(rec);
    } catch (e) {}
    return rec;
  } catch (e) {
    return null;
  } finally {
    delete btn.dataset.msg;
  }
}

function setSync(st, msg) {
  syncState = { st, msg };
  renderCloud();
}

function renderCloud() {
  const el = $('#cloud');
  if (!el) return;
  if (!clientId()) {
    el.hidden = true;
    return;
  }
  el.hidden = false;
  const last = meta.lastSync
    ? new Date(meta.lastSync).toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
    : '';
  const { st, msg } = syncState;
  const on = haveToken();
  let label;
  if (st === 'busy') label = 'Sincronizando…';
  else if (st === 'err') label = msg || 'Error de sincronización';
  else if (on) label = 'Drive conectado' + (last ? ' · ' + last : '');
  else if (meta.connected) label = 'Drive desconectado' + (last ? ' · ' + last : '');
  else label = 'Drive sin conectar';
  el.innerHTML = `<span>☁ ${esc(label)}</span><button class="mini" id="cloudBtn"${st === 'busy' ? ' disabled' : ''}>${
    on ? 'Sincronizar' : meta.connected ? 'Reconectar' : 'Conectar'
  }</button>${syncNote ? `<span class="note">${esc(syncNote)}</span>` : ''}`;
  $('#cloudBtn').onclick = () => syncNow(true);
}

function syncSoon() {
  if (syncing) {
    syncDirty = true;
    return;
  }
  if (!meta.connected || !haveToken()) return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => syncNow(false), 12000);
}

async function syncNow(interactive) {
  if (syncing) {
    syncDirty = true;
    return;
  }
  syncing = true;
  setSync('busy', '');
  try {
    await getToken(interactive);
    meta.connected = true;
    saveMeta();
    const files = await driveList();
    remoteMap = files;
    let R = { hist: [], usage: {}, clearedAt: 0 };
    if (files['data.json']) R = await driveGet(files['data.json'].id, 'json');
    const M = mergeData({ hist, usage, clearedAt: meta.clearedAt || 0 }, R);
    for (const h of M.hist) {
      const fn = 'a-' + h.id;
      if (h.adel) {
        try {
          await audioDel(h.id);
        } catch (e) {}
        if (files[fn]) {
          await driveDel(files[fn].id);
          delete files[fn];
        }
        continue;
      }
      if (h.hasAudio && !files[fn]) {
        let rec = null;
        try {
          rec = await audioGet(h.id);
        } catch (e) {}
        if (rec && rec.blob) files[fn] = await drivePut(fn, rec.blob, rec.blob.type || 'audio/webm');
      }
    }
    for (const fn in files) {
      if (fn.startsWith('a-') && files[fn].modifiedTime && new Date(files[fn].modifiedTime).getTime() < M.clearedAt) {
        await driveDel(files[fn].id);
        delete files[fn];
      }
    }
    const M2 = mergeData({ hist, usage, clearedAt: meta.clearedAt || 0 }, M);
    const sameAsRemote = stable({ hist: R.hist || [], usage: R.usage || {}, clearedAt: R.clearedAt || 0 }) === stable(M2);
    if (!sameAsRemote) {
      const out = Object.assign({ v: 1, updated: Date.now() }, M2);
      await drivePut('data.json', new Blob([JSON.stringify(out)], { type: 'application/json' }), 'application/json', files['data.json']);
    }
    const M3 = mergeData({ hist, usage, clearedAt: meta.clearedAt || 0 }, M2);
    const keep = new Set(M3.hist.map(h => h.id));
    hist.forEach(h => {
      if (!keep.has(h.id)) audioDel(h.id).catch(() => {});
    });
    hist = M3.hist;
    usage = M3.usage;
    meta.clearedAt = M3.clearedAt;
    meta.lastSync = Date.now();
    LS.set('pron-hist', hist);
    LS.set('pron-usage', usage);
    saveMeta();
    syncNote = !cfg.key && files['config.enc.json'] ? 'Hay una clave en Drive. Ve a Ajustes → «Traer mi clave».' : '';
    renderStat();
    renderUsage();
    setSync('ok', '');
    if (curView === 'hist') viewHist();
  } catch (e) {
    setSync('err', String((e && e.message) || e).slice(0, 140));
  } finally {
    syncing = false;
    if (syncDirty) {
      syncDirty = false;
      syncSoon();
    }
  }
}

/* ---------- Visualizações e Interface ---------- */
function streak() {
  const days = new Set(hist.map(h => h.d));
  let n = 0;
  const d = new Date();
  if (!days.has(dayStr(d))) d.setDate(d.getDate() - 1);
  while (days.has(dayStr(d))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

function renderStat() {
  const el = $('#stat');
  if (!el) return;
  const last = hist[hist.length - 1];
  el.innerHTML = `<span><b>${streak()}</b> días seguidos</span><span><b>${hist.length}</b> lecturas</span>${
    last ? `<span>Última nota: <b>${last.nota}</b></span>` : ''
  }`;
}

function cls(w) {
  return w.st === 'miss' ? 'miss' : w.sc >= 80 ? 'ok' : w.sc >= 60 ? 'mid' : 'bad';
}

function readingHTML(txt, words) {
  let wi = 0;
  return txt
    .split(WORD_RE)
    .map((p, i) => {
      if (i % 2 === 0) return esc(p);
      const w = words ? words[wi] : null,
        idx = wi++;
      return `<span class="w ${w ? cls(w) : ''}${idx === selWord ? ' sel' : ''}" data-i="${idx}" tabindex="0">${esc(p)}</span>`;
    })
    .join('');
}

function viewHoy() {
  const cur = currentText();
  $('#view').innerHTML = `
  <section class="card">
    <div class="readingHeader">
      <div>
        <p class="eyebrow">${cur.custom ? 'Texto personalizado' : 'Texto del día · ' + esc(cur.tema)}</p>
        <h2>${esc(cur.t)}</h2>
      </div>
      <div class="textActions">
        <button class="mini" id="other" title="Cambiar a otro texto">↻ Otro</button>
        <button class="mini" id="paste" title="Pegar texto personalizado">📋 Pegar</button>
      </div>
    </div>

    <!-- Barra de audio del modelo compacta -->
    <div class="modelBar">
      <div class="player">
        <button class="btn alt miniBtn" id="pPlay">▶ Escuchar</button>
        <button class="btn alt miniBtn" id="pPause" disabled>⏸</button>
        <button class="btn alt miniBtn" id="pStop" disabled>■</button>
      </div>
      <label class="chk" for="slow"><input type="checkbox" id="slow"> Lento</label>
      <span class="live" id="pStatus" style="margin:0; font-size:12px"></span>
    </div>

    <!-- Texto de lectura en foco principal -->
    <div class="reading" id="reading">${readingHTML(cur.txt, result && result.txt === cur.txt ? result.words : null)}</div>

    <!-- Botón principal de grabación inmediatamente visible -->
    <div class="recWrapper">
      <button class="rec" id="rec">● Grabar lectura</button>
      <p class="live" id="live"></p>
      <div class="err" id="err">${cfg.key ? '' : 'Primero configura tu clave de Azure en «Ajustes».'}</div>
    </div>

    <!-- Consejos fonéticos colapsables (para no empujar el texto ni el botón) -->
    ${
      cur.f && cur.f.length
        ? `<details class="how focusDetails" style="margin-top:16px">
             <summary>💡 Consejos fonéticos de hoy (${cur.f.map(k => (F[k] ? F[k][0] : k)).join(', ')})</summary>
             <div class="focus" style="margin-top:10px">
               ${cur.f.map(k => `<div><b>${esc(F[k][0])}</b>${esc(F[k][1])}</div>`).join('')}
             </div>
           </details>`
        : ''
    }
  </section>
  <div id="res"></div>`;

  const slow = $('#slow');
  slow.checked = LS.get('pron-slow', false);
  slow.onchange = () => LS.set('pron-slow', slow.checked);

  $('#pPlay').onclick = () => (player.state === 'paused' ? resumeModel() : speak(cur.txt, slow.checked));
  $('#pPause').onclick = pauseModel;
  $('#pStop').onclick = stopModel;
  updatePlayerUI();

  $('#other').onclick = () => {
    stopModel();
    offset++;
    result = null;
    viewHoy();
  };
  $('#paste').onclick = viewPaste;
  $('#rec').onclick = () => (reco ? stopRec(false) : startRec());
  bindWords();
  if (result && result.txt === cur.txt) renderResult();
}

function bindWords() {
  document.querySelectorAll('#reading .w').forEach(el => {
    const go = () => {
      if (!result) return speak(el.textContent, true);
      selWord = +el.dataset.i;
      showWord();
    };
    el.onclick = go;
    el.onkeydown = e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        go();
      }
    };
  });
}

function diagnoseScore(r, cur) {
  const weakWords = r.words.filter(w => w.st === 'miss' || w.sc < 70);
  const okWords = r.words.filter(w => w.st === 'ok' && w.sc >= 80);
  const subWords = r.words.filter(w => w.st === 'sub');
  const missWords = r.words.filter(w => w.st === 'miss');

  // 1. Explicabilidad de Precisión (60% de la nota)
  let accWhy = '';
  if (r.acc >= 85) {
    accWhy = `Excelente articulación fonética (${r.acc}/100). Pronunciaste claramente ${okWords.length} de ${r.words.length} palabras.`;
  } else if (r.acc >= 70) {
    accWhy = `Buena articulación general (${r.acc}/100), pero ${weakWords.length} palabra(s) bajaron la media: ${weakWords.map(w => w.t + ' (' + (w.st === 'miss' ? 'no detectada' : w.sc + '/100') + ')').join(', ')}.`;
  } else {
    accWhy = `La precisión fue baja (${r.acc}/100) debido a discrepancias acústicas en ${weakWords.length} palabra(s), en especial: ${weakWords.slice(0, 4).map(w => w.t + ' (' + (w.st === 'miss' ? 'no detectada' : w.sc + '/100') + ')').join(', ')}.`;
  }
  if (subWords.length) {
    accWhy += ` Además, el reconocedor escuchó palabras distintas a las esperadas: ${subWords.map(w => `dijiste «${w.heard}» por «${w.t}»`).join(', ')}.`;
  }

  // 2. Explicabilidad de Fluidez (20% de la nota)
  let fluWhy = '';
  if (r.flu >= 85) {
    fluWhy = `Cadencia natural y continua (${r.flu}/100). Mantuviste un ritmo de lectura parejo, con pausas adecuadas en comas y puntos.`;
  } else if (r.flu >= 70) {
    fluWhy = `Ritmo comprensible (${r.flu}/100), pero con pequeñas vacilaciones o pausas antes de palabras complejas.`;
  } else {
    fluWhy = `Fluidez reducida (${r.flu}/100). Se detectaron pausas prolongadas o lectura silábica/entrecortada. Practica leer oraciones completas de corrido.`;
  }

  // 3. Explicabilidad de Completitud (20% de la nota)
  let compWhy = '';
  if (r.comp >= 99) {
    compWhy = `Completitud del 100%. Leíste todas las ${r.words.length} palabras del texto sin omitir ninguna.`;
  } else {
    compWhy = `Completitud del ${r.comp}%. Faltaron ${missWords.length} palabra(s) por leer o no llegaron a captarse por el micrófono: ${missWords.map(w => w.t).join(', ')}.`;
  }

  // 4. Sonidos / Palabras extra
  let extraWhy = '';
  if (r.extra && r.extra.length) {
    extraWhy = `Se registraron palabras o sonidos añadidos que no estaban en la lectura original: ${r.extra.join(', ')}.`;
  }

  // 5. Consejos fonéticos para brasileños
  let tipWhy = '';
  if (cur && cur.f && cur.f.length) {
    const focusItems = cur.f.filter(k => F[k]).map(k => `<b>${esc(F[k][0])}:</b> ${esc(F[k][1])}`);
    if (focusItems.length) {
      tipWhy = focusItems.join('<br>');
    }
  }

  return { accWhy, fluWhy, compWhy, extraWhy, tipWhy };
}

function renderResult() {
  if (!result) return;
  const r = result;
  const cur = currentText();
  const diag = diagnoseScore(r, cur);
  $('#reading').innerHTML = readingHTML(r.txt, r.words);
  bindWords();

  const verdict =
    r.nota >= 85
      ? ['¡Excelente pronunciación!', 'ok-msg']
      : r.nota >= 70
      ? ['Buen intento. Repite las palabras marcadas.', '']
      : ['Práctica recomendada. ¡Ánimo!', 'bad-msg'];

  const weak = r.words
    .map((w, i) => ({ ...w, i }))
    .filter(w => w.st === 'miss' || w.sc < 70)
    .sort((a, b) => a.sc - b.sc);

  $('#res').innerHTML = `
  <section class="card" style="margin-top:20px">
    <p class="eyebrow">Resultado</p>
    <div class="scoreRow">
      <div class="score">${r.nota}<small>/100</small></div>
      <div class="verdict ${verdict[1]}">${verdict[0]}</div>
    </div>
    
    <div class="meters">
      ${meter('Precisión', r.acc)}
      ${meter('Fluidez', r.flu)}
      ${meter('Completo', r.comp)}
    </div>
    
    <div class="legend">
      <span class="l1">Bien (80+)</span>
      <span class="l2">Regular (60–79)</span>
      <span class="l3">Atención (&lt;60)</span>
      <span class="l4">No detectada</span>
    </div>

    <!-- Explicabilidad de los Parámetros y la Nota -->
    <div class="diagCard">
      <h4>¿Por qué obtuviste esta nota?</h4>
      <div class="diagItem">
        <div class="diagHead">Precisión <span>${r.acc}/100 · peso 60%</span></div>
        <p>${diag.accWhy}</p>
      </div>
      <div class="diagItem">
        <div class="diagHead">Fluidez <span>${r.flu}/100 · peso 20%</span></div>
        <p>${diag.fluWhy}</p>
      </div>
      <div class="diagItem">
        <div class="diagHead">Completitud <span>${r.comp}% · peso 20%</span></div>
        <p>${diag.compWhy}</p>
      </div>
      ${
        diag.extraWhy
          ? `<div class="diagItem">
               <div class="diagHead">Palabras añadidas</div>
               <p>${diag.extraWhy}</p>
             </div>`
          : ''
      }
      ${
        diag.tipWhy
          ? `<div class="diagTip">
               <div style="font-weight:600; color:var(--text); margin-bottom:4px">Consejos fonéticos clave para este texto:</div>
               <div>${diag.tipWhy}</div>
             </div>`
          : ''
      }
    </div>
    
    <details class="how" style="margin-top:14px">
      <summary>¿Cómo se calculan las notas?</summary>
      <p><b>Azure Speech:</b> evalúa la acústica de tu voz para cada fonema y palabra, además del ritmo (fluidez).</p>
      <p><b>Fórmula final:</b> 60% precisión + 20% fluidez + 20% completitud del texto.</p>
    </details>
    
    <p class="muted" style="font-size:13px; margin-top:14px">Toca cualquier palabra del texto para ver su desglose fonético y escucharla despacio.</p>
    <div class="detail" id="detail"></div>
    
    <h3>Palabras para repetir</h3>
    ${
      weak.length
        ? `<div class="chips">${weak
            .map(w => `<button class="chip" data-i="${w.i}">${esc(w.t)} · ${w.st === 'miss' ? '—' : w.sc}</button>`)
            .join('')}</div>`
        : '<p class="ok-msg">¡Ninguna! Todo sonó muy claro.</p>'
    }
    
    ${
      r.extra.length
        ? `<h3>Palabras extra escuchadas</h3><div class="chips">${r.extra
            .map(x => `<span class="chip n">${esc(x)}</span>`)
            .join('')}</div>`
        : ''
    }
    
    ${
      r.hasAudio
        ? `<h3>Tu grabación</h3>
           <div class="btns" style="margin-top:0">
             <button class="btn alt" id="myplay" data-play="${r.id}">▶ Escuchar mi audio</button>
             <button class="btn alt" id="mydel">Borrar audio</button>
           </div>`
        : cfg.saveAudio === false
        ? '<p class="muted" style="font-size:13px">Guardar audios está apagado en «Ajustes».</p>'
        : ''
    }
    
    <div class="btns">
      <button class="btn" id="again">Leer otra vez</button>
      <button class="btn alt" id="copy">Copiar para profesor / Claude</button>
    </div>
    <p class="muted" id="copied" style="font-size:12px; margin-top:8px"></p>
  </section>`;

  document.querySelectorAll('#res .chip[data-i]').forEach(b => (b.onclick = () => {
    selWord = +b.dataset.i;
    showWord();
  }));
  $('#again').onclick = () => {
    result = null;
    selWord = -1;
    viewHoy();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  $('#copy').onclick = copySummary;

  const mp = $('#myplay');
  if (mp) {
    mp.onclick = () => toggleMine(mp.dataset.play, mp);
    armBtn($('#mydel'), async () => {
      stopMine();
      try {
        await audioDel(r.id);
      } catch (e) {}
      markAudioDeleted(r.id);
      r.hasAudio = false;
      renderResult();
    });
  }
}

function meter(l, v) {
  return `<div class="meter"><span>${l}</span><div class="bar"><i style="width:${Math.max(0, Math.min(100, v))}%"></i></div><b>${v}</b></div>`;
}

function showWord() {
  const w = result.words[selWord];
  if (!w) return;
  document.querySelectorAll('#reading .w').forEach(el => el.classList.toggle('sel', +el.dataset.i === selWord));
  const col = s => (s >= 80 ? 'var(--ok)' : s >= 60 ? 'var(--warn)' : 'var(--bad)');
  const bg = s => (s >= 80 ? 'var(--ok-bg)' : s >= 60 ? 'var(--warn-bg)' : 'var(--bad-bg)');
  let info =
    w.st === 'miss'
      ? 'No se entendió o no fue pronunciada.'
      : w.st === 'sub'
      ? `Se detectó: «${esc(w.heard)}».`
      : `Nota: ${w.sc}/100`;
  const ph = (w.ph || []).filter(p => p.Phoneme);
  $('#detail').innerHTML = `
    <div class="big">${esc(w.t)}</div>
    <p style="margin:4px 0 8px; color:var(--muted)">${info}</p>
    ${
      ph.length
        ? `<p class="muted" style="font-size:12px; margin:8px 0 4px">Sonidos fonéticos:</p>
           <div class="phon">${ph
             .map(p => {
               const s = Math.round(p.PronunciationAssessment ? p.PronunciationAssessment.AccuracyScore : 0);
               return `<span style="color:${col(s)}; background:${bg(s)}; border: 1px solid ${col(s)}">${esc(
                 p.Phoneme
               )} ${s}</span>`;
             })
             .join('')}</div>`
        : ''
    }
    <div class="btns" style="margin-top:10px">
      <button class="btn alt" id="sayw">▶ Escuchar despacio</button>
    </div>`;
  $('#sayw').onclick = () => speak(w.t, true);
  $('#detail').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function copySummary() {
  const r = result;
  const cur = currentText();
  const diag = diagnoseScore(r, cur);
  const bad = r.words
    .filter(w => w.st !== 'ok' || w.sc < 70)
    .map(w => (w.st === 'miss' ? `${w.t} (no se oyó)` : w.st === 'sub' ? `${w.t} (se oyó «${w.heard}», ${w.sc})` : `${w.t} (${w.sc})`));
  const cleanHtml = s => s.replace(/<[^>]+>/g, '').trim();
  const txt = `Práctica de pronunciación · ${today()} · Acento: ${cfg.lang}
Texto: «${r.title}»
Nota Final: ${r.nota}/100
- Precisión: ${r.acc}/100 (60%) -> ${cleanHtml(diag.accWhy)}
- Fluidez: ${r.flu}/100 (20%) -> ${cleanHtml(diag.fluWhy)}
- Completitud: ${r.comp}% (20%) -> ${cleanHtml(diag.compWhy)}${
    diag.extraWhy ? '\n- ' + cleanHtml(diag.extraWhy) : ''
  }
Palabras para practicar: ${bad.length ? bad.join(', ') : 'Ninguna (¡perfecto!)'}`;
  const done = () => {
    $('#copied').textContent = 'Copiado al portapapeles con éxito.';
  };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, () => fallbackCopy(txt, done));
  else fallbackCopy(txt, done);
}

function fallbackCopy(t, done) {
  const a = document.createElement('textarea');
  a.value = t;
  document.body.appendChild(a);
  a.select();
  try {
    document.execCommand('copy');
    done();
  } catch (e) {
    $('#copied').textContent = 'No pude copiar automáticamente. Selecciona el texto manualmente.';
  }
  a.remove();
}

function viewPaste() {
  $('#view').innerHTML = `
  <section class="card">
    <p class="eyebrow">Texto personalizado</p>
    <h2>Pegar texto</h2>
    <p class="muted">Pega aquí cualquier texto en español que desees entrenar hoy.</p>
    <label for="pt">Título (opcional)</label>
    <input type="text" id="pt" placeholder="Por ejemplo: En el aeropuerto">
    <label for="px">Texto en español</label>
    <textarea id="px" placeholder="Pega el texto aquí…"></textarea>
    <div class="btns">
      <button class="btn" id="psave">Usar este texto</button>
      <button class="btn alt" id="pcancel">Cancelar</button>
    </div>
    <p class="bad-msg" id="perr"></p>
  </section>`;
  $('#pcancel').onclick = viewHoy;
  $('#psave').onclick = () => {
    const txt = $('#px').value.replace(/\s+/g, ' ').trim();
    if (refTokens(txt).length < 3) {
      $('#perr').textContent = 'El texto es muy corto. Escribe al menos una frase completa.';
      return;
    }
    custom = { t: $('#pt').value.trim() || 'Texto personalizado', tema: 'Personalizado', txt, f: [], custom: true, date: today() };
    LS.set('pron-custom', custom);
    offset = 0;
    result = null;
    viewHoy();
  };
}

function viewHist() {
  if (!hist.length) {
    $('#view').innerHTML = `
    <section class="card">
      <p class="eyebrow">Historial</p>
      <h2>Todavía no hay lecturas</h2>
      <p class="muted">Realiza tu primera práctica en la pestaña «Hoy» y tus estadísticas aparecerán aquí.</p>
    </section>`;
    return;
  }
  const last = hist.slice(-20);
  const recent = hist.slice(-30),
    cnt = {};
  recent.forEach(h => (h.weak || []).forEach(w => (cnt[w] = (cnt[w] || 0) + 1)));
  const top = Object.entries(cnt)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);

  $('#view').innerHTML = `
  <section class="card">
    <p class="eyebrow">Progreso</p>
    <h2>Tus últimas notas</h2>
    ${spark(last)}
  </section>
  <section class="card">
    <p class="eyebrow">Para practicar</p>
    <h2>Palabras que más fallas</h2>
    ${
      top.length
        ? `<div class="chips">${top
            .map(([w, n]) => `<button class="chip" data-w="${esc(w)}">${esc(w)} ×${n}</button>`)
            .join('')}</div><p class="muted" style="font-size:12px; margin-top:10px">Toca cualquier palabra para escucharla despacio.</p>`
        : '<p class="ok-msg">Ninguna por ahora.</p>'
    }
  </section>
  <section class="card">
    <p class="eyebrow">Registro</p>
    <h2>Lecturas anteriores</h2>
    <div class="tw">
      <table>
        <tr><th>Día</th><th>Texto</th><th>Nota</th><th>Prec.</th><th>Flu.</th><th style="text-align:right">Audio</th></tr>
        ${hist
          .slice()
          .reverse()
          .slice(0, 40)
          .map(
            h => `
          <tr>
            <td>${esc(h.d.slice(5).split('-').reverse().join('/'))}</td>
            <td>${esc(h.t)}</td>
            <td class="n">${h.nota}</td>
            <td class="n">${h.acc}</td>
            <td class="n">${h.flu}</td>
            <td class="act">${
              h.hasAudio
                ? `<button class="mini" data-play="${h.id}" data-label="▶" data-stop="■" aria-label="Escuchar">▶</button>
                   <button class="mini del" data-del="${h.id}" aria-label="Borrar audio">✕</button>`
                : '—'
            }</td>
          </tr>`
          )
          .join('')}
      </table>
    </div>
    <p class="muted" style="font-size:12px; margin-top:12px">Los audios se guardan en este navegador. Toca ✕ dos veces para borrar.</p>
  </section>`;

  document.querySelectorAll('[data-w]').forEach(b => (b.onclick = () => speak(b.dataset.w, true)));
  document.querySelectorAll('[data-play]').forEach(b => (b.onclick = () => toggleMine(b.dataset.play, b)));
  document.querySelectorAll('[data-del]').forEach(b =>
    armBtn(b, async () => {
      const id = b.dataset.del;
      stopMine();
      try {
        await audioDel(id);
      } catch (e) {}
      markAudioDeleted(id);
      viewHist();
    })
  );
}

function spark(rows) {
  const W = 600,
    H = 120,
    pl = 30,
    pr = 10,
    pt = 15,
    pb = 20,
    n = rows.length;
  const x = i => (n === 1 ? (pl + W - pr) / 2 : pl + (i * (W - pl - pr)) / (n - 1)),
    y = v => pt + ((100 - v) * (H - pt - pb)) / 100;
  const pts = rows.map((r, i) => `${x(i).toFixed(1)},${y(r.nota).toFixed(1)}`).join(' ');
  const grid = [0, 50, 100]
    .map(
      v => `
    <line x1="${pl}" x2="${W - pr}" y1="${y(v)}" y2="${y(v)}" stroke="var(--border)" stroke-width="1"/>
    <text x="${pl - 8}" y="${y(v) + 4}" fill="var(--muted)" font-size="10" text-anchor="end" font-family="sans-serif">${v}</text>`
    )
    .join('');
  const lastR = rows[n - 1];
  return `
  <svg class="spark" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="Notas de las últimas lecturas">
    ${grid}
    <polyline points="${pl},${y(0)} ${pts} ${x(n - 1)},${y(0)}" fill="rgba(99, 102, 241, 0.12)" stroke="none"/>
    <polyline points="${pts}" fill="none" stroke="var(--primary)" stroke-width="2.5" vector-effect="non-scaling-stroke"/>
    <circle cx="${x(n - 1)}" cy="${y(lastR.nota)}" r="4.5" fill="var(--cyan)"/>
  </svg>`;
}

function viewCfg() {
  $('#view').innerHTML = `
  <section class="card">
    <p class="eyebrow">Configuración</p>
    <h2>Tu cuenta de Azure</h2>
    <p class="muted">La clave se guarda únicamente en tu propio navegador. No pasa por ningún servidor intermediario.</p>
    
    <label for="ck">Clave (Key 1)</label>
    <input type="password" id="ck" value="${esc(cfg.key)}" autocomplete="off" spellcheck="false" placeholder="Pega tu clave de Azure Speech">
    
    <label for="cr">Región</label>
    <input type="text" id="cr" value="${esc(cfg.region)}" list="regions" autocomplete="off" spellcheck="false" placeholder="ej: brazilsouth">
    <datalist id="regions">
      <option value="brazilsouth">
      <option value="eastus">
      <option value="eastus2">
      <option value="westus2">
      <option value="southcentralus">
      <option value="westeurope">
    </datalist>
    
    <label for="cl">Acento</label>
    <select id="cl">
      <option value="es-MX"${cfg.lang === 'es-MX' ? ' selected' : ''}>Latinoamérica (México)</option>
      <option value="es-ES"${cfg.lang === 'es-ES' ? ' selected' : ''}>España</option>
    </select>
    
    <label for="cv">Voz del modelo</label>
    <select id="cv"></select>
    
    <label for="cs">Guardar mis grabaciones</label>
    <select id="cs">
      <option value="1"${cfg.saveAudio !== false ? ' selected' : ''}>Sí, para comparar mi evolución</option>
      <option value="0"${cfg.saveAudio === false ? ' selected' : ''}>No guardar</option>
    </select>
    
    <div class="btns">
      <button class="btn" id="csave">Guardar ajustes</button>
      <button class="btn alt" id="ctest">Probar conexión</button>
    </div>
    <p id="cmsg" style="margin-top:10px"></p>
    <p class="muted" style="font-size:12px; margin-top:12px">El paso a paso para crear tu recurso gratis en Azure y obtener tu clave está en el <a href="README.md#paso-1-crear-la-clave-en-azure" target="_blank" style="color:var(--cyan); text-decoration:underline">README.md</a>.</p>
  </section>

  <section class="card">
    <p class="eyebrow">Sincronización</p>
    <h2>Google Drive (Opcional)</h2>
    <p class="muted">Permite sincronizar tus lecturas, notas y grabaciones entre dispositivos usando tu propio Google Drive (carpeta oculta privada <code>appDataFolder</code>).</p>
    
    ${
      !clientId()
        ? `
      <div style="background:var(--bg); border:1px solid var(--border); border-radius:var(--radius-md); padding:16px; margin:16px 0">
        <div style="font-weight:600; color:var(--text); margin-bottom:6px">Paso 1: Ingresar tu Client ID de Google</div>
        <p class="muted" style="font-size:13px; margin:0 0 12px">Para conectar con Google Drive directamente desde el navegador, se requiere un Client ID de OAuth2 (gratuito). Consulta el <a href="README.md#paso-1-crear-el-client-id-de-google-se-hace-una-sola-vez" target="_blank" style="color:var(--cyan); text-decoration:underline">paso a paso en el README</a> para generarlo en Google Cloud Console.</p>
        <label for="gci" style="margin-top:0">Client ID de Google</label>
        <input type="text" id="gci" value="${esc(meta.clientId || '')}" placeholder="ej: 123456789-xxxx.apps.googleusercontent.com" autocomplete="off" spellcheck="false">
        <div class="btns" style="margin-top:10px">
          <button class="btn" id="gcis">Guardar y habilitar sincronización</button>
        </div>
        <p id="gmsg3" style="margin-top:8px"></p>
      </div>`
        : `
      <div class="btns">
        <button class="btn" id="gconn">Conectar y sincronizar</button>
        <button class="btn alt" id="gdisc">Desconectar</button>
      </div>
      <p id="gmsg" style="margin-top:10px"></p>

      <h3>Transferir clave de Azure a otros dispositivos</h3>
      <p class="muted">Guarda tu clave de Azure cifrada en Drive con una contraseña personal (AES-GCM-256) para recuperarla en tu celular sin copiarla a mano.</p>
      <label for="gp">Contraseña de cifrado (mínimo 8 caracteres)</label>
      <input type="password" id="gp" autocomplete="new-password" placeholder="Tu contraseña privada">
      <div class="btns">
        <button class="btn alt" id="gsave">Guardar clave cifrada</button>
        <button class="btn alt" id="gload">Traer mi clave</button>
      </div>
      <p id="gmsg2" style="margin-top:10px"></p>

      <details style="margin-top:20px; font-size:13px; color:var(--muted)">
        <summary style="cursor:pointer; color:var(--cyan); font-weight:500">Configuración avanzada de Drive</summary>
        <div style="margin-top:10px">
          <label for="gci">Client ID de Google actual</label>
          <input type="text" id="gci" value="${esc(meta.clientId || '')}" placeholder="${esc(GOOGLE_CLIENT_ID || 'xxxx.apps.googleusercontent.com')}" autocomplete="off" spellcheck="false">
          <div class="btns" style="margin-top:10px">
            <button class="btn alt" id="gcis">Actualizar Client ID</button>
            <button class="btn alt" id="gwipe">Borrar datos de Drive</button>
          </div>
          <p id="gmsg3" style="margin-top:10px"></p>
        </div>
      </details>`
    }
  </section>

  <section class="card">
    <p class="eyebrow">Control de cuota</p>
    <h2>Límites del plan gratuito (F0)</h2>
    <p class="muted">El plan Free F0 de Azure incluye 5 horas de evaluación y 500.000 caracteres de voz al mes. La aplicación contabiliza automáticamente cada segundo grabado y cada carácter reproducido.</p>
    <label for="lh">Límite de horas de grabación al mes</label>
    <input type="number" id="lh" min="0.1" step="0.5" inputmode="decimal" value="${cfg.limStt}">
    <label for="lc">Límite de caracteres de voz al mes</label>
    <input type="number" id="lc" min="1000" step="1000" inputmode="numeric" value="${cfg.limTts}">
    <div class="btns">
      <button class="btn" id="usave">Guardar límites</button>
    </div>
    <p id="umsg" style="margin-top:10px"></p>
  </section>

  <section class="card">
    <p class="eyebrow">Almacenamiento</p>
    <h2>Tus grabaciones locales</h2>
    <p id="astat" class="muted" style="margin-bottom:12px"></p>
    <div class="btns">
      <button class="btn alt" id="adel">Borrar todas las grabaciones</button>
    </div>
    <p id="adelmsg" class="ok-msg" style="margin-top:10px"></p>
  </section>

  <section class="card">
    <p class="eyebrow">Zona de peligro</p>
    <h2>Borrar todo el historial</h2>
    <p class="muted">Elimina definitivamente todas tus notas, estadísticas y audios de este dispositivo.</p>
    <div class="btns">
      <button class="btn alt" id="cdel">Borrar historial completo</button>
    </div>
    <p id="cdelmsg" style="margin-top:10px"></p>
  </section>`;

  const read = () => ({
    key: $('#ck').value.trim(),
    region: $('#cr').value.trim().toLowerCase().replace(/\s+/g, ''),
    lang: $('#cl').value,
    voice: $('#cv').value,
    saveAudio: $('#cs').value === '1'
  });

  const fillVoices = () => {
    const l = VOICES[$('#cl').value] || VOICES['es-MX'];
    $('#cv').innerHTML = l
      .map(v => `<option value="${v[0]}"${v[0] === cfg.voice ? ' selected' : ''}>${v[1]}</option>`)
      .join('');
  };
  fillVoices();
  $('#cl').onchange = fillVoices;

  $('#csave').onclick = () => {
    cfg = Object.assign({}, cfg, read());
    LS.set('pron-cfg', cfg);
    pickVoice();
    try {
      if (navigator.storage && navigator.storage.persist) navigator.storage.persist();
    } catch (e) {}
    $('#cmsg').className = 'ok-msg';
    $('#cmsg').textContent = 'Ajustes guardados con éxito.';
  };

  $('#ctest').onclick = async () => {
    const c = read(),
      m = $('#cmsg');
    m.className = '';
    m.textContent = 'Probando conexión con Azure…';
    try {
      const r = await fetch(`https://${c.region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`, {
        method: 'POST',
        headers: { 'Ocp-Apim-Subscription-Key': c.key }
      });
      if (r.ok) {
        m.className = 'ok-msg';
        m.textContent = '¡Conexión exitosa! Clave y región válidas.';
      } else {
        m.className = 'bad-msg';
        m.textContent = `Azure respondió con error ${r.status}. Verifica la clave y la región.`;
      }
    } catch (e) {
      m.className = 'bad-msg';
      m.textContent = 'No fue posible conectar. Revisa la región y tu conexión.';
    }
  };

  const gm = (id, ok, t) => {
    const e = $(id);
    if (!e) return;
    e.className = ok ? 'ok-msg' : 'bad-msg';
    e.textContent = t;
  };

  const gconn = $('#gconn');
  if (gconn) {
    gconn.onclick = async () => {
      gm('#gmsg', true, 'Conectando con Google…');
      await syncNow(true);
      gm('#gmsg', syncState.st !== 'err', syncState.st === 'err' ? syncState.msg : 'Sincronización completada.');
    };
  }

  const gdisc = $('#gdisc');
  if (gdisc) {
    gdisc.onclick = () => {
      try {
        if (tok && window.google && google.accounts && google.accounts.oauth2.revoke) {
          google.accounts.oauth2.revoke(tok.access_token, () => {});
        }
      } catch (e) {}
      tok = null;
      meta.connected = false;
      saveMeta();
      syncNote = '';
      setSync('off', '');
      gm('#gmsg', true, 'Desconectado de Google Drive. Los datos locales permanecen intactos.');
    };
  }

  const gcis = $('#gcis');
  if (gcis) {
    gcis.onclick = () => {
      const elGci = $('#gci');
      if (elGci) meta.clientId = elGci.value.trim();
      saveMeta();
      tok = null;
      renderCloud();
      viewCfg();
      gm('#gmsg', true, 'Client ID guardado con éxito.');
    };
  }

  const gwipe = $('#gwipe');
  if (gwipe) {
    armBtn(gwipe, async () => {
      try {
        await getToken(true);
        const files = await driveList();
        for (const n in files) await driveDel(files[n].id);
        meta.lastSync = 0;
        saveMeta();
        renderCloud();
        gm('#gmsg3', true, 'Datos de Google Drive eliminados.');
      } catch (e) {
        gm('#gmsg3', false, e.message);
      }
    });
  }

  const gsave = $('#gsave');
  if (gsave) {
    gsave.onclick = async () => {
      const pw = $('#gp').value,
        m = '#gmsg2';
      if (pw.length < 8) {
        gm(m, false, 'La contraseña debe tener al menos 8 caracteres.');
        return;
      }
      const c = Object.assign({}, cfg, read());
      if (!c.key) {
        gm(m, false, 'Ingresa tu clave de Azure primero.');
        return;
      }
      try {
        gm(m, true, 'Cifrando credenciales…');
        const env = await encJSON(
          {
            key: c.key,
            region: c.region,
            lang: c.lang,
            voice: c.voice,
            saveAudio: c.saveAudio,
            limStt: c.limStt,
            limTts: c.limTts
          },
          pw
        );
        await getToken(true);
        const files = await driveList();
        await drivePut('config.enc.json', new Blob([JSON.stringify(env)], { type: 'application/json' }), 'application/json', files['config.enc.json']);
        gm(m, true, 'Clave cifrada y guardada en tu Google Drive.');
      } catch (e) {
        gm(m, false, e.message || 'No se pudo guardar la clave.');
      }
    };
  }

  const gload = $('#gload');
  if (gload) {
    gload.onclick = async () => {
      const pw = $('#gp').value,
        m = '#gmsg2';
      if (!pw) {
        gm(m, false, 'Ingresa tu contraseña de descifrado.');
        return;
      }
      try {
        gm(m, true, 'Buscando en Drive…');
        await getToken(true);
        const files = await driveList();
        if (!files['config.enc.json']) {
          gm(m, false, 'No hay ninguna clave guardada en Drive.');
          return;
        }
        const env = await driveGet(files['config.enc.json'].id, 'json');
        let c;
        try {
          c = await decJSON(env, pw);
        } catch (e) {
          gm(m, false, 'Contraseña incorrecta.');
          return;
        }
        cfg = Object.assign({}, cfg, c);
        LS.set('pron-cfg', cfg);
        pickVoice();
        syncNote = '';
        renderCloud();
        renderUsage();
        viewCfg();
        gm('#gmsg2', true, '¡Listo! Tu clave se recuperó y guardó en este dispositivo.');
      } catch (e) {
        gm(m, false, e.message || 'Error al obtener la clave.');
      }
    };
  }

  $('#usave').onclick = () => {
    const lh = parseFloat($('#lh').value),
      lc = parseFloat($('#lc').value),
      m = $('#umsg');
    if (!(lh > 0 && lc > 0)) {
      m.className = 'bad-msg';
      m.textContent = 'Verifica que los límites sean mayores a cero.';
      return;
    }
    cfg.limStt = lh;
    cfg.limTts = lc;
    LS.set('pron-cfg', cfg);
    renderUsage();
    m.className = 'ok-msg';
    m.textContent = 'Límites actualizados con éxito.';
  };

  async function refreshAudioStat() {
    const n = hist.filter(h => h.hasAudio).length;
    let extra = '';
    try {
      if (navigator.storage && navigator.storage.estimate) {
        const e = await navigator.storage.estimate();
        extra = ' · ' + (e.usage / 1048576).toFixed(1) + ' MB usados';
      }
    } catch (x) {}
    const el = $('#astat');
    if (el) el.textContent = n + ' grabaciones almacenadas' + extra;
  }
  refreshAudioStat();

  armBtn($('#adel'), async () => {
    stopMine();
    try {
      await audioClear();
    } catch (e) {}
    hist.forEach(h => {
      if (h.hasAudio) {
        h.hasAudio = false;
        h.adel = true;
      }
    });
    LS.set('pron-hist', hist);
    syncSoon();
    $('#adelmsg').textContent = 'Todas las grabaciones fueron eliminadas.';
    refreshAudioStat();
  });

  let armed = false;
  $('#cdel').onclick = () => {
    if (!armed) {
      armed = true;
      $('#cdel').textContent = 'Toca otra vez para confirmar borrado';
      return;
    }
    hist = [];
    LS.set('pron-hist', hist);
    meta.clearedAt = Date.now();
    saveMeta();
    syncSoon();
    audioClear().catch(() => {});
    refreshAudioStat();
    renderStat();
    $('#cdel').textContent = 'Borrar historial completo';
    armed = false;
    $('#cdelmsg').textContent = 'Historial y grabaciones eliminados con éxito.';
  };
}

/* ---------- Inicialização e Navegação ---------- */
let curView = 'hoy';

function go(v) {
  curView = v;
  if (reco) stopRec(true);
  stopModel();
  stopMine();
  document.querySelectorAll('.tab').forEach(t => t.setAttribute('aria-selected', t.dataset.v === v));
  ({ hoy: viewHoy, hist: viewHist, cfg: viewCfg })[v]();
}

document.querySelectorAll('.tab').forEach(t => (t.onclick = () => go(t.dataset.v)));
renderStat();
renderUsage();
renderCloud();
setInterval(renderCloud, 60000);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && meta.connected && haveToken()) syncNow(false);
});

go(cfg.key ? 'hoy' : 'cfg');

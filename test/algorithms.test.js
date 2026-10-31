import { test } from 'node:test';
import assert from 'node:assert/strict';

/* ---------- Funções a serem testadas ---------- */
function lev(a, b) {
  const m = a.length, n = b.length;
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
  const n = ref.length, m = hyp.length, D = [], B = [];
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
      const a = ref[i - 1], b = hyp[j - 1];
      const sub = a === b ? 0 : Math.min(1.9, 0.2 + 1.6 * (lev(a, b) / Math.max(a.length, b.length)));
      let best = D[i - 1][j - 1] + sub, bk = 1;
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
  const map = new Array(n).fill(-1), ins = [];
  let i = n, j = m;
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

const WORD_RE = /([A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)/;
function refTokens(txt) {
  const parts = txt.split(WORD_RE), toks = [];
  parts.forEach((p, i) => {
    if (i % 2 === 1) toks.push(p);
  });
  return toks;
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
        const cur = usage[mo][d], nw = U[mo][d];
        if (!cur || (nw.t || 0) >= (cur.t || 0)) usage[mo][d] = nw;
      }
    }
  });
  const ks = Object.keys(usage).sort();
  while (ks.length > 12) delete usage[ks.shift()];
  return { hist, usage, clearedAt };
}

/* ---------- Testes Unitários ---------- */

test('lev: calcula distância de edição com precisão', () => {
  assert.equal(lev('', ''), 0);
  assert.equal(lev('casa', 'casa'), 0);
  assert.equal(lev('casa', 'caza'), 1);
  assert.equal(lev('perro', 'pero'), 1);
  assert.equal(lev('buenos', 'buenas'), 1);
});

test('refTokens: extrai apenas palavras alfanuméricas descartando pontuação', () => {
  const txt = '¡Hola, buenos días! ¿Cómo estás?';
  const toks = refTokens(txt);
  assert.deepEqual(toks, ['Hola', 'buenos', 'días', 'Cómo', 'estás']);
});

test('align: mapeia correspondência exata entre texto de referência e hipótese', () => {
  const ref = ['hoy', 'estoy', 'trabajando', 'en', 'casa'];
  const hyp = ['hoy', 'estoy', 'trabajando', 'en', 'casa'];
  const { map, ins } = align(ref, hyp);
  assert.deepEqual(map, [0, 1, 2, 3, 4]);
  assert.deepEqual(ins, []);
});

test('align: identifica omissão de palavras', () => {
  const ref = ['hoy', 'estoy', 'trabajando', 'en', 'casa'];
  const hyp = ['hoy', 'trabajando', 'en', 'casa']; // 'estoy' foi omitido
  const { map, ins } = align(ref, hyp);
  assert.equal(map[0], 0); // hoy -> hoy
  assert.equal(map[1], -1); // estoy -> não detectado (-1)
  assert.equal(map[2], 1); // trabajando -> trabajando
  assert.equal(map[3], 2); // en -> en
  assert.equal(map[4], 3); // casa -> casa
});

test('align: identifica inserções extras', () => {
  const ref = ['buenos', 'días'];
  const hyp = ['ah', 'buenos', 'días'];
  const { map, ins } = align(ref, hyp);
  assert.deepEqual(map, [1, 2]);
  assert.deepEqual(ins, [0]); // token 0 ('ah') é inserção extra
});

test('mergeData: une históricos de dispositivos distintos sem duplicação', () => {
  const deviceA = {
    hist: [{ id: '1', ts: 100, t: 'Texto 1', nota: 85 }],
    usage: { '2026-10': { devA: { stt: 30, tts: 200, t: 100 } } },
    clearedAt: 0
  };
  const deviceB = {
    hist: [{ id: '2', ts: 200, t: 'Texto 2', nota: 90 }],
    usage: { '2026-10': { devB: { stt: 45, tts: 350, t: 200 } } },
    clearedAt: 0
  };
  const merged = mergeData(deviceA, deviceB);
  assert.equal(merged.hist.length, 2);
  assert.equal(merged.hist[0].id, '1');
  assert.equal(merged.hist[1].id, '2');
  assert.equal(merged.usage['2026-10'].devA.stt, 30);
  assert.equal(merged.usage['2026-10'].devB.stt, 45);
});

test('mergeData: propaga exclusão de áudio (tombstone adel)', () => {
  const deviceA = {
    hist: [{ id: '1', ts: 100, t: 'Texto 1', hasAudio: true }],
    clearedAt: 0
  };
  const deviceB = {
    hist: [{ id: '1', ts: 100, t: 'Texto 1', hasAudio: false, adel: true }],
    clearedAt: 0
  };
  const merged = mergeData(deviceA, deviceB);
  assert.equal(merged.hist.length, 1);
  assert.equal(merged.hist[0].hasAudio, false);
});

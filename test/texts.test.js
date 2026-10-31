import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const code = fs.readFileSync(new URL('../js/texts.js', import.meta.url), 'utf8');
const ctx = {};
ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInContext(code, ctx);

const { TEXTS, CATEGORIES, LEVELS, filterTexts, getUniqueCountries } = ctx;

const VALID_PHONETICS = new Set(['rr', 'dt', 'j', 'e', 'v', 'll', 'c', 'nas', 'l', 's', 'cion', 'h', 'ger', 'n']);
const VALID_LEVELS = new Set(['A1', 'A2', 'B1', 'B2']);
const VALID_CATEGORIES = new Set(['literatura', 'poesia', 'musica', 'saberes-originarios', 'cultura', 'historia']);

test('texts: acervo possui no mínimo 100 textos classificados', () => {
  assert(TEXTS && TEXTS.length >= 100, `Esperado >= 100 textos, encontrado: ${TEXTS ? TEXTS.length : 0}`);
});

test('texts: todos os IDs são únicos e não há textos duplicados', () => {
  const ids = new Set();
  const texts = new Set();
  for (const item of TEXTS) {
    assert(!ids.has(item.id), `ID duplicado detectado: ${item.id}`);
    ids.add(item.id);

    const normTxt = item.txt.trim().toLowerCase();
    assert(!texts.has(normTxt), `Texto duplicado detectado no id: ${item.id}`);
    texts.add(normTxt);
  }
});

test('texts: cada texto possui todos os campos obrigatórios válidos', () => {
  const required = ['id', 't', 'autor', 'obra', 'categoria', 'pais', 'nivel', 'f', 'txt', 'tema'];
  for (const item of TEXTS) {
    for (const f of required) {
      assert(item[f], `Campo ausente ou vazio '${f}' no texto ${item.id}`);
    }
    assert(VALID_LEVELS.has(item.nivel), `Nível inválido '${item.nivel}' no texto ${item.id}`);
    assert(VALID_CATEGORIES.has(item.categoria), `Categoria inválida '${item.categoria}' no texto ${item.id}`);
    assert(Array.isArray(item.f) && item.f.length > 0, `Array de tags fonéticas 'f' inválido no texto ${item.id}`);
  }
});

test('texts: todas as tags fonéticas estão mapeadas no guia fonético', () => {
  for (const item of TEXTS) {
    for (const tag of item.f) {
      assert(VALID_PHONETICS.has(tag), `Tag fonética desconhecida '${tag}' no texto ${item.id}`);
    }
  }
});

test('texts: extensões dos textos respeitam a faixa ideal (20 a 60 palavras)', () => {
  for (const item of TEXTS) {
    const words = (item.txt.match(/[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ0-9]+/g) || []).length;
    assert(
      words >= 20 && words <= 60,
      `Texto ${item.id} fora da faixa de palavras (encontradas: ${words}): "${item.txt.slice(0, 40)}..."`
    );
  }
});

test('texts: filterTexts realiza filtragens corretas por categoria, país, nível e busca', () => {
  // Filtro por categoria
  const lit = filterTexts(TEXTS, { category: 'literatura' });
  assert(lit.length > 0);
  assert(lit.every(t => t.categoria === 'literatura'));

  // Filtro por país
  const cuba = filterTexts(TEXTS, { country: 'Cuba' });
  assert(cuba.length > 0);
  assert(cuba.every(t => t.pais === 'Cuba'));

  // Filtro por nível
  const b2 = filterTexts(TEXTS, { level: 'B2' });
  assert(b2.length > 0);
  assert(b2.every(t => t.nivel === 'B2'));

  // Busca textual
  const searchGaleano = filterTexts(TEXTS, { query: 'Galeano' });
  assert(searchGaleano.length >= 2);

  // Busca combinada
  const combo = filterTexts(TEXTS, { category: 'musica', level: 'A1' });
  assert(combo.length > 0);
  assert(combo.every(t => t.categoria === 'musica' && t.nivel === 'A1'));
});

test('texts: getUniqueCountries retorna países ordenados sem repetição', () => {
  const countries = getUniqueCountries(TEXTS);
  assert(countries.length >= 15);
  for (let i = 0; i < countries.length - 1; i++) {
    assert(countries[i].localeCompare(countries[i + 1], 'es') <= 0, 'Lista de países deve ser ordenada');
  }
});

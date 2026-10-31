import { test } from 'node:test';
import assert from 'node:assert/strict';

/* ---------- Funções Criptográficas ---------- */
const b64 = u => Buffer.from(u).toString('base64');
const unb64 = t => new Uint8Array(Buffer.from(t, 'base64'));

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

test('crypto: cifra e decifra dados com PBKDF2 e AES-GCM-256', async () => {
  const payload = { key: 'azure-key-1234567890', region: 'brazilsouth', lang: 'es-MX' };
  const password = 'MinhaSenhaSegura123!';

  const encrypted = await encJSON(payload, password);
  assert.equal(encrypted.v, 1);
  assert.equal(encrypted.cipher, 'AES-GCM-256');
  assert.ok(encrypted.salt);
  assert.ok(encrypted.iv);
  assert.ok(encrypted.ct);

  const decrypted = await decJSON(encrypted, password);
  assert.deepEqual(decrypted, payload);
});

test('crypto: falha ao tentar decifrar com senha incorreta', async () => {
  const payload = { secret: 'dados-confidenciais' };
  const password = 'SenhaCorreta123!';
  const wrongPassword = 'SenhaIncorreta!';

  const encrypted = await encJSON(payload, password);
  await assert.rejects(async () => {
    await decJSON(encrypted, wrongPassword);
  });
});

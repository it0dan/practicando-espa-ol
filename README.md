# Pronunciación diaria

Una página web para practicar la pronunciación en español, todos los días, con evaluación real de Azure.

1. La página te muestra un texto diario de literatura latinoamericana, poesía, música o saberes de pueblos originarios.
2. Tú lo lees en voz alta y grabas.
3. Azure evalúa tu pronunciación palabra por palabra.
4. Ves una nota, las palabras para repetir, y guardas tu audio para comparar tu evolución.
5. Un medidor te muestra cuánto del plan gratis de Azure llevas gastado en el mes.

Está pensada para **hablantes de portugués** que aprenden español: los textos y los consejos de sonido (J, RR, D/T, vocales finales…) son los que más cuestan a los brasileños.

No hay cuenta ni instalación. La página **no trae ninguna clave**: cada persona usa la suya, de su propia cuenta de Azure.

---

## Qué necesitas

- Una cuenta de Azure (gratis para empezar). Azure pide una tarjeta para verificar la cuenta.
- Un recurso **Speech** de Azure con plan **Free F0**.
- Un navegador moderno (Chrome, Edge, Safari o Firefox) con micrófono.

---

## Paso 1: crear la clave en Azure

1. Entra en <https://portal.azure.com> e inicia sesión.
2. Arriba, en el buscador, escribe **Speech** (o «Servicios de voz») y elige **Speech services**.
   También puedes ir a **Crear un recurso** → **Marketplace** → buscar *Speech*.
3. Toca **Crear**. Completa la pestaña **Basics**:

   | Campo | Qué poner |
   |---|---|
   | Suscripción | La tuya (por ejemplo, *Pay-As-You-Go*) |
   | Grupo de recursos | **Crear nuevo**, por ejemplo `speech` |
   | Región | Una cercana a ti. Para Brasil: **Brazil South**. **Anota la región.** |
   | Nombre | El que quieras, por ejemplo `speech-espanol` |
   | Plan de tarifa | **Free F0** |

4. Deja las demás pestañas como están (Red: *Todas las redes*, Identity: *None*, Etiquetas: opcional).
5. En **Revisar y crear**, toca **Crear**. Espera 1 o 2 minutos.
6. Toca **Ir al recurso**.
7. En el menú de la izquierda, entra en **Claves y punto de conexión** (*Keys and Endpoint*).
8. Copia **CLAVE 1** (*KEY 1*). Es una cadena larga de letras y números.
9. Mira el campo **Ubicación / Región** de esa misma pantalla. Se escribe en minúsculas y sin espacios, por ejemplo `brazilsouth`, `eastus` o `westeurope`.

> **Importante:** la clave es como una contraseña. No la publiques, no la subas a GitHub, no la pegues en capturas de pantalla. Si se filtra, en la misma pantalla de Azure toca **Regenerar clave**.

---

## Paso 2: poner la clave en la página

1. Abre la página y entra en la pestaña **Ajustes**.
2. Pega tu **clave** y tu **región** (las del paso 1).
3. Elige tu acento (Latinoamérica o España) y la voz del modelo.
4. Toca **Guardar** y luego **Probar clave**. Debe decir «¡Funciona!».
5. Ve a **Hoy**. Toca **Play** para escuchar el modelo. Después toca **Grabar**, lee el texto y toca **Terminar**.

El micrófono necesita una dirección **HTTPS** (o `localhost`). Las páginas publicadas en GitHub Pages ya la tienen.

### Dónde queda guardada tu clave

- Solo en **tu navegador**, en este aparato (`localStorage`). No está en el archivo de la página, ni en GitHub, ni en ningún servidor del proyecto.
- Se escribe **una vez por aparato**. Ya no tienes que ponerla cada día.
- La pierdes si borras los datos del sitio en el navegador. Entonces vuelves a pegarla, o la traes de Google Drive (ver más abajo).
- **iPhone / Safari:** Safari borra los datos de las páginas que no abres en unos días. Para evitarlo, usa **Compartir → Agregar a pantalla de inicio**.
- La clave solo sale de tu aparato para hablar con Azure.
- En un sitio como `tu-usuario.github.io`, todas las páginas del mismo usuario comparten el almacenamiento del navegador. No publiques en ese mismo usuario otras páginas con código de terceros.

---

## Medidor de uso del mes

Arriba de la página hay dos barras que muestran cuánto llevas gastado este mes:

| Barra | Qué cuenta | Límite gratis (F0) |
|---|---|---|
| **Grabaciones** | Los segundos que grabas | 5 horas por mes |
| **Voz del modelo** | Los caracteres que Azure convierte en voz (cada texto o palabra que escuchas) | 500 000 caracteres por mes (voces neuronales) |

Fuente: [precios de Azure Speech](https://azure.microsoft.com/pricing/details/speech/). Azure cobra la evaluación de pronunciación como «voz a texto estándar», por eso cuenta en las mismas 5 horas. Los límites pueden cambiar: revisa la página de precios.

- La barra se pone **amarilla** desde el 80 % y **roja** al llegar al 100 %.
- Al llegar al 100 %, la página **no te deja grabar** (o usa la voz del navegador para el modelo) hasta el próximo mes. Puedes cambiar los límites en **Ajustes → Límites del mes**.
- Los contadores empiezan de cero cada mes calendario.
- **Contabilización automática.** La página cuenta automáticamente cada segundo de micrófono y cada carácter reproducido. Con Google Drive conectado, suma el uso de todos tus aparatos en tiempo real. Los contadores empiezan de cero cada mes calendario.
- Las voces que ya escuchaste en la misma sesión se guardan en memoria y no vuelven a gastar caracteres.

---

## Sincronizar entre aparatos (Google Drive, opcional)

Si usas la página en el celular y en la computadora, puedes tener el mismo historial, los mismos audios y las mismas estadísticas en todos tus dispositivos.

Todo va a una **carpeta oculta de tu propio Google Drive** (`appDataFolder`), reservada exclusivamente para esta página. Solo tu cuenta de Google tiene acceso; no hay servidores intermediarios.

| Archivo en Drive | Contenido |
|---|---|
| `data.json` | Historial de lecturas y contador de uso |
| `a-<id>` (uno por lectura) | Tus grabaciones de audio |
| `config.enc.json` | Tu clave de Azure cifrada con contraseña privada (opcional) |

---

### Paso 1: Crear el Client ID de Google (se hace una sola vez)

Para que el navegador pueda hablar directamente con tu Google Drive sin servidores de por medio, Google exige un **Client ID de OAuth (Web)**. Es gratuito y no es un secreto (es un identificador público, no usa ningún «client secret»).

1. Entra en <https://console.cloud.google.com> con tu cuenta de Google.
2. Crea un proyecto nuevo (por ejemplo: `pronunciacion-espanol`).
3. En el menú lateral: **APIs y servicios** → **Biblioteca** → busca **Google Drive API** → haz clic en **Habilitar**.
4. Ve a **Pantalla de consentimiento de OAuth** (o *Google Auth Platform*):
   - Tipo de usuario: **Externo**.
   - Completa el nombre de la app (ej: `Pronunciación diaria`) y tu correo electrónico de contacto.
   - En **Permisos (Scopes)**: agrega `https://www.googleapis.com/auth/drive.appdata` (acceso únicamente a la carpeta oculta de la app, sin ver tus demás archivos).
   - En **Usuarios de prueba**: añade tu propio correo de Gmail para poder entrar mientras esté en modo prueba (o pásala a *Producción* para cualquier usuario).
5. Ve a **Credenciales** → **Crear credenciales** → **ID de cliente de OAuth**:
   - Tipo de aplicación: **Aplicación web**.
   - Nombre: `Pronunciación diaria`.
   - **Orígenes autorizados de JavaScript**: escribe la dirección exacta de tu GitHub Pages, **solo el dominio, sin ruta ni barra final**.  
     Por ejemplo: `https://it0dan.github.io`
6. Haz clic en **Crear** y copia el **ID de cliente** generado (termina en `.apps.googleusercontent.com`).

---

### Paso 2: Configurar el Client ID en la aplicación

Tienes dos formas de activarlo:

* **Opción A (Recomendada para tu propio GitHub Pages):**  
  Abre `js/app.js`, busca la línea:
  ```javascript
  const GOOGLE_CLIENT_ID = '';
  ```
  Pega tu Client ID entre las comillas (ej: `const GOOGLE_CLIENT_ID = '123456789.apps.googleusercontent.com';`), haz `git commit` y `git push`. Así quedará activo para siempre en todos tus aparatos sin tener que escribirlo de nuevo.

* **Opción B (Directamente en la página):**  
  En la página web, ve a la pestaña **Ajustes** → **Google Drive**, pega el Client ID en el campo correspondiente y haz clic en **Guardar Client ID**.

---

### Paso 3: Conectar y sincronizar

1. En tu primer aparato: entra en **Ajustes** → **Google Drive** → toca **Conectar y sincronizar**. Selecciona tu cuenta de Google y concede el permiso.
2. Para transferir tu clave de Azure a otros dispositivos sin copiarla a mano:
   - En **Mi clave de Azure en Drive**: escribe una contraseña privada (mínimo 8 caracteres) y toca **Guardar clave cifrada** (se cifra en tu navegador con AES-GCM-256).
3. En cada nuevo aparato (ej: tu celular):
   - Entra en **Ajustes** → **Google Drive** → toca **Conectar y sincronizar**.
   - Escribe la contraseña que elegiste y toca **Traer mi clave**. ¡Listo! Tu historial, audios y clave se sincronizan automáticamente.

---

### Cómo funciona la sincronización

- **Cifrado local**: Tu clave de Azure se cifra en el navegador con PBKDF2 (250.000 iteraciones) y AES-GCM-256 antes de salir hacia Google. Si olvidas la contraseña, la clave no puede recuperarse: tendrías que volver a pegarla desde Azure.
- **Sin pérdida de datos**: Dos aparatos nunca sobrescriben el historial del otro; las lecturas se unen automáticamente (`merge`).
- **Descarga bajo demanda**: Los audios grabados en la computadora solo se descargan en el celular cuando tocas reproducir, ahorrando almacenamiento y datos móviles.
- **Sesión de Google**: El token de Google dura 1 hora. Si vence, la barra superior muestra *"Drive desconectado"*: solo toca **Reconectar** para continuar sincronizando.

---

## Cómo se calcula la nota

La evaluación viene de **Azure Speech (Pronunciation Assessment)**. La página hace unas cuentas encima.

| Dato | De dónde viene |
|---|---|
| Nota de cada palabra (0 a 100) | **Azure** |
| Nota de fluidez de cada frase | **Azure** |
| **Precisión** | La página: promedio de las notas de Azure de las palabras que dijiste. Si Azure entendió *otra* palabra, esa palabra vale 45 como máximo. |
| **Fluidez** | La página: promedio de las notas de fluidez de Azure. |
| **Completo** | La página: porcentaje de palabras del texto que dijiste. |
| **Nota final** | La página: 60 % precisión + 20 % fluidez + 20 % completo. |

Los porcentajes de la nota final son una decisión de este proyecto. Puedes cambiarlos en la función `finish()` de `js/app.js`.

**Límites que debes conocer**

- Es una herramienta de práctica, no un examen. No reemplaza a un profesor.
- Para español, Azure puede no dar el detalle por sonido. La página lo muestra solo si Azure lo envía.
- El resultado depende del micrófono y del ruido. Practica en un lugar tranquilo.

---

## Las voces del modelo

El botón **Play** usa las voces neuronales de Azure, con la **misma clave**. Tiene **Play, Pausa y Stop**, y una opción de voz lenta.

| Acento | Mujer | Hombre |
|---|---|---|
| Latinoamérica (México) | `es-MX-DaliaNeural` | `es-MX-JorgeNeural` |
| España | `es-ES-ElviraNeural` | `es-ES-AlvaroNeural` |

Si Azure falla, no hay clave o llegaste al límite del mes, la página usa la voz de tu navegador o de tu dispositivo. Esa voz cambia según el aparato. La página muestra cuál voz está sonando.

---

## Privacidad y datos

- **Tu clave** se guarda solo en el navegador (ver arriba).
- **Tus audios** se guardan solo en el navegador (`IndexedDB`). No se suben a ningún servidor del proyecto.
- **Azure sí recibe tu voz** para evaluarla. Revisa la política de privacidad de Azure.
- Puedes **borrar un audio** (en el historial o en el resultado), **todos los audios** o **todo el historial** desde la página.
- Si borras los datos del sitio en el navegador, pierdes la clave, el historial, el contador de uso y los audios.
- Sin Google Drive, cada aparato (celular, computadora) guarda sus propios datos. Con Drive (opcional), se sincronizan.

---

## Personalizar los textos

Abre `js/app.js` y busca la lista `TEXTS`. Cada texto tiene un título, un tema, los sonidos a practicar (`f`) y el texto (`txt`).

También puedes tocar **Pegar texto** en la página para leer cualquier texto, por ejemplo uno que te dio tu profesor.

---

## Problemas comunes

| Problema | Solución |
|---|---|
| «Azure no aceptó tu clave o tu región» | Revisa la clave (sin espacios) y que la región sea la del recurso. Usa **Probar clave**. |
| El micrófono no funciona | Usa HTTPS o `localhost`. Da permiso al micrófono en el navegador. |
| «No se cargó el SDK de Azure» | La página necesita internet para cargar el SDK. |
| No escucha nada | Habla más cerca del micrófono y haz una pausa corta al empezar. |
| «Llegaste al límite del mes» | Mira **Ajustes → Límites del mes**. Si el número no coincide con Azure, corrígelo ahí. |
| «No hay audios guardados» | Revisa en **Ajustes** que «Guardar mis audios» esté en «Sí». |
| «Error 403: access_denied (Acesso bloqueado)» | En Google Cloud Console, ve a **Pantalla de consentimiento de OAuth → Usuarios de prueba** y agrega tu correo de Gmail (`it.daniloamaral@gmail.com`). Guarda y vuelve a intentar. |

---

## Tecnología

- HTML, CSS e JavaScript sem etapas de compilação (direto para GitHub Pages). Arquitetura limpa (`index.html`, `css/style.css`, `js/app.js`).
- [Azure Speech SDK para JavaScript](https://www.npmjs.com/package/microsoft-cognitiveservices-speech-sdk), versión 1.40.0, desde jsDelivr.
- `MediaRecorder` e `IndexedDB` del navegador para guardar los audios.

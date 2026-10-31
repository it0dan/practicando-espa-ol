# Pronunciación diaria

Una página web para practicar la pronunciación en español, todos los días, con evaluación real de Azure.

1. La página te muestra un texto corto (nivel A1).
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
- **Es una estimación.** Sin Google Drive, la página solo cuenta lo que usas desde este navegador. Con Drive conectado, suma el uso de todos tus aparatos. Si usas la misma clave desde otra herramienta, ese uso no se ve. Para corregirlo, mira los números reales en el portal de Azure (tu recurso → **Métricas**) y escríbelos en **Ajustes → Corregir el uso de este mes**.
- Las voces que ya escuchaste en la misma sesión se guardan en memoria y no vuelven a gastar caracteres.

---

## Sincronizar entre aparatos (Google Drive, opcional)

Si usas la página en el celular y en una o más computadoras, puedes tener el mismo historial, los mismos audios y el mismo contador de uso en todos.

**Qué se guarda y dónde**

Todo va a una **carpeta oculta de tu propio Google Drive**, reservada para esta página. Solo tu cuenta de Google la ve. No hay ningún servidor del proyecto. La página pide un único permiso (`drive.appdata`): no puede ver el resto de tus archivos.

| Archivo en Drive | Contenido |
|---|---|
| `data.json` | Historial de lecturas y contador de uso |
| `a-<id>` (uno por lectura) | Tus audios |
| `config.enc.json` | Tu clave de Azure y tus ajustes, **cifrados** (opcional) |

**Cómo usarlo**

1. En el primer aparato: **Ajustes → Google Drive → Conectar y sincronizar**. Entra con tu cuenta de Google y acepta el permiso.
2. Para llevar tu clave a otros aparatos: escribe una **contraseña de cifrado** (mínimo 8 caracteres) y toca **Guardar clave cifrada**.
3. En cada aparato nuevo: **Conectar y sincronizar**, y luego escribe la contraseña y toca **Traer mi clave**. Ya no tienes que copiar la clave de Azure a mano.

**Cómo funciona**

- **La clave se cifra en tu navegador** (AES-GCM de 256 bits, con la contraseña pasada por PBKDF2 de 250 000 vueltas) antes de salir. Google solo recibe datos cifrados. Si olvidas la contraseña, no hay forma de recuperar la clave: tendrás que pegarla de nuevo desde Azure.
- **El uso se suma por aparato.** El total del mes es la suma de todos tus aparatos conectados.
- **Los borrados se propagan.** Si borras un audio o el historial en un aparato, desaparece en los demás.
- **Dos aparatos nunca pisan los datos del otro.** Las lecturas se juntan, no se reemplazan.
- **Los audios de otros aparatos se bajan cuando los escuchas**, para no llenar el celular.
- **Una vez por visita, toca «Reconectar».** El permiso de Google dura cerca de una hora y esta página no tiene servidor para renovarlo sola. Después de reconectar, los cambios se sincronizan solos.
- **Desconectar** quita el permiso y deja tus datos locales. **Borrar mis datos de Drive** vacía la carpeta (dos toques para confirmar).

Si la página no muestra la fila «Drive», quien la publicó no configuró el Client ID de Google. Todo funciona igual, pero cada aparato guarda sus datos por separado.

---

## Para quien publica la página: crear el Client ID de Google

El Client ID **no es un secreto** (cualquiera lo ve en el código de la página). No se usa ningún «client secret». Solo se hace una vez.

1. Entra en <https://console.cloud.google.com> y crea un proyecto (por ejemplo, `pronunciacion-diaria`).
2. **APIs y servicios → Biblioteca** → busca **Google Drive API** → **Habilitar**.
3. Configura la **pantalla de consentimiento** (puede llamarse *Google Auth Platform*):
   - Tipo de usuario: **Externo**.
   - Nombre de la app y tu correo de contacto.
   - **Permisos (scopes):** agrega `.../auth/drive.appdata`.
   - Mientras la app esté en modo **Prueba**, solo pueden entrar los correos que agregues en **Usuarios de prueba**. Para que cualquier persona pueda usarla, pásala a **Producción**. Ese permiso no debería pedir verificación de Google, pero confirma lo que te indique la consola.
4. **Credenciales → Crear credenciales → ID de cliente de OAuth** → tipo **Aplicación web**.
5. En **Orígenes autorizados de JavaScript**, agrega la dirección de tu página, solo el origen y sin ruta. Por ejemplo: `https://TU-USUARIO.github.io`
6. Crea y copia el **ID de cliente** (termina en `.apps.googleusercontent.com`).
7. Pégalo en `js/app.js`, en la línea `const GOOGLE_CLIENT_ID='';` y publica de nuevo.
   Para probar sin editar el archivo, también puedes pegarlo en **Ajustes → Google Drive → Avanzado**.

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
| No hay audios guardados | Revisa en **Ajustes** que «Guardar mis audios» esté en «Sí». |

---

## Tecnología

- HTML, CSS e JavaScript sem etapas de compilação (direto para GitHub Pages). Arquitetura limpa (`index.html`, `css/style.css`, `js/app.js`).
- [Azure Speech SDK para JavaScript](https://www.npmjs.com/package/microsoft-cognitiveservices-speech-sdk), versión 1.40.0, desde jsDelivr.
- `MediaRecorder` e `IndexedDB` del navegador para guardar los audios.

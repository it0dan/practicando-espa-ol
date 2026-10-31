/* =========================================================================
   Pronunciación diaria · Catálogo de Textos Latinoamericanos y Saberes
   Total: 106 textos curados
   ========================================================================= */

const CATEGORIES = {
  "todos": "Todos",
  "literatura": "Literatura",
  "poesia": "Poesía",
  "musica": "Música",
  "saberes-originarios": "Saberes originarios",
  "cultura": "Cultura y Vida",
  "historia": "Historia y Crónica"
};

const LEVELS = ['Todos', 'A1', 'A2', 'B1', 'B2'];

const TEXTS = [
  {
    "id": "lit-galeano-fueguitos",
    "t": "El mar de fueguitos · Eduardo Galeano",
    "autor": "Eduardo Galeano",
    "obra": "El libro de los abrazos",
    "categoria": "literatura",
    "pais": "Uruguay",
    "paisCodigo": "uy",
    "nivel": "B1",
    "f": [
      "e",
      "j",
      "rr"
    ],
    "txt": "El mundo es eso: un montón de gente, un mar de fueguitos. Cada persona brilla con luz propia entre todas las demás. No hay dos fuegos iguales; hay fuegos grandes y fuegos chicos, y fuegos de todos los colores.",
    "tema": "Literatura · Uruguay · B1"
  },
  {
    "id": "lit-garcia-marquez-macondo",
    "t": "Cien años de soledad · Gabriel García Márquez",
    "autor": "Gabriel García Márquez",
    "obra": "Cien años de soledad",
    "categoria": "literatura",
    "pais": "Colombia",
    "paisCodigo": "co",
    "nivel": "B1",
    "f": [
      "rr",
      "dt",
      "j"
    ],
    "txt": "Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo. Macondo era entonces una aldea de veinte casas de barro y cañabrava.",
    "tema": "Literatura · Colombia · B1"
  },
  {
    "id": "lit-borges-aleph",
    "t": "El Aleph · Jorge Luis Borges",
    "autor": "Jorge Luis Borges",
    "obra": "El Aleph",
    "categoria": "literatura",
    "pais": "Argentina",
    "paisCodigo": "ar",
    "nivel": "B2",
    "f": [
      "ll",
      "j",
      "dt"
    ],
    "txt": "Vi el populoso mar, vi el alba y la tarde, vi las muchedumbres de América, vi una plateada telaraña en el centro de una negra pirámide, vi un laberinto roto. Vi mi cara y mis vísceras, vi tu cara, y sentí vértigo y lloré.",
    "tema": "Literatura · Argentina · B2"
  },
  {
    "id": "lit-cortazar-rayuela",
    "t": "Rayuela · Julio Cortázar",
    "autor": "Julio Cortázar",
    "obra": "Rayuela",
    "categoria": "literatura",
    "pais": "Argentina",
    "paisCodigo": "ar",
    "nivel": "B1",
    "f": [
      "e",
      "dt",
      "ll"
    ],
    "txt": "Andábamos sin buscarnos, pero sabiendo que andábamos para encontrarnos. Cada vez que nos mirábamos al doblar la esquina de la calle, una leve sonrisa bastaba para comprender que la ciudad entera era nuestro refugio secreto.",
    "tema": "Literatura · Argentina · B1"
  },
  {
    "id": "lit-paz-laberinto",
    "t": "El laberinto de la soledad · Octavio Paz",
    "autor": "Octavio Paz",
    "obra": "El laberinto de la soledad",
    "categoria": "literatura",
    "pais": "México",
    "paisCodigo": "mx",
    "nivel": "B2",
    "f": [
      "c",
      "j",
      "dt"
    ],
    "txt": "El hombre solitario se niega a ser una parte del todo; el solitario es el todo. La soledad no es una ilusión ni un castigo: es la condición misma de nuestra existencia, el verdadero puente hacia el reencuentro con los otros.",
    "tema": "Literatura · México · B2"
  },
  {
    "id": "lit-rulfo-pedro-paramo",
    "t": "Pedro Páramo · Juan Rulfo",
    "autor": "Juan Rulfo",
    "obra": "Pedro Páramo",
    "categoria": "literatura",
    "pais": "México",
    "paisCodigo": "mx",
    "nivel": "A2",
    "f": [
      "j",
      "dt",
      "rr"
    ],
    "txt": "Vine a Comala porque me dijeron que acá vivía mi padre, un tal Pedro Páramo. Mi madre me lo dijo. Y yo le prometí que vendría a verlo en cuanto ella muriera. Le apreté sus manos en señal de que lo haría.",
    "tema": "Literatura · México · A2"
  },
  {
    "id": "lit-allende-espiritus",
    "t": "La casa de los espíritus · Isabel Allende",
    "autor": "Isabel Allende",
    "obra": "La casa de los espíritus",
    "categoria": "literatura",
    "pais": "Chile",
    "paisCodigo": "cl",
    "nivel": "B1",
    "f": [
      "rr",
      "e",
      "l"
    ],
    "txt": "Barrabás llegó a la familia por vía marítima, el día de San Antonio. Era una criatura negra y silenciosa, con ojos redondos de fósforo y un andar torpe de cachorro gigante que conquistó de inmediato el corazón de todos.",
    "tema": "Literatura · Chile · B1"
  },
  {
    "id": "lit-garcia-marquez-amor",
    "t": "El amor en los tiempos del cólera · Gabriel García Márquez",
    "autor": "Gabriel García Márquez",
    "obra": "El amor en los tiempos del cólera",
    "categoria": "literatura",
    "pais": "Colombia",
    "paisCodigo": "co",
    "nivel": "B2",
    "f": [
      "dt",
      "s",
      "cion"
    ],
    "txt": "Era inevitable: el olor de las almendras amargas le recordaba siempre el destino de los amores contrariados. El doctor Juvenal Urbino lo sintió desde que entró en la casa todavía en penumbras, apresurado por un llamado urgente.",
    "tema": "Literatura · Colombia · B2"
  },
  {
    "id": "lit-borges-senderos",
    "t": "El jardín de senderos · Jorge Luis Borges",
    "autor": "Jorge Luis Borges",
    "obra": "Ficciones",
    "categoria": "literatura",
    "pais": "Argentina",
    "paisCodigo": "ar",
    "nivel": "B2",
    "f": [
      "dt",
      "j",
      "nas"
    ],
    "txt": "El tiempo se bifurca perpetuamente hacia innumerables futuros. En uno de ellos soy su enemigo; en otro, soy su amigo. Creó un laberinto en el que todos los hombres se perderían para siempre en infinitas dimensiones.",
    "tema": "Literatura · Argentina · B2"
  },
  {
    "id": "lit-cortazar-cronopios",
    "t": "Historias de cronopios · Julio Cortázar",
    "autor": "Julio Cortázar",
    "obra": "Historias de cronopios y de famas",
    "categoria": "literatura",
    "pais": "Argentina",
    "paisCodigo": "ar",
    "nivel": "A2",
    "f": [
      "rr",
      "c",
      "l"
    ],
    "txt": "Un cronopio encuentra una flor solitaria en medio del campo. Primero va a arrancarla, pero piensa que es una crueldad inútil y se pone de rodillas a su lado. Le canta una canción suave y baila para ella.",
    "tema": "Literatura · Argentina · A2"
  },
  {
    "id": "lit-quiroga-selva",
    "t": "Cuentos de la selva · Horacio Quiroga",
    "autor": "Horacio Quiroga",
    "obra": "Cuentos de la selva",
    "categoria": "literatura",
    "pais": "Uruguay",
    "paisCodigo": "uy",
    "nivel": "A2",
    "f": [
      "rr",
      "dt",
      "j"
    ],
    "txt": "En un río muy grande, en un país desierto donde nunca había estado el hombre, vivían muchos yacarés. Vivían muy tranquilos y contentos, durmiendo al sol y comiendo pescados sabrosos cuando tenían hambre.",
    "tema": "Literatura · Uruguay · A2"
  },
  {
    "id": "lit-vargas-llosa-ciudad",
    "t": "La ciudad y los perros · Mario Vargas Llosa",
    "autor": "Mario Vargas Llosa",
    "obra": "La ciudad y los perros",
    "categoria": "literatura",
    "pais": "Perú",
    "paisCodigo": "pe",
    "nivel": "B1",
    "f": [
      "c",
      "dt",
      "s"
    ],
    "txt": "El colegio militar parecía una fortaleza frente al mar gris. Cuatrocientos cadetes formaban en el patio de cemento bajo una llovizna persistente, mientras el viento del Pacífico traía un olor espeso a salitre y humedad.",
    "tema": "Literatura · Perú · B1"
  },
  {
    "id": "lit-esquivel-chocolate",
    "t": "Como agua para chocolate · Laura Esquivel",
    "autor": "Laura Esquivel",
    "obra": "Como agua para chocolate",
    "categoria": "literatura",
    "pais": "México",
    "paisCodigo": "mx",
    "nivel": "A2",
    "f": [
      "c",
      "e",
      "j"
    ],
    "txt": "Dicen que Tita era tan sensible que desde que estaba en el vientre de mi bisabuela lloraba cuando esta picaba cebolla. Su llanto era tan fuerte que Nacha, la cocinera de la casa, lo escuchaba sin esfuerzo alguno.",
    "tema": "Literatura · México · A2"
  },
  {
    "id": "lit-onetti-pozo",
    "t": "El pozo · Juan Carlos Onetti",
    "autor": "Juan Carlos Onetti",
    "obra": "El pozo",
    "categoria": "literatura",
    "pais": "Uruguay",
    "paisCodigo": "uy",
    "nivel": "B1",
    "f": [
      "e",
      "dt",
      "nas"
    ],
    "txt": "Hace un rato me levanté para cerrar la ventana porque el aire de la noche refrescaba la habitación. Fumo con lentitud en la oscuridad y miro el resplandor de la ciudad lejana reflejado en el techo alto.",
    "tema": "Literatura · Uruguay · B1"
  },
  {
    "id": "lit-carpentier-reino",
    "t": "El reino de este mundo · Alejo Carpentier",
    "autor": "Alejo Carpentier",
    "obra": "El reino de este mundo",
    "categoria": "literatura",
    "pais": "Cuba",
    "paisCodigo": "cu",
    "nivel": "B2",
    "f": [
      "rr",
      "dt",
      "c"
    ],
    "txt": "Lo real maravilloso se encuentra a cada paso en las tierras vírgenes de América, donde la historia cotidiana se confunde con la magia del mito, las rebeliones secretas y el murmullo de los tambores en la noche.",
    "tema": "Literatura · Cuba · B2"
  },
  {
    "id": "lit-lispector-estrella",
    "t": "La hora de la estrella · Clarice Lispector",
    "autor": "Clarice Lispector",
    "obra": "La hora de la estrella",
    "categoria": "literatura",
    "pais": "Brasil",
    "paisCodigo": "br",
    "nivel": "B1",
    "f": [
      "e",
      "j",
      "dt"
    ],
    "txt": "Todo el mundo empezó con un sí. Una molécula dijo sí a otra molécula y nació la vida. Pero antes de la prehistoria existía el no, existía el misterio y existía el silencio infinito que todavía nos rodea.",
    "tema": "Literatura · Brasil · B1"
  },
  {
    "id": "lit-asturias-senor",
    "t": "El señor presidente · Miguel Ángel Asturias",
    "autor": "Miguel Ángel Asturias",
    "obra": "El señor presidente",
    "categoria": "literatura",
    "pais": "Guatemala",
    "paisCodigo": "gt",
    "nivel": "B2",
    "f": [
      "c",
      "l",
      "s"
    ],
    "txt": "Alumbra, lumbre de alumbre, sobre la podredumbre, alumbra sobre las sombras de la catedral. Campanas sordas que doblaban a la distancia anunciaban que el miedo reinaba en cada callejón y en cada plaza desierta de la ciudad.",
    "tema": "Literatura · Guatemala · B2"
  },
  {
    "id": "lit-sabato-tunel",
    "t": "El túnel · Ernesto Sabato",
    "autor": "Ernesto Sabato",
    "obra": "El túnel",
    "categoria": "literatura",
    "pais": "Argentina",
    "paisCodigo": "ar",
    "nivel": "B1",
    "f": [
      "dt",
      "nas",
      "rr"
    ],
    "txt": "Bastará decir que soy Juan Pablo Castel, el pintor que mató a María Iribarne. Supongo que el proceso está en el recuerdo de todos y que no se necesitan mayores explicaciones sobre mi triste persona.",
    "tema": "Literatura · Argentina · B1"
  },
  {
    "id": "lit-roa-bastos-supremo",
    "t": "Yo el Supremo · Augusto Roa Bastos",
    "autor": "Augusto Roa Bastos",
    "obra": "Yo el Supremo",
    "categoria": "literatura",
    "pais": "Paraguay",
    "paisCodigo": "py",
    "nivel": "B2",
    "f": [
      "dt",
      "rr",
      "j"
    ],
    "txt": "Yo no escribo la historia; la dicto en el silencio de los claustros antiguos. Escribir no es dibujar signos sobre un papel, sino abrir caminos en la memoria profunda de un pueblo que nunca renuncia a su libertad.",
    "tema": "Literatura · Paraguay · B2"
  },
  {
    "id": "lit-arguedas-rios",
    "t": "Los ríos profundos · José María Arguedas",
    "autor": "José María Arguedas",
    "obra": "Los ríos profundos",
    "categoria": "literatura",
    "pais": "Perú",
    "paisCodigo": "pe",
    "nivel": "B1",
    "f": [
      "rr",
      "dt",
      "nas"
    ],
    "txt": "Los ríos andinos cantan con voz ronca cuando bajan de las cumbres heladas hacia los valles templados. En su corriente viaja la fuerza viva de las rocas, el llanto de los árboles y la esperanza de la gente.",
    "tema": "Literatura · Perú · B1"
  },
  {
    "id": "lit-fuentes-aura",
    "t": "Aura · Carlos Fuentes",
    "autor": "Carlos Fuentes",
    "obra": "Aura",
    "categoria": "literatura",
    "pais": "México",
    "paisCodigo": "mx",
    "nivel": "B1",
    "f": [
      "e",
      "s",
      "l"
    ],
    "txt": "Lees ese anuncio en el periódico: se solicita historiador joven, con buen conocimiento del francés y trato afable. Caminas por el viejo centro histórico buscando el número indicado, envuelto en una densa niebla matutina.",
    "tema": "Literatura · México · B1"
  },
  {
    "id": "lit-gallegos-barbara",
    "t": "Doña Bárbara · Rómulo Gallegos",
    "autor": "Rómulo Gallegos",
    "obra": "Doña Bárbara",
    "categoria": "literatura",
    "pais": "Venezuela",
    "paisCodigo": "ve",
    "nivel": "B1",
    "f": [
      "rr",
      "l",
      "dt"
    ],
    "txt": "La llanura es bella y terrible a la vez; en su inmensidad caben holgadamente la vida libre y la muerte acechante. Por el río Arauca subía un bongo contra la corriente, empujado por hombres silenciosos y fuertes.",
    "tema": "Literatura · Venezuela · B1"
  },
  {
    "id": "lit-icaza-huasipungo",
    "t": "Huasipungo · Jorge Icaza",
    "autor": "Jorge Icaza",
    "obra": "Huasipungo",
    "categoria": "literatura",
    "pais": "Ecuador",
    "paisCodigo": "ec",
    "nivel": "B1",
    "f": [
      "j",
      "dt",
      "nas"
    ],
    "txt": "El viento helado del páramo azotaba la pequeña choza de paja. Sobre la tierra negra y húmeda, la familia campesina preparaba la siembra comunitaria, aguardando con paciencia el milagro del agua y del maíz.",
    "tema": "Literatura · Ecuador · B1"
  },
  {
    "id": "lit-oreamuno-ruta",
    "t": "La ruta de su evasión · Yolanda Oreamuno",
    "autor": "Yolanda Oreamuno",
    "obra": "La ruta de su evasión",
    "categoria": "literatura",
    "pais": "Costa Rica",
    "paisCodigo": "cr",
    "nivel": "B2",
    "f": [
      "s",
      "cion",
      "e"
    ],
    "txt": "La tarde caía con una lentitud dorada sobre las montañas del valle central. Buscaba escapar de las rutinas asfixiantes para inventar un destino propio, un refugio donde el pensamiento no tuviera fronteras impuestas.",
    "tema": "Literatura · Costa Rica · B2"
  },
  {
    "id": "lit-ramirez-sangre",
    "t": "¿Te dio miedo la sangre? · Sergio Ramírez",
    "autor": "Sergio Ramírez",
    "obra": "¿Te dio miedo la sangre?",
    "categoria": "literatura",
    "pais": "Nicaragua",
    "paisCodigo": "ni",
    "nivel": "B1",
    "f": [
      "rr",
      "dt",
      "c"
    ],
    "txt": "En la cantina del pueblo sonaba una rocola con boleros desgarrados. Cuatro hombres jugaban a los naipes bajo un ventilador cansado, mientras la lluvia tropical golpeaba sin tregua el techo de zinc.",
    "tema": "Literatura · Nicaragua · B1"
  },
  {
    "id": "lit-galeano-arte",
    "t": "La función del arte · Eduardo Galeano",
    "autor": "Eduardo Galeano",
    "obra": "El libro de los abrazos",
    "categoria": "literatura",
    "pais": "Uruguay",
    "paisCodigo": "uy",
    "nivel": "A1",
    "f": [
      "j",
      "dt",
      "e"
    ],
    "txt": "El padre llevó al niño a conocer el mar. El mar estaba allá, inmenso y verdeante. Cuando el niño por fin lo vio de cerca, tembló de hermosura y dijo: ¡Papá, ayúdame a mirar!",
    "tema": "Literatura · Uruguay · A1"
  },
  {
    "id": "poe-neruda-macchu-picchu",
    "t": "Alturas de Macchu Picchu · Pablo Neruda",
    "autor": "Pablo Neruda",
    "obra": "Canto General",
    "categoria": "poesia",
    "pais": "Chile",
    "paisCodigo": "cl",
    "nivel": "B2",
    "f": [
      "rr",
      "ll",
      "c"
    ],
    "txt": "Sube a nacer conmigo, hermano. Dame la mano desde la profunda zona de tu dolor diseminado. Mírame desde el fondo de la tierra, labrador, tejedor, pastor callado. Mostradme vuestra sangre y vuestro antiguo surco.",
    "tema": "Poesía · Chile · B2"
  },
  {
    "id": "poe-benedetti-tactica",
    "t": "Táctica y estrategia · Mario Benedetti",
    "autor": "Mario Benedetti",
    "obra": "Poemas de otros",
    "categoria": "poesia",
    "pais": "Uruguay",
    "paisCodigo": "uy",
    "nivel": "A2",
    "f": [
      "dt",
      "e",
      "j"
    ],
    "txt": "Mi táctica es mirarte, aprender como sos, quererte como sos. Mi táctica es hablarte y escucharte, construir con palabras un puente indestructible. Mi estrategia es en cambio que un día cualquiera, por fin me necesites.",
    "tema": "Poesía · Uruguay · A2"
  },
  {
    "id": "poe-marti-versos",
    "t": "Versos sencillos · José Martí",
    "autor": "José Martí",
    "obra": "Versos sencillos",
    "categoria": "poesia",
    "pais": "Cuba",
    "paisCodigo": "cu",
    "nivel": "A1",
    "f": [
      "s",
      "nas",
      "l"
    ],
    "txt": "Yo soy un hombre sincero de donde crece la palma, y antes de morirme quiero echar mis versos del alma. Yo vengo de todas partes, y hacia todas partes voy: arte soy entre las artes, en los montes, monte soy.",
    "tema": "Poesía · Cuba · A1"
  },
  {
    "id": "poe-neruda-poema-20",
    "t": "Poema 20 · Pablo Neruda",
    "autor": "Pablo Neruda",
    "obra": "Veinte poemas de amor y una canción desesperada",
    "categoria": "poesia",
    "pais": "Chile",
    "paisCodigo": "cl",
    "nivel": "A2",
    "f": [
      "e",
      "dt",
      "s"
    ],
    "txt": "Puedo escribir los versos más tristes esta noche. Escribir, por ejemplo: La noche está estrellada, y tiritan, azules, los astros, a lo lejos. El viento de la noche gira en el cielo y canta.",
    "tema": "Poesía · Chile · A2"
  },
  {
    "id": "poe-benedetti-trato",
    "t": "Hagamos un trato · Mario Benedetti",
    "autor": "Mario Benedetti",
    "obra": "Cotidianas",
    "categoria": "poesia",
    "pais": "Uruguay",
    "paisCodigo": "uy",
    "nivel": "A2",
    "f": [
      "c",
      "dt",
      "s"
    ],
    "txt": "Compañera, usted sabe que puede contar conmigo, no hasta dos o hasta diez sino contar conmigo. Si alguna vez advierte que la miro a los ojos y una veta de amor reconoce en los míos, cuente conmigo.",
    "tema": "Poesía · Uruguay · A2"
  },
  {
    "id": "poe-mistral-dame-la-mano",
    "t": "Dame la mano · Gabriela Mistral",
    "autor": "Gabriela Mistral",
    "obra": "Ternura",
    "categoria": "poesia",
    "pais": "Chile",
    "paisCodigo": "cl",
    "nivel": "A1",
    "f": [
      "dt",
      "rr",
      "e"
    ],
    "txt": "Dame la mano y danzaremos; dame la mano y me amarás. Como una sola flor seremos, como una flor, y nada más. El mismo verso cantaremos, al mismo paso bailarás.",
    "tema": "Poesía · Chile · A1"
  },
  {
    "id": "poe-vallejo-heraldos",
    "t": "Los heraldos negros · César Vallejo",
    "autor": "César Vallejo",
    "obra": "Los heraldos negros",
    "categoria": "poesia",
    "pais": "Perú",
    "paisCodigo": "pe",
    "nivel": "B1",
    "f": [
      "rr",
      "dt",
      "j"
    ],
    "txt": "Hay golpes en la vida, tan fuertes... ¡Yo no sé! Golpes como del odio de Dios; como si ante ellos, la resaca de todo lo sufrido se empozara en el alma... ¡Yo no sé!",
    "tema": "Poesía · Perú · B1"
  },
  {
    "id": "poe-sor-juana-hombres",
    "t": "Hombres necios · Sor Juana Inés de la Cruz",
    "autor": "Sor Juana Inés de la Cruz",
    "obra": "Inundación castálida",
    "categoria": "poesia",
    "pais": "México",
    "paisCodigo": "mx",
    "nivel": "B2",
    "f": [
      "c",
      "dt",
      "s"
    ],
    "txt": "Hombres necios que acusáis a la mujer sin razón, sin ver que sois la ocasión de lo mismo que culpáis. Si con ansia sin igual solicitáis su desdén, ¿por qué queréis que obren bien si las incitáis al mal?",
    "tema": "Poesía · México · B2"
  },
  {
    "id": "poe-paz-piedra-sol",
    "t": "Piedra de sol · Octavio Paz",
    "autor": "Octavio Paz",
    "obra": "Libertad bajo palabra",
    "categoria": "poesia",
    "pais": "México",
    "paisCodigo": "mx",
    "nivel": "B2",
    "f": [
      "rr",
      "l",
      "dt"
    ],
    "txt": "Un sauce de cristal, un chopo de agua, un alto surtidor que el viento arquea, un árbol bien plantado mas danzante, un caminar de río que se curva, avanza, retrocede, da un rodeo y llega siempre.",
    "tema": "Poesía · México · B2"
  },
  {
    "id": "poe-storni-blanca",
    "t": "Tú me quieres blanca · Alfonsina Storni",
    "autor": "Alfonsina Storni",
    "obra": "El dulce daño",
    "categoria": "poesia",
    "pais": "Argentina",
    "paisCodigo": "ar",
    "nivel": "B1",
    "f": [
      "e",
      "dt",
      "s"
    ],
    "txt": "Tú me quieres alba, me quieres de espumas, me quieres de nácar. Que sea azucena sobre todas, casta. De perfume tenue. Corola cerrada. Ni un rayo de luna filtrado me haya; ni una margarita se diga mi hermana.",
    "tema": "Poesía · Argentina · B1"
  },
  {
    "id": "poe-loynaz-nombre",
    "t": "Poemas sin nombre · Dulce María Loynaz",
    "autor": "Dulce María Loynaz",
    "obra": "Poemas sin nombre",
    "categoria": "poesia",
    "pais": "Cuba",
    "paisCodigo": "cu",
    "nivel": "B1",
    "f": [
      "dt",
      "s",
      "l"
    ],
    "txt": "Yo quisiera ser el agua mansa que calma tu sed en el mediodía ardiente. No pido ser la tempestad grandiosa ni el mar infinito; solo el vaso de agua clara que apoya tu reposo al final del camino.",
    "tema": "Poesía · Cuba · B1"
  },
  {
    "id": "poe-dario-margarita",
    "t": "A Margarita Debayle · Rubén Darío",
    "autor": "Rubén Darío",
    "obra": "Cantos de vida y esperanza",
    "categoria": "poesia",
    "pais": "Nicaragua",
    "paisCodigo": "ni",
    "nivel": "A2",
    "f": [
      "rr",
      "ll",
      "c"
    ],
    "txt": "Margarita, está linda la mar, y el viento lleva esencia sutil de azahar; yo siento en el alma una alondra cantar: tu acento. Margarita, te voy a contar un cuento: este era un rey que tenía un palacio de diamantes.",
    "tema": "Poesía · Nicaragua · A2"
  },
  {
    "id": "poe-borges-limites",
    "t": "Límites · Jorge Luis Borges",
    "autor": "Jorge Luis Borges",
    "obra": "El hacedor",
    "categoria": "poesia",
    "pais": "Argentina",
    "paisCodigo": "ar",
    "nivel": "B2",
    "f": [
      "dt",
      "s",
      "j"
    ],
    "txt": "De estas calles que ahondan el poniente, una habrá que he mirado por última vez, indiferente y sin saberlo, sometido a quien prefija omnipotentes normas y una secreta y rígida medida a las sombras, los sueños y las formas.",
    "tema": "Poesía · Argentina · B2"
  },
  {
    "id": "poe-belli-mujer",
    "t": "Y Dios me hizo mujer · Gioconda Belli",
    "autor": "Gioconda Belli",
    "obra": "Línea de fuego",
    "categoria": "poesia",
    "pais": "Nicaragua",
    "paisCodigo": "ni",
    "nivel": "B1",
    "f": [
      "j",
      "dt",
      "rr"
    ],
    "txt": "Y Dios me hizo mujer, de pelo largo, ojos, nariz y boca de mujer. Con curvas y lomas y suaves hondonadas y me coronó con la ternura inagotable de quien da a luz la vida sobre esta tierra fecunda.",
    "tema": "Poesía · Nicaragua · B1"
  },
  {
    "id": "poe-girondo-espantapajaros",
    "t": "Espantapájaros · Oliverio Girondo",
    "autor": "Oliverio Girondo",
    "obra": "Espantapájaros",
    "categoria": "poesia",
    "pais": "Argentina",
    "paisCodigo": "ar",
    "nivel": "B2",
    "f": [
      "rr",
      "ll",
      "j"
    ],
    "txt": "No se me importa un pito que las mujeres tengan los senos como magnolias o como pasas de higo; un cutis de durazno o un pellejo de lija. Pero eso sí, ¡en esto soy inflexible!: exijo que sepan volar.",
    "tema": "Poesía · Argentina · B2"
  },
  {
    "id": "poe-vilarino-ya-no",
    "t": "Ya no · Idea Vilariño",
    "autor": "Idea Vilariño",
    "obra": "Poemas de amor",
    "categoria": "poesia",
    "pais": "Uruguay",
    "paisCodigo": "uy",
    "nivel": "A2",
    "f": [
      "dt",
      "nas",
      "s"
    ],
    "txt": "Ya no será, ya no nos entraremos la noche juntos. Ya no nos miraremos en los ojos despiertos al amanecer. Ya no estarás a mi lado cuando sople el viento frío del invierno, ni sabré qué piensas en el silencio.",
    "tema": "Poesía · Uruguay · A2"
  },
  {
    "id": "poe-sabines-amorosos",
    "t": "Los amorosos · Jaime Sabines",
    "autor": "Jaime Sabines",
    "obra": "Poesía amorosa",
    "categoria": "poesia",
    "pais": "México",
    "paisCodigo": "mx",
    "nivel": "B1",
    "f": [
      "s",
      "l",
      "dt"
    ],
    "txt": "Los amorosos callan. El amor es el silencio más fino, el más tembloroso, el más insoportable. Los amorosos buscan, los amorosos son los que abandonan, son los que cambian, los que olvidan.",
    "tema": "Poesía · México · B1"
  },
  {
    "id": "poe-dalton-amor",
    "t": "Poema de amor · Roque Dalton",
    "autor": "Roque Dalton",
    "obra": "Las historias prohibidas del Pulgarcito",
    "categoria": "poesia",
    "pais": "El Salvador",
    "paisCodigo": "sv",
    "nivel": "B1",
    "f": [
      "s",
      "rr",
      "dt"
    ],
    "txt": "Los que sembraron el maíz en selvas ajenas, los reyes de la página roja, los que nunca se sabe de dónde son, los mejores artesanos del mundo, mis compatriotas, los más tristes del mundo, los eternos indocumentados.",
    "tema": "Poesía · El Salvador · B1"
  },
  {
    "id": "poe-burgos-julia",
    "t": "A Julia de Burgos · Julia de Burgos",
    "autor": "Julia de Burgos",
    "obra": "Poema en veinte surcos",
    "categoria": "poesia",
    "pais": "Puerto Rico",
    "paisCodigo": "pr",
    "nivel": "B2",
    "f": [
      "rr",
      "dt",
      "j"
    ],
    "txt": "Ya las gentes murmuran que yo soy tu enemiga porque dicen que en verso doy al mundo tu yo. Mienten, Julia de Burgos. Mienten, Julia de Burgos. La que se alza en mis versos no es tu voz: es mi voz.",
    "tema": "Poesía · Puerto Rico · B2"
  },
  {
    "id": "poe-huidobro-altazor",
    "t": "Altazor · Vicente Huidobro",
    "autor": "Vicente Huidobro",
    "obra": "Altazor",
    "categoria": "poesia",
    "pais": "Chile",
    "paisCodigo": "cl",
    "nivel": "B2",
    "f": [
      "l",
      "c",
      "dt"
    ],
    "txt": "Nací a los treinta y tres años, el día de la muerte de Cristo; nací en el equinoccio, bajo las hortensias y los aeroplanos del calor. Traigo los ojos limpios para mirar las nubes y el corazón abierto al infinito.",
    "tema": "Poesía · Chile · B2"
  },
  {
    "id": "poe-vallejo-piedra",
    "t": "Piedra negra sobre una piedra blanca · César Vallejo",
    "autor": "César Vallejo",
    "obra": "Poemas humanos",
    "categoria": "poesia",
    "pais": "Perú",
    "paisCodigo": "pe",
    "nivel": "B1",
    "f": [
      "rr",
      "dt",
      "j"
    ],
    "txt": "Me moriré en París con aguacero, un día del cual tengo ya el recuerdo. Me moriré en París y no me corro, tal vez un jueves, como es hoy, de otoño. César Vallejo ha muerto; le pegaban todos sin que él les haga nada.",
    "tema": "Poesía · Perú · B1"
  },
  {
    "id": "poe-neruda-cebolla",
    "t": "Oda a la cebolla · Pablo Neruda",
    "autor": "Pablo Neruda",
    "obra": "Odas elementales",
    "categoria": "poesia",
    "pais": "Chile",
    "paisCodigo": "cl",
    "nivel": "A2",
    "f": [
      "ll",
      "c",
      "l"
    ],
    "txt": "Cebolla, luminosa redoma, pétalo a pétalo se formó tu hermosura, escamas de cristal te acrecentaron y en el secreto de la tierra oscura se redondeó tu vientre de rocío. Eres el sol humilde de la cocina pobre.",
    "tema": "Poesía · Chile · A2"
  },
  {
    "id": "poe-juarroz-vertical",
    "t": "Poesía vertical · Roberto Juarroz",
    "autor": "Roberto Juarroz",
    "obra": "Poesía vertical",
    "categoria": "poesia",
    "pais": "Argentina",
    "paisCodigo": "ar",
    "nivel": "B2",
    "f": [
      "s",
      "dt",
      "e"
    ],
    "txt": "Una red de miradas mantiene unido al mundo, no lo deja caer. Y aunque no sepa dónde van las miradas de los ciegos, siento que alguna mirada ausente me sostiene las espaldas cuando camino solo en el desierto.",
    "tema": "Poesía · Argentina · B2"
  },
  {
    "id": "poe-mistral-piececitos",
    "t": "Piececitos de niño · Gabriela Mistral",
    "autor": "Gabriela Mistral",
    "obra": "Desolación",
    "categoria": "poesia",
    "pais": "Chile",
    "paisCodigo": "cl",
    "nivel": "A1",
    "f": [
      "c",
      "dt",
      "s"
    ],
    "txt": "Piececitos de niño, azulosos de frío, ¡cómo os ven y no os cubren, Dios mío! Piececitos heridos por los guijarros todos, ultrajados de nieves y lodos. El hombre ciego pasa sin ver vuestra inocencia pura.",
    "tema": "Poesía · Chile · A1"
  },
  {
    "id": "mus-violeta-gracias",
    "t": "Gracias a la vida · Violeta Parra",
    "autor": "Violeta Parra",
    "obra": "Las últimas composiciones",
    "categoria": "musica",
    "pais": "Chile",
    "paisCodigo": "cl",
    "nivel": "A1",
    "f": [
      "dt",
      "rr",
      "c"
    ],
    "txt": "Gracias a la vida que me ha dado tanto. Me dio dos luceros que cuando los abro, perfecto distingo el negro del blanco, y en el alto cielo su fondo estrellado, y en las multitudes el hombre que yo amo.",
    "tema": "Música · Chile · A1"
  },
  {
    "id": "mus-calle13-latinoamerica",
    "t": "Latinoamérica · Calle 13",
    "autor": "Calle 13",
    "obra": "Entren los que quieran",
    "categoria": "musica",
    "pais": "Puerto Rico",
    "paisCodigo": "pr",
    "nivel": "A2",
    "f": [
      "v",
      "rr",
      "l"
    ],
    "txt": "Soy lo que me enseñó mi padre: el que no quiere a su patria, no quiere a su madre. Soy América Latina, un pueblo sin piernas pero que camina. ¡Tú no puedes comprar al viento! ¡Tú no puedes comprar al sol!",
    "tema": "Música · Puerto Rico · A2"
  },
  {
    "id": "mus-mercedes-cancion-con-todos",
    "t": "Canción con todos · Mercedes Sosa",
    "autor": "Mercedes Sosa / Armando Tejada Gómez",
    "obra": "El grito de la tierra",
    "categoria": "musica",
    "pais": "Argentina",
    "paisCodigo": "ar",
    "nivel": "A2",
    "f": [
      "dt",
      "nas",
      "rr"
    ],
    "txt": "Salgo a caminar por la cintura cósmica del sur. Piso en la región vegetal del viento y de la luz. Siento al caminar toda la piel de América en mi piel y anda en mi sangre un río que libera en mi voz su caudal.",
    "tema": "Música · Argentina · A2"
  },
  {
    "id": "mus-silvio-ojala",
    "t": "Ojalá · Silvio Rodríguez",
    "autor": "Silvio Rodríguez",
    "obra": "Al final de este viaje",
    "categoria": "musica",
    "pais": "Cuba",
    "paisCodigo": "cu",
    "nivel": "B1",
    "f": [
      "j",
      "dt",
      "s"
    ],
    "txt": "Ojalá se te acabe la mirada constante, la palabra precisa, la sonrisa perfecta. Ojalá pase algo que te borre de pronto: una luz cegadora, un disparo de nieve, ojalá por lo menos que me lleve la muerte.",
    "tema": "Música · Cuba · B1"
  },
  {
    "id": "mus-yupanqui-hermanos",
    "t": "Los hermanos · Atahualpa Yupanqui",
    "autor": "Atahualpa Yupanqui",
    "obra": "El canto del viento",
    "categoria": "musica",
    "pais": "Argentina",
    "paisCodigo": "ar",
    "nivel": "A1",
    "f": [
      "rr",
      "dt",
      "v"
    ],
    "txt": "Yo tengo tantos hermanos que no los puedo contar. En el valle, en la montaña, en la pampa y en el mar. Gente de mano caliente por eso de la amistad, con un llanto para llorar y una guitarra para cantar.",
    "tema": "Música · Argentina · A1"
  },
  {
    "id": "mus-chabuca-canela",
    "t": "La flor de la canela · Chabuca Granda",
    "autor": "Chabuca Granda",
    "obra": "Canciones criollas del Perú",
    "categoria": "musica",
    "pais": "Perú",
    "paisCodigo": "pe",
    "nivel": "B1",
    "f": [
      "l",
      "nas",
      "c"
    ],
    "txt": "Déjame que te cuente, limeño, déjame que te diga la gloria del ensueño que evoca la memoria del viejo puente, del río y de la alameda. Jazmines en el pelo y rosas en la cara, airosa caminaba la flor de la canela.",
    "tema": "Música · Perú · B1"
  },
  {
    "id": "mus-drexler-rio",
    "t": "Al otro lado del río · Jorge Drexler",
    "autor": "Jorge Drexler",
    "obra": "Eco",
    "categoria": "musica",
    "pais": "Uruguay",
    "paisCodigo": "uy",
    "nivel": "A2",
    "f": [
      "rr",
      "dt",
      "l"
    ],
    "txt": "Rema, rema, rema en la corriente. Todo está en calma, el día se despereza. Yo no sé qué hay del otro lado del río, pero sé que me espera una luz encendida y un abrazo sincero.",
    "tema": "Música · Uruguay · A2"
  },
  {
    "id": "mus-lafourcade-raiz",
    "t": "Hasta la raíz · Natalia Lafourcade",
    "autor": "Natalia Lafourcade",
    "obra": "Hasta la raíz",
    "categoria": "musica",
    "pais": "México",
    "paisCodigo": "mx",
    "nivel": "A2",
    "f": [
      "rr",
      "dt",
      "s"
    ],
    "txt": "Sigo cruzando ríos, andando selvas, amando el sol. Cada día llevo en mi cuerpo la fuerza de mi tierra natal. Y aunque me aleje de ti, te llevo guardada bien adentro, clavada hasta la raíz de mis pensamientos.",
    "tema": "Música · México · A2"
  },
  {
    "id": "mus-simon-diaz-caballo",
    "t": "Caballo viejo · Simón Díaz",
    "autor": "Simón Díaz",
    "obra": "Tonadas venezolanas",
    "categoria": "musica",
    "pais": "Venezuela",
    "paisCodigo": "ve",
    "nivel": "B1",
    "f": [
      "ll",
      "rr",
      "j"
    ],
    "txt": "Cuando el amor llega así de esta manera uno no se da ni cuenta. El carutal reverdece y el guamachito florece y las mocitas suspiran. Caballo viejo no puede perder la flor que le dan, porque después de esta vida no hay otra oportunidad.",
    "tema": "Música · Venezuela · B1"
  },
  {
    "id": "mus-gardel-volver",
    "t": "Volver · Carlos Gardel",
    "autor": "Carlos Gardel / Alfredo Le Pera",
    "obra": "Tangos inolvidables",
    "categoria": "musica",
    "pais": "Argentina",
    "paisCodigo": "ar",
    "nivel": "B1",
    "f": [
      "v",
      "dt",
      "s"
    ],
    "txt": "Volver, con la frente marchita, las nieves del tiempo platearon mi sien. Sentir que es un soplo la vida, que veinte años no es nada, que febril la mirada, errante en las sombras, te busca y te nombra.",
    "tema": "Música · Argentina · B1"
  },
  {
    "id": "mus-compay-chan-chan",
    "t": "Chan Chan · Buena Vista Social Club",
    "autor": "Compay Segundo",
    "obra": "Buena Vista Social Club",
    "categoria": "musica",
    "pais": "Cuba",
    "paisCodigo": "cu",
    "nivel": "A1",
    "f": [
      "c",
      "dt",
      "l"
    ],
    "txt": "De Alto Cedro voy para Marcané, luego a Cueto voy para Mayarí. El cariño que te tengo yo no lo puedo negar; se me sale la ternura por los ojos cada vez que te veo caminar por la orilla del mar.",
    "tema": "Música · Cuba · A1"
  },
  {
    "id": "mus-fito-mariposa",
    "t": "Mariposa tecknicolor · Fito Páez",
    "autor": "Fito Páez",
    "obra": "Circo Beat",
    "categoria": "musica",
    "pais": "Argentina",
    "paisCodigo": "ar",
    "nivel": "B1",
    "f": [
      "rr",
      "l",
      "dt"
    ],
    "txt": "Todas las mañanas que viví, todas las calles donde me perdí, llevan el color de mi infancia en el barrio. Llevo la música sonando en el pecho y las ganas invencibles de volver a abrazar a los amigos de siempre.",
    "tema": "Música · Argentina · B1"
  },
  {
    "id": "mus-chico-construccion",
    "t": "Construcción · Chico Buarque",
    "autor": "Chico Buarque",
    "obra": "Construcción (Versión en español)",
    "categoria": "musica",
    "pais": "Brasil",
    "paisCodigo": "br",
    "nivel": "B2",
    "f": [
      "dt",
      "s",
      "rr"
    ],
    "txt": "Amó aquella vez como si fuese la última, besó a su mujer como si fuese la última. Y cada hijo suyo cual si fuese el único. Y atravesó la calle con su paso tímido; subió a la construcción como si fuese sólida.",
    "tema": "Música · Brasil · B2"
  },
  {
    "id": "mus-facundo-no-soy",
    "t": "No soy de aquí · Facundo Cabral",
    "autor": "Facundo Cabral",
    "obra": "En vivo",
    "categoria": "musica",
    "pais": "Argentina",
    "paisCodigo": "ar",
    "nivel": "A1",
    "f": [
      "j",
      "dt",
      "l"
    ],
    "txt": "No soy de aquí, ni soy de allá, no tengo edad ni porvenir, y ser feliz es mi color de identidad. Me gusta el mar, me gusta el sol, y el vino tinto compartido con un buen amigo bajo la parra en flor.",
    "tema": "Música · Argentina · A1"
  },
  {
    "id": "mus-victor-jara-paz",
    "t": "El derecho de vivir en paz · Víctor Jara",
    "autor": "Víctor Jara",
    "obra": "El derecho de vivir en paz",
    "categoria": "musica",
    "pais": "Chile",
    "paisCodigo": "cl",
    "nivel": "A2",
    "f": [
      "rr",
      "c",
      "dt"
    ],
    "txt": "El derecho de vivir en paz es como un canto que nace en el fondo del corazón. Es el arado que abre el surco generoso y la guitarra trabajadora que canta por la justicia y el pan para todos los niños del mundo.",
    "tema": "Música · Chile · A2"
  },
  {
    "id": "mus-juan-luis-guerra-cafe",
    "t": "Ojalá que llueva café · Juan Luis Guerra",
    "autor": "Juan Luis Guerra",
    "obra": "Ojalá que llueva café",
    "categoria": "musica",
    "pais": "República Dominicana",
    "paisCodigo": "do",
    "nivel": "B1",
    "f": [
      "ll",
      "j",
      "rr"
    ],
    "txt": "Ojalá que llueva café en el campo, que caiga un aguacero de yuca y té, del cielo una jarina de queso blanco y al sur una montaña de berro y miel. Para que en mi tierra no se sufra tanto.",
    "tema": "Música · República Dominicana · B1"
  },
  {
    "id": "mus-blades-plastico",
    "t": "Plástico · Rubén Blades",
    "autor": "Rubén Blades",
    "obra": "Siembra",
    "categoria": "musica",
    "pais": "Panamá",
    "paisCodigo": "pa",
    "nivel": "B1",
    "f": [
      "s",
      "cion",
      "dt"
    ],
    "txt": "Ella era una chica plástica de esas que veo por ahí, de esas que cuando se ríen parece que se van a quebrar. Oye hermano, no te vendas ni te dejes engañar: la dignidad no tiene precio ni se compra en el mercado.",
    "tema": "Música · Panamá · B1"
  },
  {
    "id": "mus-mon-laferte-querer",
    "t": "Tu falta de querer · Mon Laferte",
    "autor": "Mon Laferte",
    "obra": "Mon Laferte Vol. 1",
    "categoria": "musica",
    "pais": "Chile",
    "paisCodigo": "cl",
    "nivel": "A2",
    "f": [
      "dt",
      "rr",
      "e"
    ],
    "txt": "Ven y dime la verdad, que ya no soporto esta soledad. ¿Cómo fue que me dejaste de amar? Yo te di todo mi cariño sincero y ahora me quedo en silencio mirando la lluvia caer sobre los cristales fríos de mi ventana.",
    "tema": "Música · Chile · A2"
  },
  {
    "id": "mus-soda-musica-ligera",
    "t": "De música ligera · Soda Stereo",
    "autor": "Gustavo Cerati / Zeta Bosio",
    "obra": "Canción Animal",
    "categoria": "musica",
    "pais": "Argentina",
    "paisCodigo": "ar",
    "nivel": "A1",
    "f": [
      "j",
      "dt",
      "s"
    ],
    "txt": "Ella durmió al calor de las masas y yo desperté queriendo soñarla. Algún tiempo atrás pensé en escribirle, pero nunca sorteé las trampas del amor. De aquel amor de música ligera, nada nos libra, nada más queda.",
    "tema": "Música · Argentina · A1"
  },
  {
    "id": "mus-cadillacs-matador",
    "t": "Matador · Los Fabulosos Cadillacs",
    "autor": "Flavio Cianciarulo",
    "obra": "Vasos vacíos",
    "categoria": "musica",
    "pais": "Argentina",
    "paisCodigo": "ar",
    "nivel": "B1",
    "f": [
      "dt",
      "rr",
      "s"
    ],
    "txt": "Me dicen el Matador, nací en San Telmo. Si suenan los tambores en la noche no voy a correr; me quedo defendiendo la memoria de Víctor Jara y la causa de los que no tienen voz frente al poder.",
    "tema": "Música · Argentina · B1"
  },
  {
    "id": "mus-caetano-fina-estampa",
    "t": "Fina estampa · Caetano Veloso",
    "autor": "Caetano Veloso / Chabuca Granda",
    "obra": "Fina Estampa",
    "categoria": "musica",
    "pais": "Brasil",
    "paisCodigo": "br",
    "nivel": "A2",
    "f": [
      "s",
      "dt",
      "l"
    ],
    "txt": "Fina estampa, caballero, caballero de fina estampa. Un lucero que sonríe bajo un sombrero de paja fina. Camina con elegancia por la vereda del recuerdo, dejando una estela perfumada de jazmín y de canción antigua.",
    "tema": "Música · Brasil · A2"
  },
  {
    "id": "mus-ismael-rivera-caras",
    "t": "Las caras lindas · Ismael Rivera",
    "autor": "Tite Curet Alonso",
    "obra": "Esto sí es lo mío",
    "categoria": "musica",
    "pais": "Puerto Rico",
    "paisCodigo": "pr",
    "nivel": "A2",
    "f": [
      "c",
      "l",
      "dt"
    ],
    "txt": "Las caras lindas de mi gente negra tienen de llanto, tienen de risa y tienen de pena. Son la belleza viva de nuestro Caribe mestizo, que canta con alegría sincera a pesar de las duras penas de la vida cotidiana.",
    "tema": "Música · Puerto Rico · A2"
  },
  {
    "id": "orig-popol-vuh-maiz",
    "t": "Los hombres de maíz · Popol Vuh",
    "autor": "Tradición Maya Kʼicheʼ",
    "obra": "Popol Vuh",
    "categoria": "saberes-originarios",
    "pais": "Guatemala",
    "paisCodigo": "gt",
    "nivel": "B1",
    "f": [
      "dt",
      "j",
      "nas"
    ],
    "txt": "De maíz amarillo y de maíz blanco se hizo su carne; de masa de maíz se hicieron los brazos y las piernas del hombre. Únicamente masa de maíz entró en la carne de nuestros primeros padres, los cuatro hombres creados.",
    "tema": "Saberes originarios · Guatemala · B1"
  },
  {
    "id": "orig-popol-vuh-amanecer",
    "t": "La espera del amanecer · Popol Vuh",
    "autor": "Tradición Maya Kʼicheʼ",
    "obra": "Popol Vuh",
    "categoria": "saberes-originarios",
    "pais": "Guatemala",
    "paisCodigo": "gt",
    "nivel": "B2",
    "f": [
      "j",
      "dt",
      "l"
    ],
    "txt": "No había todavía hombres, ni animales, ni pájaros ni peces. Solamente el cielo existía en calma y la faz de la tierra no se manifestaba. En la noche tranquila los Creadores deliberaron en el agua rodeada de plumas verdes.",
    "tema": "Saberes originarios · Guatemala · B2"
  },
  {
    "id": "orig-nezahualcoyotl-cenzontle",
    "t": "Amo el canto del cenzontle · Nezahualcóyotl",
    "autor": "Nezahualcóyotl",
    "obra": "Cantos de Netzahualcóyotl",
    "categoria": "saberes-originarios",
    "pais": "México",
    "paisCodigo": "mx",
    "nivel": "A1",
    "f": [
      "c",
      "nas",
      "dt"
    ],
    "txt": "Amo el canto del cenzontle, pájaro de cuatrocientas voces. Amo el color del jade y el enervante perfume de las flores, pero amo más a mi hermano, el hombre, que camina con respeto sobre la misma tierra sagrada.",
    "tema": "Saberes originarios · México · A1"
  },
  {
    "id": "orig-nezahualcoyotl-vivir",
    "t": "¿Acaso de verdad se vive? · Nezahualcóyotl",
    "autor": "Nezahualcóyotl",
    "obra": "Cantos floridos",
    "categoria": "saberes-originarios",
    "pais": "México",
    "paisCodigo": "mx",
    "nivel": "B1",
    "f": [
      "dt",
      "rr",
      "s"
    ],
    "txt": "¿Acaso de verdad se vive en la tierra? No para siempre en la tierra: solo un breve instante aquí. Aunque sea de jade se quiebra, aunque sea de oro se rompe, aunque sea plumaje de quetzal se desgarra.",
    "tema": "Saberes originarios · México · B1"
  },
  {
    "id": "orig-pachamama-sumak-kawsay",
    "t": "Pachamama y el Sumak Kawsay",
    "autor": "Cosmovisión Andina Quechua",
    "obra": "Sabiduría ancestral de los Andes",
    "categoria": "saberes-originarios",
    "pais": "Bolivia",
    "paisCodigo": "bo",
    "nivel": "A2",
    "f": [
      "nas",
      "dt",
      "rr"
    ],
    "txt": "En los Andes aprendemos que la tierra no nos pertenece, sino que nosotros pertenecemos a la Pachamama. El buen vivir consiste en caminar con respeto y en armonía con el río, el viento, la montaña y la comunidad entera.",
    "tema": "Saberes originarios · Bolivia · A2"
  },
  {
    "id": "orig-aymara-suma-qamana",
    "t": "Suma Qamaña: vivir bien · Aymara",
    "autor": "Cosmovisión Aymara",
    "obra": "Principios comunitarios del Altiplano",
    "categoria": "saberes-originarios",
    "pais": "Bolivia",
    "paisCodigo": "bo",
    "nivel": "B1",
    "f": [
      "dt",
      "rr",
      "nas"
    ],
    "txt": "Vivir bien no es acumular riquezas individuales, sino convivir en equilibrio entre personas, naturaleza y antepasados. Quien comparte su pan nunca pasará hambre; quien cuida el agua asegura la vida de las futuras generaciones del altiplano.",
    "tema": "Saberes originarios · Bolivia · B1"
  },
  {
    "id": "orig-guarani-palabra-sagrada",
    "t": "La palabra sagrada · Tradición Guaraní",
    "autor": "Tradición Guaraní",
    "obra": "Ayvu Rapyta (El fundamento de la palabra)",
    "categoria": "saberes-originarios",
    "pais": "Paraguay",
    "paisCodigo": "py",
    "nivel": "A2",
    "f": [
      "j",
      "e",
      "nas"
    ],
    "txt": "Para los antiguos guaraníes, la palabra es sagrada y engendra el alma humana. La selva no es un recurso que se explota, sino un hogar sagrado donde habitan los espíritus del agua, las aves y los árboles milenarios.",
    "tema": "Saberes originarios · Paraguay · A2"
  },
  {
    "id": "orig-guarani-tierra-sin-mal",
    "t": "Yvy Marãeʼỹ: La tierra sin mal · Guaraní",
    "autor": "Tradición Mbya Guaraní",
    "obra": "Mitos de la selva",
    "categoria": "saberes-originarios",
    "pais": "Paraguay",
    "paisCodigo": "py",
    "nivel": "B1",
    "f": [
      "rr",
      "dt",
      "j"
    ],
    "txt": "Buscamos la tierra sin mal caminando hacia el oriente con cantos y rezos comunitarios. Es un lugar de paz donde las flechas no hieren, donde las cosechas son generosas y donde la muerte no interrumpe la danza de la vida.",
    "tema": "Saberes originarios · Paraguay · B1"
  },
  {
    "id": "orig-mapuche-nuke-mapu",
    "t": "Ñuke Mapu: Madre tierra · Mapuche",
    "autor": "Pueblo Mapuche",
    "obra": "Sabiduría del Wallmapu",
    "categoria": "saberes-originarios",
    "pais": "Chile",
    "paisCodigo": "cl",
    "nivel": "A2",
    "f": [
      "n",
      "dt",
      "rr"
    ],
    "txt": "Para el pueblo mapuche, la tierra es madre y protectora de todo lo viviente. Cuando cortamos un árbol o tomamos agua del estero, pedimos permiso a los espíritus guardianes con respeto y agradecimiento profundo.",
    "tema": "Saberes originarios · Chile · A2"
  },
  {
    "id": "orig-mapuche-canelo",
    "t": "El sagrado árbol del Canelo · Mapuche",
    "autor": "Tradición Mapuche",
    "obra": "Símbolos sagrados del Sur",
    "categoria": "saberes-originarios",
    "pais": "Chile",
    "paisCodigo": "cl",
    "nivel": "B1",
    "f": [
      "c",
      "l",
      "dt"
    ],
    "txt": "El canelo es el árbol sagrado que preside los acuerdos de paz y las rogativas comunitarias. Sus ramas verdes representan la justicia limpia y la conexión directa entre la tierra firme y el cielo protector de nuestros abuelos.",
    "tema": "Saberes originarios · Chile · B1"
  },
  {
    "id": "orig-wayuu-tejido",
    "t": "El tejido de la araña Waleʼkerü · Wayúu",
    "autor": "Pueblo Wayúu",
    "obra": "Relatos de la Guajira",
    "categoria": "saberes-originarios",
    "pais": "Colombia",
    "paisCodigo": "co",
    "nivel": "B1",
    "f": [
      "j",
      "dt",
      "l"
    ],
    "txt": "En el desierto de la Guajira, la araña Waleʼkerü enseñó a tejer a las mujeres wayúu al amanecer. Cada dibujo geométrico en las mochilas representa un pensamiento, una estrella, un camino o el suspiro del viento marino.",
    "tema": "Saberes originarios · Colombia · B1"
  },
  {
    "id": "orig-amazonia-espiritu",
    "t": "El guardián de la selva amazónica",
    "autor": "Pueblos de la Cuenca Amazónica",
    "obra": "Voces de la Amazonía",
    "categoria": "saberes-originarios",
    "pais": "Ecuador",
    "paisCodigo": "ec",
    "nivel": "A2",
    "f": [
      "rr",
      "j",
      "dt"
    ],
    "txt": "La selva no duerme jamás. Cuando cae la noche, los chamanes escuchan el latido del río y el consejo de las plantas maestras, recordando a la humanidad que cada gota de agua sostiene la respiración del planeta.",
    "tema": "Saberes originarios · Ecuador · A2"
  },
  {
    "id": "orig-zapoteca-nubes",
    "t": "El pueblo de las nubes · Zapoteca",
    "autor": "Pueblo Zapoteca",
    "obra": "Crónicas de Monte Albán",
    "categoria": "saberes-originarios",
    "pais": "México",
    "paisCodigo": "mx",
    "nivel": "B1",
    "f": [
      "c",
      "dt",
      "s"
    ],
    "txt": "Nuestros antepasados zapotecos construyeron sus templos en lo alto de los cerros para dialogar cara a cara con las nubes. Allí aprendieron los secretos de las estaciones agrícolas, tallando en piedra el calendario de la vida comunitaria.",
    "tema": "Saberes originarios · México · B1"
  },
  {
    "id": "orig-guna-madre-mar",
    "t": "Bab Dummat y el cuidado del mar · Guna",
    "autor": "Pueblo Guna Yala",
    "obra": "Cantos del Archipiélago",
    "categoria": "saberes-originarios",
    "pais": "Panamá",
    "paisCodigo": "pa",
    "nivel": "A2",
    "f": [
      "dt",
      "rr",
      "c"
    ],
    "txt": "En las islas del Caribe, los ancianos guna enseñan a los niños que el arrecife de coral es la casa de los peces pequeños. Si pescamos con codicia, el mar enfermará y la tormenta llegará a nuestras costas.",
    "tema": "Saberes originarios · Panamá · A2"
  },
  {
    "id": "orig-rapa-nui-oceano",
    "t": "Los ojos de los Moai · Rapa Nui",
    "autor": "Tradición Rapa Nui",
    "obra": "Memoria polinésica de Pascua",
    "categoria": "saberes-originarios",
    "pais": "Chile",
    "paisCodigo": "cl",
    "nivel": "B1",
    "f": [
      "j",
      "dt",
      "l"
    ],
    "txt": "En medio del océano infinito, los colosos de piedra miran hacia el interior de la isla para proteger los poblados y las siembras. Sus miradas silenciosas guardan la memoria de los navegantes que cruzaron las olas guiados por las estrellas.",
    "tema": "Saberes originarios · Chile · B1"
  },
  {
    "id": "orig-afro-tambor-sagrado",
    "t": "El tambor y la raíz afrocaribeña",
    "autor": "Tradición Afrodescendiente del Caribe",
    "obra": "Memoria oral yoruba y bantú",
    "categoria": "saberes-originarios",
    "pais": "Cuba",
    "paisCodigo": "cu",
    "nivel": "A2",
    "f": [
      "rr",
      "dt",
      "nas"
    ],
    "txt": "El cuero del tambor no suena por casualidad: habla con la voz de los antepasados que cruzaron el mar encadenados. Cada golpe rítmico convoca la memoria, sana las heridas del alma y celebra la dignidad invencible de la comunidad.",
    "tema": "Saberes originarios · Cuba · A2"
  },
  {
    "id": "cul-mate-rioplatense",
    "t": "El rito del mate rioplatense",
    "autor": "Crónica rioplatense",
    "obra": "Costumbres del Cono Sur",
    "categoria": "cultura",
    "pais": "Argentina",
    "paisCodigo": "ar",
    "nivel": "A1",
    "f": [
      "dt",
      "rr",
      "e"
    ],
    "txt": "Tomar mate no es solo beber una infusión caliente de yerba: es un rito sagrado de hospitalidad. Se comparte la misma bombilla en una ronda de amigos donde todos tienen voz y el tiempo parece detenerse amablemente.",
    "tema": "Cultura y Vida · Argentina · A1"
  },
  {
    "id": "cul-tacos-maiz",
    "t": "El milenario maíz y los tacos mexicanos",
    "autor": "Tradición gastronómica mexicana",
    "obra": "Sabores de Mesoamérica",
    "categoria": "cultura",
    "pais": "México",
    "paisCodigo": "mx",
    "nivel": "A1",
    "f": [
      "c",
      "j",
      "dt"
    ],
    "txt": "En México, el maíz nixtamalizado es la base sagrada del alimento cotidiano. Una tortilla caliente sobre el comal se transforma en el taco perfecto al recibir un toque de salsa picante, cilantro fresco, cebolla y unas gotas de limón.",
    "tema": "Cultura y Vida · México · A1"
  },
  {
    "id": "cul-ceviche-peruano",
    "t": "El ceviche y el mar del Perú",
    "autor": "Gastronomía costeña del Perú",
    "obra": "Cocina de las cuatro regiones",
    "categoria": "cultura",
    "pais": "Perú",
    "paisCodigo": "pe",
    "nivel": "A2",
    "f": [
      "c",
      "dt",
      "j"
    ],
    "txt": "Pescado fresco del litoral pacífico cortado en dados limpios, marinado al instante con zumo de limón recién exprimido, ají limo picante y cebolla morada crujiente. El ceviche es el orgullo nacional que reúne a todas las familias peruanas.",
    "tema": "Cultura y Vida · Perú · A2"
  },
  {
    "id": "cul-cafe-colombiano",
    "t": "El aroma del café en la cordillera",
    "autor": "Tradición del Eje Cafetero",
    "obra": "Paisaje cultural cafetero",
    "categoria": "cultura",
    "pais": "Colombia",
    "paisCodigo": "co",
    "nivel": "A1",
    "f": [
      "rr",
      "dt",
      "j"
    ],
    "txt": "Al amanecer en las laderas verdes de los Andes, las familias recolectan a mano los granos rojos de café maduro. Ese grano aromático viajará por el mundo entero regalando el calor reconfortante de la hospitalidad colombiana.",
    "tema": "Cultura y Vida · Colombia · A1"
  },
  {
    "id": "cul-arepas-budare",
    "t": "Las arepas calientes en el budare",
    "autor": "Costumbres venezolanas y colombianas",
    "obra": "La mesa caribeña",
    "categoria": "cultura",
    "pais": "Venezuela",
    "paisCodigo": "ve",
    "nivel": "A1",
    "f": [
      "rr",
      "dt",
      "e"
    ],
    "txt": "Sobre el budare de hierro caliente, la masa redonda de harina de maíz se dora lentamente hasta inflarse. Al abrirla humeante y rellenarla con queso fresco o carne mechada, comienza el desayuno más querido de nuestras casas.",
    "tema": "Cultura y Vida · Venezuela · A1"
  },
  {
    "id": "cul-pura-vida-costarica",
    "t": "Pura Vida: la filosofía de Costa Rica",
    "autor": "Cultura costarricense",
    "obra": "Voces de Centroamérica",
    "categoria": "cultura",
    "pais": "Costa Rica",
    "paisCodigo": "cr",
    "nivel": "A1",
    "f": [
      "v",
      "dt",
      "rr"
    ],
    "txt": "Pura Vida no es únicamente un saludo cordial al encontrarse por la calle: es una filosofía serena de vida. Expresa gratitud por la naturaleza generosa, aprecio por la paz comunitaria y el optimismo alegre de cada día nuevo.",
    "tema": "Cultura y Vida · Costa Rica · A1"
  },
  {
    "id": "cul-san-telmo-tango",
    "t": "El mercado de San Telmo y el tango",
    "autor": "Crónica porteña",
    "obra": "Calles de Buenos Aires",
    "categoria": "cultura",
    "pais": "Argentina",
    "paisCodigo": "ar",
    "nivel": "A2",
    "f": [
      "l",
      "dt",
      "rr"
    ],
    "txt": "Los domingos en la plaza Dorrego los adoquines centenarios se llenan de antigüedades, cuadros y notas apasionadas de bandoneón. Parejas de baile giran con elegancia porteña ante la mirada maravillada de vecinos y turistas de todo el mundo.",
    "tema": "Cultura y Vida · Argentina · A2"
  },
  {
    "id": "cul-otavalo-telares",
    "t": "Los telares andinos de Otavalo",
    "autor": "Crónica serrana del Ecuador",
    "obra": "Mercados del Altiplano",
    "categoria": "cultura",
    "pais": "Ecuador",
    "paisCodigo": "ec",
    "nivel": "A2",
    "f": [
      "l",
      "dt",
      "rr"
    ],
    "txt": "En la plaza de los Ponchos, los artesanos indígenas de Otavalo exhiben cobijas, fajas y tapices tejidos con lanas de colores vivos. Cada tejido entrelaza siglos de paciencia, figuras sagradas del sol y destreza manual transmitida de padres a hijos.",
    "tema": "Cultura y Vida · Ecuador · A2"
  },
  {
    "id": "cul-malecon-habana",
    "t": "El Malecón de La Habana al atardecer",
    "autor": "Crónica habanera",
    "obra": "Postales de Cuba",
    "categoria": "cultura",
    "pais": "Cuba",
    "paisCodigo": "cu",
    "nivel": "A2",
    "f": [
      "l",
      "c",
      "dt"
    ],
    "txt": "El muro de piedra del Malecón abraza el mar azul frente a la ciudad antigua. Al caer la tarde, la gente se sienta a conversar, escuchar una guitarra lejana y recibir en el rostro la brisa salada que alivia el calor caribeño.",
    "tema": "Cultura y Vida · Cuba · A2"
  },
  {
    "id": "cul-oaxaca-fiestas",
    "t": "Oaxaca: barro negro y fiesta comunitaria",
    "autor": "Tradiciones de México",
    "obra": "Oaxaca milenaria",
    "categoria": "cultura",
    "pais": "México",
    "paisCodigo": "mx",
    "nivel": "B1",
    "f": [
      "rr",
      "j",
      "dt"
    ],
    "txt": "Oaxaca cautiva por sus vasijas de barro negro pulidas a mano, el aroma dulce del chocolate con canela y el sabor profundo de los siete moles. Durante la fiesta popular del Tequio, todo el vecindario colabora con alegría en el trabajo compartido.",
    "tema": "Cultura y Vida · México · B1"
  },
  {
    "id": "his-bolivar-carta-jamaica",
    "t": "Carta de Jamaica · Simón Bolívar",
    "autor": "Simón Bolívar",
    "obra": "Carta de Jamaica (1815)",
    "categoria": "historia",
    "pais": "Venezuela",
    "paisCodigo": "ve",
    "nivel": "B2",
    "f": [
      "rr",
      "dt",
      "cion"
    ],
    "txt": "Yo deseo más que otro alguno ver formar en América la más grande nación del mundo, menos por su extensión y riquezas que por su libertad y gloria. Es una idea grandiosa pretender formar de todo el Mundo Nuevo una sola patria unida.",
    "tema": "Historia y Crónica · Venezuela · B2"
  },
  {
    "id": "his-marti-nuestra-america",
    "t": "Nuestra América · José Martí",
    "autor": "José Martí",
    "obra": "Nuestra América (1891)",
    "categoria": "historia",
    "pais": "Cuba",
    "paisCodigo": "cu",
    "nivel": "B2",
    "f": [
      "dt",
      "s",
      "rr"
    ],
    "txt": "Trincheras de ideas valen más que trincheras de piedra. No hay proa que taje una nube de ideas. Una idea enérgica, flameada a tiempo ante el mundo, detiene como el relámpago a todo un ejército de opresores.",
    "tema": "Historia y Crónica · Cuba · B2"
  },
  {
    "id": "his-galeano-venas-abiertas",
    "t": "Las venas abiertas · Eduardo Galeano",
    "autor": "Eduardo Galeano",
    "obra": "Las venas abiertas de América Latina",
    "categoria": "historia",
    "pais": "Uruguay",
    "paisCodigo": "uy",
    "nivel": "B1",
    "f": [
      "v",
      "dt",
      "rr"
    ],
    "txt": "La división internacional del trabajo consiste en que unos países se especializan en ganar y otros en perder. Nuestra comarca del mundo fue precoz: se especializó en perder desde los remotos tiempos en que los europeos del Renacimiento se abalanzaron sobre el mar.",
    "tema": "Historia y Crónica · Uruguay · B1"
  },
  {
    "id": "his-mariategui-ensayos",
    "t": "Siete ensayos · José Carlos Mariátegui",
    "autor": "José Carlos Mariátegui",
    "obra": "Siete ensayos de interpretación",
    "categoria": "historia",
    "pais": "Perú",
    "paisCodigo": "pe",
    "nivel": "B2",
    "f": [
      "dt",
      "s",
      "cion"
    ],
    "txt": "No queremos ciertamente que el socialismo sea en América calco y copia. Debe ser creación heroica. Tenemos que dar vida, con nuestra propia realidad, en nuestro propio lenguaje, al porvenir libre de los pueblos que habitan estas cordilleras.",
    "tema": "Historia y Crónica · Perú · B2"
  },
  {
    "id": "his-menchu-memoria",
    "t": "La memoria y la paz · Rigoberta Menchú",
    "autor": "Rigoberta Menchú",
    "obra": "Discurso Premio Nobel de la Paz",
    "categoria": "historia",
    "pais": "Guatemala",
    "paisCodigo": "gt",
    "nivel": "B1",
    "f": [
      "dt",
      "rr",
      "c"
    ],
    "txt": "La paz no es solamente la ausencia de guerra; la paz es justicia, la paz es pan, la paz es respeto a las culturas originarias y a la dignidad de cada ser humano. Solo reconociendo nuestra rica diversidad florecerá un porvenir fraterno.",
    "tema": "Historia y Crónica · Guatemala · B1"
  },
  {
    "id": "his-las-casas-dignidad",
    "t": "Defensa de los indígenas · Bartolomé de las Casas",
    "autor": "Bartolomé de las Casas",
    "obra": "Brevísima relación de la destrucción",
    "categoria": "historia",
    "pais": "República Dominicana",
    "paisCodigo": "do",
    "nivel": "B2",
    "f": [
      "dt",
      "cion",
      "s"
    ],
    "txt": "Todas las naciones del mundo son hombres y en todos ellos está estampada la naturaleza racional. Nadie nace enseñado, pero todos tienen la capacidad innata de aprender la justicia, el amor a la verdad y la convivencia pacífica.",
    "tema": "Historia y Crónica · República Dominicana · B2"
  },
  {
    "id": "his-cartagena-murallas",
    "t": "Las murallas de Cartagena de Indias",
    "autor": "Crónica histórica del Caribe",
    "obra": "Historias del Nuevo Reino",
    "categoria": "historia",
    "pais": "Colombia",
    "paisCodigo": "co",
    "nivel": "A2",
    "f": [
      "rr",
      "dt",
      "l"
    ],
    "txt": "Construidas con piedra de cantería y coral durante más de doscientos años, las murallas de Cartagena resistieron piratas y tormentas caribeñas. Hoy custodian un centro histórico colonial repleto de balcones floridos, faroles antiguos y leyendas libertarias.",
    "tema": "Historia y Crónica · Colombia · A2"
  },
  {
    "id": "his-cusco-muros-incas",
    "t": "La piedra de los doce ángulos en Cusco",
    "autor": "Crónica arqueológica andina",
    "obra": "Cusco: ombligo del mundo incaico",
    "categoria": "historia",
    "pais": "Perú",
    "paisCodigo": "pe",
    "nivel": "A2",
    "f": [
      "c",
      "dt",
      "rr"
    ],
    "txt": "En la antigua capital del Tahuantinsuyo, los maestros canteros tallaron bloques gigantescos de roca verde con una precisión milimétrica tan asombrosa que entre ellas no cabe ni el filo de una navaja, desafiando terremotos durante siglos enteros.",
    "tema": "Historia y Crónica · Perú · A2"
  }
];

function filterTexts(list, { category = 'todos', country = 'todos', level = 'todos', query = '' } = {}) {
  const q = (query || '').trim().toLowerCase();
  return list.filter(item => {
    if (category && category !== 'todos' && item.categoria !== category) return false;
    if (country && country !== 'todos' && item.pais !== country) return false;
    if (level && level !== 'todos' && item.nivel !== level) return false;
    if (q) {
      const haystack = (item.t + ' ' + item.autor + ' ' + item.pais + ' ' + item.txt + ' ' + item.categoria).toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

function getUniqueCountries(list) {
  const s = new Set();
  list.forEach(i => s.add(i.pais));
  return Array.from(s).sort((a, b) => a.localeCompare(b, 'es'));
}

const g = typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : this);
g.TEXTS = TEXTS;
g.CATEGORIES = CATEGORIES;
g.LEVELS = LEVELS;
g.filterTexts = filterTexts;
g.getUniqueCountries = getUniqueCountries;


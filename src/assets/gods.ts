export interface God {
  id: string
  name: string
  title: string
  domain: string
  intro: string
  guideText: string
  guideText_minigame_1: string
  guideText_minigame_2: string
  guideText_minigame_3: string
  theme: GodTheme
  revealDelay: number
}

export interface GodTheme {
  primary: string
  secondary: string
  accent: string
  effect: 'lightning' | 'wave' | 'smoke' | 'bloom' | 'fire' | 'wind' | 'hunt' | 'forge' | 'wisdom' | 'hearth' | 'love' | 'shadow'
  emoji: string
}

export const gods: God[] = [
  {
    id: 'zeus',
    name: 'Zeus',
    title: 'Koning der Goden',
    domain: 'De Hemel & Donder',
    intro: 'Heerser van de Olympus, god van de bliksem en de donder. Ik breng orde aan de chaos.',
    guideText: 'Volg mij door de tijdlijn van de Olympus. Ik zal je de grootsheid van de goden tonen.',
    guideText_minigame_1: 'Ik breng orde aan de chaos — jij ook! Zet de namen van de schepping in de juiste volgorde, van het allereerste begin tot de Olympus.',
    guideText_minigame_2: 'Zelfs een bliksemschicht volgt een vast pad. Elke tegel heeft zijn vaste plek — sleep ze op hun juiste plek en herstel de afbeelding!',
    guideText_minigame_3: 'Een goede heerser kent zijn helden. Beantwoord de vragen — ik wil zien wat jij weet over de grote strijders van Griekenland!',
    theme: {
      primary: '#1a1a2e',
      secondary: '#f5c518',
      accent: '#ffffff',
      effect: 'lightning',
      emoji: '⚡',
    },
    revealDelay: 0,
  },
  {
    id: 'hera',
    name: 'Hera',
    title: 'Koningin der Goden',
    domain: 'Huwelijk & Familie',
    intro: 'Koningin van de Olympus en beschermster van het huwelijk. Mijn trouw is onwrikbaar.',
    guideText: 'Ik zal je de verhalen van liefde, jaloezie en macht op de Olympus vertellen.',
    guideText_minigame_1: 'Elke familie kent haar oorsprong. Orden de namen van het begin af aan — wie was er als allereerste, voor alles bestond?',
    guideText_minigame_2: 'Een koningin heeft oog voor elk detail. Elke tegel hoort op precies één plek — herstel de afbeelding met geduld.',
    guideText_minigame_3: 'Echte kennis verdient respect. Beantwoord de vragen over de helden en bewijs jouw wijsheid aan de Olympus!',
    theme: {
      primary: '#2d1b4e',
      secondary: '#c084fc',
      accent: '#fde68a',
      effect: 'bloom',
      emoji: '👑',
    },
    revealDelay: 300,
  },
  {
    id: 'poseidon',
    name: 'Poseidon',
    title: 'Heerser der Zeeën',
    domain: 'De Zee & Aardbevingen',
    intro: 'Ik beheers de diepten van de oceaan en de kracht van de aarde zelf.',
    guideText: 'Laat mij je meenemen op een reis over de zeven zeeën van de antieke wereld.',
    guideText_minigame_1: 'De zee heeft haar eigen volgorde — golf na golf. Zo ook de schepping. Breng de namen in de juiste orde, van chaos tot Olympus.',
    guideText_minigame_2: 'Golven vallen altijd op de juiste plek. Doe hetzelfde: herstel de puzzelafbeelding tegel voor tegel tot de zee weer kalm is.',
    guideText_minigame_3: 'Diep in de oceaan liggen verborgen schatten. Diep in jouw hoofd liggen de antwoorden — beantwoord de vragen over de helden!',
    theme: {
      primary: '#0c2a4a',
      secondary: '#06b6d4',
      accent: '#e0f2fe',
      effect: 'wave',
      emoji: '🔱',
    },
    revealDelay: 600,
  },
  {
    id: 'demeter',
    name: 'Demeter',
    title: 'Godin van de Oogst',
    domain: 'Landbouw & Seizoenen',
    intro: 'Ik geef de aarde vruchtbaarheid en bepaal de seizoenen door mijn liefde voor mijn dochter.',
    guideText: 'Ik vertel je over het leven van de Griekse boeren en de mysteries van Eleusis.',
    guideText_minigame_1: 'Elk seizoen volgt het vorige — zaad, groei, bloei, oogst. Zo ook de schepping. Orden de namen stap voor stap van het begin tot het einde.',
    guideText_minigame_2: 'Een tuinier legt elk zaad op de juiste plek. Doe hetzelfde met de tegels — leg ze zorgvuldig op hun plek en maak de afbeelding compleet.',
    guideText_minigame_3: 'Kennis groeit zoals een plant — stap voor stap. Beantwoord elke vraag over de helden en laat zien wat je hebt geleerd!',
    theme: {
      primary: '#1a2e0a',
      secondary: '#84cc16',
      accent: '#fef08a',
      effect: 'bloom',
      emoji: '🌾',
    },
    revealDelay: 900,
  },
  {
    id: 'athena',
    name: 'Athena',
    title: 'Godin van de Wijsheid',
    domain: 'Wijsheid, Oorlog & Ambachten',
    intro: 'Ik ben de godin van strategie en wijsheid. Kennis is de grootste kracht.',
    guideText: 'Onder mijn begeleiding ontdek je de filosofie, kunst en oorlogsvoering van Griekenland.',
    guideText_minigame_1: 'Strategie begint met het grote plaatje. Kijk naar alle namen, bedenk de logische volgorde — dan handel je pas.',
    guideText_minigame_2: 'Een strategisch denker ziet patronen. Bekijk de tegels goed: waar hoort elk stuk? Herstel de afbeelding systematisch.',
    guideText_minigame_3: 'Kennis is het krachtigste wapen. Gebruik jouw wijsheid om de vragen over de helden te beantwoorden — denk goed na!',
    theme: {
      primary: '#1e3a5f',
      secondary: '#94a3b8',
      accent: '#fbbf24',
      effect: 'wisdom',
      emoji: '🦉',
    },
    revealDelay: 1200,
  },
  {
    id: 'apollo',
    name: 'Apollo',
    title: 'God van de Zon',
    domain: 'Zon, Muziek & Profetie',
    intro: 'God van licht, muziek en waarheid. Ik spreek de orakels van Delphi.',
    guideText: 'Ik neem je mee langs de grote kunstwerken en profetieën van het antieke Griekenland.',
    guideText_minigame_1: 'Elk lied heeft een begin, een midden en een einde. Zo ook de schepping. Orden de namen van de allereerste klank tot de Olympus.',
    guideText_minigame_2: 'Het licht van de zon onthult elk detail. Zoek voor elke tegel zijn exacte plek — samen vormen ze een prachtige afbeelding.',
    guideText_minigame_3: 'Het orakel kent alle antwoorden — maar jij ook! Beantwoord de vragen over de helden en laat de waarheid schijnen.',
    theme: {
      primary: '#3d2000',
      secondary: '#f97316',
      accent: '#fef3c7',
      effect: 'fire',
      emoji: '☀️',
    },
    revealDelay: 1500,
  },
  {
    id: 'artemis',
    name: 'Artemis',
    title: 'Godin van de Jacht',
    domain: 'De Jacht & De Maan',
    intro: 'Ik jaag onder het maanlicht en bescherm de natuur en de wildernis.',
    guideText: 'Volg mij door de wouden en ontdek hoe de Grieken de natuur vereerden.',
    guideText_minigame_1: 'Een goede jager weet de volgorde: spoor, doel, pijl. Zo ook de schepping heeft een volgorde. Orden de namen van begin tot einde!',
    guideText_minigame_2: 'In het woud past elk dier op zijn vaste plek. Leg elke tegel op zijn juiste plek en herstel de afbeelding.',
    guideText_minigame_3: 'Een jager focust op één prooi tegelijk. Lees elke vraag over de helden goed en kies het juiste antwoord!',
    theme: {
      primary: '#0f2027',
      secondary: '#64748b',
      accent: '#e2e8f0',
      effect: 'hunt',
      emoji: '🌙',
    },
    revealDelay: 1800,
  },
  {
    id: 'ares',
    name: 'Ares',
    title: 'God van de Oorlog',
    domain: 'Oorlog & Strijd',
    intro: 'Ik ben de onstuitbare kracht van het slagveld. Bloed en glorie zijn mijn domein.',
    guideText: 'Ik leid je door de grote oorlogen en veldslagen van het antieke Griekenland.',
    guideText_minigame_1: 'Op het slagveld is volgorde alles: eerst aanval, dan doorbraak, dan overwinning. Orden de schepping — snel en doortastend!',
    guideText_minigame_2: 'Een goede strijder kent het slagveld van buiten en van binnen. Herstel de afbeelding — elke tegel op zijn exacte plek!',
    guideText_minigame_3: 'Sterke strijders kennen de geschiedenis van hun helden. Beantwoord de vragen — aarzel niet!',
    theme: {
      primary: '#3b0000',
      secondary: '#dc2626',
      accent: '#fca5a5',
      effect: 'fire',
      emoji: '⚔️',
    },
    revealDelay: 2100,
  },
  {
    id: 'aprhodite',
    name: 'Aphrodite',
    title: 'Godin van de Liefde',
    domain: 'Liefde & Schoonheid',
    intro: 'Ik ben de belichaming van liefde en schoonheid. Geen god of sterveling kan mijn kracht weerstaan.',
    guideText: 'Ik vertel je de mooiste én wreedste verhalen van liefde en verlangen in de mythologie.',
    guideText_minigame_1: 'Schoonheid ontstaat uit chaos — van duisternis naar harmonie. Orden de namen van de schepping mooi van begin tot einde.',
    guideText_minigame_2: 'Een mooi mozaïek vraagt geduld en een goed oog. Leg de tegels op hun plek en onthul de prachtige afbeelding.',
    guideText_minigame_3: 'Met liefde en aandacht los je elk raadsel op. Beantwoord de vragen over de helden — jij kunt het!',
    theme: {
      primary: '#3d0a1e',
      secondary: '#f43f5e',
      accent: '#fce7f3',
      effect: 'love',
      emoji: '🌹',
    },
    revealDelay: 2400,
  },
  {
    id: 'hephaistos',
    name: 'Hephaistos',
    title: 'God van het Vuur',
    domain: 'Vuur, Smeden & Ambacht',
    intro: 'In mijn smidse diep onder de aarde smeed ik de wapens en sieraden van de goden.',
    guideText: 'Ik toon je de techniek en het vakmanschap van de Griekse beschaving.',
    guideText_minigame_1: 'Een meesterwerk begint bij de basis. Orden de namen van de schepping van de allereerste grondstof af aan — stap voor stap.',
    guideText_minigame_2: 'In mijn smidse legt elk onderdeel op zijn exacte plek. Doe hetzelfde — herstel de puzzel nauwkeurig, stuk voor stuk.',
    guideText_minigame_3: 'Vakmanschap vraagt kennis van de meesters. Beantwoord de vragen over de helden en toon jouw meesterschap!',
    theme: {
      primary: '#1c0a00',
      secondary: '#ea580c',
      accent: '#fed7aa',
      effect: 'forge',
      emoji: '🔥',
    },
    revealDelay: 2700,
  },
  {
    id: 'hermes',
    name: 'Hermes',
    title: 'Boodschapper der Goden',
    domain: 'Handel, Reizigers & Boeven',
    intro: 'Sneller dan de wind breng ik berichten tussen goden en mensen. Ik ken alle wegen.',
    guideText: 'Ik ben jouw gids! Met mij reis je snel en slim door alle verhalen van de Olympus.',
    guideText_minigame_1: 'Als boodschapper vlieg ik van plek naar plek. Orden de namen van de schepping snel — wie was er als allereerste?',
    guideText_minigame_2: 'Ik ben de snelste god van de Olympus! Herstel de afbeelding zo slim mogelijk — elke tegel op zijn juiste plek.',
    guideText_minigame_3: 'Slim zijn is beter dan sterk zijn. Lees elke vraag goed en kies slim het juiste antwoord over de helden!',
    theme: {
      primary: '#0f1f0f',
      secondary: '#22c55e',
      accent: '#d1fae5',
      effect: 'wind',
      emoji: '🪄',
    },
    revealDelay: 3000,
  },
  {
    id: 'hestia',
    name: 'Hestia',
    title: 'Godin van de Haard',
    domain: 'Het Huis & de Familie',
    intro: 'Ik ben de zachte vlam in elk Grieks huishouden. Thuis is waar mijn kracht ligt.',
    guideText: 'Met mij ontdek je het dagelijks leven van gewone Grieken, thuis en in de gemeenschap.',
    guideText_minigame_1: 'Thuis begint bij een warm vuur — en het vuur begint bij het begin. Orden de namen van de schepping rustig en zorgvuldig.',
    guideText_minigame_2: 'In een goed huis heeft alles zijn vaste plek. Leg elke tegel zorgvuldig op zijn juiste plek en herstel de afbeelding.',
    guideText_minigame_3: 'Aan de haard worden de mooiste verhalen verteld. Luister naar de vragen en beantwoord ze over de Griekse helden!',
    theme: {
      primary: '#2a1500',
      secondary: '#f59e0b',
      accent: '#fffbeb',
      effect: 'hearth',
      emoji: '🕯️',
    },
    revealDelay: 3300,
  },
  {
    id: 'hades',
    name: 'Hades',
    title: 'Heerser van de Onderwereld',
    domain: 'De Dood & de Onderwereld',
    intro: 'Alle stervelingen komen uiteindelijk naar mijn rijk. Ik ben niet wreed — alleen onvermijdelijk.',
    guideText: 'Durf jij met mij af te dalen naar de Onderwereld en de mysteries van de dood te ontdekken?',
    guideText_minigame_1: 'Alles heeft een begin — en een einde bij mij. Orden de schepping van de allereerste chaos tot de Olympus. Durf jij?',
    guideText_minigame_2: 'In mijn rijk heeft elke ziel zijn vaste plek. Leg elke tegel op zijn juiste plek — er is geen ontsnappen aan de orde.',
    guideText_minigame_3: 'Alle kennis keert uiteindelijk naar mijn rijk terug. Bewijs wat jij weet over de helden — voordat het te laat is!',
    theme: {
      primary: '#0a0a0a',
      secondary: '#7c3aed',
      accent: '#c4b5fd',
      effect: 'shadow',
      emoji: '💀',
    },
    revealDelay: 3600,
  },
]

// Helper: get a god by id
export function getGodById(id: string): God | undefined {
  return gods.find((g) => g.id === id)
}

// Helper: get gods sorted by reveal order
export function getGodsInRevealOrder(): God[] {
  return [...gods].sort((a, b) => a.revealDelay - b.revealDelay)
}

// Helper: get the stored chosen god from localStorage
export function getChosenGod(): God | undefined {
  const id = localStorage.getItem('chosenGodId')
  return id ? getGodById(id) : undefined
}
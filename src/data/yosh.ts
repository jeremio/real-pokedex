import type { IMoveListItem } from '@/types'

const childYoshUrl = new URL(
  '/src/assets/images/BonzaiYoshChild.png',
  import.meta.url,
)
const youngYoshUrl = new URL(
  '/src/assets/images/BonzaiYoshYoung.png',
  import.meta.url,
)
const professorYoshUrl = new URL(
  '/src/assets/images/BonzaiYoshProfessor.png',
  import.meta.url,
)

export const yoshTypes = ['grass', 'dragon']

export const yoshDetails = {
  flavorText:
    'If he\'s not spending time with his wife & daughter then you can find him either gardening or building cool new Vue apps',
  genus: 'Pokedex creator ',
  description: 'Loves tacos and pineapple pizza',
  encounter: 'at his desk working too much or gardening',
  location: 'sunny south Florida',
}

export const yoshStats = [
  { label: 'js', max: 500, base: 305 },
  { label: 'html', max: 1200, base: 786 },
  { label: 'css', max: 1200, base: 808 },
  { label: 'creative', max: 700, base: 444 },
  { label: 'funny', max: 500, base: 200 },
  { label: 'cool', max: 500, base: 250 },
]

export const yoshEvolutions = [
  { name: 'Child Yosh', img: childYoshUrl, level: '9 years' },
  { name: 'Young Yosh', img: youngYoshUrl, level: '27 years' },
  { name: 'Prof. Yosh', img: professorYoshUrl, level: '45 years' },
]

export const yoshMoves: Record<'level-up' | 'machine', IMoveListItem[]> = {
  'level-up': [
    {
      name: 'Make Coffee',
      type: 'ground',
      levelLearnedAt: 20,
      damageClass: 'status',
      machineLearnedBy: '',
      power: 0,
    },
    {
      name: 'Workout',
      type: 'fighting',
      levelLearnedAt: 21,
      damageClass: 'physical',
      machineLearnedBy: '',
      power: 60,
    },
    {
      name: 'Pay bills',
      type: 'dark',
      levelLearnedAt: 18,
      damageClass: 'status',
      machineLearnedBy: '',
      power: 0,
    },
    {
      name: 'Repot Plant',
      type: 'grass',
      levelLearnedAt: 27,
      damageClass: 'physical',
      machineLearnedBy: '',
      power: 75,
    },
    {
      name: 'Inner Chi',
      type: 'dragon',
      levelLearnedAt: 29,
      damageClass: 'status',
      machineLearnedBy: '',
      power: 0,
    },
    {
      name: 'Reset Desk',
      type: 'psychic',
      levelLearnedAt: 30,
      damageClass: 'physical',
      machineLearnedBy: '',
      power: 60,
    },
    {
      name: 'daddy time',
      type: 'dragon',
      levelLearnedAt: 34,
      damageClass: 'physical',
      machineLearnedBy: '',
      power: 100,
    },
  ],
  'machine': [
    {
      name: 'readable code',
      type: 'fairy',
      levelLearnedAt: 0,
      damageClass: 'physical',
      machineLearnedBy: 'js01',
      power: 90,
    },
    {
      name: 'organized sass',
      type: 'electric',
      levelLearnedAt: 0,
      damageClass: 'status',
      machineLearnedBy: 'scss',
      power: 0,
    },
    {
      name: 'Semantic html',
      type: 'dragon',
      levelLearnedAt: 0,
      damageClass: 'physical',
      machineLearnedBy: 'html',
      power: 100,
    },
    {
      name: 'script setup',
      type: 'dragon',
      levelLearnedAt: 0,
      damageClass: 'physical',
      machineLearnedBy: 'vue3',
      power: 100,
    },
    {
      name: 'cool app',
      type: 'dragon',
      levelLearnedAt: 0,
      damageClass: 'physical',
      machineLearnedBy: 'js02',
      power: 100,
    },
    {
      name: 'mentor',
      type: 'fairy',
      levelLearnedAt: 0,
      damageClass: 'status',
      machineLearnedBy: 'dm01',
      power: 0,
    },
    {
      name: 'documentation',
      type: 'dragon',
      levelLearnedAt: 0,
      damageClass: 'physical',
      machineLearnedBy: 'js04',
      power: 100,
    },
  ],
}

export const yoshSprites = {
  firstHalf: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/512px-HTML5_logo_and_wordmark.svg.png?20170517184425',
    'https://cdn.freebiesupply.com/logos/large/2x/css3-logo-png-transparent.png',
    'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/2048px-Visual_Studio_Code_1.35_icon.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png',
    'https://www.pngall.com/wp-content/uploads/13/Pokemon-Logo-PNG-Pic.png',
    'https://cdn.freebiesupply.com/logos/thumbs/2x/prettier-1-logo.png',
  ],
  secondHalf: [
    'https://vuejs.org/images/logo.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/1039px-Vitejs-logo.svg.png',
    'https://pinia.vuejs.org/logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/2560px-Sass_Logo_Color.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/ESLint_logo.svg/1200px-ESLint_logo.svg.png',
  ],
}

<template>
  <main class="pokedex">
    <PokedexLeft>
      <WindowTemplate class="pokedex__left-window" @click="handleOpenHelper">
        <Toast v-if="isToastVisible" v-bind="toastProps.header" />
        <KeepAlive>
          <component :is="mainViewComponent" />
        </KeepAlive>
        <Toast v-if="isToastVisible" v-bind="toastProps.footer" />
      </WindowTemplate>
      <LeftControls />
    </PokedexLeft>
    <PokedexRight>
      <WindowTemplate variant="md" class="pokedex__right-window" @click="handleOpenHelper">
        <component :is="secondaryViewComponent" v-bind="secondaryViewProps" />
      </WindowTemplate>
      <RightControls />
      <MiniViews />
    </PokedexRight>
  </main>
</template>

<script setup lang="ts">
import Toast from '@/components/atoms/Toast.vue'
import LeftControls from '@/components/molecules/LeftControls.vue'
import RightControls from '@/components/molecules/RightControls.vue'
import MiniViews from '@/components/organisms/MiniViews.vue'
import PokedexLeft from '@/components/templates/PokedexLeft.vue'
import PokedexRight from '@/components/templates/PokedexRight.vue'
import WindowTemplate from '@/components/templates/WindowTemplate.vue'
import BaseDetails from '@/components/views/BaseDetails.vue'
import BaseStats from '@/components/views/BaseStats.vue'
import CreditThanks from '@/components/views/CreditThanks.vue'
import DamageRelations from '@/components/views/DamageRelations.vue'
import EvolutionChain from '@/components/views/EvolutionChain.vue'
import MainMenu from '@/components/views/MainMenu.vue'
import PlaceHolder from '@/components/views/PlaceHolder.vue'
import PokemonGens from '@/components/views/PokemonGens.vue'
import PokemonIntro from '@/components/views/PokemonIntro.vue'
import PokemonList from '@/components/views/PokemonList.vue'
import PokemonMoves from '@/components/views/PokemonMoves.vue'
import PokemonWild from '@/components/views/PokemonWild.vue'
import ProfYosh from '@/components/views/ProfYosh.vue'
import Region from '@/components/views/Region.vue'
import SpriteCollection from '@/components/views/SpriteCollection.vue'

import { useControlsStore } from '@/store/controls.ts'
import { usePokeStore } from '@/store/pokemon.ts'

const emit = defineEmits(['open'])
const pokeStore = usePokeStore()
const controlsStore = useControlsStore()

const { activePokemonName } = storeToRefs(pokeStore)
const { mainView, secondaryView } = storeToRefs(controlsStore)
const { togglePower } = controlsStore

const isToastVisible = computed(() => {
  const viewsWithToast = ['LIST', 'POKEMON', 'GENERATIONS', 'YOSH']
  return viewsWithToast.includes(mainView.value)
})

const mainViewComponent = computed(() => {
  const options = {
    INTRO: PokemonIntro,
    MENU: MainMenu,
    LIST: PokemonList,
    POKEMON: PokemonWild,
    GENERATIONS: PokemonGens,
    YOSH: ProfYosh,
    CREDITS: CreditThanks,
  }
  return options[mainView.value] || null
})

const secondaryViewComponent = computed(() => {
  const view = mainView.value
  if (['OFF', 'INTRO'].includes(view))
    return null
  if (view === 'LIST')
    return Region
  const secondaryOptions = {
    1: BaseDetails,
    2: BaseStats,
    3: DamageRelations,
    4: DamageRelations,
    5: EvolutionChain,
    6: PokemonMoves,
    7: PokemonMoves,
    8: SpriteCollection,
  }
  const pokeView = secondaryOptions[secondaryView.value]
  if (['POKEMON', 'YOSH'].includes(view))
    return pokeView
  return PlaceHolder
})

const secondaryViewProps = computed(() => {
  const options = {
    3: { relation: 'from' },
    4: { relation: 'to' },
    6: { filterBy: 'level-up' },
    7: { filterBy: 'machine' },
  }
  return options[secondaryView.value] || null
})

const toastProps = computed(() => {
  const options = {
    LIST: {
      header: {
        isHeader: true,
        copy: `Pokemon`,
      },
      footer: {
        isHeader: false,
        copy: `Select`,
        btnCopy: 'A',
      },
    },
    POKEMON: {
      header: {
        isHeader: true,
        copy: activePokemonName.value,
      },
      footer: {
        isHeader: false,
        copy: 'Back',
        btnCopy: 'B',
      },
    },
    GENERATIONS: {
      header: {
        isHeader: true,
        copy: 'Generations',
      },
      footer: {
        isHeader: false,
        copy: `Select`,
        btnCopy: 'A',
      },
    },
    YOSH: {
      header: {
        isHeader: true,
        copy: 'Prof. Yosh',
      },
      footer: {
        isHeader: false,
        copy: 'Back',
        btnCopy: 'B',
      },
    },
  }
  return options[mainView.value] || null
})

function handleOpenHelper() {
  emit('open')
}

async function initPokedex() {
  await pokeStore.getGeneration()
  togglePower()
}

onMounted(async () => {
  await initPokedex()
})
</script>

<style scoped lang="scss">
.pokedex {
  width: 1000px;
  height: 700px;
  display: grid;
  grid-template-columns: 500px 500px;

  &__left-window,
  &__right-window {
    margin-bottom: 25px;
  }
}
</style>

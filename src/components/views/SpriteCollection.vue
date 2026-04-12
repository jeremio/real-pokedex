<template>
  <section class="sprite-collection">
    <PikachuLoader v-if="isLoading && !isYoshView" />
    <div v-else class="sprite-collection__container">
      <div class="sprite-collection__sprites">
        <div
          v-for="sprite in spritesSplit.firstHalf"
          :key="sprite"
          class="sprite-collection__sprite"
        >
          <img :src="sprite" alt="sprite">
        </div>
      </div>
      <div class="sprite-collection__sprites">
        <div
          v-for="sprite in spritesSplit.secondHalf"
          :key="sprite"
          class="sprite-collection__sprite"
        >
          <img :src="sprite" alt="sprite">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { IPokemonSpritesUpdated } from '@/types'
import PikachuLoader from '@/components/atoms/PikachuLoader.vue'
import { useControlsStore } from '@/store/controls.ts'
import { usePokeStore } from '@/store/pokemon.ts'

const pokeStore = usePokeStore()
const controlsStore = useControlsStore()

const { activePokemon } = storeToRefs(pokeStore)
const { isYoshView } = storeToRefs(controlsStore)

const isLoading = ref(false)
const sprites = ref<string[]>([])

const spritesSplit = computed(() => {
  if (isYoshView.value)
    return yoshSpritesData
  if (!sprites.value)
    return { firstHalf: [], secondHalf: [] }
  const middleIndex = Math.ceil(sprites.value.length / 2)
  const firstHalf = sprites.value.slice(0, middleIndex)
  const secondHalf = sprites.value.slice(-middleIndex)
  return { firstHalf, secondHalf }
})

const scrollSpeed = computed(() => {
  const ratio = 1.558
  const totalYoshSprites
    = yoshSpritesData.firstHalf.length + yoshSpritesData.secondHalf.length
  const totalPokemonSprites = sprites.value.length
  const totalSprites = isYoshView.value
    ? totalYoshSprites
    : totalPokemonSprites
  return `${totalSprites * ratio}s`
})

function shuffleSprites(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function extractSprites(
  sprites: IPokemonSpritesUpdated,
  spritesArray: string[],
) {
  for (const key in sprites) {
    if (key in sprites) {
      const value = sprites[key]
      if (typeof value === 'string' && value !== '') {
        spritesArray.push(value)
      }
      else if (typeof value === 'object') {
        extractSprites(value, spritesArray)
      }
    }
  }
}

function duplicateSprites(sprites: string[]) {
  const originalLength = sprites.length
  const minimumSpritesNeeded = 50
  while (sprites.length < minimumSpritesNeeded) {
    sprites.push(...sprites.slice(0, originalLength))
  }
  return sprites
}

watch(
  activePokemon,
  (pokemon) => {
    if (!pokemon?.sprites)
      return
    const spritesArray = []
    extractSprites(pokemon.sprites as IPokemonSpritesUpdated, spritesArray)
    const spritesToShuffle = duplicateSprites(spritesArray)
    sprites.value = shuffleSprites(spritesToShuffle)
  },
  { immediate: true },
)
</script>

<style scoped lang="scss">
.sprite-collection {
  @include cool-bg;
  overflow: hidden;
  &__container {
    position: relative;
    height: 100%;
  }
  &__sprites {
    position: absolute;
    top: 0;
    height: 50%;
    width: max-content;
    display: flex;
    align-items: center;
    gap: gap(4);
    animation: slide-right v-bind(scrollSpeed) linear infinite;

    &:last-of-type {
      top: unset;
      bottom: 0;
      left: 100%;
      animation: slide-left v-bind(scrollSpeed) linear infinite;
    }
  }
  &__sprite {
    width: 120px;
    height: 120px;

    img {
      width: 100%;
      height: 100%;
    }
  }
  @keyframes slide-right {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }

  @keyframes slide-left {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
}
</style>

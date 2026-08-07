<template>
  <section class="pokemon-wild">
    <div
      class="pokemon-wild__bg"
      :class="`pokemon-wild__bg--${activePokemonType}`"
    />
    <img
      v-show="isImgLoading"
      class="pokemon-wild__pokeball"
      src="@/assets/images/pokeball-pokemon.gif"
      :alt="`${activePokemonName} sprite`"
    >
    <img
      v-show="!isImgLoading"
      class="pokemon-wild__pokemon"
      :class="{ 'pokemon-wild__pokemon--small': activePokemonHeight <= 10 }"
      :src="spriteImage"
      :alt="`${activePokemonName} sprite`"
      @load="handleImgLoaded"
    >
  </section>
</template>

<script setup lang="ts">
import { useControlsStore } from '@/store/controls.ts'
import { usePokeStore } from '@/store/pokemon.ts'

const pokeStore = usePokeStore()
const controlStore = useControlsStore()

const { activeSpriteSetting } = storeToRefs(controlStore)
const {
  activePokemonPayload,
  activePokemonName,
  activePokemonSprites,
  activePokemonType,
  activePokemonHeight,
} = storeToRefs(pokeStore)

const { getActivePokemon } = pokeStore

const isImgLoading = ref(false)

/**
 * Returns the sprite image for the active Pokemon based on the active sprite setting.
 * @return {string|null} - The URL of the sprite image, or null if the active Pokemon sprites are not available.
 */
const spriteImage = computed(() => {
  if (!activePokemonSprites.value)
    return null

  const sprites = activePokemonSprites.value
  const { isAnimated, isShiny, isFront } = activeSpriteSetting.value

  const type = isAnimated ? 'animated' : 'artwork'
  const shiny = isShiny ? 'Shiny' : ''
  const availableType = sprites[`${type}${shiny}`].front
    ? `${type}${shiny}`
    : `artwork${shiny}`

  const availableOrientation = isFront
    ? 'front'
    : sprites[availableType].back
      ? 'back'
      : 'front'

  return sprites[availableType][availableOrientation]
})

const pokemonHeight = computed(() => {
  const baseHeight = 70
  const ratio = 8
  return `${activePokemonHeight.value * ratio + baseHeight}px`
})

function handleImgLoaded() {
  setTimeout(() => (isImgLoading.value = false), 500)
}

watchEffect(async () => {
  isImgLoading.value = true
  await getActivePokemon(activePokemonPayload.value)
})
</script>

<style scoped lang="scss">
.pokemon-wild {
  position: relative;
  height: 100%;
  width: 100%;
  background: $off-white;

  img {
    position: absolute;
  }

  &__pokemon {
    bottom: 10%;
    right: 10%;
    max-height: 65%;
    height: v-bind(pokemonHeight);
    width: auto;
    @include larger-than-mobile {
      filter: drop-shadow(0px 4px 4px rgba(black, 0.7));
    }
    &--small {
      bottom: 15%;
      right: 15%;
    }
  }

  &__pokeball {
    bottom: 15%;
    right: 15%;
    height: 50px;
  }

  &__bg {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 120%;
    width: 120%;
    content: "";
    background-position: right bottom;
    background-size: cover;
    background-image: url("@/assets/images/backgrounds/type-grass.png");
    opacity: 0.85;

    &--grass {
      background-image: url("@/assets/images/backgrounds/type-grass.png");
      transform: translateX(20px);
    }

    &--fire {
      background-image: url("@/assets/images/backgrounds/type-fire.png");
      transform: scaleX(-1);
    }

    &--water {
      background-image: url("@/assets/images/backgrounds/type-water.png");
    }

    &--normal {
      background-image: url("@/assets/images/backgrounds/type-normal.png");
    }

    &--poison {
      background-image: url("@/assets/images/backgrounds/type-poison.png");
    }

    &--bug {
      background-image: url("@/assets/images/backgrounds/type-grass.png");
      transform: scaleX(-1) translateX(-20px);
    }

    &--ground {
      background-image: url("@/assets/images/backgrounds/type-ground.png");
      transform: translateX(70px);
    }

    &--fighting {
      background-image: url("@/assets/images/backgrounds/type-fighting.png");
    }

    &--rock {
      background-image: url("@/assets/images/backgrounds/type-rock.png");
      transform: scaleX(-1) translateX(-40px);
    }

    &--electric {
      background-image: url("@/assets/images/backgrounds/type-electric.png");
    }

    &--fairy {
      background-image: url("@/assets/images/backgrounds/type-fairy.png");
      transform: scaleX(-1) translate(-45px, 20px);
    }

    &--psychic {
      background-image: url("@/assets/images/backgrounds/type-psychic.png");
      transform: translateX(20px);
    }

    &--ghost {
      background-image: url("@/assets/images/backgrounds/type-ghost.png");
    }

    &--ice {
      background-image: url("@/assets/images/backgrounds/type-ice.png");
    }

    &--dragon {
      background-image: url("@/assets/images/backgrounds/type-dragon.png");
      transform: scaleX(-1) translateX(-50px);
    }

    &--steel {
      background-image: url("@/assets/images/backgrounds/type-steel.png");
      transform: scaleX(-1) translateX(-60px);
    }

    &--flying {
      background-image: url("@/assets/images/backgrounds/type-flying.png");
      transform: scaleX(-1) translateX(-20px);
    }

    &--dark {
      background-image: url("@/assets/images/backgrounds/type-dark.png");
      transform: scaleX(-1) translateX(-80px);
    }
  }
}
</style>

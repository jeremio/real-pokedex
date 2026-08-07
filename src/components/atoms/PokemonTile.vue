<template>
  <article
    class="pokemon-tile"
    :class="[
      {
        'pokemon-tile--active': isActive,
      },
      `pokemon-tile--${pokemonType}`,
    ]"
  >
    <div
      class="pokemon-tile__image-container"
      :class="{
        'pokemon-tile__image-container--loading': isLoading,
        'pokemon-tile__image-container--shrink': isPokemonTooBig,
      }"
    >
      <img
        v-show="isGifVisible"
        :src="gifImage"
        alt="gif image"
        class="pokemon-tile__gif"
        loading="lazy"
        @load="handleLoadedImage"
      >
      <img
        v-show="!isGifVisible"
        :src="spriteImage"
        alt="pokemon sprite"
        class="pokemon-tile__sprite"
        :class="{
          'pokemon-tile__sprite--backup-active': isActive && !gifImage,
        }"
        height="64px"
        width="64px"
        loading="lazy"
        @load="handleLoadedImage"
      >
    </div>
    <span class="pokemon-tile__name">{{ name }}</span>
  </article>
</template>

<script setup lang="ts">
import type { IPokemonTile, IPokemonUpdated } from '@/types'
import { PokeAPI } from 'pokeapi-typescript'

const props = defineProps<IPokemonTile>()
const pokemon = ref<IPokemonUpdated>()
const isLoading = ref(false)

const spriteImage = computed(
  () =>
    pokemon?.value?.sprites?.front_default
    || pokemon?.value?.sprites.other['official-artwork']?.front_default,
)
const gifImage = computed(
  () =>
    pokemon?.value?.sprites?.versions['generation-v']['black-white']?.animated
      ?.front_default,
)
const isGifVisible = computed(() => {
  return props.isActive && gifImage.value
})

const pokemonType = computed(() => pokemon?.value?.types[0].type.name)

const isPokemonTooBig = computed(() => (pokemon.value?.height || 0) > 11)

function handleLoadedImage() {
  isLoading.value = false
}

onMounted(async () => {
  isLoading.value = true
  await PokeAPI.Pokemon.resolve(props.id).then((res) => {
    pokemon.value = res as IPokemonUpdated
  })
})
</script>

<style scoped lang="scss">
.pokemon-tile {
  $self: &;
  position: relative;
  @mixin active($color) {
    letter-spacing: 1px;
    color: rgba($off-black, 0.8);
    background: rgba($color, 0.3);
    .pokemon-tile__image-container {
      background-color: rgba($color, 0.75);
    }
  }
  display: flex;
  align-items: center;
  gap: gap(3);
  text-transform: capitalize;
  border-radius: inherit;
  color: rgba($off-white, 0.9);

  &__name {
    color: inherit;
  }

  &__image-container {
    flex-shrink: 0;
    position: relative;
    height: 50px;
    width: 50px;
    @include flex-center;
    border-radius: 50%;
    background-color: rgba(white, 0.4);
    &--loading {
      overflow: hidden;
      img {
        opacity: 0;
      }
    }
    &--shrink {
      #{$self}__sprite {
        height: 130%;
        width: 130%;
      }
      #{$self}__gif {
        height: 130%;
        width: 130%;
      }
    }
  }
  &__sprite {
    height: 150%;
    width: 150%;
    opacity: 0.9;
    &--backup-active {
      height: 170%;
      width: 170%;
      opacity: 1;
      animation: bounce 2s ease infinite;
      @keyframes bounce {
        0% {
          transform: scale(1, 1) translateY(0);
        }
        10% {
          transform: scale(1.05, 0.95);
        }
        30% {
          transform: scale(0.95, 1) translateY(-5px);
        }
        50% {
          transform: scale(1, 1) translateY(0);
        }
        57% {
          transform: scale(1, 1) translateY(-1px);
        }
        64% {
          transform: scale(1, 1) translateY(0);
        }
        100% {
          transform: scale(1, 1) translateY(0);
        }
      }
    }
  }

  &__gif {
    opacity: 1;
  }

  @each $type, $colors in $pokemon-types {
    &--active#{&}--#{$type} {
      @include active(nth($colors, 2));
    }
  }
}
</style>

<template>
  <section class="gens">
    <div class="gens__options">
      <FrostCard
        v-for="option in menuOptions"
        :key="`gen-option__${option.region}`"
      >
        <div
          class="gens__option"
          :class="{ 'gens__option--active': option.id === gensPosition + 1 }"
        >
          <p class="gens__gen-num">
            {{ option.id }}
          </p>
          <p class="gens__region">
            {{ option.region }}
          </p>
          <div
            v-if="option.sprites.length"
            class="gens__sprites"
            :class="`gens__sprites--${option.id}`"
          >
            <img
              v-for="{ src, alt } in option.sprites"
              :key="`menu-sprite__${alt}`"
              height="50px"
              width="50px"
              :src="src as string"
              :alt="alt"
            >
          </div>
        </div>
      </FrostCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import FrostCard from '@/components/atoms/FrostCard.vue'
import { useControlsStore } from '@/store/controls.ts'

const controlsStore = useControlsStore()
const { gensPosition } = storeToRefs(controlsStore)

const spriteModules = import.meta.glob<string>(
  '@/assets/images/sprites/gens/*.png',
  { eager: true, import: 'default', query: '?url' },
)
function sprite(id: number) {
  return spriteModules[`/src/assets/images/sprites/gens/${id}.png`]
}

const menuOptions = [
  {
    id: 1,
    region: 'Kanto',
    sprites: [
      { src: sprite(1), alt: 'Bulbasaur' },
      { src: sprite(4), alt: 'Charmander' },
      { src: sprite(7), alt: 'Squirtle' },
    ],
  },
  {
    id: 2,
    region: 'Johto',
    sprites: [
      { src: sprite(152), alt: 'Chikorita' },
      { src: sprite(155), alt: 'Cyndaquil' },
      { src: sprite(158), alt: 'Totodile' },
    ],
  },
  {
    id: 3,
    region: 'Hoenn',
    sprites: [
      { src: sprite(252), alt: 'Treeko' },
      { src: sprite(255), alt: 'Torchic' },
      { src: sprite(258), alt: 'Mudkip' },
    ],
  },
  {
    id: 4,
    region: 'Sinnoh',
    sprites: [
      { src: sprite(387), alt: 'Turtwig' },
      { src: sprite(390), alt: 'Chimchar' },
      { src: sprite(393), alt: 'Piplup' },
    ],
  },
  {
    id: 5,
    region: 'Unova',
    sprites: [
      { src: sprite(495), alt: 'Snivy' },
      { src: sprite(498), alt: 'Tepig' },
      { src: sprite(501), alt: 'Oshawott' },
    ],
  },
  {
    id: 6,
    region: 'Kalos',
    sprites: [
      { src: sprite(650), alt: 'Chespin' },
      { src: sprite(653), alt: 'Fennekin' },
      { src: sprite(656), alt: 'Froakie' },
    ],
  },
  {
    id: 7,
    region: 'Alola',
    sprites: [
      { src: sprite(722), alt: 'Rowlet' },
      { src: sprite(725), alt: 'Litten' },
      { src: sprite(728), alt: 'Popplio' },
    ],
  },
  {
    id: 8,
    region: 'Galar',
    sprites: [
      { src: sprite(810), alt: 'Grookey' },
      { src: sprite(813), alt: 'Scorbunny' },
      { src: sprite(816), alt: 'Sobble' },
    ],
  },
  {
    id: 9,
    region: 'Paldea',
    sprites: [
      { src: sprite(906), alt: 'Sprigatito' },
      { src: sprite(909), alt: 'Fuecoco' },
      { src: sprite(912), alt: 'Quaxly' },
    ],
  },
]
</script>

<style scoped lang="scss">
.gens {
  $self: &;
  @include cool-bg;
  padding: gap(9) gap(5);

  &__options {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: gap(4);
  }

  &__option {
    position: relative;
    height: 100%;
    padding: gap(3) gap(4);
    display: flex;
    align-items: center;
    gap: gap(3);
    border-radius: inherit;
    color: rgba($off-black, 0.7);
    background-color: rgba($secondary, 0);
    transition:
      color 300ms ease-in-out,
      background-color 300ms ease-in-out;
    overflow: hidden;

    &--active {
      color: $primary;
      background-color: rgba($secondary, 0.5);

      #{$self}__region {
        letter-spacing: 2px;
      }

      #{$self}__sprites {
        opacity: 1;
        transform: translateX(-100px);
      }
      #{$self}__gen-num {
        transform: translateY(-100%);
      }
    }
  }
  &__gen-num {
    position: absolute;
    top: 0px;
    right: 5px;
    height: 100%;
    aspect-ratio: 1/1;
    display: flex;
    @include flex-center;
    font-weight: 700;
    font-size: $font-size-8;
    font-family: $secondary-font;
    color: rgba(white, 0.4);
    transition: transform 300ms ease-in-out;
  }

  &__region {
    font-weight: 600;
    transition: letter-spacing 300ms ease-in-out;
  }

  &__sprites {
    position: absolute;
    right: -100px;
    top: 0px;
    width: 52%;
    height: 100%;
    opacity: 0;
    transition:
      transform 300ms ease-in-out,
      opacity 300ms ease-in-out;

    img {
      position: absolute;
      top: 0;
      height: 50px;
      width: 50px;
    }
    &--1 {
      img:first-of-type {
        left: 0;
      }
      img:nth-of-type(2) {
        left: 32px;
      }
      img:last-of-type {
        left: 55px;
      }
    }
    &--2 {
      img {
        transform: scale(1.2);
      }
      img:first-of-type {
        left: -5px;
        top: -5px;
      }
      img:nth-of-type(2) {
        left: 22px;
        transform: scale(-1.2, 1.2);
      }
      img:last-of-type {
        left: 51px;
        top: 5px;
      }
    }
    &--3 {
      img {
        transform: scale(1.1);
      }
      img:first-of-type {
        left: -2px;
      }
      img:nth-of-type(2) {
        left: 22px;
      }
      img:last-of-type {
        left: 52px;
        top: -5px;
      }
    }
    &--4 {
      img:first-of-type {
        left: -5px;
        top: -2px;
        transform: scale(1.1);
      }
      img:nth-of-type(2) {
        left: 21px;
        transform: scale(1.1);
      }
      img:last-of-type {
        left: 50px;
        transform: scaleX(-1);
      }
    }
    &--5 {
      img:first-of-type {
        left: -5px;
      }
      img:nth-of-type(2) {
        left: 23px;
        top: -5px;
        transform: scaleX(-1);
      }
      img:last-of-type {
        left: 50px;
      }
    }
    &--6 {
      img:first-of-type {
        left: -9px;
        transform: scale(1.2);
      }
      img:nth-of-type(2) {
        left: 21px;
        top: -5px;
        transform: scale(-1.2, 1.2);
      }
      img:last-of-type {
        left: 48px;
        transform: scale(-0.9, 0.9);
      }
    }
    &--7 {
      img:first-of-type {
        left: -9px;
      }
      img:nth-of-type(2) {
        left: 22px;
        top: -5px;
        transform: scale(1.4);
      }
      img:last-of-type {
        left: 53px;
        top: -2px;
        transform: scale(-1.2, 1.2);
      }
    }
    &--8 {
      img:first-of-type {
        left: -9px;
        top: -3px;
        transform: scale(-1.1, 1.1);
      }
      img:nth-of-type(2) {
        left: 18px;
        top: -5px;
        transform: scale(1.7);
      }
      img:last-of-type {
        left: 51px;
        top: -12px;
        transform: scale(1.4);
      }
    }
    &--9 {
      img:first-of-type {
        left: -9px;
        top: -3px;
        transform: scale(1.1);
      }
      img:nth-of-type(2) {
        left: 25px;
        top: -2px;
        transform: scale(1);
      }
      img:last-of-type {
        left: 51px;
        top: -4px;
        transform: scale(-1.1, 1.1);
      }
    }
  }
}
</style>

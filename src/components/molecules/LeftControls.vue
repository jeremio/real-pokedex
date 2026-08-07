<template>
  <section class="left-controls">
    <div class="d-pad">
      <DpadButton
        v-for="btn in arrowBtns"
        :key="`arrow-btn-${btn}`"
        :class="`d-pad__${btn}`"
        :variant="btn"
        :is-active="activeBtn === btn"
        @click="handleMainControl(btn)"
      />
    </div>
    <div class="middle-controls">
      <VolumeButton @click="handleMainControl('volume-down')" />
      <VolumeButton is-plus @click="handleMainControl('volume-up')" />
      <PowerButton :is-pokedex-on="isPokedexOn" @click="handleMainControl('power')" />
    </div>
    <div class="d-pad">
      <DpadButton
        v-for="btn in abxyBtns"
        :key="`arrow-btn-${btn}`"
        :variant="btn"
        :is-active="activeBtn === btn"
        :class="`d-pad__${btn}`"
        @click="handleMainControl(btn)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import DpadButton from '@/components/atoms/DpadButton.vue'
import PowerButton from '@/components/atoms/PowerButton.vue'
import VolumeButton from '@/components/atoms/VolumeButton.vue'
import useControls from '@/composables/useControls.ts'
import { useControlsStore } from '@/store/controls.ts'

const arrowBtns = ['up', 'down', 'left', 'right'] as const
const abxyBtns = ['a', 'b', 'x', 'y'] as const
const { handleMainControl } = useControls()
const controlsStore = useControlsStore()
const { isPokedexOn, activeBtn } = storeToRefs(controlsStore)
</script>

<style scoped lang="scss">
.left-controls {
  display: flex;
  justify-content: space-between;
  .d-pad {
    margin: 0;
    margin-top: -10px;
    padding: 0;
    display: grid;
    grid-template-rows: repeat(3, 45px);
    grid-template-columns: repeat(3, 45px);
    grid-template-areas:
      '.   top .'
      'left . right'
      '. bottom .';
    column-gap: 3px;
    row-gap: 1px;
    @media (min-width: 666px) and (orientation: portrait) {
      margin-top: unset;
      grid-template-rows: repeat(3, 30px);
      grid-template-columns: repeat(3, 30px);
    }

    @media screen and (min-height: 500px) and (orientation: landscape) {
      margin-top: unset;
      grid-template-rows: repeat(3, 30px);
      grid-template-columns: repeat(3, 30px);
    }

    &__up,
    &__x {
      grid-area: top;
    }
    &__down,
    &__b {
      grid-area: bottom;
    }
    &__left,
    &__y {
      grid-area: left;
    }
    &__right,
    &__a {
      grid-area: right;
    }
  }

  .middle-controls {
    margin-top: 15px;
    width: 180px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
    gap: 10px;
    @media (min-width: 666px) {
      margin-top: 43px;
    }

    > :last-child {
      grid-column: 1 / -1;
    }
  }
}
</style>

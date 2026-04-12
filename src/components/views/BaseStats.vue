<template>
  <section class="base-stats">
    <PikachuLoader v-if="isLoading && !isYoshView" />
    <ErrorCard v-else-if="hasError && !isYoshView" />
    <div v-else class="base-stats__cards">
      <FrostCard v-for="stat in stats" :key="`base-stat-${stat.label}`">
        <div class="base-stats__card">
          <CircleRange :label="stat.label" :max="stat.max" :base="stat.base" />
        </div>
      </FrostCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import CircleRange from '@/components/atoms/CircleRange.vue'
import ErrorCard from '@/components/atoms/ErrorCard.vue'
import FrostCard from '@/components/atoms/FrostCard.vue'
import PikachuLoader from '@/components/atoms/PikachuLoader.vue'
import { yoshStats } from '@/data/yosh.ts'
import { useControlsStore } from '@/store/controls.ts'
import { usePokeStore } from '@/store/pokemon.ts'

const controlsStore = useControlsStore()
const { isYoshView } = storeToRefs(controlsStore)

const pokeStore = usePokeStore()

const { activePokemon, isLoading, hasError } = storeToRefs(pokeStore)

const stats = computed(() => {
  const isYosh = isYoshView.value
  if (isYosh)
    return yoshStats
  return activePokemon.value?.stats.map(({ stat, base_stat }) => {
    return {
      label: stat.name,
      base: base_stat,
      max: getMaxStat(base_stat, stat.name === 'hp'),
    }
  })
})

/**
 *
 * @param stat is baseStat
 * @param isHp
 * @description trying to calculate the min of maxt stat so the range input looks more or less like pomekemondb.net
 * @resourced from https://pokemondb.net/pokebase/6506/there-formula-for-working-pokemons-highest-possible-stats
 */
function getMaxStat(stat: number, isHp = false) {
  let max = stat
  if (isHp)
    max = stat * 2 + 110
  else max = stat * 2 - 5
  return Math.floor(max)
}
</script>

<style scoped lang="scss">
.base-stats {
  @include cool-bg;
  padding: $medium-window-padding;
  &__cards {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: gap(2);
  }
  &__card {
    height: 100%;
    padding: gap(2);
    color: white;
  }
}
</style>

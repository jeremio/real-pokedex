<template>
  <article class="poke-moves">
    <PikachuLoader v-if="isLoading && !isYoshView" />
    <ul v-else-if="hasMoves">
      <li v-for="move in movesList" :key="`pokemon-move--${move.name}`">
        <FrostCard>
          <div class="poke-moves__move">
            <Icon
              class="poke-moves__icon"
              :name="`type-${move.type}`"
              :class="`poke-moves__icon--${move.type}`"
            />
            <p class="poke-moves__move-name">
              {{ move.name }}
            </p>
            <p v-if="filterBy === 'level-up'">
              lvl. {{ move.levelLearnedAt }}
            </p>
            <p v-else style="text-transform: uppercase">
              {{ move.machineLearnedBy }}
            </p>
            <p>{{ move.damageClass }}</p>
            <p style="display: flex; align-items: center; gap: 4px">
              {{ move.power }}
              <Icon name="swords-icon" class="poke-moves__sword-icon" />
            </p>
          </div>
        </FrostCard>
      </li>
    </ul>
  </article>
</template>

<script setup lang="ts">
import type { Move, PokemonMove } from 'pokeapi-typescript'
import type { IMoveListItem, IPokeMove } from '@/types'
import { PokeAPI } from 'pokeapi-typescript'
import FrostCard from '@/components/atoms/FrostCard.vue'
import Icon from '@/components/atoms/Icon.vue'
import PikachuLoader from '@/components/atoms/PikachuLoader.vue'
import { useLoading } from '@/composables/useLoading.ts'
import { yoshMoves } from '@/data/yosh.ts'
import { useControlsStore } from '@/store/controls.ts'
import { usePokeStore } from '@/store/pokemon.ts'

const props = defineProps<{
  filterBy: 'level-up' | 'machine'
}>()
const controlsStore = useControlsStore()
const { isYoshView } = storeToRefs(controlsStore)

const { isLoading, executeFn } = useLoading(getMoves)

const pokeStore = usePokeStore()
const movesList = ref<IMoveListItem[]>()

const { activePokemonMoves } = storeToRefs(pokeStore)

const hasMoves = computed(() => {
  return isYoshView.value || (!isLoading.value && movesList.value?.length)
})

function filterActivePokemonMoves(moves: PokemonMove[], filterBy: string) {
  return moves.filter(
    move => move.version_group_details[0].move_learn_method.name === filterBy,
  )
}

async function getMachineLearnedBy({ machines }: Move): Promise<string> {
  if (!machines.length)
    return ''
  // todo: filter by current generation
  const urlSplit = machines[0].machine.url.split('/')
  // we know the id is in this position because the url is always structured the same
  const payload = Number(urlSplit[6])
  let machine = ''
  try {
    machine = (await PokeAPI.Machine.resolve(payload)).item.name
  }
  catch (e) {
    console.log({ e })
  }
  return machine
}

async function getMove({ move, version_group_details }: PokemonMove) {
  const levelLearnedAt = version_group_details[0]?.level_learned_at || 0
  return await PokeAPI.Move.resolve(move.name)
    .then(async (res) => {
      const machineLearnedBy = await getMachineLearnedBy(res)
      return { ...res, levelLearnedAt, machineLearnedBy }
    })
    .catch((e) => {
      console.log({ e })
      return null
    })
}

function transformMoves(moves: IPokeMove[]) {
  return moves.map(move => ({
    name: move.name.replace('-', ' '),
    type: move.type.name,
    levelLearnedAt: move.levelLearnedAt,
    damageClass: move.damage_class.name,
    machineLearnedBy: move.machineLearnedBy,
    power: move?.power || 0,
  }))
}

function sortMoves(moves: IPokeMove[], filterBy: string) {
  return moves
    .filter(Boolean)
    .sort((a, b) => {
      if (filterBy === 'machine') {
        return a.machineLearnedBy > b.machineLearnedBy ? 1 : -1
      }
      else {
        return a.levelLearnedAt - b.levelLearnedAt
      }
    })
    .slice(0, 7)
}

async function getMoves(pokemonMoves: PokemonMove[], filterBy: string) {
  if (pokemonMoves?.length) {
    try {
      const filteredMoves = filterActivePokemonMoves(pokemonMoves, filterBy)
      const moves = await Promise.all(
        filteredMoves.map(async move => await getMove(move)),
      )
      const sortedMoves = sortMoves(moves as IPokeMove[], filterBy)
      const transformedMoves = transformMoves(sortedMoves)
      movesList.value = transformedMoves
    }
    catch (e) {
      console.log({ e })
    }
  }
}

watchEffect(() => {
  if (isYoshView.value)
    movesList.value = yoshMoves[props.filterBy]
  else executeFn(activePokemonMoves.value, props.filterBy)
})
</script>

<style scoped lang="scss">
.poke-moves {
  @include cool-bg;
  padding: $medium-window-padding;
  ul {
    display: grid;
    gap: gap(2);
  }
  &__move {
    height: min-content;
    padding: 1px gap(4);
    display: grid;
    grid-template-columns: 7% 35% 18% 20% 15%;
    align-items: center;
    gap: gap(2);
    color: $off-white;
    text-transform: capitalize;
    line-height: 1;
  }
  &__move-name {
  }
  &__sword-icon {
    height: 14px;
    fill: $off-white;
  }
  &__icon {
    height: 22px;
    background-color: $off-white;
    border-radius: $rounded-circle;
    @each $type, $colors in $pokemon-types {
      &--#{$type} {
        fill: nth($colors, 1);
        background: nth($colors, 2);
      }
    }
  }
}
</style>

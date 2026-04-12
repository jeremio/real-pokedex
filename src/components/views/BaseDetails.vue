<template>
  <section class="base-details" :class="`base-details--${pokemonTypes[0]}`">
    <PikachuLoader v-if="isLoading && !isYoshView" />
    <div v-else class="base-details__card">
      <section class="base-details__species-num">
        <p>{{ genus }}</p>
        <FrostCard>
          <p class="base-details__national-num">
            <span>#</span>{{ entryNumber }}
          </p>
        </FrostCard>
      </section>

      <section class="base-details__copy">
        <span class="base-details__copy-name">
          {{ name }}
        </span>
        <span v-if="!hasData">
          <br>
          <br>
          We apologize, as some of {{ name }} details are missing 😞.
          Evolutions, moves, etc are still available.
        </span>
        {{ flavorText }}
      </section>
      <p class="base-details__location">
        <span v-if="encounter && location">
          Located {{ encounter?.toLowerCase() }} near {{ location }}.
        </span>
      </p>

      <div class="base-details__types">
        <TypePill
          v-for="pokemonType in pokemonTypes"
          :key="pokemonType"
          :type="pokemonType"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PokemonSpecies } from 'pokeapi-typescript'
import { PokeAPI } from 'pokeapi-typescript'
import FrostCard from '@/components/atoms/FrostCard.vue'
import PikachuLoader from '@/components/atoms/PikachuLoader.vue'
import TypePill from '@/components/atoms/TypePill.vue'
import { useLoading } from '@/composables/useLoading.ts'
import { yoshDetails, yoshTypes } from '@/data/yosh.ts'
import { useControlsStore } from '@/store/controls.ts'
import { usePokeStore } from '@/store/pokemon.ts'

const pokeStore = usePokeStore()
const controlsStore = useControlsStore()

const { activePokemon } = storeToRefs(pokeStore)
const { isYoshView } = storeToRefs(controlsStore)

const flavorText = ref<string>('')
const genus = ref<string>('')
const location = ref<string>('')
const encounter = ref<string>('')

const { isLoading, executeFn } = useLoading(getData)

const hasData = computed(() => {
  return flavorText.value || genus.value || location.value || encounter.value
})

const name = computed(() => {
  return isYoshView.value ? 'Professor Yosh' : activePokemon.value?.name
})

const entryNumber = computed(() => {
  if (isYoshView.value)
    return '305'
  let num = String(activePokemon.value?.id || 0)
  while (num.length < 3) num = `0${num}`
  return num
})

const pokemonTypes = computed(() => {
  if (isYoshView.value)
    return yoshTypes
  return activePokemon.value?.types.map(({ type }) => type.name) || ['normal']
})

function getFlavortText(species: PokemonSpecies) {
  const textEntries = species?.flavor_text_entries
  const textEntry = textEntries?.find(({ language }) => language.name === 'en')
  return textEntry?.flavor_text || ''
}

function getGenus({ genera }: PokemonSpecies) {
  return genera?.find(({ language }) => language.name === 'en')?.genus || ''
}

async function getSpecies(payload: number) {
  await PokeAPI.PokemonSpecies.resolve(payload)
    .then((res) => {
      flavorText.value = getFlavortText(res)
      genus.value = getGenus(res)
    })
    .catch((_e) => {
      flavorText.value = ''
    })
}

async function getLocation(payload: number) {
  await PokeAPI.LocationArea.resolve(payload)
    .then((res) => {
      location.value = res.location.name.replaceAll('-', ' ')
    })
    .catch((_e) => {
      location.value = ''
    })
}

function getYoshData() {
  flavorText.value = yoshDetails.flavorText
  genus.value = yoshDetails.genus
  encounter.value = yoshDetails.encounter
  location.value = yoshDetails.location
}

async function getData(payload: number, isYosh: boolean) {
  if (isYosh) {
    getYoshData()
  }
  else if (payload) {
    await Promise.all([getSpecies(payload), getLocation(payload)])
  }
}

watchEffect(() => {
  const payload = activePokemon.value?.id || 0
  executeFn(payload, isYoshView.value)
})
</script>

<style scoped lang="scss">
.base-details {
  display: grid;
  padding: gap(3) gap(4);
  @include cool-bg;

  &__card {
    height: 100%;
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    color: white;
  }
  &__species-num {
    margin-bottom: gap(3);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__national-num {
    padding-inline: gap(4);
    display: flex;
    align-items: center;
    gap: gap(1);
    font-weight: 500;
    letter-spacing: 1px;
    span {
      font-size: $font-size-4;
    }
  }

  &__copy {
    margin-bottom: gap(3);
  }
  &__copy-name {
    text-transform: capitalize;
    font-size: $font-size-4;
    letter-spacing: 4px;
    line-height: 1;
    color: $primary;
    font-family: $secondary-font;
    font-weight: 400;
    text-shadow: 1px 1px 0px $secondary;
  }

  &__types {
    display: flex;
    gap: gap(2);
  }
}
</style>

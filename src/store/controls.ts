import type { Ref } from 'vue'
import type { INavigateOptions, TMainView, TSecondaryView } from '@/types'
import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { usePokeStore } from '@/store/pokemon.ts'

export const useControlsStore = defineStore('controls', () => {
  const pokeStore = usePokeStore()
  const { pokemonListLength } = storeToRefs(pokeStore)
  const mainView = ref<TMainView>('OFF')
  const secondaryView = ref<TSecondaryView>(1)
  const isPokedexOn = computed(() => mainView.value !== 'OFF')
  const isActiveSpriteFront = ref(true)
  const isActiveSpriteAnimated = ref(true)
  const isActiveSpriteShiny = ref(false)
  const listPosition = ref(0)
  const lastDirection = ref('')
  const menuPosition = ref(0)
  const gensPosition = ref(0)
  const activeBtn = ref('')

  const activeSpriteSetting = computed(() => {
    return {
      isAnimated: isActiveSpriteAnimated.value,
      isShiny: isActiveSpriteShiny.value,
      isFront: isActiveSpriteFront.value,
    }
  })

  const isYoshView = computed(() => mainView.value === 'YOSH')

  function togglePower() {
    if (mainView.value === 'OFF') {
      mainView.value = 'INTRO'
      setTimeout(() => (mainView.value = 'MENU'), 6000)
    }
    else {
      mainView.value = 'OFF'
    }
  }

  function resetListPosition() {
    listPosition.value = 0
  }

  function navigate(command: string, positionRef: Ref<number>, end: number) {
    const options = { position: positionRef.value, end, type: 'ADD', num: 1 }
    switch (command) {
      case 'up':
        positionRef.value = getNextMove({ ...options, type: 'SUB', num: 2 })
        break
      case 'down':
        positionRef.value = getNextMove({ ...options, num: 2 })
        break
      case 'left':
        positionRef.value = getNextMove({ ...options, type: 'SUB' })
        break
      case 'right':
        positionRef.value = getNextMove({ ...options })
        break
      default:
        break
    }
  }

  function navigatePokemonList(command: string) {
    lastDirection.value = command
    navigate(command, listPosition, Number(pokemonListLength.value) - 1)
  }

  function navigateMainMenu(command: string) {
    navigate(command, menuPosition, 3)
  }

  function navigateGensMenu(command: string) {
    navigate(command, gensPosition, 8)
  }

  function getNextMove(options: INavigateOptions) {
    const { type, num, position, end } = options
    if (type === 'SUB')
      return position >= num ? position - num : 0
    else return position >= end - num ? end : position + num
  }

  function setMainView(view: TMainView) {
    mainView.value = view
  }
  function setSecondaryView(view: TSecondaryView) {
    secondaryView.value = view
  }
  function toggleActiveSpriteType() {
    isActiveSpriteAnimated.value = !isActiveSpriteAnimated.value
  }
  function toggleActiveSpriteOrientation() {
    isActiveSpriteFront.value = !isActiveSpriteFront.value
  }
  function toggleActiveSpriteShiny() {
    isActiveSpriteShiny.value = !isActiveSpriteShiny.value
  }
  function setActiveBtn(value: string) {
    activeBtn.value = value
  }

  return {
    navigatePokemonList,
    listPosition,
    togglePower,
    isPokedexOn,
    resetListPosition,
    mainView,
    setMainView,
    setSecondaryView,
    secondaryView,
    toggleActiveSpriteType,
    toggleActiveSpriteOrientation,
    toggleActiveSpriteShiny,
    activeSpriteSetting,
    lastDirection,
    menuPosition,
    navigateMainMenu,
    gensPosition,
    navigateGensMenu,
    isYoshView,
    activeBtn,
    setActiveBtn,
  }
})

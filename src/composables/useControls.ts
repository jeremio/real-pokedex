import type { TMainView, TSecondaryView } from '@/types'
import { storeToRefs } from 'pinia'
import { useControlsStore } from '@/store/controls.ts'
import { usePokeStore } from '@/store/pokemon.ts'

const DIRECTIONS = ['up', 'down', 'left', 'right'] as const

export default function useControls() {
  const pokeStore = usePokeStore()
  const controlsStore = useControlsStore()

  const { getGeneration } = pokeStore
  const {
    navigatePokemonList,
    togglePower,
    setMainView,
    setSecondaryView,
    toggleActiveSpriteOrientation,
    toggleActiveSpriteType,
    toggleActiveSpriteShiny,
    navigateMainMenu,
    navigateGensMenu,
    setActiveBtn,
  } = controlsStore

  const { mainView, menuPosition, gensPosition } = storeToRefs(controlsStore)

  function handleMainControl(command: string) {
    handleActiveBtn(command)
    if (mainView.value === 'OFF' && command === 'power')
      togglePower()
    else if (mainView.value === 'MENU')
      MenuViewControls(command)
    else if (mainView.value === 'LIST')
      listViewControls(command)
    else if (mainView.value === 'POKEMON')
      pokemonViewControls(command)
    else if (mainView.value === 'GENERATIONS')
      gensViewControls(command)
    else if (mainView.value === 'YOSH')
      profYoshControls(command)
    else if (mainView.value === 'CREDITS')
      creditsControls(command)
  }

  function handleCommon(command: string, backView: TMainView): boolean {
    if (command === 'power') {
      togglePower()
      return true
    }
    if (command === 'b') {
      setMainView(backView)
      return true
    }
    return false
  }

  function MenuViewControls(command: string) {
    if (handleCommon(command, 'MENU'))
      return
    const menuOptions = ['LIST', 'GENERATIONS', 'YOSH', 'CREDITS']
    const newView = menuOptions[menuPosition.value] as TMainView
    if (DIRECTIONS.includes(command as (typeof DIRECTIONS)[number]))
      navigateMainMenu(command)
    else if (command === 'a')
      setMainView(newView)
  }

  function gensViewControls(command: string) {
    if (handleCommon(command, 'MENU'))
      return
    const gen = gensPosition.value + 1
    if (DIRECTIONS.includes(command as (typeof DIRECTIONS)[number])) {
      navigateGensMenu(command)
    }
    else if (command === 'a') {
      getGeneration(gen)
      setMainView('LIST')
    }
    else if (Number(command) >= 1 && Number(command) <= 9) {
      getGeneration(Number(command))
      setMainView('LIST')
    }
  }

  function profYoshControls(command: string) {
    if (handleCommon(command, 'MENU'))
      return
    const num = Number(command)
    if (num >= 1 && num <= 8)
      setSecondaryView(num as TSecondaryView)
  }

  function creditsControls(command: string) {
    handleCommon(command, 'MENU')
  }

  function listViewControls(command: string) {
    if (handleCommon(command, 'MENU'))
      return
    if (DIRECTIONS.includes(command as (typeof DIRECTIONS)[number]))
      navigatePokemonList(command)
    else if (command === 'a')
      setMainView('POKEMON')
    else if (Number(command) >= 1 && Number(command) <= 9)
      getGeneration(Number(command))
  }

  function pokemonViewControls(command: string) {
    if (handleCommon(command, 'LIST'))
      return
    if (DIRECTIONS.includes(command as (typeof DIRECTIONS)[number])) {
      navigatePokemonList(command)
    }
    else if (command === 'x') {
      toggleActiveSpriteOrientation()
    }
    else if (command === 'y') {
      toggleActiveSpriteType()
    }
    else if (command === 'a') {
      toggleActiveSpriteShiny()
    }
    else {
      const num = Number(command)
      if (num >= 1 && num <= 8)
        setSecondaryView(num as TSecondaryView)
    }
  }

  function handleActiveBtn(command: string) {
    const timeToLeaveActive = 200
    setActiveBtn(command)
    setTimeout(setActiveBtn, timeToLeaveActive, '')
  }

  return {
    handleMainControl,
  }
}

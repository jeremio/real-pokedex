import type { EvolutionDetail, Move, Pokemon, PokemonSprites } from 'pokeapi-typescript'

export type TMainView = 'OFF' | 'INTRO' | 'MENU' | 'LIST' | 'POKEMON' | 'YOSH' | 'CREDITS' | 'GENERATIONS'

export type TSecondaryView = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export type TActiveSpriteType = 'animated' | 'animatedShiny' | 'artwork' | 'artworkShiny'

export interface IActiveSpriteSetting {
  type: TActiveSpriteType
  isFront: boolean
}

interface IFullSpriteSheet {
  back_default: string
  back_female: string
  back_shiny: string
  back_shiny_female: string
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
}

export interface IPokemonSpritesUpdated extends PokemonSprites {
  'other': {
    dream_world: {
      front_default: string
      front_female: string
    }
    home: {
      front_default: string
      front_female: string
      front_shiny: string
      front_shiny_female: string
    }
  }
  'official-artwork': {
    front_default: string
    front_shiny: string
  }
  'versions': {
    'generation-v': {
      'black-white': IFullSpriteSheet & {
        animated: IFullSpriteSheet
      }
    }
  }
}

export interface IPokemonUpdated extends Pokemon {
  sprites: IPokemonSpritesUpdated
}

export interface IPokemonTile {
  name: string
  isActive: boolean
  genNum: number
  id: number
}

export interface INavigateOptions {
  position: number
  end: number
  num: number
  type: string
}

export interface IPokeEvolution {
  name: string
  url: string
  details: EvolutionDetail[]
  pokemon: Pokemon
  isNonLinear?: boolean
}

interface IDamageRelation {
  group: string
  types: string[]
}
export interface IDamageRelations {
  half: IDamageRelation
  double: IDamageRelation
}

export interface IPokemonListItem {
  name: string
  id: number
  isLoaded: boolean
}

export interface IPokeMove extends Move {
  levelLearnedAt: number
  machineLearnedBy: string
}

export interface IMoveListItem {
  name: string
  type: string
  levelLearnedAt: number
  damageClass: string
  machineLearnedBy: string
  power: number
}

import { BackgroundComponent } from './background.comp'
import { LocationComponent } from './location.comp'

export type CombineType<Components extends readonly { type: string }[]> = {
  [k in Components[number]['type']]: Extract<Components[number], { type: k }>
}

export type Character = CombineType<[LocationComponent, BackgroundComponent]>

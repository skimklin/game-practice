import { BackgroundComponent } from './background.comp'
import { LocationComponent } from './location.comp'

export type CombineType<
  Components extends readonly { readonly type: unknown }[]
> = Components extends readonly [infer First, ...infer Rest]
  ? Rest extends readonly { readonly type: unknown }[]
    ? First extends { readonly type: infer K }
      ? {
          [k in K extends PropertyKey ? K : never]: First
        } & CombineType<Rest>
      : {}
    : {}
  : {}

export type Character = CombineType<[LocationComponent, BackgroundComponent]>

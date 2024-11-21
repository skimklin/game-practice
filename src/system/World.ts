import { GameRenderer } from './render'
import { Entity, EntityManager } from '@/entity/EntityManager'
import { Character } from '@/component/types'
import { LocationComponent } from '@/component/location.comp'
import { BackgroundComponent } from '@/component/background.comp'

interface WorldOptions {
  root: HTMLElement
}

const initComponents = {
  characters: [
    {
      location: new LocationComponent({
        x: 100,
        y: 100,
        width: 60,
        height: 60,
      }),
      background: new BackgroundComponent({ url: '' }),
    },
    {
      location: new LocationComponent({
        x: 200,
        y: 100,
        width: 60,
        height: 60,
      }),
      background: new BackgroundComponent({ url: '' }),
    },
    {
      location: new LocationComponent({
        x: 300,
        y: 100,
        width: 60,
        height: 60,
      }),
      background: new BackgroundComponent({ url: '' }),
    },
  ],
} satisfies { characters: Entity[] }

export class GameWorld {
  render!: GameRenderer
  entityManager!: EntityManager

  constructor(public readonly options: WorldOptions) {
    this.init()
  }

  private init() {
    this.entityManager = new EntityManager()

    Object.values(initComponents).forEach((entities) => {
      entities.forEach((entity) => {
        this.entityManager.registerEntity(entity)
      })
    })

    this.render = new GameRenderer(this)
    this.render.render()
  }
}

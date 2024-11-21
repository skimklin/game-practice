import { GameRenderer } from './render'
import { Entity, EntityManager } from '@/entity/EntityManager'
import { LocationComponent } from '@/component/location.comp'
import { BackgroundComponent } from '@/component/background.comp'
import { MovementComponent } from '@/component/movement.comp'
import { KeyboardEventManager } from './keyboardEventManager'

interface WorldOptions {
  root: HTMLElement
  width: number
  height: number
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

const FRAME_RENDER_GAP = 20

export class GameWorld {
  render!: GameRenderer
  entityManager!: EntityManager
  gameEnd = false
  userId!: string
  lastRenderTimeStamp: number | null = null
  keyboardManager!: KeyboardEventManager

  constructor(public readonly options: WorldOptions) {
    this.init()
  }

  public init() {
    this.entityManager = new EntityManager()

    Object.values(initComponents).forEach((entities) => {
      entities.forEach((entity) => {
        this.entityManager.registerEntity(entity)
      })
    })

    this.userId = this.entityManager.registerEntity({
      movement: new MovementComponent({ speed: 200 }),
      location: new LocationComponent({
        x: 300,
        y: 400,
        width: 60,
        height: 60,
      }),
      background: new BackgroundComponent({ url: '' }),
    })

    this.keyboardManager = new KeyboardEventManager(this)
    this.render = new GameRenderer(this)

    this.gameLoopSchedule()
  }

  public gameLoopSchedule = () => {
    if (
      (!this.lastRenderTimeStamp ||
        Date.now() - this.lastRenderTimeStamp >= FRAME_RENDER_GAP) &&
      !this.gameEnd
    ) {
      this.gameLoop()
      this.lastRenderTimeStamp = Date.now()
    }

    requestAnimationFrame(this.gameLoopSchedule)
  }

  public gameLoop() {
    this.render.render()
  }
}

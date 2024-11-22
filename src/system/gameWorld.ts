import { GameRenderer } from './render'
import { Entity, EntityManager } from '@/entity/EntityManager'
import { LocationComponent } from '@/component/location.comp'
import { BackgroundComponent } from '@/component/background.comp'
import { MovementComponent } from '@/component/movement.comp'
import { KeyboardEventManager } from './keyboardEventManager'
import { GameMovementEngine } from './movementEngine'

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

export class GameWorld {
  FRAME_PER_SECOND = 60

  render!: GameRenderer
  entityManager!: EntityManager
  gameEnd = false
  userId!: string
  lastRenderTimeStamp: number | null = null
  keyboardManager!: KeyboardEventManager
  gameMovementEngine!: GameMovementEngine

  constructor(public readonly options: WorldOptions) {
    this.init()
  }

  public init() {
    this.entityManager = new EntityManager()
    this.gameMovementEngine = new GameMovementEngine(this)

    Object.values(initComponents).forEach((entities) => {
      entities.forEach((entity) => {
        this.entityManager.registerEntity(entity)
      })
    })

    this.userId = this.entityManager.registerEntity({
      movement: new MovementComponent({ speed: 100 }),
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
        Date.now() - this.lastRenderTimeStamp >=
          1000 / this.FRAME_PER_SECOND) &&
      !this.gameEnd
    ) {
      this.gameFramePaint()
      this.lastRenderTimeStamp = Date.now()
    }

    requestAnimationFrame(this.gameLoopSchedule)
  }

  public gameFramePaint() {
    this.gameMovementEngine.updateMovement()

    this.render.render()
  }
}

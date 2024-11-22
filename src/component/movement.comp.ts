import { BasicComponent } from './basic.comp'

export class MovementComponent extends BasicComponent {
  static readonly type = 'Movement'
  readonly type = MovementComponent.type

  speed: number
  disableMove: boolean
  jumping = false

  nextFrameMovement: {
    x?: number
    y?: number
  } = {}

  constructor(options: { speed: number; disableMove?: boolean }) {
    super()

    this.speed = options.speed
    this.disableMove = options.disableMove ?? false
  }
}

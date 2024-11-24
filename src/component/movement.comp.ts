import { BasicComponent } from './basic.comp'

export class MovementComponent extends BasicComponent {
  static readonly type = 'Movement'
  readonly type = MovementComponent.type

  speed: number
  disableMove: boolean
  jumping = false

  nextFrameMovement: {
    x?: number
    y?: number[] | number
  } = {}
  jumpHeight: number
  jumpDuration: number

  constructor(options: {
    speed: number
    disableMove?: boolean
    jumpHeight?: number
    jumpDuration?: number
  }) {
    super()

    this.speed = options.speed
    this.disableMove = options.disableMove ?? false
    this.jumpHeight = options.jumpHeight ?? 300
    this.jumpDuration = options.jumpDuration ?? 500
  }

  public jumpFrameCalc = (framePerSec = 60) => {
    const jumpFrames = framePerSec * (this.jumpDuration / 1000)
    const dis = this.jumpHeight / jumpFrames
    const mid = Math.floor(jumpFrames / 2)
    return Array.from<number>({ length: mid })
      .fill(-dis)
      .concat(...Array.from<number>({ length: mid }).fill(dis))
  }
}

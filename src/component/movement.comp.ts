import { BasicComponent } from './basic.comp'

export class MovementComponent extends BasicComponent {
  static readonly type = 'Movement'
  type = MovementComponent.type
  speed: number
  disableMove: boolean

  constructor(options: { speed: number; disableMove?: boolean }) {
    super()

    this.speed = options.speed
    this.disableMove = options.disableMove ?? false
  }
}

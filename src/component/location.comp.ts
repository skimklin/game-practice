import { BasicComponent } from './basic.comp'

export class LocationComponent extends BasicComponent {
  static readonly type = 'Location'
  readonly type = LocationComponent.type

  mountEl?: HTMLElement

  x: number
  height: number
  width: number
  y: number

  constructor(options: {
    x: number
    y: number
    width: number
    height: number
  }) {
    super()

    this.x = options.x
    this.y = options.y
    this.width = options.width
    this.height = options.height
  }

  get x1() {
    return this.x + this.width
  }
  get y1() {
    return this.y + this.height
  }
}

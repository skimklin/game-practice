import { BasicComponent } from '../basic.comp'

export class MapComponent extends BasicComponent {
  width: number
  height: number

  constructor(private readonly options: { width: number; height: number }) {
    super()

    this.width = this.options.width
    this.height = this.options.height
  }
}

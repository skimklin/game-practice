import { BasicComponent } from './basic.comp'

export class BackgroundComponent extends BasicComponent {
  static readonly type = 'Background'
  readonly type = BackgroundComponent.type

  url: string

  constructor(options: { url: string }) {
    super()

    this.url = options.url
  }
}

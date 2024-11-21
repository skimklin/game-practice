import { BasicComponent } from './basic.comp'

export enum USER_ACTION {
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
  ATTACK = 'A',
}

export class KeyboardInputComponent extends BasicComponent {
  static readonly type = 'KeyboardInput'
  type = KeyboardInputComponent.type

  currentKey: USER_ACTION | null = null
}

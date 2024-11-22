import { BasicComponent } from './basic.comp'

export enum USER_ACTION {
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
  ATTACK = 'A',
  SPACE = ' ',
}

export const ARROW_ACTIONS = [
  USER_ACTION.DOWN,
  USER_ACTION.LEFT,
  USER_ACTION.RIGHT,
  USER_ACTION.UP,
]

export class KeyboardInputComponent extends BasicComponent {
  static readonly type = 'KeyboardInput'
  type = KeyboardInputComponent.type

  keyStatus = Object.values(USER_ACTION).reduce((prev, cur) => {
    prev[cur] = false
    return prev
  }, {} as Record<USER_ACTION, boolean>)

  get keys() {
    const activeKeys: USER_ACTION[] = []
    Object.keys(this.keyStatus).forEach((key) => {
      if (this.keyStatus[key as USER_ACTION]) {
        activeKeys.push(key as USER_ACTION)
      }
    })
    return activeKeys
  }
}

import {
  ARROW_ACTIONS,
  KeyboardInputComponent,
  USER_ACTION,
} from '@/component/keyboardInput.comp'
import { GameWorld } from './gameWorld'

const allowKeys = Object.values(USER_ACTION)

export class KeyboardEventManager {
  constructor(public readonly world: GameWorld) {
    const { entityManager } = this.world
    entityManager.registerEntity({
      [KeyboardInputComponent.type]: new KeyboardInputComponent(),
    })
    this.listenInput()
  }

  get keyComponent() {
    return this.world.entityManager.getComponentsByType<KeyboardInputComponent>(
      KeyboardInputComponent.type
    )?.[0]!
  }

  public keyboardPressHandler = (e: KeyboardEvent) => {}
  public keyCancelHandler = (e: KeyboardEvent) => {
    // console.log(e.key)
    if (!allowKeys.includes(e.key as any)) {
      return
    }
    console.log(e.key)
    this.updateKeyStatus(e.key as USER_ACTION, false)
  }

  public updateKeyStatus(key: USER_ACTION, status: boolean) {
    this.keyComponent.keyStatus[key] = status
    if (ARROW_ACTIONS.includes(key)) {
      ARROW_ACTIONS.forEach((k) => {
        if (k === key) return
        this.keyComponent.keyStatus[k] = false
      })
    }
  }

  public keyboardDownHandler = (e: KeyboardEvent) => {
    if (!allowKeys.includes(e.key as any)) {
      return
    }
    this.updateKeyStatus(e.key as USER_ACTION, true)
  }

  public listenInput() {
    // document.addEventListener('keypress', this.keyboardPressHandler)
    document.addEventListener('keydown', this.keyboardDownHandler)
    document.addEventListener('keyup', this.keyCancelHandler)
  }

  public unmount() {
    // document.removeEventListener('keypress', this.keyboardPressHandler)
    document.removeEventListener('keydown', this.keyboardDownHandler)
    document.removeEventListener('keyup', this.keyCancelHandler)
  }
}

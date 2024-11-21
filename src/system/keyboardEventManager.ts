import {
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

  public keyboardHandler = (e: KeyboardEvent) => {
    if (!allowKeys.includes(e.key as any)) {
      return
    }
    this.updateKeyStatus(e.key as USER_ACTION)
  }
  public keyCancelHandler = (e: KeyboardEvent) => {
    this.updateKeyStatus(null)
  }

  public updateKeyStatus(key: USER_ACTION | null) {
    console.log(key, this.keyComponent)
    this.keyComponent.currentKey = key
  }

  public listenInput() {
    document.addEventListener('keydown', this.keyboardHandler)
    document.addEventListener('keyup', this.keyCancelHandler)
  }

  public unmount() {
    document.removeEventListener('keydown', this.keyboardHandler)
    document.removeEventListener('keyup', this.keyCancelHandler)
  }
}

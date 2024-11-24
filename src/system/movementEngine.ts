import { LocationComponent } from '@/component/location.comp'
import { GameWorld } from './gameWorld'
import { MovementComponent } from '@/component/movement.comp'
import { CombineType } from '@/component/types'
import { USER_ACTION } from '@/component/keyboardInput.comp'

type EntityLocationAndMovement = CombineType<
  [LocationComponent, MovementComponent]
>

const horizontalKeys = [USER_ACTION.LEFT, USER_ACTION.RIGHT]
const verticalKeys = [USER_ACTION.UP, USER_ACTION.DOWN]

export class GameMovementEngine {
  constructor(public readonly world: GameWorld) {}

  public updateMovement = () => {
    const { entityManager, keyboardManager } = this.world
    const entities =
      entityManager.getEntityWhoHasTypes<EntityLocationAndMovement>([
        LocationComponent.type,
        MovementComponent.type,
      ])
    const { keys } = keyboardManager.keyComponent

    entities.forEach((entity) => {
      const {
        [LocationComponent.type]: location,
        [MovementComponent.type]: movement,
      } = entity.entity

      const hasHorizontalArrowKeys = keys.some((e) =>
        horizontalKeys.includes(e)
      )
      const hasVerticalArrowKeys = keys.some((e) => verticalKeys.includes(e))
      if (movement && !movement.disableMove && hasHorizontalArrowKeys) {
        const arrowKey = keyboardManager.keyComponent.keys.find((e) =>
          horizontalKeys.includes(e)
        )!
        const { distance } = calcMovementTransform(
          arrowKey,
          movement.speed / this.world.FRAME_PER_SECOND
        )
        movement.nextFrameMovement.x = distance
      }

      if (hasVerticalArrowKeys) {
        // TODO vertical movement
      }

      if (!movement.jumping && keys.includes(USER_ACTION.SPACE)) {
        this.calcJumpTransform(movement)
      }
      if (
        movement.jumping &&
        (!Array.isArray(movement.nextFrameMovement.y) ||
          !movement.nextFrameMovement.y.length)
      ) {
        movement.jumping = false
      }
    })
  }

  public calcJumpTransform = (movement: MovementComponent) => {
    movement.nextFrameMovement.y = movement.jumpFrameCalc(
      this.world.FRAME_PER_SECOND
    )
    movement.jumping = true
    // console.log(movement)
  }
}

function calcMovementTransform(key: USER_ACTION, speed: number) {
  return (
    {
      [USER_ACTION.UP]: { key: 'y', distance: -speed },
      [USER_ACTION.DOWN]: { key: 'y', distance: speed },
      [USER_ACTION.LEFT]: { key: 'x', distance: -speed },
      [USER_ACTION.RIGHT]: { key: 'x', distance: speed },
    } as Record<USER_ACTION, { key: 'x' | 'y'; distance: number }>
  )[key]
}

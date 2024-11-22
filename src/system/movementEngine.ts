import { LocationComponent } from '@/component/location.comp'
import { GameWorld } from './gameWorld'
import { MovementComponent } from '@/component/movement.comp'
import { CombineType } from '@/component/types'
import { USER_ACTION } from '@/component/keyboardInput.comp'

type EntityLocationAndMovement = CombineType<
  [LocationComponent, MovementComponent]
>

export class GameMovementEngine {
  constructor(public readonly world: GameWorld) {}

  public updateMovement = () => {
    const { entityManager, keyboardManager } = this.world
    const entities =
      entityManager.getEntityWhoHasTypes<EntityLocationAndMovement>([
        LocationComponent.type,
        MovementComponent.type,
      ])

    entities.forEach((entity) => {
      const {
        [LocationComponent.type]: location,
        [MovementComponent.type]: movement,
      } = entity.entity
      if (
        movement &&
        !movement.disableMove &&
        keyboardManager.keyComponent.keys.some((e) => e.startsWith('Arrow'))
      ) {
        const arrowKey = keyboardManager.keyComponent.keys.find((e) =>
          e.startsWith('Arrow')
        )!
        const { key, distance } = calcMovementTransform(
          arrowKey,
          movement.speed / this.world.FRAME_PER_SECOND
        )

        movement.nextFrameMovement[key] = distance
      }
    })
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

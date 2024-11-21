import { characterClass, rendererContainerClass } from '@/styles/renderer.css'
import { GameWorld } from './gameWorld'
import { LocationComponent } from '@/component/location.comp'
import { MovementComponent } from '@/component/movement.comp'
import { USER_ACTION } from '@/component/keyboardInput.comp'

export class GameRenderer {
  constructor(public readonly world: GameWorld) {}

  renderRoot?: HTMLDivElement

  public render() {
    const { options, entityManager } = this.world
    this.renderRoot =
      this.renderRoot ||
      createContainer(options.root, {
        width: options.width,
        height: options.height,
      })

    const locations = entityManager.getComponentsByType<LocationComponent>(
      LocationComponent.type
    )
    locations.forEach((location) => {
      this.renderLocation(location)
    })
  }

  renderLocation(location: LocationComponent) {
    const { renderRoot } = this
    if (!renderRoot) {
      return
    }
    const { keyboardManager, entityManager } = this.world

    const mounted = !!location.mountEl
    const div = location.mountEl || document.createElement('div')
    const movement = mounted
      ? (entityManager.getEntityById(location.uuid)?.[
          MovementComponent.type
        ] as MovementComponent)
      : null

    if (!mounted) {
      div.className = characterClass
    } else if (
      movement &&
      !movement.disableMove &&
      keyboardManager.keyComponent.currentKey?.startsWith('Arrow')
    ) {
      const { key, distance } = calcMovementTransform(
        keyboardManager.keyComponent.currentKey,
        movement.speed / 60
      )
      location[key] += distance
    }
    div.style.left = `${location.x}px`
    div.style.top = `${location.y}px`
    div.style.width = `${location.width}px`
    div.style.height = `${location.height}px`

    location.mountEl = div

    // console.log(div, location)

    if (!mounted) {
      renderRoot.appendChild(div)
    }
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

function createContainer(
  root: HTMLElement,
  options: { width: number; height: number }
) {
  const div = document.createElement('div')
  div.className = rendererContainerClass
  div.style.width = `${options.width}px`
  div.style.height = `${options.height}px`

  root.appendChild(div)
  return div
}

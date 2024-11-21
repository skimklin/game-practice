import { characterClass, rendererContainerClass } from '@/styles/renderer.css'
import { GameWorld } from './world'
import { LocationComponent } from '@/component/location.comp'

export class GameRenderer {
  constructor(public readonly world: GameWorld) {}

  renderRoot?: HTMLDivElement

  public render() {
    const { options, entityManager } = this.world
    this.renderRoot = createContainer(options.root)

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

    const div = document.createElement('div')
    div.className = characterClass
    div.style.left = `${location.x}px`
    div.style.top = `${location.y}px`
    div.style.width = `${location.width}px`
    div.style.height = `${location.height}px`

    location.mountEl = div

    console.log(div, location)

    renderRoot.appendChild(div)
  }
}

function createContainer(root: HTMLElement) {
  const div = document.createElement('div')
  div.className = rendererContainerClass

  root.appendChild(div)
  return div
}

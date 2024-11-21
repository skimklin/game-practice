import { nanoid } from 'nanoid'
import { BasicComponent } from '@/component/basic.comp'

export type Entity = Record<string, BasicComponent>

export class EntityManager {
  entities: Record<string, Entity> = {}

  public registerEntity<E extends Entity>(entity: E) {
    const uuid = nanoid()
    this.entities[uuid] = Object.values(entity).reduce((prev, cur) => {
      cur.uuid = uuid
      prev[cur.type] = cur
      return prev
    }, {} as Entity)
    return uuid
  }
  public unRegisterEntity(uuid: string) {
    Object.values(this.entities[uuid] ?? {}).forEach((comp) => {
      comp.onDestroy?.(this.entities[uuid])
    })
    delete this.entities[uuid]
  }
  public getEntityById(uuid: string) {
    return this.entities[uuid]
  }

  public getComponentsByType<T extends BasicComponent>(type: T['type']) {
    console.log(this.entities, type)
    return Object.values(this.entities)
      .map((entity) => entity[type])
      .filter(Boolean) as T[]
  }
}

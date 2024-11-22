import { Entity } from '@/entity/EntityManager'

export abstract class BasicComponent {
  abstract readonly type: string

  uuid!: string

  onDestroy?: (entity: Entity) => void
}

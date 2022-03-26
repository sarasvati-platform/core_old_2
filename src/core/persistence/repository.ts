import { Identity, Entity } from '@src/core/models'
import { Expression } from '@sarasvati-platform/abstract-query'

export type IQuery = Expression

/**
 * Interface for a repository.
 */
export interface IRepository<
  TIdentity extends Identity,
  TEntity extends Entity<TIdentity>
> {
  /**
   * Save entity.
   * @param entity Entity to save.
   */
  save(entity: TEntity): void

  /**
   * Get entity by identity.
   * @param identity Identity of the entity to load.
   */
  get(identity: TIdentity): TEntity

  /**
   * Check if entity exists.
   * @param identity Identity of the entity to check.
   */
  exists(identity: TIdentity): boolean

  /**
   * Find entities by query.
   * @param query Query to find entities by.
   */
  find(query: IQuery): readonly TEntity[]

  /**
   * Delete entity by identity.
   * @param identity Identity of the entity to remove.
   */
  delete(identity: TIdentity): void
}

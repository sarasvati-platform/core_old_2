import { IEntity, Identity } from '@src/core/models'
import { IExpression } from '@sarasvati-platform/abstract-query'

export type IQuery = IExpression

export interface IRepository<TEntity extends IEntity> {
  save(entity: TEntity): void
  get(identity: Identity): TEntity | undefined
  find(query: IQuery): readonly TEntity[]
  delete(identity: Identity): void
}

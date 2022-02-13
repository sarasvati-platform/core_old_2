import { Identity } from './identity'

export interface IEntity {
  get identity(): Identity
  equals(other: IEntity): boolean
}

export abstract class Entity implements IEntity {
  private _identity: Identity

  /**
   * Initializes the new instance of the Entity class
   * @param identity Identity of the Entity
   */
  constructor(identity: Identity) {
    this._identity = identity
  }

  /**
   * Gets the value of the Identity
   */
  get identity(): Identity {
    return this._identity
  }

  /**
   * Compares the Entity to another Entity
   * @param other Entity to compare to
   * @returns True if the Entity is equal to the other Entity
   */
  equals(other: IEntity): boolean {
    return this._identity.equals(other.identity)
  }
}
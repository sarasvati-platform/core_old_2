import { Identity } from './identity'

export abstract class Entity {
  private _identity: Identity

  /**
   * Initializes the new instance of the Entity class
   * @param identity Identity. Will be generated if nothing is provided
   */
  constructor(identity?: Identity) {
    this._identity = identity || new Identity()
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
  equals(other: Entity): boolean {
    return this._identity.equals(other.identity)
  }
}
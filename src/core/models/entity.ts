import { v4 as uuid_v4 } from 'uuid'

/**
 * Identifies an entity.
 */
export class Identity {
  private _id: string

  /**
   * Initializes the new instance of the Identity class
   * @param id Value. Will be generated if nothing is provided
   */
  constructor(id?: string) {
    if (id && !id.trim()) { throw new Error('Identity cannot be empty string') }
    this._id = id || uuid_v4()
  }

  /**
   * Gets the value of the Identity
   */
  get value(): string {
    return this._id
  }

  /**
   * Compares the Identity to another Identity
   * @param other Identity to compare to
   * @returns True if the Identity is equal to the other Identity
   */
  equals(other: Identity): boolean {
    return this._id === other.value
  }

  /**
   * Returns a string representation of the Identity
   * @returns String representation of the Identity
   */
  toString(): string {
    return this._id
  }
}

/**
 * Base class for all entities.
 */
export abstract class Entity<TIdentity extends Identity> {
  private _identity: TIdentity

  /**
   * Initializes the new instance of the Entity class
   * @param identity Identity of the Entity
   */
  constructor(identity: TIdentity) {
    this._identity = identity
  }

  /**
   * Gets the value of the Identity
   */
  get identity(): TIdentity {
    return this._identity
  }

  /**
   * Compares the Entity to another Entity
   * @param other Entity to compare to
   * @returns True if the Entity is equal to the other Entity
   */
  equals(other: Entity<TIdentity>): boolean {
    return this._identity.equals(other.identity)
  }
}

type EventHandler<TArgument> = (arg: TArgument) => void

export class Event<TArgument> {
  private _handlers:EventHandler<TArgument>[] = []

  public subscribe(handler: EventHandler<TArgument>): void {
    this._handlers.push(handler)
  }

  public unsubscribe(handler: EventHandler<TArgument>): void {
    const index = this._handlers.indexOf(handler)
    if (index !== -1) {
      this._handlers.splice(index, 1)
    }
  }

  public notify(arg: TArgument): void {
    this._handlers.forEach(x => x(arg))
  }
}
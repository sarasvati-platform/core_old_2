import { v4 as uuid_v4 } from 'uuid'

/**
 * Identity
 */
export class Identity {
  private _id: string

  /**
   * Initializes the new instance of the Identity class
   * @param id Value. Will be generated if nothing is provided
   */
  constructor(id?: string) {
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
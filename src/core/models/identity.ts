import { v4 as uuid_v4 } from 'uuid'

export class Identity {
  private _id: string

  constructor(id?: string) {
    this._id = id || uuid_v4()
  }

  get value(): string {
    return this._id
  }

  equals(other: Identity): boolean {
    return this._id === other.value
  }

  toString(): string {
    return this._id
  }
}
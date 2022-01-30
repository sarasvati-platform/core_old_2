export class Name {
  constructor(public readonly value: string) {
    if (!value) {
      throw new Error('The name must be a non-empty string')
    }
  }

  public equals(other: Name): boolean {
    return this.value === other.value
  }

  public toString(): string {
    return this.value
  }
}
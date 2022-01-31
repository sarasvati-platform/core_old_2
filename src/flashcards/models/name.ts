export class Name {
  constructor(public readonly value: string) {
    if (value.includes('\n')) {
      throw new Error('The name must not contain new line')
    }
    if (value.includes('\r')) {
      throw new Error('The name must not contain caret return')
    }
    if (value.includes('\t')) {
      throw new Error('The name must not contain tabs')
    }
    if (value.trim() === '') {
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
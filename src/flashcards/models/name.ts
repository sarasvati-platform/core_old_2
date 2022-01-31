/**
 * Name
 */
export class Name {
  /**
   * Initializes the new instance of the Name class
   * @param value Name
   */
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

  /**
   * Compares the Name to another Name
   * @param other Other name to compare to
   * @returns True if the name is equal to the other name
   */
  public equals(other: Name): boolean {
    return this.value === other.value
  }

  /**
   * Returns a string representation of the Name
   * @returns String representation of the Name
   */
  public toString(): string {
    return this.value
  }
}
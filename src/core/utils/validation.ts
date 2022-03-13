export class Validate {
  static shouldNotContain(value: any, collection: any[], message: string) {
    if (collection.includes(value)) { throw new Error(message) }
  }
}
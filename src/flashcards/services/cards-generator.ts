import { Card, Note } from '@src/flashcards/models'

export class CardsGenerator {
  constructor(
    private readonly note: Note,
  ) {}

  generate() : Card[] {
    const result: Card[] = []
    const cardTypes = this.note.type.cardTypes

    for (const cardType of cardTypes.all) {
      const card = new Card(cardType, this.note)
      result.push(card)
    }

    return result
  }
}
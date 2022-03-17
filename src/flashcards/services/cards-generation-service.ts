import { Card, Note } from '@src/flashcards/models'
import { ICardRepository } from '@src/flashcards/ports/repositories'
import { ofNote } from '@src/flashcards/models/card/queries'

/** Action type */
export enum  CardsGenerationActionType {
  Add, Update, Remove,
}

/** Acton item */
export interface CardsGenerationAction {
  card: Card,
  action: CardsGenerationActionType,
}

/** Cards generator */
export class CardsGenerationService {
  private readonly _cardsRepository: ICardRepository

  /**
   * Initializes the new instance of the CardsGenerationService class.
   * @param cardsRepository Cards repository.
   */
  constructor(cardsRepository: ICardRepository) {
    this._cardsRepository = cardsRepository
  }

  /**
   * Generates cards for the specified note.
   * @param note Note to generate cards for.
   * @returns List of performed actions.
   */
  generate(note: Note) : CardsGenerationAction[] {
    const result: CardsGenerationAction[] = []
    const existingCards = [...this._cardsRepository.find(ofNote(note))]

    // Update existing cards or generate new ones
    for (const cardType of note.type.cardTypes.all) {
      const existingCardIndex = existingCards.findIndex(x => x.type.equals(cardType))

      if (existingCardIndex > -1) {
        const removed = existingCards.splice(existingCardIndex, 1)
        result.push({ card: removed[0], action: CardsGenerationActionType.Update })
      } else {
        const card = new Card(cardType, note)
        this._cardsRepository.save(card)
        result.push({ card, action: CardsGenerationActionType.Add })
      }
    }

    // Remove cards that are no longer needed
    for (const card of existingCards) {
      this._cardsRepository.delete(card.identity)
      result.push({ card: card, action: CardsGenerationActionType.Remove })
    }

    return result
  }
}

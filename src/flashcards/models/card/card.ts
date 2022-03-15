import { Entity, Identity } from '@src/core/models'
import { CardType, Note, ReviewSchedule } from '@src/flashcards/models'

/** Identity for [card]{@link Card} */
export type CardId = Identity & { type: 'Card' }

/**
 * Card is question and answer pair. This is based on a paper flashcard with a
 * question on one side and the answer on the back. It also contains
 * [schedule]{@link Schedule} information for further reviews.
 **/
export class Card extends Entity<CardId> {
  /**
   * Initializes a new instance of the Card class.
   * @param type Type of card.
   * @param note Note to which this card belongs.
   * @param schedule Schedule of this card.
   * @param identity Unique identifier for this card.
   */
  constructor(
    public readonly type: CardType,
    public readonly note: Note,
    public readonly schedule: ReviewSchedule,
    identity: CardId = new Identity() as CardId,
  ) {
    super(identity)
  }
}

/**
 * Сard with rendered data taken from [note]{@link Note} and
 * [card type]{@link CardType}.
 */
export class RenderedCard {
  /**
   * Initializes a new instance of the RenderedCard class.
   * @param sections Rendered sections of the card.
   */
  constructor(
    public sections: string[]
  ) {}
}
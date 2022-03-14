import { Entity, Identity } from '@src/core/models'
import { CardType, Note } from '@src/flashcards/models'

export type CardId = Identity & { type: 'Card' }

export class Card extends Entity<CardId> {
  constructor(
    public readonly type: CardType,
    public readonly note: Note,
    identity: CardId = new Identity() as CardId,
  ) {
    super(identity)
  }
}

export class RenderedCard {
  constructor(
    public sections: string[]
  ) {}
}
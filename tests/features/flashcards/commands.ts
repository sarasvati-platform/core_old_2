import { Identity } from '@src/core/models'
import { CardSection, CardType, CardTypeName, Note, NoteId, NoteTypeId } from '@src/flashcards/models'
import { INoteRepository, INoteTypeRepository } from '@src/flashcards/ports/repositories'

/* -------------------------------------------------------------------------- */
/*                                  Note Type                                 */
/* -------------------------------------------------------------------------- */

export class ManageCollectionStructure {
  constructor(
    private ntr: INoteTypeRepository,
    private nr: INoteRepository
  ) {}

  addCardTypes(noteTypeId: string, names: string[]) {
    const noteType = this.ntr.get(new Identity(noteTypeId) as NoteTypeId)
    for(const name of names) {
      noteType.cardTypes.add(new CardType(new CardTypeName(name)))
    }
  }

  addCardType(noteTypeId: string, name: string, sections: string[]) {
    const noteType = this.ntr.get(new Identity(noteTypeId) as NoteTypeId)
    const cardType = new CardType(new CardTypeName(name))
    noteType.cardTypes.add(cardType)
    for(const section of sections) {
      cardType.sections.add(new CardSection(section))
    }
  }

  addSections(noteTypeId: string, cardTypeName: string, name: string[]) {
    const noteType = this.ntr.get(new Identity(noteTypeId) as NoteTypeId)
    const cardType = noteType.cardTypes.getByName(cardTypeName)
    name.forEach(x => cardType.sections.add(new CardSection(x)))
    this.ntr.save(noteType)
  }

  deleteSection(noteTypeId: string, cardTypeName: string, index: number) {
    const noteType = this.ntr.get(new Identity(noteTypeId) as NoteTypeId)
    const cardType = noteType.cardTypes.getByName(cardTypeName)
    cardType.sections.remove(index-1)
  }

  removeCardType(noteTypeId: string, name: string) {
    const noteType = this.ntr.get(new Identity(noteTypeId) as NoteTypeId)
    const cardType = noteType.cardTypes.getByName(name)
    noteType.cardTypes.remove(cardType)
  }

  renameCardType(noteTypeId: string, oldName: string, newName: string) {
    const noteType = this.ntr.get(new Identity(noteTypeId) as NoteTypeId)
    const cardType = noteType.cardTypes.getByName(oldName)
    cardType.rename(new CardTypeName(newName))
  }

  changeCardTypePosition(noteTypeId: string, name: string, position: number) {
    const noteType = this.ntr.get(new Identity(noteTypeId) as NoteTypeId)
    const cardType = noteType.cardTypes.getByName(name)
    noteType.cardTypes.setPositionOf(cardType).to(position)
  }

  createNote(noteTypeName: string, fields: [string, string][]) {
    const noteType = this.ntr.get(new Identity(noteTypeName) as NoteTypeId)
    const note = new Note(noteType, new Identity(fields[0][1]) as NoteId)
    for (const field of fields) {
      note.setFieldValue(field[0], field[1])
    }
    this.nr.save(note)
  }

  deleteNote(noteId: string) {
    this.nr.delete(new Identity(noteId) as NoteId)
  }
}
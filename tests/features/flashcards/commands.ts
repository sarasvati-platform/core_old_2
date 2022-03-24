import { Identity } from '@src/core/models'
import { CardSection, CardType, CardTypeName, Note, NoteField, NoteFieldName, NoteId, NoteType, NoteTypeId, NoteTypeName } from '@src/flashcards/models'
import { INoteRepository, INoteTypeRepository } from '@src/flashcards/ports/repositories'

/* -------------------------------------------------------------------------- */
/*                                  Note Type                                 */
/* -------------------------------------------------------------------------- */

export class ManageCollectionStructure {
  constructor(
    private ntr: INoteTypeRepository,
    private nr: INoteRepository
  ) {}

  createNoteType(name: string, fields: string[]) {
    const noteType = new NoteType(
      new NoteTypeName(name),
      new Identity(name) as NoteTypeId
    )
    for(const field of fields) {
      noteType.fields.add(
        new NoteField(new NoteFieldName(field))
      )
    }
    this.ntr.save(noteType)
  }

  deleteNoteType(name: string) {
    this.ntr.delete(new Identity(name) as NoteTypeId)
  }

  renameNoteType(name: string, newName: string) {
    const noteType = this.ntr.get(new Identity(name) as NoteTypeId)
    noteType.rename(new NoteTypeName(newName))
    this.ntr.save(noteType)
  }

  addField(noteTypeId: string, fields: string[]) {
    const noteType = this.ntr.get(new Identity(noteTypeId) as NoteTypeId)
    for(const field of fields) {
      const name = new NoteFieldName(field)
      noteType.fields.add(new NoteField(name))
    }
    this.ntr.save(noteType)
  }

  removeField(noteTypeId: string, fields: string[]) {
    const noteType = this.ntr.get(new Identity(noteTypeId) as NoteTypeId)
    for(const field of fields) {
      const f = noteType.fields.getByName(field)
      noteType.fields.remove(f)
    }
    this.ntr.save(noteType)
  }

  renameField(noteTypeId: string, field: string, newName: string) {
    const noteType = this.ntr.get(new Identity(noteTypeId) as NoteTypeId)
    const f = noteType.fields.getByName(field)
    f.rename(new NoteFieldName(newName))
    this.ntr.save(noteType)
  }

  changeFieldPosition(noteTypeId: string, field: string, index: number) {
    const noteType = this.ntr.get(new Identity(noteTypeId) as NoteTypeId)
    const f = noteType.fields.getByName(field)
    noteType.fields.setPositionOf(f).to(index)
  }

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
import { Identity } from '@src/core/models'
import { CardSection, CardType, CardTypeName, NoteField, NoteFieldName, NoteType, NoteTypeId, NoteTypeName, Note, NoteId } from '@src/flashcards/models'
import { context } from '@tests/features/flashcards/context'

const ntr = context.noteTypeRepository
const nr = context.noteRepository

export function createNoteType(name: string, fields: string[]) {
  const noteType = new NoteType(
    new NoteTypeName(name),
      new Identity(name) as NoteTypeId
  )
  for(const field of fields) {
    noteType.fields.add(
      new NoteField(new NoteFieldName(field))
    )
  }
  ntr.save(noteType)
}

export function deleteNoteType(name: string) {
  ntr.delete(new Identity(name) as NoteTypeId)
}

export function renameNoteType(name: string, newName: string) {
  const noteType = ntr.get(new Identity(name) as NoteTypeId)
  noteType.rename(new NoteTypeName(newName))
  ntr.save(noteType)
}

export function addField(noteTypeId: string, fields: string[]) {
  const noteType = ntr.get(new Identity(noteTypeId) as NoteTypeId)
  for(const field of fields) {
    const name = new NoteFieldName(field)
    noteType.fields.add(new NoteField(name))
  }
  ntr.save(noteType)
}

export function removeField(noteTypeId: string, fields: string[]) {
  const noteType = ntr.get(new Identity(noteTypeId) as NoteTypeId)
  for(const field of fields) {
    const f = noteType.fields.getByName(field)
    noteType.fields.remove(f)
  }
  ntr.save(noteType)
}

export function renameField(noteTypeId: string, field: string, newName: string) {
  const noteType = ntr.get(new Identity(noteTypeId) as NoteTypeId)
  const f = noteType.fields.getByName(field)
  f.rename(new NoteFieldName(newName))
  ntr.save(noteType)
}

export function changeFieldPosition(noteTypeId: string, field: string, index: number) {
  const noteType = ntr.get(new Identity(noteTypeId) as NoteTypeId)
  const f = noteType.fields.getByName(field)
  noteType.fields.setPositionOf(f).to(index)
}

export function addCardTypes(noteTypeId: string, names: string[]) {
  const noteType = ntr.get(new Identity(noteTypeId) as NoteTypeId)
  for(const name of names) {
    noteType.cardTypes.add(new CardType(new CardTypeName(name)))
  }
}

export function addCardType(noteTypeId: string, name: string, sections: string[]) {
  const noteType = ntr.get(new Identity(noteTypeId) as NoteTypeId)
  const cardType = new CardType(new CardTypeName(name))
  noteType.cardTypes.add(cardType)
  for(const section of sections) {
    cardType.sections.add(new CardSection(section))
  }
}

export function addSections(noteTypeId: string, cardTypeName: string, name: string[]) {
  const noteType = ntr.get(new Identity(noteTypeId) as NoteTypeId)
  const cardType = noteType.cardTypes.getByName(cardTypeName)
  name.forEach(x => cardType.sections.add(new CardSection(x)))
  ntr.save(noteType)
}

export function deleteSection(noteTypeId: string, cardTypeName: string, index: number) {
  const noteType = ntr.get(new Identity(noteTypeId) as NoteTypeId)
  const cardType = noteType.cardTypes.getByName(cardTypeName)
  cardType.sections.remove(index-1)
}

export function removeCardType(noteTypeId: string, name: string) {
  const noteType = ntr.get(new Identity(noteTypeId) as NoteTypeId)
  const cardType = noteType.cardTypes.getByName(name)
  noteType.cardTypes.remove(cardType)
}

export function renameCardType(noteTypeId: string, oldName: string, newName: string) {
  const noteType = ntr.get(new Identity(noteTypeId) as NoteTypeId)
  const cardType = noteType.cardTypes.getByName(oldName)
  cardType.rename(new CardTypeName(newName))
}

export function changeCardTypePosition(noteTypeId: string, name: string, position: number) {
  const noteType = ntr.get(new Identity(noteTypeId) as NoteTypeId)
  const cardType = noteType.cardTypes.getByName(name)
  noteType.cardTypes.setPositionOf(cardType).to(position)
}

export function createNote(noteTypeName: string, fields: [string, string][]) {
  const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
  const note = new Note(noteType, new Identity(fields[0][1]) as NoteId)
  for (const field of fields) {
    note.setFieldValue(field[0], field[1])
  }
  nr.save(note)
}

export function deleteNote(noteId: string) {
  nr.delete(new Identity(noteId) as NoteId)
}

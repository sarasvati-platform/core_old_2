import { StepDefinitions } from 'jest-cucumber'
import { Identity } from '@src/core/models'
import { NoteType, NoteTypeId, NoteTypeName, NoteField, NoteFieldName, CardTypeName, CardType } from '@src/flashcards/models'
import { context } from '@tests/features/flashcards/context'
import { named } from '@src/flashcards/models/note-type/queries'
import { Expression } from '@sarasvati-platform/abstract-query'

export const nodeTypesManageSteps: StepDefinitions = ({ when, then }) => {
  const ntr = context.noteTypeRepository

  /* -------------------------------------------------------------------------- */
  /*                                    When                                    */
  /* -------------------------------------------------------------------------- */

  when(/^User creates '(.*)' note type$/, (noteTypeName) => {
    const noteType = new NoteType(
      new NoteTypeName(noteTypeName),
      new Identity(noteTypeName) as NoteTypeId
    )
    ntr.save(noteType)
  })

  when(/^User deletes '(.*)' note type$/, (noteTypeName) => {
    ntr.delete(new Identity(noteTypeName) as NoteTypeId)
  })

  when(/^User renames '(.*)' note type to '(.*)'$/, (noteTypeName, newNoteTypeName) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    noteType.rename(new NoteTypeName(newNoteTypeName))
    ntr.save(noteType)
  })

  when(/^User adds '(.*)' field to '(.*)' note type$/, (fieldName: string, noteTypeName) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    try {
      fieldName = fieldName.replace('<newline>', '\n').replace('<tab>', '\t')
      const name = new NoteFieldName(fieldName)
      noteType.fields.add(new NoteField(name))
    } catch (e) {
      context.addError(e)
    }
  })

  when(/^User removes '(.*)' field from '(.*)' note type$/, (fieldName: string, noteTypeName: string) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    const field = noteType.fields.findByName(fieldName)
    if (!field) { throw new Error(`Field '${fieldName}' not found`) }
    noteType.fields.remove(field)
  })

  when(/^User adds '(.*)' card type to '(.*)' note type$/, (cardTypeName: string, noteTypeName) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    const name = new CardTypeName(cardTypeName)
    noteType.cardTypes.add(new CardType(name))
  })

  when(/^User removes '(.*)' card type from '(.*)' note type$/, (cardTypeName: string, noteTypeName: string) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    const cardType = noteType.cardTypes.findByName(cardTypeName)
    if (!cardType) { throw new Error(`Card type '${cardTypeName}' not found`) }
    noteType.cardTypes.remove(cardType)
  })

  /* -------------------------------------------------------------------------- */
  /*                                    Then                                    */
  /* -------------------------------------------------------------------------- */

  then(/^User has the following note types:$/, (noteTypeTable) => {
    for (const noteTypeRow of noteTypeTable) {
      const identity = new Identity(noteTypeRow['Note Type']) as NoteTypeId
      const noteType = ntr.get(identity)

      expect(noteType).toBeDefined()
      expect(noteType?.name.value).toEqual(noteTypeRow['Note Type'])
    }
  })

  then(/^User has no '(.*)' note type$/, (noteTypeName) => {
    const exists = ntr.exists(new Identity(noteTypeName) as NoteTypeId)
    expect(exists).toBeFalsy()
  })

  then(/^Note type '(.*)' has '(.*)' field$/, (noteTypeName, fieldName) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    const field = noteType.fields.findByName(fieldName)
    expect(field).toBeDefined()
  })

  then(/^Note type '(.*)' has no '(.*)' field$/, (noteTypeName, fieldName) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    const field = noteType.fields.findByName(fieldName)
    expect(field).toBeUndefined()
  })

  then(/^Note type '(.*)' has '(.*)' card type$/, (noteTypeName, cardTypeName) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    const field = noteType.cardTypes.findByName(cardTypeName)
    expect(field).toBeDefined()
  })

  then(/^Note type '(.*)' has no '(.*)' card type$/, (noteTypeName, cardTypeName) => {
    const noteType = ntr.get(new Identity(noteTypeName) as NoteTypeId)
    const field = noteType.cardTypes.findByName(cardTypeName)
    expect(field).toBeUndefined()
  })

  then(/^The result of serach for '(.*)' note type is:$/, (query, resultTable) => {
    const expr = named(query) as Expression
    const searchResults = ntr.find(expr)

    expect(searchResults.length).toEqual(resultTable.length)
    for (const noteTypeRow of resultTable) {
      const noteTypeName = noteTypeRow['Note Type']
      const noteType = searchResults.find(x => x.name.value === noteTypeName)
      expect(noteType).toBeDefined()
      expect(noteType?.name.value).toEqual(noteTypeName)
    }
  })
}

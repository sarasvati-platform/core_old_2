import { StepDefinitions } from 'jest-cucumber'
import { Identity } from '@src/core/models/identity'
import { NoteType, NoteTypeName } from '@src/flashcards/models/note-type'
import { context } from '@tests/features/flashcards/context'

export const nodeTypesManageSteps: StepDefinitions = ({ when, then }) => {

  /* -------------------------------------------------------------------------- */
  /*                                    When                                    */
  /* -------------------------------------------------------------------------- */

  when(/^User creates '(.*)' note type$/, (noteTypeName) => {
    const noteType = new NoteType(new Identity(noteTypeName), new NoteTypeName(noteTypeName))
    context.noteTypeRepository.save(noteType)
  })

  when(/^User deletes '(.*)' note type$/, (noteTypeName) => {
    context.noteTypeRepository.delete(new Identity(noteTypeName))
  })

  /* -------------------------------------------------------------------------- */
  /*                                    Then                                    */
  /* -------------------------------------------------------------------------- */

  then(/^User has the following note types:$/, (noteTypeTable) => {
    for (const noteTypeRow of noteTypeTable) {
      const identity = new Identity(noteTypeRow['Note Type'])
      const noteType = context.noteTypeRepository.find(identity)

      expect(noteType).toBeDefined()
      expect(noteType?.name.value).toEqual(noteTypeRow['Note Type'])
    }
  })

  then(/^User has no '(.*)' note type$/, (noteTypeName) => {
    const noteType = context.noteTypeRepository.find(new Identity(noteTypeName))
    expect(noteType).toBeUndefined()
  })
}
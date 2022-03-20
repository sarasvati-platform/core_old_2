import { loadFeature, autoBindSteps } from 'jest-cucumber'

import { coreSteps } from '@tests/features/flashcards/steps/core.steps'
import { noteTypesSteps } from '@tests/features/flashcards/steps/note-type/note-type.steps'
import { noteTypeFieldsSteps } from '@tests/features/flashcards/steps/note-type/field.steps'
import { noteTypeCardTypesSteps } from '@tests/features/flashcards/steps/note-type/card-type.steps'
import { noteTypeCardTypeSectionsSteps } from '@tests/features/flashcards/steps/note-type/card-type-section.steps'
import { noteSteps } from '@tests/features/flashcards/steps/note/note.steps'

autoBindSteps([
  loadFeature('features/flashcards/note-type/note-type.feature'),
  loadFeature('features/flashcards/note-type/fields.feature'),
  loadFeature('features/flashcards/note-type/card-type.feature'),
  loadFeature('features/flashcards/note-type/card-type-section.feature'),
  loadFeature('features/flashcards/note/note.feature'),
], [
  coreSteps,
  noteTypesSteps,
  noteTypeFieldsSteps,
  noteTypeCardTypesSteps,
  noteTypeCardTypeSectionsSteps,
  noteSteps
])
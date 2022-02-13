import { loadFeature, autoBindSteps } from 'jest-cucumber'

import { coreSteps } from '@tests/features/flashcards/steps/core.step'
import { nodeTypesManageSteps } from '@tests/features/flashcards/steps/note-type.step'

autoBindSteps([
  loadFeature('features/flashcards/manage-collection/note-type.feature'),
], [
  coreSteps,
  nodeTypesManageSteps
])
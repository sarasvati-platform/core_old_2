import { loadFeature, autoBindSteps } from 'jest-cucumber'

import { coreSteps } from '@tests/features/core/steps/core.steps'

autoBindSteps([
  loadFeature('features/core/core.feature'),
], [
  coreSteps,
])

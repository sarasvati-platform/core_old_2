Feature: Flashcards / Manage Collection / Note Type

  Scenario: User can create note type
    When User creates 'Foreign Word' note type
    And User creates 'Geography' note type
    And User has the following note types:
      | Note Type    |
      | Foreign Word |
      | Geography    |
Feature: Flashcards / Manage Collection / Note

  Background:
    Given Empty deck
    When User creates 'Foreign Word' note type with the following fields:
      | Field       |
      | Word        |
      | Translation |
      | Example     |
    And User adds 'Word -> Translation' card type to the 'Foreign Word' note type with the following sections:
      | Section         |
      | {{Word}}        |
      | {{Translation}} |
      | {{Example}}     |
    And User adds 'Translation -> Word' card type to the 'Foreign Word' note type with the following sections:
      | Section         |
      | {{Translation}} |
      | {{Word}}        |
      | {{Example}}     |


  Rule: User can create new notes

    User can create new notes and fill in the fields that have been defined
    in the note type. No data that is not specified by the note type can
    be added

    Scenario: User can add a new card of the specified note type
      When User creates 'Foreign Word' note:
        | Field       | Value              |
        | Word        | Window             |
        | Translation | ifasitela          |
        | Example     | ifasitela elikhulu |
      Then User can find note by 'Window'
      And User sees no error

    Scenario: User cannot create a card with fields that are not defined in note type
      When User creates 'Foreign Word' note:
        | Field   | Value    |
        | Country | Zimbabwe |
      Then User sees an error "Field 'Country' not found"

    Scenario: User can delete a card
      When User creates 'Foreign Word' note:
        | Field | Value  |
        | Word  | Window |
      Then User deletes 'Window' note
      And User can't find note by 'Window'

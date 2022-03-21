Feature: Flashcards/Note/Search

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


  Rule: User can search notes by question

    Question is a value of the first field defined at related note type.

    Scenario: User can search notes by question
      When User creates 'Foreign Word' note:
        | Field       | Value              |
        | Word        | Window             |
        | Translation | ifasitela          |
        | Example     | ifasitela elikhulu |
      Then User can find note by 'Window'
      And User can't find note by 'door'

    Scenario: Search is case insensitive
      When User creates 'Foreign Word' note:
        | Field | Value  |
        | Word  | Window |
      And User can find note by 'window'

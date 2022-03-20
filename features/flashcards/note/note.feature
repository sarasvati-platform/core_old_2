Feature: Flashcards/Note

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


  # Rule: Note type must have at least one field

  #   User cannot create a card if its type does not have a field. Since the
  #   system checks the uniqueness of the note by the question field (the
  #   first field is defined in the note type), this cannot be done, since the
  #   fields are not defined.

  #   Scenario: User cannot create a new card if its type has no fields
  #     When User creates 'Empty Card Type' note type
  #     And User creates 'Empty Card Type' note:
  #     Then User sees an error 'Cannot create note. Its type has no fields'


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


  # Rule: Question field of the note is unique

  #   Question is a value of the first field defined at related note type. It
  #   must be unique to avoid ambiguity. Imagine that you have several cards
  #   with the same question but different answers. The user will not be able
  #   to determine what answer is expected from him. Therefore, the question
  #   must be unique.

  #   Scenario: The question field must be unique

  #     The first field of a 'Foreign Word' is a 'Word'. This field
  #     defines the question of a card. So it must be unique.

  #     When User creates 'Foreign Word' note:
  #       | Field       | Value              |
  #       | Word        | Window             |
  #       | Translation | ifasitela          |
  #       | Example     | ifasitela elikhulu |
  #     And User creates 'Foreign Word' note:
  #       | Field | Value  |
  #       | Word  | Window |
  #     Then User sees an error 'Note with the same question already exists'
  #     And User can find note by 'Window'

  #   Scenario: User cannot create note with same question but different case
  #     When User creates 'Foreign Word' note:
  #       | Field | Value  |
  #       | Word  | Window |
  #     And User creates 'Foreign Word' note:
  #       | Field | Value  |
  #       | Word  | window |
  #     Then User sees an error 'Note with the same question already exists'
  #     And User can find note by 'window'

  #   Scenario: User cannot create note with same question that differs only punctuation marks
  #     When User creates 'Foreign Word' note:
  #       | Field | Value      |
  #       | Word  | Big Window |
  #     And User creates 'Foreign Word' note:
  #       | Field | Value                  |
  #       | Word  | Big  ,  Window = <> %? |
  #     Then User sees an error 'Note with the same question already exists'
  #     And User can find note by 'big window'
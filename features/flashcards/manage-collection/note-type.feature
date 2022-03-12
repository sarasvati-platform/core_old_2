Feature: Flashcards / Manage Collection / Note Type

  Scenario: User can create note type
    When User creates 'Foreign Word' note type
    And User creates 'Geography' note type
    Then User has the following note types:
      | Note Type    |
      | Foreign Word |
      | Geography    |

  Scenario: User can delete note type
    When User creates 'Foreign Word' note type
    And User creates 'Geography' note type
    And User deletes 'Foreign Word' note type
    Then User has the following note types:
      | Note Type |
      | Geography |
    And User has no 'Foreign Word' note type

  Scenario: User can rename note type
    When User creates 'Foreign Word' note type
    And User creates 'Geography' note type
    And User renames 'Foreign Word' note type to 'Foreign Language'
    Then User has the following note types:
      | Note Type        |
      | Foreign Language |
      | Geography        |
    And User has no 'Foreign Word' note type

  Scenario: User can find note type by name
    Given User creates 'Geography' note type
    And User creates 'Foreign Word' note type
    Then The result of serach for 'Foreign Word' note type is:
      | Note Type    |
      | Foreign Word |

  # -------------------------------------------------------------------------- #
  #                                    Fields                                  #
  # -------------------------------------------------------------------------- #

  Scenario: User can add fields to the note type
    When User creates 'Foreign Word' note type
    And User adds 'Word' field to 'Foreign Word' note type
    Then Note type 'Foreign Word' has 'Word' field

  Rule: Field names are case insensitive and must not contain special characters

    The field name must be unique (not case sensitive) within the note type.
    Since the field names are used in templates to generate cards, note names
    must not contain special characters like curly braces, newlines, and tabs.

    Background:
      When User creates 'Foreign Word' note type
      And User adds 'Word' field to 'Foreign Word' note type

    Scenario: User cannot add a field with the same name
      And User adds 'Word' field to 'Foreign Word' note type
      Then User sees an error "Field with name 'Word' already exists"

    Scenario: User cannot add a field with the same name in a different case
      When User adds 'WORD' field to 'Foreign Word' note type
      Then User sees an error "Field with name 'WORD' already exists"

    Scenario Outline: User cannot add field with special characters
      When User adds '<Field>' field to 'Foreign Word' note type
      Then User sees an error '<Error>'

      Examples:
        | Field           | Error                               |
        |                 | The name must be a non-empty string |
        | Wrong {         | The name must not contain { or }    |
        | Wrong }         | The name must not contain { or }    |
        | Wrong <newline> | The name must not contain new line  |
        | Wrong <tab>     | The name must not contain tabs      |

    Scenario: User can remove fields from the note type
      When User creates 'Foreign Word' note type
      And User adds 'Word' field to 'Foreign Word' note type
      And User removes 'Word' field from 'Foreign Word' note type
      Then Note type 'Foreign Word' has no 'Word' field

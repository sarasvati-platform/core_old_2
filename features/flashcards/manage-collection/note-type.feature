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

  # -------------------------------------------------------------------------- #
  #                                  # fields                                  #
  # -------------------------------------------------------------------------- #

  Scenario: User can add fields to the note type
    When User creates 'Foreign Word' note type
    And User adds 'Word' field to 'Foreign Word' note type
    Then Note type 'Foreign Word' has 'Word' field

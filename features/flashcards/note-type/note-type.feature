Feature: Flashcards / Manage Collection / Note Type

  Rule: User can have his own note types

    The user can have his own note types. He can add, delete and rename
    them.

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
      And User renames 'Foreign Word' note type to 'Word'
      Then User has the following note types:
        | Note Type |
        | Word      |
        | Geography |
      And User has no 'Foreign Word' note type

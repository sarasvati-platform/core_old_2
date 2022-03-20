Feature: Flashcards/Card Type/Section

  Background:
    Given Empty deck
    When User creates 'Foreign Word' note type
    And User adds the following fields to the 'Foreign Word' note type:
      | Field       |
      | Word        |
      | Translation |

  Rule: User can add sections to card types

    Usually, a card has two sections: a question and an answer. But
    sometimes it can have one section (for example, just to remember some
    fact or idea). Also, a card can have more than two sections.

    Scenario: User add card type with sections
      When User adds 'Word -> Translation' card type to the 'Foreign Word' note type with the following sections:
        | Section         |
        | {{Word}}        |
        | {{Translation}} |
      Then Card type 'Word -> Translation' of the 'Foreign Word' note type has the following sections:
        | Section         |
        | {{Word}}        |
        | {{Translation}} |


  Rule: User can manage sections once added

    User can add additional sections or delete existing ones

    Background:
      When User adds 'Word -> Translation' card type to the 'Foreign Word' note type with the following sections:
        | Section         |
        | {{Word}}        |
        | {{Translation}} |

    Scenario: User can add card types later
      When User adds the following sections to the 'Word -> Translation' card type of the 'Foreign Word' note type:
        | Section     |
        | {{Audio}}   |
        | {{Example}} |
      Then Card type 'Word -> Translation' of the 'Foreign Word' note type has the following sections:
        | Section         |
        | {{Word}}        |
        | {{Translation}} |
        | {{Audio}}       |
        | {{Example}}     |

    Scenario: User can delete sections from card type
      When User deletes 1 section from 'Word -> Translation' card type of 'Foreign Word' note type
      Then Card type 'Word -> Translation' of the 'Foreign Word' note type has the following sections:
        | Section         |
        | {{Translation}} |


  Rule: Field substitutions in sections will be replaced with real values of card fields

    By surrounding a field name in double curly brackets, we tell
    Sarasvati to replace that section with the actual information in the
    field

    Scenario: Basic field substitution
      When User adds 'Word -> Translation' card type to the 'Foreign Word' note type with the following sections:
        | Section         |
        | {{Word}}        |
        | {{Translation}} |
      And User creates 'Foreign Word' note:
        | Field       | Value     |
        | Word        | Window    |
        | Translation | ifasitela |
      Then Note 'Window' has the following cards:
        | Card Type           | Section 1 | Section 2 |
        | Word -> Translation | Window    | ifasitela |

    Scenario: Section can have multiple substitutions
      When User adds the following fields to the 'Foreign Word' note type:
        | Field         |
        | Transcription |
        | Audio         |
      And User adds 'Word -> Translation' card type to the 'Foreign Word' note type with the following sections:
        | Section                                  |
        | {{Word}} ({{Transcription}}) [{{Audio}}] |
        | {{Translation}} [{{Audio}}]              |
      And User creates 'Foreign Word' note:
        | Field         | Value      |
        | Word          | Window     |
        | Translation   | ifasitela  |
        | Transcription | 'windoo    |
        | Audio         | window.mp3 |
      Then Note 'Window' has the following cards:
        | Card Type           | Section 1                     | Section 2              |
        | Word -> Translation | Window ('windoo) [window.mp3] | ifasitela [window.mp3] |
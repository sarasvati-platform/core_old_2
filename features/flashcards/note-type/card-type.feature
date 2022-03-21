Feature: Flashcards / Manage Collection / Note Type / Card Type

  Background:
    Given Empty deck
    When User creates 'Foreign Word' note type


  Rule: User can add card types to the note type

    User can add any card types he would like to the note type. Each
    card type has its own unique name.

    Scenario: User can add card types to the note type
      When User adds the following card types to the 'Foreign Word' note type:
        | Card Type           |
        | Word -> Translation |
        | Translation -> Word |
        | Word -> Audio       |
      Then Note type 'Foreign Word' has the following card types:
        | Card Type           |
        | Word -> Translation |
        | Translation -> Word |
        | Word -> Audio       |

    Scenario: User can add card types later
      When User adds the following card types to the 'Foreign Word' note type:
        | Card Type           |
        | Word -> Translation |
        | Translation -> Word |
        | Word -> Audio       |
      When User adds the following card types to the 'Foreign Word' note type:
        | Card Type       |
        | Audio -> Number |
      Then Note type 'Foreign Word' has the following card types:
        | Card Type           |
        | Word -> Translation |
        | Translation -> Word |
        | Word -> Audio       |
        | Audio -> Number     |

    Scenario: User can not add card type with the same name
      When User adds 'Word -> Translation' card type to 'Foreign Word' note type
      And User adds 'Word -> Translation' card type to 'Foreign Word' note type
      Then User sees an error "Item 'Word -> Translation' already exists"
      And Note type 'Foreign Word' has 'Word -> Translation' card type


  Rule: User can delete card types from the note type

    Background:
      When User adds the following card types to the 'Foreign Word' note type:
        | Card Type           |
        | Word -> Translation |
        | Translation -> Word |
        | Word -> Audio       |

    Scenario: User can delete card types from note type
      When User removes 'Word -> Translation' card type from 'Foreign Word' note type
      Then Note type 'Foreign Word' has the following card types:
        | Card Type           |
        | Translation -> Word |
        | Word -> Audio       |
      And Note type 'Foreign Word' has no 'Word -> Translation' card type


  Rule: User can rename card types of the note type

    Background:
      When User adds the following card types to the 'Foreign Word' note type:
        | Card Type           |
        | Word -> Translation |
        | Translation -> Word |
        | Word -> Audio       |

    Scenario: User can rename the card type of note type
      When User renames 'Word -> Translation' card type to 'Verse to Number' of the 'Foreign Word' note type
      Then Note type 'Foreign Word' has no 'Word -> Translation' card type
      And Note type 'Foreign Word' has 'Verse to Number' card type

    Scenario: User can not rename the card type to the existing one
      When User renames 'Word -> Translation' card type to 'Translation -> Word' of the 'Foreign Word' note type
      Then User sees an error "Item 'Translation -> Word' already exists"
      Then Note type 'Foreign Word' has the following card types:
        | Card Type           |
        | Word -> Translation |
        | Translation -> Word |
        | Word -> Audio       |


  Rule: User can change the order of the card types

    Background:
      When User adds the following card types to the 'Foreign Word' note type:
        | Card Type           | Order |
        | Word -> Translation | 1     |
        | Translation -> Word | 2     |
        | Word -> Audio       | 3     |

    Scenario: User can chanage the order of the card types
      When User changes position of 'Word -> Audio' card type of 'Foreign Word' note type to 1
      Then Note type 'Foreign Word' has the following card types:
        | Card Type           | Order |
        | Word -> Audio       | 1     |
        | Word -> Translation | 2     |
        | Translation -> Word | 3     |

  Rule: Field name is unique for the note type

    Background:
      When User creates 'Dictionary' note type


    Scenario: Card type is unique only for note type itself
      When User adds 'Word -> Translation' card type to 'Foreign Word' note type
      And User adds 'Word -> Translation' card type to 'Dictionary' note type
      Then User sees no error

Feature: Flashcards/Card Type

  Background:
    Given Empty deck
    When User creates 'Verse' note type


  Rule: User can add card types to the note type

    User can add any card types he would like to the note type. Each
    card type has its own unique name.

    Scenario: User can add card types to the note type
      When User adds the following card types to the 'Verse' note type:
        | Card Type            |
        | Verse -> Number      |
        | Number -> Verse      |
        | Verse -> Translation |
      Then Note type 'Verse' has the following card types:
        | Card Type            |
        | Verse -> Number      |
        | Number -> Verse      |
        | Verse -> Translation |

    Scenario: User can not add card type with the same name
      When User adds 'Verse -> Number' card type to 'Verse' note type
      And User adds 'Verse -> Number' card type to 'Verse' note type
      Then User sees an error "Item 'Verse -> Number' already exists"
      And Note type 'Verse' has 'Verse -> Number' card type


  Rule: User can manage card types once added

    User can add new card types, delete or rename old ones and change
    their order.

    Background:
      When User adds the following card types to the 'Verse' note type:
        | Card Type            |
        | Verse -> Number      |
        | Number -> Verse      |
        | Verse -> Translation |

    Scenario: User can add card types later
      When User adds the following card types to the 'Verse' note type:
        | Card Type       |
        | Audio -> Number |
      Then Note type 'Verse' has the following card types:
        | Card Type            |
        | Verse -> Number      |
        | Number -> Verse      |
        | Verse -> Translation |
        | Audio -> Number      |

    Scenario: User can delete card types from note type
      When User removes 'Verse -> Number' card type from 'Verse' note type
      Then Note type 'Verse' has the following card types:
        | Card Type            |
        | Number -> Verse      |
        | Verse -> Translation |
      And Note type 'Verse' has no 'Verse -> Number' card type

    Scenario: User can rename the card type of note type
      When User renames 'Verse -> Number' card type to 'Verse to Number' of the 'Verse' note type
      Then Note type 'Verse' has no 'Verse -> Number' card type
      And Note type 'Verse' has 'Verse to Number' card type

    Scenario: User can not rename the card type to the existing one
      When User renames 'Verse -> Number' card type to 'Number -> Verse' of the 'Verse' note type
      Then User sees an error "Item 'Number -> Verse' already exists"
      Then Note type 'Verse' has the following card types:
        | Card Type            |
        | Verse -> Number      |
        | Number -> Verse      |
        | Verse -> Translation |


  Rule: User can change the order of the faces

    Background:
      When User adds the following card types to the 'Verse' note type:
        | Card Type            | Order |
        | Verse -> Number      | 1     |
        | Number -> Verse      | 2     |
        | Verse -> Translation | 3     |

    Scenario: User can chanage the order of the faces
      When User changes position of 'Verse -> Translation' card type of 'Verse' note type to 1
      Then Note type 'Verse' has the following card types:
        | Card Type            | Order |
        | Verse -> Translation | 1     |
        | Verse -> Number      | 2     |
        | Number -> Verse      | 3     |

    Scenario Outline: User cannot change position of the card type to the wrong place
      When User changes position of 'Verse -> Translation' card type of 'Verse' note type to <Position>
      Then User sees an error 'Index is out of range'
      And Note type 'Verse' has the following card types:
        | Card Type            | Order |
        | Verse -> Number      | 1     |
        | Number -> Verse      | 2     |
        | Verse -> Translation | 3     |

      Examples:
        | Position |
        | -1       |
        | 5        |


  Rule: Card type name is not case sensitive

    Background:
      When User adds 'Verse -> Number' card type to 'Verse' note type

    Scenario: User cannot add a card type with the same name in a different case
      When User adds 'verse -> number' card type to 'Verse' note type
      Then User sees an error "Item 'verse -> number' already exists"
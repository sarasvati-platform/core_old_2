Feature: Flashcards / Manage Collection / Note Type / Note Field

  Background:
    Given Empty deck
    When User creates 'Foreign Word' note type


  Rule: User can add fields to note type

    User can add any fields he would like to the note type. Each field has
    its own unique name.

    Scenario: User can add fields to note type
      When User adds the following fields to the 'Foreign Word' note type:
        | Field       |
        | Word        |
        | Translation |
        | Example     |
      Then Note type 'Foreign Word' has the following fields:
        | Field       |
        | Word        |
        | Translation |
        | Example     |

    Scenario: User can add fields later
      When User adds the following fields to the 'Foreign Word' note type:
        | Field |
        | Audio |
      And User adds the following fields to the 'Foreign Word' note type:
        | Field |
        | Word  |
      Then Note type 'Foreign Word' has the following fields:
        | Field |
        | Audio |
        | Word  |

    Scenario: User cannot add field with the same name
      When User adds 'Audio' field to the 'Foreign Word' note type
      And User adds 'Audio' field to the 'Foreign Word' note type
      Then User sees an error "Item 'Audio' already exists"
      And Note type 'Foreign Word' has 'Audio' field

    Scenario: User cannot add a field with the same name in a different case
      When User adds 'Word' field to the 'Foreign Word' note type
      When User adds 'word' field to the 'Foreign Word' note type
      Then User sees an error "Item 'word' already exists"


  Rule: User can remove fields from note type

    Background:
      When User adds the following fields to the 'Foreign Word' note type:
        | Field       |
        | Word        |
        | Translation |
        | Example     |

    Scenario: User can remove fields from note type
      When User removes 'Example' field from 'Foreign Word' note type
      Then Note type 'Foreign Word' has the following fields:
        | Field       |
        | Word        |
        | Translation |
      And Note type 'Foreign Word' has no 'Example' field


  Rule: User can rename fields of note type

    Background:
      When User adds the following fields to the 'Foreign Word' note type:
        | Field       |
        | Word        |
        | Translation |
        | Example     |
        | Audio       |

    Scenario: User can rename the field of note type
      When User renames 'Example' field to 'Usage' of the 'Foreign Word' note type
      Then Note type 'Foreign Word' has no 'Example' field
      And Note type 'Foreign Word' has 'Usage' field

    Scenario: User can not rename the field to the existing one
      When User renames 'Example' field to 'Audio' of the 'Foreign Word' note type
      Then User sees an error "Item 'Audio' already exists"
      And Note type 'Foreign Word' has the following fields:
        | Field       |
        | Word        |
        | Translation |
        | Example     |
        | Audio       |


  Rule: User can change the order of the fields

    Background:
      When User adds the following fields to the 'Foreign Word' note type:
        | Field       | Order |
        | Word        | 1     |
        | Translation | 2     |
        | Example     | 3     |

    Scenario: User can change the order of the fields
      When User changes position of 'Example' field of 'Foreign Word' note type to 1
      And Note type 'Foreign Word' has the following fields:
        | Field       | Order |
        | Example     | 1     |
        | Word        | 2     |
        | Translation | 3     |


  Rule: Field name is unique for the note type

    Background:
      When User creates 'Dictionary' note type


    Scenario: Field name is unique only for note type itself
      When User adds 'Word' field to the 'Foreign Word' note type
      And User adds 'Word' field to the 'Dictionary' note type
      Then User sees no error


  Rule: Field name should not contain special characters

    Scenario Outline: Field name should not contain special characters
      When User adds '<Field>' field to the 'Foreign Word' note type
      Then User sees an error '<Error>'

      Examples:
        | Field     | Error                              |
        | field {{  | The name must not contain { or }   |
        | field }}  | The name must not contain { or }   |
        | <newline> | The name must not contain new line |
        | <tab>     | The name must not contain tabs     |
export type SectionTemplate = string

export class CardSection {
  /**
     * Initializes a new instance of the CardSection class using the specified name
     * @param template Template
     */
  constructor(
      public template: SectionTemplate
  ) {
  }
}
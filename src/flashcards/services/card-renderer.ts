import { Card, RenderedCard } from '@src/flashcards/models'

export class CardRenderer {
  render(card: Card) {
    const renderedSections: string[] = []
    for (const section of card.type.sections.all) {
      let template = section.template

      for (const field of card.note.type.fields.all) {
        template = template.replace(
          '{{'+field.name+'}}',
          card.note.getFieldValue(field.name.value)
        )
      }
      renderedSections.push(template)
    }
    return new RenderedCard(renderedSections)
  }
}
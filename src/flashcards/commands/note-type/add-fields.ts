import { NoteField, NoteFieldName, NoteType } from '@src/flashcards/models'
import { FlashcardCommand } from '@src/flashcards/commands/flashcard-command'

export class AddFields extends FlashcardCommand<NoteType> {
  private addedFields: NoteField[] = []

  constructor(
    private readonly noteType: NoteType,
    private readonly fieldNames: NoteFieldName[]
  ) { super() }

  public onExecute(): void {
    for (const fieldName of this.fieldNames) {
      const noteField = new NoteField(fieldName)
      this.noteType.fields.add(noteField)
      this.addedFields.push(noteField)
    }
    this.noteTypeRepository.save(this.noteType)
  }

  public onUndo(): void {
    this.addedFields.forEach(x => this.noteType.fields.remove(x))
    this.noteTypeRepository.save(this.noteType)
  }
}

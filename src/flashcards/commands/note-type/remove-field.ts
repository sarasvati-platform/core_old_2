import { NoteField, NoteFieldName, NoteType } from '@src/flashcards/models'
import { FlashcardCommand } from '@src/flashcards/commands/flashcard-command'

export class RemoveField extends FlashcardCommand<NoteType> {
  private removedField: NoteField

  constructor(
    private readonly noteType: NoteType,
    private readonly fieldName: NoteFieldName
  ) { super() }

  public onExecute(): void {
    const field = this.noteType.fields.getByName(this.fieldName.value)
    this.noteType.fields.remove(field)
    this.removedField = field
    this.noteTypeRepository.save(this.noteType)
  }

  public onUndo(): void {
    this.noteType.fields.add(this.removedField)
  }
}

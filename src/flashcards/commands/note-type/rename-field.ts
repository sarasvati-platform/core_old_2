import { NoteFieldName, NoteType } from '@src/flashcards/models'
import { FlashcardCommand } from '@src/flashcards/commands/flashcard-command'

export class RenameField extends FlashcardCommand<NoteType> {
  constructor(
    private readonly noteType: NoteType,
    private readonly oldFieldName: NoteFieldName,
    private readonly newFieldName: NoteFieldName
  ) { super() }

  public onExecute(): void {
    const field = this.noteType.fields.getByName(this.oldFieldName.value)
    field.rename(this.newFieldName)
    this.noteTypeRepository.save(this.noteType)
  }

  public onUndo(): void {
    const field = this.noteType.fields.getByName(this.newFieldName.value)
    field.rename(this.oldFieldName)
    this.noteTypeRepository.save(this.noteType)
  }
}

import { NoteField, NoteFieldName, NoteType } from '@src/flashcards/models'
import { FlashcardCommand } from '@src/flashcards/commands/flashcard-command'

export class AddField extends FlashcardCommand<NoteType> {
  constructor(
    private readonly noteType: NoteType,
    private readonly fieldName: NoteFieldName
  ) { super() }

  public onExecute(): void {
    const noteField = new NoteField(this.fieldName)
    this.noteType.fields.add(noteField)
    this.noteTypeRepository.save(this.noteType)
  }

  public onUndo(): void {
    const field = this.noteType.fields.getByName(this.fieldName.value)
    this.noteType.fields.remove(field)
    this.noteTypeRepository.save(this.noteType)
  }
}

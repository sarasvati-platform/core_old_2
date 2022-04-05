import { NoteFieldName, NoteType } from '@src/flashcards/models'
import { FlashcardCommand } from '@src/flashcards/commands/flashcard-command'

export class ChangeFieldPosition extends FlashcardCommand<NoteType> {
  private oldPosition: number

  constructor(
    private readonly noteType: NoteType,
    private readonly fieldName: NoteFieldName,
    private readonly position: number
  ) { super() }

  public onExecute(): void {
    const field = this.noteType.fields.getByName(this.fieldName.value)
    this.oldPosition = this.noteType.fields.getPositionOf(field)
    this.noteType.fields.setPositionOf(field).to(this.position)
    this.noteTypeRepository.save(this.noteType)
  }

  public onUndo(): void {
    const field = this.noteType.fields.getByName(this.fieldName.value)
    this.noteType.fields.setPositionOf(field).to(this.oldPosition)
    this.noteTypeRepository.save(this.noteType)
  }
}

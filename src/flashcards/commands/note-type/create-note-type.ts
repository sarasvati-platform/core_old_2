import { Identity } from '@src/core/models'
import { NoteField, NoteType, NoteTypeId, NoteTypeName } from '@src/flashcards/models'
import { FlashcardCommand } from '@src/flashcards/commands/flashcard-command'

export class CreateNoteType extends FlashcardCommand<NoteType> {
  constructor(
    private readonly name: NoteTypeName,
    private readonly fields?: NoteField[],
    private readonly identity?: NoteTypeId
  ) { super() }

  onExecute() {
    this.result = new NoteType(
      this.name,
      this.identity || new Identity() as NoteTypeId
    )
    for (const field of this.fields || []) {
      this.result.fields.add(field)
    }
    this.noteTypeRepository.save(this.result)
  }

  public onUndo(): void {
    if (!this.result) { return }
    this.noteTypeRepository.delete(this.result.identity)
  }
}

import { NoteType, NoteTypeId } from '@src/flashcards/models'
import { FlashcardCommand } from '@src/flashcards/commands/flashcard-command'

export class DeleteNoteType extends FlashcardCommand<NoteType> {
  constructor(
    private readonly noteTypeId: NoteTypeId
  ) { super() }

  onExecute() {
    this.result = this.noteTypeRepository.get(this.noteTypeId)
    this.noteTypeRepository.delete(this.noteTypeId)
  }

  public onUndo(): void {
    if (!this.result) { return }
    this.noteTypeRepository.save(this.result)
  }
}

import { NoteType, NoteTypeName } from '@src/flashcards/models'
import { FlashcardCommand } from '@src/flashcards/commands/flashcard-command'

export class RenameNoteType extends FlashcardCommand<NoteType> {
  private oldName: NoteTypeName

  constructor(
    private readonly noteType: NoteType,
    private readonly newName: NoteTypeName
  ) {
    super()
  }

  onExecute() {
    this.oldName = this.noteType.name
    this.noteType.rename(this.newName)
    this.noteTypeRepository.save(this.noteType)
  }

  onUndo() {
    this.noteType.rename(this.oldName)
    this.noteTypeRepository.save(this.noteType)
  }
}

import { Command, CommandContext } from '@src/core/commands/commands'
import { Identity } from '@src/core/models'
import { NoteType, NoteTypeId, NoteTypeName, NoteField } from '@src/flashcards/models'
import { INoteTypeRepository } from '@src/flashcards/ports/repositories'

export class CreateNoteType extends Command<NoteType> {
  constructor(
    private readonly name: NoteTypeName,
    private readonly fields?: NoteField[],
    private readonly identity?: NoteTypeId
  ) { super() }

  execute(context: CommandContext) {
    const repository = context.get('noteTypeRepository') as INoteTypeRepository
    this.result = new NoteType(
      this.name,
      this.identity || new Identity() as NoteTypeId
    )
    for(const field of this.fields || []) {
      this.result.fields.add(field)
    }
    repository.save(this.result)
  }
}

export class DeleteNoteType extends Command<void> {
  constructor(
    private readonly noteTypeId: NoteTypeId
  ) { super() }

  execute(context: CommandContext) {
    const repository = context.get('noteTypeRepository') as INoteTypeRepository
    repository.delete(this.noteTypeId)
  }
}

export class RenameNoteType extends Command<void> {
  constructor(
    private readonly noteTypeId: NoteTypeId,
    private readonly newName: NoteTypeName
  ) { super() }

  execute(context: CommandContext) {
    const repository = context.get('noteTypeRepository') as INoteTypeRepository
    const noteType = repository.get(this.noteTypeId)
    noteType.rename(this.newName)
    repository.save(noteType)
  }
}

// export class AddFields extends Command<NoteField> {
//   constructor(
//     private readonly noteTypeId: NoteTypeId,
//     private readonly fieldNames: NoteFieldName[],
//   ) { super() }

//   public execute(context: CommandContext): void {
//     const repository = context.get('noteTypeRepository') as INoteTypeRepository
//     const noteType = repository.get(this.noteTypeId)
//     for (const fieldName of this.fieldNames) {
//       noteType.fields.add(new NoteField(fieldName))
//     }
//   }
// }
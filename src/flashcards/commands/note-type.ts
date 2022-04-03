import { Command, CommandContext } from '@src/core/commands/commands'
import { Identity } from '@src/core/models'
import { NoteField, NoteFieldName, NoteType, NoteTypeId, NoteTypeName } from '@src/flashcards/models'
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
  public undo(context: CommandContext): void {
    const repository = context.get('noteTypeRepository') as INoteTypeRepository
    if (this.result) {
      repository.delete(this.result.identity)
    }
  }
}

export class DeleteNoteType extends Command<void> {
  private noteType: NoteType
  constructor(
    private readonly noteTypeId: NoteTypeId
  ) { super() }

  execute(context: CommandContext) {
    const repository = context.get('noteTypeRepository') as INoteTypeRepository
    this.noteType = repository.get(this.noteTypeId)
    repository.delete(this.noteTypeId)
  }
  public undo(context: CommandContext): void {
    const repository = context.get('noteTypeRepository') as INoteTypeRepository
    repository.save(this.noteType)
  }
}

export class RenameNoteType extends Command<void> {
  private oldName: NoteTypeName

  constructor(
    private readonly noteType: NoteType,
    private readonly newName: NoteTypeName
  ) {
    super()
  }

  execute(context: CommandContext) {
    const repository = context.get('noteTypeRepository') as INoteTypeRepository
    this.oldName = this.noteType.name
    this.noteType.rename(this.newName)
    repository.save(this.noteType)
  }

  undo(context: CommandContext) {
    const repository = context.get('noteTypeRepository') as INoteTypeRepository
    this.noteType.rename(this.oldName)
    repository.save(this.noteType)
  }
}

export class AddFields extends Command<NoteField> {
  private addedFields: NoteField[] = []
  constructor(
    private readonly noteType: NoteType,
    private readonly fieldNames: NoteFieldName[],
  ) { super() }

  public execute(context: CommandContext): void {
    const repository = context.get('noteTypeRepository') as INoteTypeRepository
    for (const fieldName of this.fieldNames) {
      const noteField = new NoteField(fieldName)
      this.noteType.fields.add(noteField)
      this.addedFields.push(noteField)
    }
    repository.save(this.noteType)
  }
  public undo(context: CommandContext): void {
    this.addedFields.forEach(x => this.noteType.fields.remove(x))
  }
}

export class RemoveField extends Command<NoteField> {
  private removedField: NoteField
  constructor(
    private readonly noteType: NoteType,
    private readonly fieldName: NoteFieldName,
  ) { super() }

  public execute(context: CommandContext): void {
    const repository = context.get('noteTypeRepository') as INoteTypeRepository
    const field = this.noteType.fields.getByName(this.fieldName.value)
    this.noteType.fields.remove(field)
    this.removedField = field
    repository.save(this.noteType)
  }
  public undo(context: CommandContext): void {
    this.noteType.fields.add(this.removedField)
  }
}


export class RenameField extends Command<NoteField> {
  constructor(
    private readonly noteType: NoteType,
    private readonly oldFieldName: NoteFieldName,
    private readonly newFieldName: NoteFieldName,
  ) { super() }

  public execute(context: CommandContext): void {
    const repository = context.get('noteTypeRepository') as INoteTypeRepository
    const field = this.noteType.fields.getByName(this.oldFieldName.value)
    field.rename(this.newFieldName)
    repository.save(this.noteType)
  }

  public undo(context: CommandContext): void {
    const repository = context.get('noteTypeRepository') as INoteTypeRepository
    const field = this.noteType.fields.getByName(this.newFieldName.value)
    field.rename(this.oldFieldName)
    repository.save(this.noteType)
  }
}

export class ChangeFieldPosition extends Command<NoteField> {
  private oldPosition: number

  constructor(
    private readonly noteType: NoteType,
    private readonly fieldName: NoteFieldName,
    private readonly position: number,
  ) { super() }

  public execute(context: CommandContext): void {
    const repository = context.get('noteTypeRepository') as INoteTypeRepository
    const field = this.noteType.fields.getByName(this.fieldName.value)
    this.oldPosition = this.noteType.fields.getPositionOf(field)
    this.noteType.fields.setPositionOf(field).to(this.position)
    repository.save(this.noteType)
  }
  public undo(context: CommandContext): void {
    const repository = context.get('noteTypeRepository') as INoteTypeRepository
    const field = this.noteType.fields.getByName(this.fieldName.value)
    this.noteType.fields.setPositionOf(field).to(this.oldPosition)
    repository.save(this.noteType)
  }
}
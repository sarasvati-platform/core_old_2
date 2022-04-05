import { Command, CommandContext } from '@src/core/commands/commands'
import { Identity } from '@src/core/models'
import { NoteField, NoteFieldName, NoteType, NoteTypeId, NoteTypeName } from '@src/flashcards/models'
import { INoteTypeRepository } from '@src/flashcards/ports/repositories'

export abstract class FlashcardCommand<T> extends Command<T> {
  protected noteTypeRepository: INoteTypeRepository

  public execute(context: CommandContext): void {
    this.noteTypeRepository = context.get('noteTypeRepository') as INoteTypeRepository
    this.onExecute()
  }

  public undo(context: CommandContext): void {
    this.noteTypeRepository = context.get('noteTypeRepository') as INoteTypeRepository
    this.onUndo()
  }

  protected abstract onExecute(): void
  protected abstract onUndo(): void
}


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
    for(const field of this.fields || []) {
      this.result.fields.add(field)
    }
    this.noteTypeRepository.save(this.result)
  }

  public onUndo(): void {
    if (!this.result) { return }
    this.noteTypeRepository.delete(this.result.identity)
  }
}

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

export class AddFields extends FlashcardCommand<NoteType> {
  private addedFields: NoteField[] = []

  constructor(
    private readonly noteType: NoteType,
    private readonly fieldNames: NoteFieldName[],
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

export class RemoveField extends FlashcardCommand<NoteType> {
  private removedField: NoteField

  constructor(
    private readonly noteType: NoteType,
    private readonly fieldName: NoteFieldName,
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


export class RenameField extends FlashcardCommand<NoteType> {
  constructor(
    private readonly noteType: NoteType,
    private readonly oldFieldName: NoteFieldName,
    private readonly newFieldName: NoteFieldName,
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

export class ChangeFieldPosition extends FlashcardCommand<NoteType> {
  private oldPosition: number

  constructor(
    private readonly noteType: NoteType,
    private readonly fieldName: NoteFieldName,
    private readonly position: number,
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
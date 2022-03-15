import { Entity, Identity } from '@src/core/models'
import { Name, NoteField, CardType } from '@src/flashcards/models'
import { OrderedMap, KeyComparers } from '@src/core/utils/collections'

/** Identity for [note type]{@link NoteType} */
export type NoteTypeId = Identity & {'type': 'NoteType'}

/** Note type name */
export class NoteTypeName extends Name {}

interface IHasName { get name(): Name }

class NamedCollection<TItem extends IHasName> {
  private items: OrderedMap<string, TItem> = new OrderedMap<string, TItem>(KeyComparers.LocaleCaseInsensitive)

  public get all(): readonly TItem[] {
    return this.items.values
  }

  public add(item: TItem) {
    this.items.add(item.name.value, item)
  }

  public remove(item: TItem) {
    this.items.remove(item.name.value)
  }

  public findByName(name: string): TItem | undefined {
    return this.items.find(name)
  }
}

/**
 * Each type of note has its own set of [fields]{@link NoteField} and
 * [card types]{@link CardType}.
 * */
export class NoteType extends Entity<NoteTypeId> {
  protected _name: NoteTypeName
  protected _fields = new NamedCollection<NoteField>()
  protected _cardTypes = new NamedCollection<CardType>()

  /**
   * Creates a new instance of the NoteType class
   * @param name Name of the note type
   * @param identity Identity of the note type. Optional.
   */
  constructor(
    name: NoteTypeName,
    identity: NoteTypeId = new Identity() as NoteTypeId,
  ) {
    super(identity)
    this._name = name
  }

  /**
   * Returns the name of the note type
   */
  get name(): NoteTypeName {
    return this._name
  }

  /**
   * Renames note type
   * @param name New name of the note type
   */
  rename(name: NoteTypeName) {
    this._name = name
  }

  /**
   * Returns the fields of the note type
   * @returns Fields of the note type
   */
  get fields(): NamedCollection<NoteField> {
    return this._fields
  }

  /**
   * Returns the card types of the note type
   * @returns Card types of the note type
   */
  get cardTypes(): NamedCollection<CardType> {
    return this._cardTypes
  }
}

import { Entity, Identity, Event } from '@src/core/models'
import { Name, NoteField, CardType } from '@src/flashcards/models'
import { NamedCollection } from '../named-collection'

/** Identity for [note type]{@link NoteType} */
export type NoteTypeId = Identity & {'type': 'NoteType'}

/** Note type name */
export class NoteTypeName extends Name {}

/**
 * Each type of note has its own set of [fields]{@link NoteField} and
 * [card types]{@link CardType}.
 * */
export class NoteType extends Entity<NoteTypeId> {
  protected _name: NoteTypeName
  protected _fields = new NamedCollection<NoteField>()
  protected _cardTypes = new NamedCollection<CardType>()
  private _renamed = new Event<NoteTypeName>()

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

  /* -------------------------------------------------------------------------- */
  /*                                   Events                                   */
  /* -------------------------------------------------------------------------- */

  get renamed(): Event<NoteTypeName> { return this._renamed }

  /* -------------------------------------------------------------------------- */
  /*                                 Properties                                 */
  /* -------------------------------------------------------------------------- */

  /**
   * Returns the name of the note type
   */
  get name(): NoteTypeName {
    return this._name
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

  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  /**
   * Renames note type
   * @param name New name of the note type
   */
  rename(name: NoteTypeName) {
    this._name = name
    this._renamed.notify(name)
  }
}

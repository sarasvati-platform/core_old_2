export interface IService {}

export class CommandContext {
  private _services: Map<string, IService> = new Map()

  register(name: string, value: IService) {
    if (this._services.has(name)) {
      throw new Error(`Service with type ${name} already registered`)
    }
    this._services.set(name, value)
  }

  get(name: string) : any {
    if (!this._services.has(name)) {
      throw new Error(`Service with type ${name} not found`)
    }
    return this._services.get(name)
  }

  execute<T>(command: Command<T>): T {
    command.execute(this)
    return command.result as T
  }
}

export interface ICommand<T> {
  result: T | undefined
  execute(context: CommandContext): void
}

export abstract class Command<T> {
  public result: T | undefined
  public abstract execute(context: CommandContext): void
}
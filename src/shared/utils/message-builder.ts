export class MessageBuilder {
  constructor (private readonly context: string) {}

  missingParam (param: string, prefix?: string): string {
    return `${prefix ?? this.context} must have ${param}!`
  }

  notFound (prefix?: string): string {
    return `${prefix ?? this.context} not found`
  }

  internalServerError (): string {
    return 'Internal Server Error'
  }
}

import { MessageBuilder } from '@/shared/utils'

describe('MessageBuilder', () => {
  test('missingParam sem prefixo', () => {
    const builder = new MessageBuilder('Context')
    const result = builder.missingParam('parametro')
    expect(result).toBe('Context must have parametro!')
  })

  test('missingParam com prefixo', () => {
    const builder = new MessageBuilder('Context')
    const result = builder.missingParam('parametro', 'Prefixo')
    expect(result).toBe('Prefixo must have parametro!')
  })

  test('notFound sem prefixo', () => {
    const builder = new MessageBuilder('Context')
    const result = builder.notFound()
    expect(result).toBe('Context not found')
  })

  test('notFound com prefixo', () => {
    const builder = new MessageBuilder('Context')
    const result = builder.notFound('Prefixo')
    expect(result).toBe('Prefixo not found')
  })

  test('internalServerError', () => {
    const builder = new MessageBuilder('Context')
    const result = builder.internalServerError()
    expect(result).toBe('Internal Server Error')
  })
})

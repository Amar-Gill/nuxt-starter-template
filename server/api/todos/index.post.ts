import { db, schema } from 'hub:db'
import { addTodoSchema } from '#shared/schemas/todo'

export default eventHandler(async (event) => {
  const result = await readValidatedBody(event, body => addTodoSchema.safeParse(body))

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation Error',
      data: result.error.issues
    })
  }

  return db
    .insert(schema.todos)
    .values({ description: result.data.description })
    .returning()
    .get()
})

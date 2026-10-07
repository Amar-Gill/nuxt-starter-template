import { db, schema } from 'hub:db'
import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  console.log({ body })

  return db
    .update(schema.todos)
    .set({ completed: body.completed, updatedAt: new Date() })
    .where(eq(schema.todos.id, id))
    .returning()
    .get()
})

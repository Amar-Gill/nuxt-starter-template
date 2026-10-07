import { db, schema } from 'hub:db'

export default eventHandler(async (event) => {
  const body = await readBody(event)

  return db
    .insert(schema.todos)
    .values({ description: body.description })
    .returning()
    .get()
})

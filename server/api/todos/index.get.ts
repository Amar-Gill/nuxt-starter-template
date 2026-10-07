import { db, schema } from 'hub:db'
import { desc } from 'drizzle-orm'

export default eventHandler(async () => {
  return db.select().from(schema.todos).orderBy(desc(schema.todos.createdAt))
})

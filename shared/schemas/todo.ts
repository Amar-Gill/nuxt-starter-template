import * as z from 'zod'

export const addTodoSchema = z.object({
  description: z
    .string('Description is required')
    .trim()
    .min(1, 'Description is required')
    .max(255, 'Description must be 255 characters or less')
})

export type AddTodoPayload = z.output<typeof addTodoSchema>

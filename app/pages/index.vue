<script setup lang="ts">
import type { SelectTodo } from 'hub:db:schema'
import type { FormSubmitEvent } from '@nuxt/ui'
import { addTodoSchema, type AddTodoPayload } from '#shared/schemas/todo'

const { data: todos, error, status, refresh } = useFetch('/api/todos')

const updateTodo = async (todo: SelectTodo) => {
  const result = await $fetch(`/api/todos/${todo.id}`, {
    method: 'post',
    body: { completed: !todo.completed }
  })

  if (result) {
    todos.value
      = todos.value?.map(t => (t.id === result.id ? result : t)) ?? [] // reset array because fetched todos are a shallow ref by default
  }
}

const state = reactive({
  description: ''
})

const addTodo = async (event: FormSubmitEvent<AddTodoPayload>) => {
  const result = await $fetch('/api/todos', {
    method: 'post',
    body: event.data
  })

  if (result) {
    state.description = ''
    await refresh()
  }
}
</script>

<template>
  <UContainer class="space-y-4 pt-4">
    <UCard title="Add Todo">
      <UForm
        :schema="addTodoSchema"
        :state="state"
        @submit="addTodo"
      >
        <UFormField
          label="Desription"
          name="description"
        >
          <UInput v-model="state.description" />
        </UFormField>
        <UButton type="submit">
          Submit
        </UButton>
      </UForm>
    </UCard>

    <template v-if="status === 'pending'">
      <p>Loading todos...</p>
    </template>

    <template v-else-if="error">
      <p>Error fetching todos</p>
    </template>

    <template v-else>
      <ul class="space-y-4">
        <li
          v-for="todo in todos"
          :key="todo.id"
        >
          <UCard>
            <div class="flex justify-between">
              <p :class="todo.completed && 'line-through'">
                {{ todo.description }}
              </p>
              <UButton
                loading-auto
                :color="todo.completed ? 'secondary' : 'success'"
                @click="() => updateTodo(todo)"
              >
                {{ todo.completed ? "Undo" : "Complete" }}
              </UButton>
            </div>
          </UCard>
        </li>
      </ul>
    </template>
  </UContainer>
</template>

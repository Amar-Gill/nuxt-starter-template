<script setup lang="ts">
import type { SelectTodo } from 'hub:db:schema'

const { data: todos, error, status } = useFetch('/api/todos')

const updateTodo = async (todo: SelectTodo) => {
  const result = await $fetch(`/api/todos/${todo.id}`, {
    method: 'post',
    body: { completed: !todo.completed }
  })

  if (result) {
    todos.value
      = todos.value?.map(t => (t.id === result.id ? result : t)) ?? []
  }
}
</script>

<template>
  <UContainer>
    <template v-if="status === 'pending'">
      <p>Loading todos...</p>
    </template>
    <template v-else-if="error">
      <p>Error fetching todos</p>
    </template>
    <template v-else>
      <p>todos</p>
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

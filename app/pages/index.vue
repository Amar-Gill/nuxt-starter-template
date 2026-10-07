<script setup lang="ts">
const { data: todos, error, status } = useFetch('/api/todos')
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
              <UButton :color="todo.completed ? 'secondary' : 'success'">
                {{ todo.completed ? "Undo" : "Complete" }}
              </UButton>
            </div>
          </UCard>
        </li>
      </ul>
    </template>
  </UContainer>
</template>

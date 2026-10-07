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
      <ul>
        <li
          v-for="todo in todos"
          :key="todo.id"
        >
          {{ todo.description }}
        </li>
      </ul>
    </template>
  </UContainer>
</template>

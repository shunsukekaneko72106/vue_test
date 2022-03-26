<script setup lang="ts">
import PersonPostForm from "./PersonPostForm.vue";
</script>

<template>
  <div class="container">
    <h1>title</h1>
    <PersonPostForm />
    <div class="list-container">
      <ul>
        <PersonList />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

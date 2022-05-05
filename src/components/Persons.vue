<script setup lang="ts">
import { ref, Ref } from "vue";
import PersonPostForm from "./PersonPostForm.vue";
import PersonList from "./PersonList.vue";

//typeで型に名前をつける
export type Person = {
  id: number;
  name: string;
  age: number;
};

const persons: Ref<Person[]> = ref([
  { id: 0, name: "john", age: 24 },
  { id: 1, name: "john", age: 23 },
]);
</script>

<template>
  <div class="container">
    <h1>title</h1>
    <PersonPostForm />
    <div class="list-container">
      <ul>
        <PersonList :persons="persons" />
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

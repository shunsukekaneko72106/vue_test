<script setup lang="ts">
import { Person } from "./Persons.vue";

type Props = {
  persons: Person[];
};

defineProps<Props>();

const emit = defineEmits(["delete"]);
const onclickDelete = (id: number) => {
  if (confirm("本当に実行してもよろしいでしょうか？")) {
    emit("delete", id);
  }
};
</script>

<template>
  <li v-for="person in persons" :key="person.id" class="person-list">
    <span>{{ person.name }}</span>
    <span>{{ person.age }}</span>
    <button @click="onclickDelete(person.id)"><span>delete</span></button>
  </li>
</template>

<style scoped>
.person-list {
  list-style: none;
  margin-bottom: 12px;
  border-radius: 4px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  background-color: bisque;
  padding: 8px 20px;
  width: 300px;
}
</style>

<script setup lang="ts">
import { computed, ref } from "vue";

const inputtinfName = ref<string>("");
const inputtingAge = ref<number>(0);

//親コンポーネントに渡すにはdefineEmitsで宣言する
const emit = defineEmits(["register"]);

const register = () => {
  const person = {
    id: Math.random(),
    name: inputtinfName.value,
    age: inputtingAge.value,
  };
  console.log(person);
  emit("register", person);
};

const nameLengthLimit = 15;

const isValidName = computed(() => {
  if (inputtinfName.value.length >= nameLengthLimit) {
    return false;
  } else {
    return true;
  }
});

const color = computed(() => {
  return isValidName.value ? "blue" : "red";
});
</script>

<template>
  <div class="form-container">
    <div class="input-container">
      <div class="input-column">
        <span>name:</span>
        <input class="input-name" v-model="inputtinfName" />
      </div>
      <span class="error-message" v-if="!isValidName"
        >{{ nameLengthLimit }}文字以上は不可です</span
      >
      <div class="input-column">
        <span>age:</span>
        <input class="input" v-model="inputtingAge" type="number" />
      </div>
    </div>
    <button :disabled="!isValidName" @click="register" class="register-button">
      register
    </button>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: antiquewhite;
  padding: 24px 0;
  width: 50%;
  margin-bottom: 12px;
  border-radius: 4px;
}

.input-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50px;
  margin-bottom: 20px;
}

.input-column {
  width: 200px;
  display: flex;
  justify-content: space-between;
}

.input-name {
  background-color: v-bind(color);
}

input {
  width: 120px;
  margin-bottom: 8px;
}
span {
  font-size: 20px;
  font-weight: bold;
}
.error-message {
  font-size: 12px;
  color: rgb(243, 2, 2);
}
</style>

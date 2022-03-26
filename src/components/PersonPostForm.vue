<script setup lang="ts"></script>

<template>
  <div class="form-container">
    <div class="input-container">
      <div>
        <span>name:</span>
        <input class="input" />
      </div>
      <div>
        <span>age:</span>
        <input class="input" />
      </div>
    </div>
    <button class="register-button">register</button>
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
span {
  font-size: 20px;
  font-weight: bold;
}
.input-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50px;
  margin-bottom: 20px;
}
</style>

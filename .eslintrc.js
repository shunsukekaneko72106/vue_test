module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    //変数の宣言後エラーが出るため、追加
    // "@typescript-eslint/no-unused-vars": "off",
  },
  globals: {
    "defineProps": "readonly",
    "defineEmits": "readonly",
    "defineExpose": "readonly",
    "withDefaults": "readonly"
  }
};

<script setup lang="ts">
//アイテムの名前
const itemName1 = "Bike";
const itemName2 = "Desk";
//値段
const price1 = 40000;
const price2 = 20000;
//商品URL
/**
 * v-bind
 * href属性に直接文字列を入れることができない
 */
const url1 =
  "https://www.amazon.co.jp/%E6%AD%A6%E7%94%B0%E3%82%B3%E3%83%BC%E3%83%9D%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3-%E3%80%90%E3%83%94%E3%82%B6%E3%83%BB%E7%AA%AF%E3%83%BB%E3%82%AA%E3%83%BC%E3%83%96%E3%83%B3%E3%83%BB%E6%9A%96%E7%82%89%E3%83%BB%E3%83%90%E3%83%BC%E3%83%99%E3%82%AD%E3%83%A5%E3%83%BC%E3%80%91-%E3%83%A1%E3%82%AD%E3%82%B7%E3%82%B3%E8%A3%BD-%E3%83%81%E3%83%A0%E3%83%8B%E3%83%BC-MCH060/dp/B00Y012GEI/?_encoding=UTF8&pd_rd_w=Y9r3r&pf_rd_p=9b1525c2-a61e-4d68-ab17-d93f310e1f50&pf_rd_r=ZX8B6SRMJFG15EAAKJR0&pd_rd_r=a0ab79dd-3e13-43bd-9ed5-4fcea65cb660&pd_rd_wg=QQb7y&ref_=pd_gw_ci_mcx_mi&th=1";
</script>

<template>
  <div class="contener">
    <h1>最近の支出</h1>
    <div class="payment">
      <label>{{ itemName1 }}</label>
      <label>{{ price1 }}</label>
      <a v-bind:href="url1">bought at...</a>
    </div>
    <div class="payment">
      <label>{{ itemName2 }}</label>
      <label>{{ price2 }}</label>
    </div>
  </div>
</template>

<style scoped>
.contener {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.payment {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  width: 400px;
  background-color: rgb(215, 231, 250);
}
label {
  font-size: 20px;
  font-weight: bold;
}
</style>

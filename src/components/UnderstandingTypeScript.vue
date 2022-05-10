<script setup lang="ts">
//プロジェクトクラス
class ProjectInput {
  templeteElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  constructor() {
    console.log("hogehoge");
    //テンプレートへの参照
    this.templeteElement = document.getElementById(
      "projectinput"
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById("appunder") as HTMLDivElement;
    const importedNode = document.importNode(this.templeteElement, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";
    this.attch();
  }
  private attch() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

window.addEventListener("load", function () {
  /* eslint-disable */
  const prjInput = new ProjectInput();
});
</script>

<template>
  <div>
    <div id="projectinput">
      <form>
        <div class="form-control">
          <label for="title">タイトル</label>
          <input type="text" id="title" />
        </div>
        <div class="form-control">
          <label for="description">説明</label>
          <textarea id="description" rows="3"></textarea>
        </div>
        <div class="form-control">
          <label for="manday">人日</label>
          <input type="number" id="manday" step="1" min="0" max="10000" />
        </div>
        <button type="submit">プロジェクト追加</button>
      </form>
    </div>
    <div id="single-project">
      <li></li>
    </div>
    <div id="project-list">
      <section class="projects">
        <header>
          <h2></h2>
        </header>
        <ul></ul>
      </section>
    </div>
    <h1>ここからがTypeScriptで複製したもの</h1>
    <div id="appunder"></div>
  </div>
</template>

<style scoped></style>

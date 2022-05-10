<script setup lang="ts">
/**
 * デコレーター
 */
function autobind(
  _target: any, //ターゲット
  _methodName: string, //プロパティ名
  descriptor: PropertyDescriptor //プロパティディスクリプター
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

//プロジェクトクラス
class ProjectInput {
  //thisの型設定
  templeteElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElemtnt: HTMLInputElement;
  setumeiInputElemtnt: HTMLInputElement;
  dateInputElemtnt: HTMLInputElement;

  //コンストラクター（クラスが呼ばれた場合に実行する）
  constructor() {
    //テンプレートへの参照
    this.templeteElement = document.getElementById(
      "projectinput"
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById("appunder") as HTMLDivElement;
    const importedNode = document.importNode(this.templeteElement, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    //CSSにIDを付与するため
    this.element.id = "user-input";
    //inputタグを参照
    this.titleInputElemtnt = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.setumeiInputElemtnt = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.dateInputElemtnt = this.element.querySelector(
      "#manday"
    ) as HTMLInputElement;

    this.configure();
    this.attch();
  }
  /**
   * inputの値を取得する
   * 戻り値は「タプル」か「なし」かを指定する
   */
  private getUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElemtnt.value;
    const enteredSetumei = this.setumeiInputElemtnt.value;
    const enteredDate = this.dateInputElemtnt.value;

    if (
      enteredTitle.trim().length === 0 ||
      enteredSetumei.trim().length === 0 ||
      enteredDate.trim().length === 0
    ) {
      alert("入力値がただしくありません");
    } else {
      return [enteredTitle, enteredSetumei, +enteredDate];
    }
  }

  /**
   * submitHandler
   * @param event
   */
  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.getUserInput();
    //配列かどうかを判定しないとエラーが出る（反復子プロトコルは、値の並び（有限でも無限でも）を生成）
    if (Array.isArray(userInput)) {
      const [title, setumei, date] = userInput;
      console.log(title, setumei, date);
    }
  }

  /**
   * 送信ボタンの処理
   */
  private configure(): void {
    //submitが呼ばれるたびにthis.submitHandlerを呼ぶ
    this.element.addEventListener("submit", this.submitHandler);
  }
  /**
   * 最後のDiv要素に値を追加する
   */
  private attch(): void {
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

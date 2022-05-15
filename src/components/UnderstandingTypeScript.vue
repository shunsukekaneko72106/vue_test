<script setup lang="ts">
/**
 * プロジェクトの状態
 */
enum ProjectStatus {
  Active,
  Finished,
}

/**
 * プロジェクトクラス
 */
class Project {
  constructor(
    public id: string,
    public title: string,
    public setumei: string,
    public date: number,
    public status: ProjectStatus
  ) {}
}

type Listener = (items: Project[]) => void;
/**
 * プロジェクトの状態管理を行うクラス
 */
class ProjectState {
  private listeners: Listener[] = [];
  private projects: Project[] = [];
  private static instance: ProjectState;

  // private constructor() {}

  //状態管理を行う関数は必ず一つだけ
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, setumei: string, date: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      setumei,
      date,
      ProjectStatus.Active
    );

    this.projects.push(newProject);
    for (const listenersFn of this.listeners) {
      listenersFn(this.projects.slice());
    }
  }
}

const projectState = ProjectState.getInstance();
/**
 * バリデーション型
 */
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}
/**
 * バリデーション関数
 * @param validatableInput
 */
function validate(validatableInput: Validatable) {
  //チェック結果を格納する
  let isValid = true;

  //必修チェック
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  //最小文字数チェック
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  //最大文字数チェック
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
  }
  //最小文字数チェック
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  //最小文字数チェック
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
}
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
//コンポーネントクラス
abstract class component<T extends HTMLElement, U extends HTMLElement> {
  templeteElement: HTMLTemplateElement;
  hostElement: T;
  element: U;
  constructor(
    templatedId: string,
    hostElementId: string,
    insertStart: boolean,
    newElementId?: string //任意のパラメータは最後に定義する
  ) {
    //テンプレートへの参照
    this.templeteElement = document.getElementById(
      templatedId
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId) as T;
    const importedNode = document.importNode(this.templeteElement, true);
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }
    this.attch(insertStart);
  }

  abstract configure(): void;
  abstract renderContent(): void;
  /**
   * 最後のDiv要素に値を追加する
   */
  private attch(insertAtBininng: boolean): void {
    this.hostElement.insertAdjacentElement(
      insertAtBininng ? "afterbegin" : "beforeend",
      this.element
    );
  }
}

//プロジェクトリストクラス
class ProjectList {
  templeteElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assinedProject: Project[];
  //
  constructor(private type: "active" | "finied") {
    //テンプレートへの参照
    this.templeteElement = document.getElementById(
      "project-list"
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById("appunder") as HTMLDivElement;
    this.assinedProject = [];
    const importedNode = document.importNode(this.templeteElement, true);
    this.element = importedNode.firstElementChild as HTMLElement;
    //CSSにIDを付与するため
    this.element.id = `${this.type}-projects`;

    projectState.addListener((projects: Project[]) => {
      const releventProjects = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assinedProject = releventProjects;
      this.renderProjects();
    });
    this.attch();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects`
    ) as HTMLUListElement;
    listEl.innerHTML = "";
    for (const prjItem of this.assinedProject) {
      const listItem = document.createElement("li");
      listItem.textContent = prjItem.title;
      listEl.appendChild(listItem);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    /* eslint-disable */
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type === "active" ? "実行中プロジェクト" : "完了プロジェクト";
  }
  /**
   * 最後のDiv要素に値を追加する
   */
  private attch(): void {
    this.hostElement.insertAdjacentElement("beforebegin", this.element);
  }
}

//プロジェクトインプットクラス
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
   * ユーザー入力を取得する
   */
  private getUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElemtnt.value;
    const enteredSetumei = this.setumeiInputElemtnt.value;
    const enteredDate = this.dateInputElemtnt.value;

    const titleValitable: Validatable = {
      value: enteredTitle,
      required: true,
      minLength: 5,
    };
    const setumeiValitable: Validatable = {
      value: enteredSetumei,
      required: true,
    };
    const dateValitable: Validatable = {
      value: +enteredDate, //数字変換
      min: 1,
      max: 100,
    };

    if (
      //バリデーション
      !validate(titleValitable) ||
      !validate(setumeiValitable) ||
      !validate(dateValitable)
    ) {
      alert("入力値がただしくありません");
    } else {
      return [enteredTitle, enteredSetumei, +enteredDate];
    }
  }

  /**
   * 送信ボタンを送信後、値を削除する
   */
  private clearInput(): void {
    this.titleInputElemtnt.value = "";
    this.setumeiInputElemtnt.value = "";
    this.dateInputElemtnt.value = "";
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
      projectState.addProject(title, setumei, date);
      this.clearInput();
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
  const actProList = new ProjectList("active");
  const finishiedPrj = new ProjectList("finied");
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

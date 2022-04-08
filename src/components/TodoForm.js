import { $ } from "../utils/dom.js";
export default function TodoForm({ $target, onSubmit }) {
  if (!new.target) {
    throw "TodoForm() must be called with new";
  }
  this.template = () => {
    return `
    <input id="todoInput"></input>
    <button id="addBtn">추가</button>
    `;
  };

  this.render = () => {
    $target.innerHTML = this.template();
    this.mounted();
  };
  this.mounted = () => {
    $("#todoInput").focus();
  };
  this.setEvent = () => {
    $("#addBtn").addEventListener("click", () => {
      const content = $("#todoInput").value;
      onSubmit(content);
      $("#todoInput").value = "";
      $("#todoInput").focus();
    });

    $("#todoInput").addEventListener("keyup", ({ key }) => {
      if (key !== "Enter") return;
      const content = $("#todoInput").value;
      onSubmit(content);
      $("#todoInput").value = "";
    });
  };

  this.render();
  this.setEvent();
}

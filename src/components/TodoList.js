export default function TodoList({
  $target,
  todos,
  onToggleCompleted,
  onDelete,
}) {
  if (!new.target) {
    throw "TodoList() must be called with new";
  }

  this.template = () => {
    return `
    <ul>
      ${todos
        .map(
          (todo) => `
          <li data-id=${todo.id}>
            ${
              todo.isCompleted
                ? `<span style="text-decoration: line-through">${todo.content}</span>`
                : `<span> ${todo.content}</span>`
            }
            <button id='deleteBtn'>삭제</button>
          </li>`
        )
        .join("")}
    </ul>
    `;
  };
  this.setEvent = () => {
    $target.addEventListener("click", (e) => {
      if (!e.target.closest("li") || e.target.closest("button")) {
        return;
      }
      const id = e.target.closest("li").dataset.id;
      onToggleCompleted(Number(id));
    });

    $target.addEventListener("click", (e) => {
      if (!e.target.closest("button")) {
        return;
      }
      const id = e.target.closest("li").dataset.id;
      onDelete(Number(id));
    });
  };
  this.render = () => {
    $target.innerHTML = this.template();
  };

  this.render();
  this.setEvent();
}

import Header from "./components/Header.js";
import TodoForm from "./components/TodoForm.js";
import TodoList from "./components/TodoList.js";
import TodoCount from "./components/TodoCount.js";
import { getItem, setItem } from "./utils/storage.js";
import { $ } from "./utils/dom.js";

export default function App({ $target }) {
  if (!new.target) {
    throw "App() must be called with new";
  }

  this.state = {
    todos: [],
  };
  this.setState = (nextState) => {
    if (typeof this.state !== typeof nextState) {
      return;
    }
    this.state = { ...this.state, ...nextState };
    console.log("state변경: ", this.state);

    setItem("todos", JSON.stringify(this.state.todos));
    this.render();
  };

  this.init = () => {
    const defaltValue = [
      { id: 1, content: "fetch강의완강하기", isCompleted: false },
      { id: 2, content: "vanillaJS 과제제출", isCompleted: true },
    ];
    const storedTodos = getItem("todos", defaltValue);
    this.setState({ todos: storedTodos });
  };
  this.template = () => {
    return `
    <header data-component="header"></header>
    <main>
      <div data-component="todo-form"></div>
      <div data-component="todo-list"><div>
    </main>
    <footer data-component="todo-count"></footer>
    `;
  };

  this.render = () => {
    $target.innerHTML = this.template();
    this.mounted();
  };

  this.mounted = () => {
    const { todos } = this.state;

    new Header({
      $target: $('[data-component="header"]'),
      text: "Outwater's TodoList",
    });
    new TodoForm({
      $target: $('[data-component="todo-form"]'),
      onSubmit: (content) => {
        if (content.length < 1) return;

        const id = Math.max(...todos.map((todo) => todo.id), 0) + 1;
        this.setState({
          todos: [...todos, { id, content, isCompleted: false }],
        });
      },
    });
    new TodoList({
      $target: $('[data-component="todo-list"]'),
      todos,
      onToggleCompleted: (id) => {
        const newTodos = [...todos];
        const toggledItem = newTodos.find((todo) => todo.id === id);
        toggledItem.isCompleted = !toggledItem.isCompleted;

        this.setState({ todos: newTodos });
      },
      onDelete: (id) => {
        const newTodos = [...todos];
        const index = newTodos.findIndex((todo) => todo.id === id);
        newTodos.splice(index, 1);

        this.setState({ todos: newTodos });
      },
    });
    new TodoCount({
      $target: $('[data-component="todo-count"]'),
      completedCount: todos.filter((todo) => todo.isCompleted).length,
      totalCount: todos.length,
    });
  };

  this.init();
  this.render();
}

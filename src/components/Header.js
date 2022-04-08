export default function Header({ $target, text }) {
  if (!new.target) {
    throw "Header() must be called with new";
  }
  this.template = () => {
    return `
    <h1>${text}</h1>
    `;
  };
  this.render = () => {
    $target.innerHTML = this.template();
  };
  this.render();
}

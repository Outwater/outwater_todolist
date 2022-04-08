export default function TodoCount({ $target, completedCount, totalCount }) {
  if (!new.target) {
    throw "TodoCount() must be called with new";
  }
  this.template = () => {
    return `
    <span>${completedCount} / ${totalCount}</span>
    `;
  };
  this.render = () => {
    $target.innerHTML = this.template();
  };

  this.render();
}

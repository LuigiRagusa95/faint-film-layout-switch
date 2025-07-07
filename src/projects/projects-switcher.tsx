export function ProjectsSwitcher() {
  return (
    <div className="switcher">
      <button className="switcher__button switcher__button--grid is-active">
        <span>Grid</span>
      </button>
      <button className="switcher__button switcher__button--slider">
        <span>Slider</span>
      </button>
      <div className="switcher__indicator" />
    </div>
  );
}

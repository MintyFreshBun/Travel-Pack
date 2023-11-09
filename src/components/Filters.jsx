function Filters({ onFilter }) {
  return (
    <div className="flex justify-center gap-3">
      <button
        type="button"
        className="btn-primary"
        aria-pressed="true"
        onClick={() => onFilter("input")}
      >
        <span className="visually-hidden">Show Items</span>
      </button>
      <button
        type="button"
        className="btn-primary"
        aria-pressed="false"
        onClick={() => onFilter("description")}
      >
        <span className="visually-hidden">Show Unpacked Items</span>
      </button>
      <button
        type="button"
        className="btn-primary"
        aria-pressed="false"
        onClick={() => onFilter("packed")}
      >
        <span className="visually-hidden">Show Packed Items</span>
      </button>
    </div>
  );
}
export default Filters;

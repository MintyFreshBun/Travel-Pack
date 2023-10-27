function Filters(params) {
  return (
    <div className="flex justify-center gap-3">
      <button type="button" className="btn-primary" aria-pressed="true">
        <span className="visually-hidden">Show </span>
        <span>all</span>
        <span className="visually-hidden"> tasks</span>
      </button>
      <button type="button" className="btn-primary" aria-pressed="false">
        <span className="visually-hidden">Show </span>
        <span>Active</span>
        <span className="visually-hidden"> tasks</span>
      </button>
      <button type="button" className="btn-primary" aria-pressed="false">
        <span className="visually-hidden">Show </span>
        <span>Completed</span>
        <span className="visually-hidden"> tasks</span>
      </button>
    </div>
  );
}
export default Filters;

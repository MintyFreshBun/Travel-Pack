function Filters(params) {
  return (
    <div className="flex justify-center gap-3">
      <button type="button" className="btn-primary" aria-pressed="true">
        <span className="visually-hidden">Show Items</span>
      </button>
      <button type="button" className="btn-primary" aria-pressed="false">
        <span className="visually-hidden">Show Unpacked Items</span>
      </button>
      <button type="button" className="btn-primary" aria-pressed="false">
        <span className="visually-hidden">Show Packed Items</span>
      </button>
    </div>
  );
}
export default Filters;

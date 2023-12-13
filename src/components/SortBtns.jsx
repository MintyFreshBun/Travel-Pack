function SortBtns({ onSortItems }) {
  return (
    <div className="flex justify-center gap-3">
      <button
        type="button"
        className="btn-primary"
        aria-pressed="true"
        onClick={() => {
          onSortItems("input");
        }}
      >
        <span className="visually-hidden">Input</span>
      </button>

      <button
        type="button"
        className="btn-primary"
        aria-pressed="false"
        onClick={() => {
          onSortItems("description");
        }}
      >
        <span className="visually-hidden">Descriptions</span>
      </button>
      <button
        type="button"
        className="btn-primary"
        aria-pressed="false"
        onClick={() => {
          onSortItems("packed");
        }}
      >
        <span className="visually-hidden">Status</span>
      </button>
    </div>
  );
}
export default SortBtns;

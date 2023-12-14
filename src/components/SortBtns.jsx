//import { useState } from "react";

function SortBtns({ items, onSortItems }) {
  //const [sortBy, setSortBy] = useState("input");

  function sortItems(sortParam) {
    let sortedItems;

    if (sortParam === "input")
      sortedItems = items.slice().sort((a, b) => Number(a.id) - Number(b.id));
    if (sortParam === "description")
      sortedItems = items
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));
    if (sortParam === "packed")
      sortedItems = items
        .slice()
        .sort((a, b) => Number(a.packed) - Number(b.packed));

    onSortItems(sortedItems);
  }

  return (
    <div className="flex justify-center gap-3 mb-2">
      <button
        type="button"
        className="btn-primary"
        aria-pressed="true"
        onClick={() => {
          sortItems("input");
        }}
      >
        <span className="visually-hidden">Input</span>
      </button>

      <button
        type="button"
        className="btn-primary"
        aria-pressed="false"
        onClick={() => {
          sortItems("description");
        }}
      >
        <span className="visually-hidden">Descriptions</span>
      </button>
      <button
        type="button"
        className="btn-primary"
        aria-pressed="false"
        onClick={() => {
          sortItems("packed");
        }}
      >
        <span className="visually-hidden">Status</span>
      </button>
    </div>
  );
}
export default SortBtns;

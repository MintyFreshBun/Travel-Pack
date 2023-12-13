import Item from "./ItemList";
import Status from "./Status";
import { useState } from "react";

function ListRender({ items, onToggleItem, onDeleteItem }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input")
    sortedItems = items.slice().sort((a, b) => Number(a.id) - Number(b.id));
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    /**These buttons sence they repeat turn them into btns */
    <div>
      <div className="flex justify-center gap-3 mb-2">
        <button
          type="button"
          className="btn-primary"
          aria-pressed="true"
          onClick={() => {
            setSortBy("input");
          }}
        >
          <span className="visually-hidden">Input</span>
        </button>

        <button
          type="button"
          className="btn-primary"
          aria-pressed="false"
          onClick={() => {
            setSortBy("description");
          }}
        >
          <span className="visually-hidden">Descriptions</span>
        </button>
        <button
          type="button"
          className="btn-primary"
          aria-pressed="false"
          onClick={() => {
            setSortBy("packed");
          }}
        >
          <span className="visually-hidden">Status</span>
        </button>
      </div>

      <Status items={items} />

      <ul className="flex flex-col justify-center align-middle gap-3">
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onToggleItem={onToggleItem}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}
export default ListRender;

import { Trash2 } from "lucide-react";

function Item({ item, onToggleItem, onDeleteItem }) {
  return (
    <li className="packing-item">
      <input
        type="checkbox"
        className="packing-checkbox"
        aria-label={`Mark ${item.description} as packed`}
        checked={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span
        className="packing-item-description"
        style={item.packed ? { textDecoration: "line-through" } : {}}
      >
        {item.quantity} {item.description}
      </span>

      <button
        type="button"
        className="button is-danger is-small"
        aria-label={`Delete ${item.description}`}
        onClick={() => onDeleteItem(item.id)}
      >
        <Trash2 aria-hidden="true" />
      </button>
    </li>
  );
}

export default Item;

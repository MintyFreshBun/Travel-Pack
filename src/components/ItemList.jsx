function Item({ item, onToggleItem, onDeleteItem }) {
  // we want the items to have a name, status and quataty

  return (
    <li className="flex justify-center align-middle gap-5">
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span
        className="leading-loose"
        style={item.packed ? { textDecoration: "line-through" } : {}}
      >
        {item.quantity} {item.description}
      </span>

      <button
        type="button"
        className="btn-delete"
        onClick={() => onDeleteItem(item.id)}
      >
        X
      </button>
    </li>
  );
}

export default Item;

function Item({ item }) {
  // we want the items to have a name, status and quataty

  return (
    <li className="flex justify-center align-middle gap-2">
      <input type="checkbox" value={item.packed} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      {/*
      <div className="btn-group btn-gap">
        <button type="button" className="btn-primary">
          Edit
        </button>
        <button type="button" className="btn-primary">
          Delete
        </button>
      </div>
      */}
    </li>
  );
}

export default Item;

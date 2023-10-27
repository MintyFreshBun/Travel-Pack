function Item({ item }) {
  // we want the items to have a name, status and quataty

  return (
    <li>
      <input type="checkbox" value={item.packed} />
      <span>
        {item.quantity} {item.description}
      </span>
      <div className="btn-group btn-gap">
        <button type="button" className="btn-primary">
          Edit
        </button>
        <button type="button" className="btn-primary">
          Delete
        </button>
      </div>
    </li>
  );
}

export default Item;

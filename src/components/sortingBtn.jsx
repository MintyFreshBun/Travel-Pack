function BtnType({ items, onSortItems, sortType }) {
  // we want the items to have a name, status and quataty

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
    <button
      type="button"
      className="btn-primary"
      aria-pressed="true"
      onClick={() => {
        sortItems(sortType);
      }}
    >
      <span className="visually-hidden capitalize">{sortType}</span>
    </button>
  );
}

export default BtnType;

import Item from "./ItemList";

function ListRender({ items, onToggleItem, onDeleteItem }) {
  return (
    <div className="packing-list-scroll">
      <ul className="packing-list">
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onToggleItem={onToggleItem}
            onDeleteItem={onDeleteItem}
          />
        ))}
        {items.length === 0 && (
          <li className="has-text-grey">No items set...</li>
        )}
      </ul>
    </div>
  );
}
export default ListRender;

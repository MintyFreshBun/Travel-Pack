import Item from "./ItemList";

function ListRender({ items, onToggleItem, onDeleteItem }) {
  return (
    /**These buttons sence they repeat turn them into btns */
    <div>
      <ul className="flex flex-col justify-center align-middle gap-3 card-box mx-60">
        {items.map((item) => (
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

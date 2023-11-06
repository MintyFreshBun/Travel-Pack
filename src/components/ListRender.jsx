import Item from "./ItemList";

function ListRender({ items, onToggleItem }) {
  return (
    <div>
      <ul className="">
        {items.map((item) => (
          <Item item={item} key={item.id} onToggleItem={onToggleItem} />
        ))}
      </ul>
    </div>
  );
}
export default ListRender;

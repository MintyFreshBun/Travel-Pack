import Item from "./ItemList";

function ListRender({ items }) {
  return (
    <div>
      <ul className="">
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
export default ListRender;

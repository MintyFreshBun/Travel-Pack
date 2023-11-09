import Item from "./ItemList";

function ListRender({ items, onToggleItem, sortBy }) {
  /*
  const [filter, setFilter] = useState("all");

  const filteredItems = items.filter((item) => {
    if (filter === "all") return true;
    if (filter === "unpacked") return !item.packed;
    if (filter === "packed") return item.packed;
    return false;
  });*/

  //before rendering we check the filter sortby
  let sortedItems;

  if (sortBy == "input") sortedItems = items;
  if (sortBy == "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy == "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div>
      <ul className="">
        {sortedItems.map((item) => (
          <Item item={item} key={item.id} onToggleItem={onToggleItem} />
        ))}
      </ul>
    </div>
  );
}
export default ListRender;

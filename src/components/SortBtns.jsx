import BtnType from "./sortingBtn";

function SortBtns({ items, onSortItems }) {
  return (
    <div className="flex justify-center gap-3 mb-2">
      <BtnType items={items} onSortItems={onSortItems} sortType={"input"} />
      <BtnType
        items={items}
        onSortItems={onSortItems}
        sortType={"description"}
      />
      <BtnType items={items} onSortItems={onSortItems} sortType={"packed"} />
    </div>
  );
}
export default SortBtns;

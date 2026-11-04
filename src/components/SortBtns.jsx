import BtnType from "./sortingBtn";

function SortBtns({ items, onSortItems }) {
  return (
    <div className="buttons is-centered sort-buttons">
      <BtnType items={items} onSortItems={onSortItems} sortType="input" />
      <BtnType
        items={items}
        onSortItems={onSortItems}
        sortType="description"
      />
      <BtnType items={items} onSortItems={onSortItems} sortType="packed" />
    </div>
  );
}
export default SortBtns;

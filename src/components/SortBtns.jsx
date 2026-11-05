import { useState } from "react";
import { ArrowDownAZ, ArrowUpAZ, ListChecks } from "lucide-react";

function SortBtns({ items, onSortItems }) {
  const [nameAscending, setNameAscending] = useState(true);
  const [packedFirst, setPackedFirst] = useState(false);

  function handleSortByName() {
    const sortedItems = [...items].sort((first, second) =>
      nameAscending
        ? first.description.localeCompare(second.description)
        : second.description.localeCompare(first.description)
    );

    onSortItems(sortedItems);
    setNameAscending((ascending) => !ascending);
  }

  function handleSortByPacked() {
    const sortedItems = [...items].sort((first, second) =>
      packedFirst
        ? Number(second.packed) - Number(first.packed)
        : Number(first.packed) - Number(second.packed)
    );

    onSortItems(sortedItems);
    setPackedFirst((current) => !current);
  }

  return (
    <div className="sort-controls">
      <button
        type="button"
        className="button sort-toggle-button"
        aria-label={`Sort by name ${nameAscending ? "A to Z" : "Z to A"}`}
        onClick={handleSortByName}
      >
        {nameAscending ? (
          <ArrowDownAZ aria-hidden="true" />
        ) : (
          <ArrowUpAZ aria-hidden="true" />
        )}
        Name: {nameAscending ? "A-Z" : "Z-A"}
      </button>
      <button
        type="button"
        className="button sort-toggle-button"
        aria-label={`Sort by packed status, ${packedFirst ? "packed first" : "unpacked first"}`}
        onClick={handleSortByPacked}
      >
        <ListChecks aria-hidden="true" />
        Packed: {packedFirst ? "Packed first" : "Unpacked first"}
      </button>
    </div>
  );
}

export default SortBtns;

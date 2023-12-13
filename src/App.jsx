import "./App.css";
import Form from "./components/Form";
import Status from "./components/Status";
import ListRender from "./components/ListRender";
import SortBtns from "./components/SortBtns";
import { useState } from "react";

function App() {
  // lets make a small list of task items to start

  const [items, setItems] = useState([]);
  const [sortBy, setSortBy] = useState("input");

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleUpdateList(sortType) {
    console.log("update called: " + sortType);
    let sortedItems;
    setSortBy(sortType);

    if (sortBy === "input") sortedItems = items.sort(); // try to sort by the items ID , try to check the tutorials on sorting
    if (sortBy === "description")
      sortedItems = items
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));
    if (sortBy === "packed")
      sortedItems = items
        .slice()
        .sort((a, b) => Number(a.packed) - Number(b.packed));
    setItems(sortedItems);
  }

  return (
    <div className="card-box">
      <h1 className="title-header">Travel-Pack</h1>

      {/* Form section for new Items */}
      <Form onAddItems={handleAddItems} />

      {/* Sort Btns component */}
      <SortBtns items={items} onSortItems={handleUpdateList} />

      {/*Task number status */}
      <Status items={items} />

      {/**Task list Render */}

      <ListRender
        items={items}
        onToggleItem={handleToggleItem}
        onDeleteItem={handleDeleteItem}
      />

      {/**Make a clear list button bellow */}
    </div>
  );
}

export default App;

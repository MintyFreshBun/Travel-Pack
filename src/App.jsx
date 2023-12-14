import "./App.css";
import Form from "./components/Form";
import Status from "./components/Status";
import SortBtns from "./components/SortBtns";

import ListRender from "./components/ListRender";

import { useState } from "react";

/**Version 1 by Miguel Amaral */

function App() {
  // lets make a small list of task items to start

  const [items, setItems] = useState([]);

  //const [sortBy, setSortBy] = useState("input");

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleUpdateItems(updated) {
    setItems(updated);
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

  return (
    <div className="card-box">
      <h1 className="title-header">Travel-Pack</h1>

      {/* Form section for new Items */}
      <Form onAddItems={handleAddItems} />

      {/** Add the sort buttons here , use the explanation John told you with the handle, you were already doing it correctly with the Form component */}

      <SortBtns onSortItems={handleUpdateItems} items={items} />

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

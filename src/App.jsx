import "./App.css";
import Form from "./components/Form";

import ListRender from "./components/ListRender";

import { useState } from "react";

function App() {
  // lets make a small list of task items to start

  const [items, setItems] = useState([]);

  //const [sortBy, setSortBy] = useState("input");

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

  return (
    <div className="card-box">
      <h1 className="title-header">Travel-Pack</h1>

      {/* Form section for new Items */}
      <Form onAddItems={handleAddItems} />

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

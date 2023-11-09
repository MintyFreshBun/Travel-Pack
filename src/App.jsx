import "./App.css";
import Form from "./components/Form";
import Status from "./components/Status";
import ListRender from "./components/ListRender";
import Filters from "./components/Filters";
import { useState } from "react";

function App() {
  // lets make a small list of task items to start

  const [items, setItems] = useState([]);
  const [sortBy, setSortBy] = useState("input");

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleSortBy(input) {
    setSortBy(input);
  }

  return (
    <div className="card-box">
      <h1 className="title-header">Travel-Pack</h1>

      {/* Form section for new Items */}
      <Form onAddItems={handleAddItems} />

      {/* Filter component */}
      <Filters onFilter={handleSortBy} />

      {/*Task number status */}
      <Status items={items} />

      {/**Task list Render */}

      {/*//Make a temp List of inicial items static just to test and fill the  list nad items*/}
      <ListRender
        items={items}
        sortBy={sortBy}
        onToggleItem={handleToggleItem}
      />
    </div>
  );
}

export default App;

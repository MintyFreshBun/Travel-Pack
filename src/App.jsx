import "./App.css";
import Form from "./components/Form";
import Filters from "./components/Filters";
import Status from "./components/Status";
import ListRender from "./components/ListRender";

function App(props) {
  // lets make a small list of task items to start
  const tempItems = [
    { id: 0, description: "Passport", quantity: 1, packed: false },
    { id: 1, description: "Pants", quantity: 3, packed: true },
    { id: 2, description: "Shirt", quantity: 5, packed: false },
  ];

  return (
    <div className="card-box">
      <h1 className="title-header">Travel-Pack</h1>

      {/* Form section for new Items */}
      <Form />

      {/* Filter component */}
      <Filters />

      {/*Task number status */}
      <Status />

      {/**Task list Render */}

      {/*//Make a temp List of inicial items static just to test and fill the  list nad items*/}
      <ListRender items={tempItems} />
    </div>
  );
}

export default App;

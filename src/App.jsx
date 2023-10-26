import "./App.css";
import Form from "./components/Form";
import Filters from "./components/Filters";
import Status from "./components/Status";
import ListRender from "./components/ListRender";

function App(props) {
  return (
    <div className="todoapp stack-large">
      <h1>Travel-Pack</h1>

      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      {/* Form section for new Items */}
      <Form />

      {/* Filter component */}
      <Filters />

      {/*Task number status */}
      <Status />

      {/**Task list Render */}
      <ListRender />
    </div>
  );
}

export default App;

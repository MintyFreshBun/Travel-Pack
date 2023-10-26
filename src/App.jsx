import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1 class="comp-init-pad">Header here</h1>
        <div class="comp-init-pad"> Items insert</div>
        {/* area for the items list display here*/}

        {/* display progress*/}
      </div>
    </>
  );
}

export default App;

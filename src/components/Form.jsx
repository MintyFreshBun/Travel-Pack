import { useState } from "react";

function Form({ onAddItems }) {
  // Add the functionalities and states here
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return; // this will help present addition of empty items

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);
    //after adding the item set the form to its inicial state
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="packing-form" onSubmit={handleSubmit}>
      <h2 className="subtitle is-5">
        <label className="label" htmlFor="item-description">
          What needs to be done?
        </label>
      </h2>

      <div className="app-form-controls">
        <div className="control app-form-description">
          <input
            id="item-description"
            type="text"
            className="input is-medium"
            name="text"
            autoComplete="off"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="control">
          <div className="select is-medium">
            <select
              aria-label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                <option value={num} key={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="button is-primary is-medium">
          Add
        </button>
      </div>
    </form>
  );
}

export default Form;

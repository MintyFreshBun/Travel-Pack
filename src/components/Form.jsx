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
    <form onSubmit={handleSubmit}>
      <h2 className=" my-2">
        <label className="label__lg">What needs to be done?</label>
      </h2>

      <div className="flex gap-3 justify-center">
        <input
          type="text"
          className="p-1 px-2 border-custom"
          name="text"
          autoComplete="off"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="p-1 px-2"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <button type="submit" className="btn-primary px-6">
          Add
        </button>
      </div>
    </form>
  );
}

export default Form;

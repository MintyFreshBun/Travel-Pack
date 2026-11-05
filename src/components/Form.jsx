import { useState } from "react";
import { Plus } from "lucide-react";

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description.trim()) return;

    const newItem = {
      description: description.trim(),
      quantity,
      packed: false,
      id: Date.now(),
    };

    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="packing-form" onSubmit={handleSubmit}>
      <h2 className="subtitle is-5">
        <label className="label" htmlFor="item-description">
          Add an item to pack
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
            placeholder="e.g. Passport"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="control app-quantity-control">
          <div className="select app-quantity-select">
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
        <button
          type="submit"
          className="button save-trip-button app-add-item-button"
        >
          <Plus aria-hidden="true" />
          Add
        </button>
      </div>
    </form>
  );
}

export default Form;

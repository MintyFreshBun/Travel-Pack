import { useState } from "react";
import { Minus, Plus } from "lucide-react";

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = 20;

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
          <div
            className="app-quantity-counter"
            role="group"
            aria-label="Quantity"
          >
            <button
              type="button"
              className="button app-quantity-button"
              aria-label="Decrease quantity"
              aria-disabled={quantity <= 1}
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            >
              <Minus aria-hidden="true" />
            </button>
            <output className="app-quantity-value" aria-live="polite">
              {quantity}
            </output>
            <button
              type="button"
              className="button app-quantity-button"
              aria-label="Increase quantity"
              aria-disabled={quantity >= maxQuantity}
              onClick={() =>
                setQuantity((current) => Math.min(maxQuantity, current + 1))
              }
            >
              <Plus aria-hidden="true" />
            </button>
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

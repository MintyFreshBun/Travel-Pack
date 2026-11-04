import { useState } from "react";

const statusOptions = [
  { value: "upcoming", label: "To go" },
  { value: "ongoing", label: "Ongoing" },
  { value: "canceled", label: "Canceled" },
  { value: "completed", label: "Completed" },
];

function TripForm({ trip, onSave, onCancel }) {
  const [name, setName] = useState(trip?.name || "");
  const [destination, setDestination] = useState(trip?.destination || "");
  const [tripday, setTripday] = useState(trip?.tripday || "");
  const [returnDate, setReturnDate] = useState(trip?.returnDate || "");
  const [status, setStatus] = useState(trip?.status || "upcoming");
  const [dateError, setDateError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (tripday && returnDate && returnDate < tripday) {
      setDateError("Return date must be on or after the departure date.");
      return;
    }

    setDateError("");
    onSave({
      name: name.trim(),
      destination: destination.trim(),
      tripday,
      returnDate,
      status,
    });
  }

  return (
    <section className="trip-form-panel" aria-labelledby="trip-form-title">
      <div className="trip-form-heading">
        <div>
          <p className="eyebrow">{trip ? "UPDATE YOUR PLANS" : "START PLANNING"}</p>
          <h2 id="trip-form-title">{trip ? "Edit trip" : "Add a trip"}</h2>
        </div>
        <button
          type="button"
          className="close-form-button"
          aria-label="Close trip form"
          onClick={onCancel}
        >
          ×
        </button>
      </div>
      <form className="trip-form" onSubmit={handleSubmit}>
        <div className="trip-form-fields">
          <div className="field">
            <label className="label" htmlFor="trip-name">
              Trip name
            </label>
            <div className="control">
              <input
                id="trip-name"
                className="input"
                type="text"
                placeholder="e.g. Summer in Italy"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                maxLength={80}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="trip-destination">
              Destination
            </label>
            <div className="control">
              <input
                id="trip-destination"
                className="input"
                type="text"
                placeholder="e.g. Florence, Italy"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                required
                maxLength={100}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="trip-departure">
              Departure
            </label>
            <div className="control">
              <input
                id="trip-departure"
                className="input"
                type="date"
                value={tripday}
                onChange={(event) => setTripday(event.target.value)}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="trip-return">
              Return
            </label>
            <div className="control">
              <input
                id="trip-return"
                className="input"
                type="date"
                min={tripday || undefined}
                value={returnDate}
                onChange={(event) => setReturnDate(event.target.value)}
                required
              />
            </div>
          </div>
          <div className="field trip-status-field">
            <label className="label" htmlFor="trip-status">
              Status
            </label>
            <div className="control select is-fullwidth">
              <select
                id="trip-status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                {statusOptions.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {dateError && (
          <p className="help is-danger" role="alert">
            {dateError}
          </p>
        )}
        <div className="trip-form-actions">
          <button type="button" className="button cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="button save-trip-button">
            {trip ? "Save changes" : "Create trip"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default TripForm;

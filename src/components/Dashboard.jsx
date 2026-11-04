import { useState } from "react";
import Form from "./Form";
import ListRender from "./ListRender";
import SortBtns from "./SortBtns";
import Status from "./Status";
import TripForm from "./TripForm";

const STORAGE_KEY = "travel-pack-trips";

const tripStatuses = {
  upcoming: "To go",
  ongoing: "Ongoing",
  canceled: "Canceled",
  completed: "Completed",
};

function readTrips() {
  try {
    const savedTrips = window.localStorage.getItem(STORAGE_KEY);
    const trips = savedTrips ? JSON.parse(savedTrips) : [];

    if (!Array.isArray(trips)) {
      throw new Error("Saved trips are not in the expected format.");
    }

    const normalizedTrips = trips
      .filter((trip) => trip && typeof trip === "object" && !Array.isArray(trip))
      .map((trip) => ({
        ...trip,
        items: Array.isArray(trip.items) ? trip.items : [],
      }));

    return { trips: normalizedTrips, error: "" };
  } catch (error) {
    console.error("Could not load saved trips.", error);
    return {
      trips: [],
      error: "Saved trips could not be loaded. New trips will still be available.",
    };
  }
}

function formatTripDate(date) {
  if (!date) return "Date not set";

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function Dashboard() {
  const [initialData] = useState(readTrips);
  const [trips, setTrips] = useState(initialData.trips);
  const [selectedTripId, setSelectedTripId] = useState(null);
  const [showTripForm, setShowTripForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [storageError, setStorageError] = useState(initialData.error);

  const selectedTrip =
    trips.find((trip) => trip.id === selectedTripId) || trips[0] || null;
  const selectedItems = selectedTrip?.items || [];

  function persistTrips(nextTrips) {
    setTrips(nextTrips);

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTrips));
      setStorageError("");
    } catch (error) {
      console.error("Could not save trips.", error);
      setStorageError("Your trips could not be saved in this browser.");
    }
  }

  function handleSaveTrip(tripDetails) {
    if (editingTrip) {
      persistTrips(
        trips.map((trip) =>
          trip.id === editingTrip.id ? { ...trip, ...tripDetails } : trip
        )
      );
      setSelectedTripId(editingTrip.id);
    } else {
      const newTrip = {
        ...tripDetails,
        id: crypto.randomUUID(),
        items: [],
      };
      persistTrips([...trips, newTrip]);
      setSelectedTripId(newTrip.id);
    }

    setShowTripForm(false);
    setEditingTrip(null);
  }

  function handleEditTrip(trip) {
    setEditingTrip(trip);
    setShowTripForm(true);
  }

  function handleCancelTripForm() {
    setShowTripForm(false);
    setEditingTrip(null);
  }

  function handleUpdateItems(updatedItems) {
    if (!selectedTrip) return;

    persistTrips(
      trips.map((trip) =>
        trip.id === selectedTrip.id ? { ...trip, items: updatedItems } : trip
      )
    );
  }

  function handleAddItem(item) {
    if (!selectedTrip) return;
    handleUpdateItems([...selectedTrip.items, item]);
  }

  function handleDeleteItem(id) {
    if (!selectedTrip) return;
    handleUpdateItems(selectedTrip.items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    if (!selectedTrip) return;
    handleUpdateItems(
      selectedTrip.items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  const upcomingTrips = trips.filter((trip) => trip.status === "upcoming").length;
  const ongoingTrips = trips.filter((trip) => trip.status === "ongoing").length;
  const packedItems = trips.reduce(
    (total, trip) =>
      total + (trip.items || []).filter((item) => item.packed).length,
    0
  );
  const totalItems = trips.reduce(
    (total, trip) => total + (trip.items || []).length,
    0
  );

  return (
    <main className="app-shell dashboard-screen">
      <header className="app-header">
        <a className="brand" href="#" aria-label="Travel-Pack home">
          <span className="brand-mark" aria-hidden="true">
            TP
          </span>
          <span>travel-pack</span>
        </a>
        <button
          className="button add-trip-button"
          type="button"
          onClick={() => {
            setEditingTrip(null);
            setShowTripForm((isOpen) => !isOpen);
          }}
        >
          <span aria-hidden="true">+</span> Add a trip
        </button>
      </header>

      <section className="dashboard-intro">
        <p className="eyebrow">YOUR TRAVEL DASHBOARD</p>
        <h1>Make room for the journey.</h1>
        <p>Keep your trips, plans, and packing lists all in one place.</p>
      </section>

      <section className="overview-grid" aria-label="Trip overview">
        <article className="overview-card">
          <span className="overview-icon icon-trips" aria-hidden="true">
            ↗
          </span>
          <div>
            <p className="overview-label">Total trips</p>
            <p className="overview-value">{trips.length}</p>
          </div>
        </article>
        <article className="overview-card">
          <span className="overview-icon icon-upcoming" aria-hidden="true">
            ◷
          </span>
          <div>
            <p className="overview-label">Coming up</p>
            <p className="overview-value">{upcomingTrips}</p>
          </div>
        </article>
        <article className="overview-card">
          <span className="overview-icon icon-ongoing" aria-hidden="true">
            ✓
          </span>
          <div>
            <p className="overview-label">In progress</p>
            <p className="overview-value">{ongoingTrips}</p>
          </div>
        </article>
        <article className="overview-card packing-overview">
          <span className="overview-icon icon-packing" aria-hidden="true">
            □
          </span>
          <div className="packing-overview-content">
            <p className="overview-label">Packing progress</p>
            <p className="overview-value">
              {packedItems} <span>of {totalItems} items</span>
            </p>
            <progress
              className="progress is-small"
              value={totalItems ? packedItems : 0}
              max={totalItems || 1}
              aria-label={`${packedItems} of ${totalItems} packing items packed`}
            />
          </div>
        </article>
      </section>

      {storageError && (
        <p className="storage-message" role="status">
          {storageError}
        </p>
      )}

      {showTripForm && (
        <TripForm
          key={editingTrip?.id || "new-trip"}
          trip={editingTrip}
          onSave={handleSaveTrip}
          onCancel={handleCancelTripForm}
        />
      )}

      <section className="dashboard-grid">
        <aside className="trips-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR PLANS</p>
              <h2>
                Trips <span>{trips.length}</span>
              </h2>
            </div>
          </div>

          {trips.length > 0 ? (
            <ul className="trip-list">
              {trips.map((trip) => (
                <li key={trip.id}>
                  <article
                    className={`trip-card${selectedTrip?.id === trip.id ? " is-selected" : ""}`}
                  >
                    <button
                      type="button"
                      className="trip-card-select"
                      aria-pressed={selectedTrip?.id === trip.id}
                      onClick={() => setSelectedTripId(trip.id)}
                    >
                      <span className="trip-card-topline">
                        <span className={`trip-status status-${trip.status}`}>
                          <span aria-hidden="true" />
                          {tripStatuses[trip.status] || "To go"}
                        </span>
                        <span className="trip-destination">{trip.destination}</span>
                      </span>
                      <span className="trip-card-name">{trip.name}</span>
                      <span className="trip-card-dates">
                        {formatTripDate(trip.tripday)}{" "}
                        <span aria-hidden="true">→</span>{" "}
                        {formatTripDate(trip.returnDate)}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="edit-trip-button"
                      aria-label={`Edit ${trip.name}`}
                      onClick={() => handleEditTrip(trip)}
                    >
                      Edit
                    </button>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-trips">
              <span className="empty-illustration" aria-hidden="true">
                ✈
              </span>
              <h3>Your next adventure starts here</h3>
              <p>Add a trip to start planning your itinerary and packing list.</p>
              <button
                type="button"
                className="button add-first-trip"
                onClick={() => setShowTripForm(true)}
              >
                Add your first trip
              </button>
            </div>
          )}
        </aside>

        <section className="trip-detail-panel" aria-live="polite">
          {selectedTrip ? (
            <>
              <div className="trip-detail-header">
                <div>
                  <p className="eyebrow">YOUR PACKING LIST</p>
                  <h2>{selectedTrip.name}</h2>
                  <p className="trip-detail-location">
                    <span aria-hidden="true">⌖</span> {selectedTrip.destination}
                    <span className="detail-date-divider" aria-hidden="true">
                      ·
                    </span>
                    {formatTripDate(selectedTrip.tripday)} –{" "}
                    {formatTripDate(selectedTrip.returnDate)}
                  </p>
                </div>
                <span
                  className={`trip-status detail-status status-${selectedTrip.status}`}
                >
                  <span aria-hidden="true" />
                  {tripStatuses[selectedTrip.status] || "To go"}
                </span>
              </div>

              <div className="packing-section">
                <div className="packing-section-heading">
                  <h3>Packing list</h3>
                  <span>
                    {selectedItems.filter((item) => item.packed).length}/
                    {selectedItems.length} packed
                  </span>
                </div>
                <Form onAddItems={handleAddItem} />
                <SortBtns
                  onSortItems={handleUpdateItems}
                  items={selectedItems}
                />
                <Status items={selectedItems} />
                <ListRender
                  items={selectedItems}
                  onToggleItem={handleToggleItem}
                  onDeleteItem={handleDeleteItem}
                />
              </div>
            </>
          ) : (
            <div className="detail-empty-state">
              <span className="detail-empty-icon" aria-hidden="true">
                ◈
              </span>
              <h2>Your trip details will live here</h2>
              <p>Add a trip and its packing list will be ready to organize.</p>
            </div>
          )}
        </section>
      </section>
      <footer className="app-footer">
        A little more prepared for wherever you go.
      </footer>
    </main>
  );
}

export default Dashboard;

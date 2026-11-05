import { useState } from "react";
import {
  ArrowDownAZ,
  ArrowUpAZ,
  ArrowRight,
  CalendarDays,
  Check,
  ListChecks,
  Luggage,
  MapPin,
  PackageOpen,
  Pencil,
  Plane,
  Plus,
  Trash2,
} from "lucide-react";
import AboutModal from "./AboutModal";
import Form from "./Form";
import ListRender from "./ListRender";
import Modal from "./Modal";
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

const tripStatusOrder = ["upcoming", "ongoing", "completed", "canceled"];

const tripSortLabels = {
  name: "Name",
  departure: "Departure",
  destination: "Destination",
  status: "Status",
};

function compareTrips(first, second, sortBy, direction) {
  let comparison = 0;

  if (sortBy === "name" || sortBy === "destination") {
    comparison = (first[sortBy] || "").localeCompare(second[sortBy] || "", undefined, {
      sensitivity: "base",
    });
  } else if (sortBy === "departure") {
    const firstDate = first.tripday || "";
    const secondDate = second.tripday || "";

    if (!firstDate || !secondDate) {
      return firstDate ? -1 : secondDate ? 1 : 0;
    }

    comparison = firstDate.localeCompare(secondDate);
  } else if (sortBy === "status") {
    const firstStatus = Math.max(
      tripStatusOrder.indexOf(first.status),
      tripStatusOrder.length
    );
    const secondStatus = Math.max(
      tripStatusOrder.indexOf(second.status),
      tripStatusOrder.length
    );
    comparison =
      firstStatus - secondStatus;
  }

  return direction === "asc" ? comparison : -comparison;
}

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
  const [selectedTripId, setSelectedTripId] = useState(
    initialData.trips[0]?.id || null
  );
  const [showTripForm, setShowTripForm] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [tripToDelete, setTripToDelete] = useState(null);
  const [tripSort, setTripSort] = useState({
    by: null,
    direction: null,
    nextDirections: {
      name: "asc",
      departure: "asc",
      destination: "asc",
      status: "asc",
    },
  });
  const [storageError, setStorageError] = useState(initialData.error);

  const selectedTrip = trips.find((trip) => trip.id === selectedTripId) || null;
  const selectedItems = selectedTrip?.items || [];
  const sortedTrips = tripSort.by
    ? [...trips].sort((first, second) =>
        compareTrips(
          first,
          second,
          tripSort.by,
          tripSort.direction
        )
      )
    : trips;

  function handleTripSort(sortBy) {
    setTripSort((currentSort) => {
      const direction = currentSort.nextDirections[sortBy];

      return {
        by: sortBy,
        direction,
        nextDirections: {
          ...currentSort.nextDirections,
          [sortBy]: direction === "asc" ? "desc" : "asc",
        },
      };
    });
  }

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

  function handleDeleteTrip() {
    if (!tripToDelete) return;

    const remainingTrips = trips.filter((trip) => trip.id !== tripToDelete.id);
    persistTrips(remainingTrips);
    if (selectedTripId === tripToDelete.id) {
      setSelectedTripId(remainingTrips[0]?.id || null);
    }
    setTripToDelete(null);
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
  const packingTrips = trips.filter(
    (trip) => trip.status !== "canceled" && trip.status !== "completed"
  );
  const packedItems = packingTrips.reduce(
    (total, trip) =>
      total + (trip.items || []).filter((item) => item.packed).length,
    0
  );
  const totalItems = packingTrips.reduce(
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
          className="button about-button"
          type="button"
          onClick={() => setShowAbout(true)}
        >
          About
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
            <Plane />
          </span>
          <div>
            <p className="overview-label">Total trips</p>
            <p className="overview-value">{trips.length}</p>
          </div>
        </article>
        <article className="overview-card">
          <span className="overview-icon icon-upcoming" aria-hidden="true">
            <CalendarDays />
          </span>
          <div>
            <p className="overview-label">Coming up</p>
            <p className="overview-value">{upcomingTrips}</p>
          </div>
        </article>
        <article className="overview-card">
          <span className="overview-icon icon-ongoing" aria-hidden="true">
            <Check />
          </span>
          <div>
            <p className="overview-label">In progress</p>
            <p className="overview-value">{ongoingTrips}</p>
          </div>
        </article>
        <article className="overview-card packing-overview">
          <span className="overview-icon icon-packing" aria-hidden="true">
            <Luggage />
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
      {showAbout && (
        <AboutModal onClose={() => setShowAbout(false)} />
      )}
      {tripToDelete && (
        <Modal labelledBy="delete-trip-title" onClose={() => setTripToDelete(null)}>
          {(requestClose) => (
            <div className="delete-trip-dialog">
              <div className="delete-trip-heading">
                <p className="eyebrow">DELETE TRIP</p>
                <h2 id="delete-trip-title">
                  Are you sure you want to delete this trip?
                </h2>
                <p>
                  This will permanently delete the trip and its packing list.
                  This cannot be undone.
                </p>
              </div>
              <dl className="delete-trip-details">
                <div>
                  <dt>Trip</dt>
                  <dd>{tripToDelete.name}</dd>
                </div>
                <div>
                  <dt>Destination</dt>
                  <dd>{tripToDelete.destination}</dd>
                </div>
                <div>
                  <dt>Dates</dt>
                  <dd>
                    {formatTripDate(tripToDelete.tripday)} –{" "}
                    {formatTripDate(tripToDelete.returnDate)}
                  </dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{tripStatuses[tripToDelete.status] || "To go"}</dd>
                </div>
                <div>
                  <dt>Packing list</dt>
                  <dd>{(tripToDelete.items || []).length} items will be deleted</dd>
                </div>
              </dl>
              <div className="delete-trip-actions">
                <button
                  type="button"
                  className="button cancel-button"
                  onClick={() => requestClose()}
                >
                  Keep trip
                </button>
                <button
                  type="button"
                  className="button confirm-delete-trip-button"
                  onClick={() => requestClose(handleDeleteTrip)}
                >
                  <Trash2 aria-hidden="true" />
                  Delete trip
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}

      <section
        className={`dashboard-grid${trips.length === 0 ? " has-no-trips" : ""}`}
      >
        <aside
          className={`trips-panel${trips.length === 0 ? " has-no-trips" : ""}`}
        >
          {trips.length > 0 && (
            <div className="section-heading">
              <div>
                <p className="eyebrow">YOUR PLANS</p>
                <h2>
                  Trips <span>{trips.length}</span>
                </h2>
              </div>
              <button
                type="button"
                className="button panel-add-trip-button"
                onClick={() => {
                  setEditingTrip(null);
                  setShowTripForm(true);
                }}
              >
                <Plus aria-hidden="true" /> Add trip
              </button>
            </div>
          )}

          {trips.length > 0 ? (
            <>
              <div className="trip-sort-controls" role="group" aria-label="Sort trips">
                {Object.entries(tripSortLabels).map(([sortBy, label]) => {
                  const direction =
                    tripSort.by === sortBy
                      ? tripSort.direction
                      : tripSort.nextDirections[sortBy];
                  const directionLabel =
                    sortBy === "departure"
                      ? direction === "asc"
                        ? "earliest"
                        : "latest"
                      : sortBy === "status"
                        ? direction === "asc"
                          ? "To go first"
                          : "Canceled first"
                        : direction === "asc"
                          ? "A–Z"
                          : "Z–A";
                  const activeDirection =
                    tripSort.by === sortBy
                      ? tripSort.direction
                      : null;

                  return (
                    <button
                      type="button"
                      className="button trip-sort-button"
                      key={sortBy}
                      aria-label={`Sort trips by ${label.toLowerCase()} ${directionLabel}`}
                      aria-pressed={tripSort.by === sortBy}
                      onClick={() => handleTripSort(sortBy)}
                    >
                      {sortBy === "name" ? (
                        activeDirection === "desc" ? (
                          <ArrowUpAZ aria-hidden="true" />
                        ) : (
                          <ArrowDownAZ aria-hidden="true" />
                        )
                      ) : sortBy === "departure" ? (
                        <CalendarDays aria-hidden="true" />
                      ) : sortBy === "destination" ? (
                        <MapPin aria-hidden="true" />
                      ) : (
                        <ListChecks aria-hidden="true" />
                      )}
                      {label}: {directionLabel}
                    </button>
                  );
                })}
              </div>
              <ul className="trip-list">
              {sortedTrips.map((trip) => (
                <li key={trip.id}>
                  <article
                    className={`trip-card${selectedTrip?.id === trip.id ? " is-selected" : ""}`}
                  >
                    <button
                      type="button"
                      className="trip-card-select"
                      aria-pressed={selectedTrip?.id === trip.id}
                      onClick={() =>
                        setSelectedTripId((selectedId) =>
                          selectedId === trip.id ? null : trip.id
                        )
                      }
                    >
                      <span className={`trip-status status-${trip.status}`}>
                        <span aria-hidden="true" />
                        {tripStatuses[trip.status] || "To go"}
                      </span>
                      <span className="trip-card-name">{trip.name}</span>
                      <span className="trip-destination">
                        <MapPin aria-hidden="true" />
                        {trip.destination}
                      </span>
                      <span className="trip-card-dates">
                        <CalendarDays aria-hidden="true" />
                        <span>{formatTripDate(trip.tripday)}</span>
                        <ArrowRight aria-hidden="true" />
                        <span>{formatTripDate(trip.returnDate)}</span>
                      </span>
                    </button>
                    <button
                      type="button"
                      className="edit-trip-button"
                      aria-label={`Edit ${trip.name}`}
                      onClick={() => handleEditTrip(trip)}
                    >
                      <Pencil aria-hidden="true" />
                      Edit
                    </button>
                    <button
                      type="button"
                      className="delete-trip-button"
                      aria-label={`Delete ${trip.name}`}
                      onClick={() => setTripToDelete(trip)}
                    >
                      <Trash2 aria-hidden="true" />
                      Delete
                    </button>
                  </article>
                </li>
              ))}
              </ul>
            </>
          ) : (
            <div className="empty-trips">
              <span className="empty-illustration" aria-hidden="true">
                <Plane />
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

        {trips.length > 0 && (
          <section className="trip-detail-panel" aria-live="polite">
            {selectedTrip ? (
              <>
                <div className="trip-detail-header">
                  <div>
                    <p className="eyebrow">YOUR PACKING LIST</p>
                    <h2>{selectedTrip.name}</h2>
                    <p className="trip-detail-location">
                      <MapPin aria-hidden="true" />
                      {selectedTrip.destination}
                      <span className="detail-date-divider" aria-hidden="true">
                        ·
                      </span>
                      <CalendarDays aria-hidden="true" />
                      {formatTripDate(selectedTrip.tripday)}{" "}
                      <ArrowRight aria-hidden="true" />
                      {" "}
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
                  <PackageOpen />
                </span>
                <h2>No trip selected</h2>
                <p>Select a trip to view its details and packing list.</p>
              </div>
            )}
          </section>
        )}
      </section>
      <footer className="app-footer">
        A little more prepared for wherever you go.
      </footer>
    </main>
  );
}

export default Dashboard;

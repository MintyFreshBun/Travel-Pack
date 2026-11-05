import { useEffect, useRef, useState } from "react";
import {
  Code2,
  Compass,
  FileText,
  GitBranch,
  Globe,
  Map,
  MapPin,
  PackageCheck,
} from "lucide-react";
import Modal from "./Modal";

const tabs = [
  { id: "app", label: "About the app" },
  { id: "development", label: "Development" },
];

function AboutModal({ onClose }) {
  const [activeTab, setActiveTab] = useState("app");
  const [displayedTab, setDisplayedTab] = useState("app");
  const [panelTransition, setPanelTransition] = useState("idle");
  const tabRefs = useRef([]);
  const transitionTimeout = useRef(null);

  useEffect(
    () => () => {
      window.clearTimeout(transitionTimeout.current);
    },
    []
  );

  function selectTab(tabId) {
    if (tabId === activeTab) return;

    window.clearTimeout(transitionTimeout.current);
    setActiveTab(tabId);
    setPanelTransition("exit");
    transitionTimeout.current = window.setTimeout(() => {
      setDisplayedTab(tabId);
      setPanelTransition("enter");
    }, 140);
  }

  function handlePanelAnimationEnd(event) {
    if (event.target === event.currentTarget && panelTransition === "enter") {
      setPanelTransition("idle");
    }
  }

  function handleTabKeyDown(event, index) {
    let nextIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    selectTab(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <Modal
      labelledBy="about-title"
      onClose={onClose}
      className="about-modal-dialog"
    >
      {(requestClose) => (
        <div className="about-dialog">
          <div className="about-heading">
            <p className="eyebrow">ABOUT TRAVEL-PACK</p>
            <h2 id="about-title">Make room for the journey.</h2>
          </div>
          <div className="about-tabs" role="tablist" aria-label="About Travel-Pack">
            {tabs.map((tab, index) => (
              <button
                type="button"
                role="tab"
                id={`about-tab-${tab.id}`}
                aria-controls={`about-panel-${tab.id}`}
                aria-selected={activeTab === tab.id}
                tabIndex={activeTab === tab.id ? 0 : -1}
                className="about-tab"
                key={tab.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                onClick={() => selectTab(tab.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div
            className={`about-tab-panel${panelTransition !== "idle" ? ` is-${panelTransition}` : ""}`}
            role="tabpanel"
            id={`about-panel-${displayedTab}`}
            aria-labelledby={`about-tab-${displayedTab}`}
            aria-busy={panelTransition !== "idle"}
            tabIndex={0}
            onAnimationEnd={handlePanelAnimationEnd}
          >
            {displayedTab === "app" ? (
              <>
                <p className="about-intro">
                  Travel-Pack keeps trip plans and packing lists together, so
                  you can spend less time getting organized and more time
                  looking forward to where you’re going.
                </p>
                <div className="about-details">
                  <section>
                    <Compass aria-hidden="true" />
                    <div>
                      <h3>Plan the getaway</h3>
                      <p>
                        Keep destinations, travel dates, and trip status easy
                        to find in one dashboard.
                      </p>
                    </div>
                  </section>
                  <section>
                    <PackageCheck aria-hidden="true" />
                    <div>
                      <h3>Pack with confidence</h3>
                      <p>
                        Make a separate list for each trip, set quantities,
                        and check items off as they’re packed.
                      </p>
                    </div>
                  </section>
                  <section>
                    <Map aria-hidden="true" />
                    <div>
                      <h3>Your plans stay on this device</h3>
                      <p>
                        Trips are saved in this browser and are not sent to a
                        Travel-Pack account.
                      </p>
                    </div>
                  </section>
                </div>
              </>
            ) : (
              <>
                <p className="about-intro">
                  Travel-Pack is a portfolio project focused on turning
                  practical trip-planning features into a polished, responsive
                  experience.
                </p>
                <div className="about-details">
                  <section>
                    <Code2 aria-hidden="true" />
                    <div>
                      <h3>Built with</h3>
                      <p>
                        React, Vite, Sass, Bulma, and Lucide icons, with
                        browser local storage for trip data.
                      </p>
                    </div>
                  </section>
                  <section>
                    <Map aria-hidden="true" />
                    <div>
                      <h3>What it demonstrates</h3>
                      <p>
                        Responsive layouts, reusable modal flows, accessible
                        controls, and trip-specific packing-list interactions.
                      </p>
                    </div>
                  </section>
                  <section>
                    <Code2 aria-hidden="true" />
                    <div>
                      <h3>Miguel Amaral</h3>
                      <p>
                        Full-stack developer specializing in frontend and
                        design.
                      </p>
                      <p className="about-developer-location">
                        <MapPin aria-hidden="true" />
                        Porto, Portugal
                      </p>
                      <div className="about-profile-links">
                        <a
                          href="https://github.com/MintyFreshBun"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <GitBranch aria-hidden="true" />
                          GitHub
                        </a>
                        <a
                          href=""
                          onClick={(event) => event.preventDefault()}
                          aria-label="Website"
                        >
                          <Globe aria-hidden="true" />
                          Website
                        </a>
                        <a
                          href="/Miguel-Amaral-Portfolio.pdf"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FileText aria-hidden="true" />
                          CV Pdf
                        </a>
                      </div>
                    </div>
                  </section>
                </div>
              </>
            )}
          </div>
          <div className="about-actions">
            <button
              type="button"
              className="button cancel-button"
              onClick={() => requestClose()}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default AboutModal;

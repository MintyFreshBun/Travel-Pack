function Intro() {
  return (
    <main className="intro-screen" aria-label="Welcome to Travel-Pack">
      <div className="intro-content">
        <span className="intro-logo intro-sequence-item" aria-hidden="true">
          TP
        </span>
        <p className="intro-app-name intro-sequence-item">Travel-Pack</p>
        <div className="intro-welcome intro-sequence-item">
          <h1>Welcome</h1>
          <p className="intro-tagline">Your next adventure starts here.</p>
        </div>
      </div>
    </main>
  );
}

export default Intro;

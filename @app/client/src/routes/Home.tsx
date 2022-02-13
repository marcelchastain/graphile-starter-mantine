import logo from "../logo.svg";

import React from "react";

const Home: React.FC = () => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a
        className="App-link"
        href={process.env.ROOT_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Home
      </a>
    </header>
  );
};

export default Home;

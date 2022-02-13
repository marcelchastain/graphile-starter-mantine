import "nprogress/nprogress.css";
import "./App.css";
import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NProgress from "nprogress";

const Home = lazy(() => import("./routes/Home"));
const About = lazy(() => import("./routes/About"));

NProgress.configure({
  showSpinner: false,
});

const Loading: React.FC = () => {
  useEffect(() => {
    console.log("Start");
    NProgress.start();
    return () => {
      console.log("Stop");
      NProgress.done();
    };
  }, []);
  return null;
};

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/about"}>About</Link>
              </li>
            </ul>
          </nav>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path={"/"} element={<Home />} />
              <Route path={"/about"} element={<About />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </div>
  );
}

export default App;

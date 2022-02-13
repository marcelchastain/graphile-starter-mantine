import React, { lazy } from "react";
import { Route, Routes } from "react-router";

const Home = lazy(() => import("./routes/Home"));
const About = lazy(() => import("./routes/About"));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/about"} element={<About />} />
    </Routes>
  );
};

export default AppRoutes;

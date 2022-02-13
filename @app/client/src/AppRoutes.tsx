import React, { lazy } from "react";
import { Route, Routes } from "react-router";

const Home = lazy(() => import("./routes/Home"));
const About = lazy(() => import("./routes/About"));
const FourOhFourPage = lazy(() => import("./routes/404"));
const Login = lazy(() => import("./routes/Login"));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/about"} element={<About />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"*"} element={<FourOhFourPage />} />
    </Routes>
  );
};

export default AppRoutes;

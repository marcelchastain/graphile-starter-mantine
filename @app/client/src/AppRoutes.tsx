import React, { lazy } from "react";
import { Route, Routes } from "react-router";

const Home = lazy(() => import("./routes/Home"));
const FourOhFourPage = lazy(() => import("./routes/404"));
const Login = lazy(() => import("./routes/Login"));
const Register = lazy(() => import("./routes/Register"));
const Forgot = lazy(() => import("./routes/Forgot"));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/forgot"} element={<Forgot />} />
      <Route path={"*"} element={<FourOhFourPage />} />
    </Routes>
  );
};

export default AppRoutes;

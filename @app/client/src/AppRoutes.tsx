import React, { lazy } from "react";
import { Route, Routes } from "react-router";

const Home = lazy(() => import("./routes/Home"));
const FourOhFourPage = lazy(() => import("./routes/404"));
const Login = lazy(() => import("./routes/Login"));
const Register = lazy(() => import("./routes/Register"));
const Reset = lazy(() => import("./routes/Reset"));
const Forgot = lazy(() => import("./routes/Forgot"));
const Verify = lazy(() => import("./routes/Verify"));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/reset"} element={<Reset />} />
      <Route path={"/forgot"} element={<Forgot />} />
      <Route path={"/verify"} element={<Verify />} />
      <Route path={"*"} element={<FourOhFourPage />} />
    </Routes>
  );
};

export default AppRoutes;

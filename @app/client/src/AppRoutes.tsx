import React, { lazy } from "react";
import { Route, Routes } from "react-router";

const Home = lazy(() => import("./routes/Home"));
const FourOhFourPage = lazy(() => import("./routes/404"));
const Login = lazy(() => import("./routes/Login"));
const Register = lazy(() => import("./routes/Register"));
const Reset = lazy(() => import("./routes/Reset"));
const Forgot = lazy(() => import("./routes/Forgot"));
const Verify = lazy(() => import("./routes/Verify"));
const Settings_Accounts = lazy(() => import("./routes/settings/Accounts"));
const Settings_Delete = lazy(() => import("./routes/settings/Delete"));
const Settings_Emails = lazy(() => import("./routes/settings/Emails"));
const Settings_Profile = lazy(() => import("./routes/settings/Index"));
const Settings_Security = lazy(() => import("./routes/settings/Security"));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/reset"} element={<Reset />} />
      <Route path={"/forgot"} element={<Forgot />} />
      <Route path={"/verify"} element={<Verify />} />
      <Route path={"/settings"} element={<Settings_Profile />} />
      <Route path={"/settings/accounts"} element={<Settings_Accounts />} />
      <Route path={"/settings/delete"} element={<Settings_Delete />} />
      <Route path={"/settings/emails"} element={<Settings_Emails />} />
      <Route path={"/settings/security"} element={<Settings_Security />} />
      <Route path={"*"} element={<FourOhFourPage />} />
    </Routes>
  );
};

export default AppRoutes;

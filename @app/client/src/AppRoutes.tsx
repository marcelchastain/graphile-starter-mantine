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
const CreateOrganization = lazy(() => import("./routes/CreateOrganization"));
const Organizations = lazy(() => import("./routes/o/Index"));
const Organization = lazy(() => import("./routes/o/[slug]/Index"));
const Organization_Profile = lazy(
  () => import("./routes/o/[slug]/settings/Index")
);
const Organization_Members = lazy(
  () => import("./routes/o/[slug]/settings/Members")
);
const Organization_Delete = lazy(
  () => import("./routes/o/[slug]/settings/Delete")
);

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
      <Route path={"/create-organization"} element={<CreateOrganization />} />
      <Route path={"/o"} element={<Organizations />} />
      <Route path={"/o/:slug"} element={<Organization />} />
      <Route path={"/o/:slug/settings"} element={<Organization_Profile />} />
      <Route
        path={"/o/:slug/settings/members"}
        element={<Organization_Members />}
      />
      <Route
        path={"/o/:slug/settings/delete"}
        element={<Organization_Delete />}
      />
      <Route path={"*"} element={<FourOhFourPage />} />
    </Routes>
  );
};

export default AppRoutes;

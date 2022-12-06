import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import QuickRuns from "./pages/QuickRuns";
import QuickRunsRoutes from "./pages/QuickRunsRoutes";
import EmpireStateQuickRun from "./pages/EmpireStateQuickRun";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import NoPage from "./pages/NoPage";
import reportWebVitals from "./reportWebVitals";
import Landmarks from "./pages/Landmarks";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="map" element={<Map />} />
          <Route path="profile" element={<Profile />} />
          <Route path="quickruns" element={<QuickRuns />} />
          <Route path="quickrunsroutes" element={<QuickRunsRoutes />} />
          <Route path="empirestatequickrun" element={<EmpireStateQuickRun />} />
          <Route path="registration" element={<Registration />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="landmarks" element={<Landmarks />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

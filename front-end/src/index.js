import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Map from "./pages/Map";
// import Profile from "./pages/Profile";
import QuickRuns from "./pages/QuickRuns";
import QuickRunEmpireState from "./pages/QuickRunEmpireState";
import QuickRunLincolnCenter from "./pages/QuickRunLincolnCenter";
import QuickRunStatueLiberty from "./pages/QuickRunStatueLiberty";
import PopularRunCentralPark from "./pages/PopularRunCentralPark";
import Registration from "./pages/Registration";
import NoPage from "./pages/NoPage";
import reportWebVitals from "./reportWebVitals";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="map" element={<Map />} />
          {/* <Route path="profile" element={<Profile />} /> */}
          <Route path="quickruns" element={<QuickRuns />} />
          <Route path="quickrunempirestate" element={<QuickRunEmpireState />} />
          <Route path="quickrunlincolncenter" element={<QuickRunLincolnCenter />} />
          <Route path="quickrunstatueliberty" element={<QuickRunStatueLiberty />} />
          <Route path="popularruncentralpark" element={<PopularRunCentralPark />} />
          <Route path="registration" element={<Registration />} />
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

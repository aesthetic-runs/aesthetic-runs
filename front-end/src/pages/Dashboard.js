import * as React from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";

const Dashboard = () => {
  return (
    <Container component="main" maxWidth="sm">
      <div className="dashboard-run-wrapper">
        <div className="previous-run">
          <h2>Previous Run</h2>
          <div className="dahboard-buttons-wrapper">
            <Link to="/landmarks" className="dashboard-button">
              lorem
            </Link>
            <Link to="/landmarks" className="dashboard-button">
              lorem
            </Link>
            <Link to="/landmarks" className="dashboard-button">
              lorem
            </Link>
          </div>
        </div>
        <div className="today-run">
          <h2>Today's Run</h2>
          <div className="dahboard-buttons-wrapper">
            <Link to="/landmarks" className="dashboard-button">
              2 Kilometers
            </Link>
            <Link to="/landmarks" className="dashboard-button">
              5 Kilometers
            </Link>
            <Link to="/landmarks" className="dashboard-button">
              10 Kilometers
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;

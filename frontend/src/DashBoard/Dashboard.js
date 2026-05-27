import React from "react";

import { Outlet } from "react-router-dom";
import { Route,Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import "./css/Dashboard.css";
import SummaryCards from "./components/SummaryCards";
import ExpenseChart from "./components/ExpenseChart";
import Transactions from "./components/Transactions";

function Dashboard() {

  return (

    <div className="container-fluid">

      <div className="row">

        {/* Sidebar */}
        <div className="col-md-2 p-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-10 p-4 dashboard-main">

          {/* Topbar */}
          <div className="mb-4">
            <Topbar />
          </div>

          {/* Dynamic Content */}
             <div className="dashboard-content">

            <Routes>

              {/* Default */}
              <Route
                index
                element={<SummaryCards />}
              />

              <Route
                path="transactions"
                element={<Transactions />}
              />

              <Route
                path="expensechart"
                element={<ExpenseChart />}
              />

            </Routes>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;
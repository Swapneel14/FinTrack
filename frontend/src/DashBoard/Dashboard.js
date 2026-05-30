import React, {
  useState,
  useEffect
} from "react";

import { Outlet } from "react-router-dom";
import { Route, Routes } from "react-router-dom";



import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import "./css/Dashboard.css";
import SummaryCards from "./components/SummaryCards";
import ExpenseChart from "./components/ExpenseChart";
import Transactions from "./components/Transactions";
import Settings from "./components/Settings";
import Analytics from "./components/Analytics";
import AddTransactionModal from "./components/AddTransactionModal";

function Dashboard() {
  const [showModal, setShowModal] =
    useState(false);
  const [darkMode, setDarkMode] =
    useState(false);
  useEffect(() => {

    if (darkMode) {

      document.body.classList.add(
        "dark-mode"
      );

    } else {

      document.body.classList.remove(
        "dark-mode"
      );

    }

  }, [darkMode]);

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
                element={
                  <SummaryCards
                    setShowModal={setShowModal}
                  />
                }
              />

              <Route
                path="transactions"
                element={<Transactions />}
              />

              <Route
                path="expensechart"
                element={<ExpenseChart />}
              />

              <Route
                path="settings"
                element={
                  <Settings
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                  />
                }
              />

              <Route
                path="analytics"
                element={
                  <Analytics />
                }
              />

            </Routes>
            <AddTransactionModal
              show={showModal}
              onClose={() =>
                setShowModal(false)
              }
            />

          </div>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;
import React from "react";
import "./../css/Dashboard.css";
import { useClerk, UserButton, useUser } from "@clerk/react";
import { Link } from "react-router-dom";

function Sidebar() {

  const { signOut } = useClerk();
  const { user } = useUser();

  return (
    <div className="sidebar d-flex flex-column justify-content-between">

      {/* Top Section */}
      <div>

        {/* User Profile Section */}
        <div className="user-profile text-center mb-5">

          <img
            src={user?.imageUrl}
            alt="profile"
            className="profile-img mb-3"
          />

          <h5 className="fw-bold mb-1">
            {user?.firstName}
          </h5>

          <p className="text-muted small">
            Personal Finance Dashboard
          </p>

        </div>

        {/* Navigation Links */}
        <div className="d-flex flex-column gap-3">

          <Link to="/dashboard" className="sidebar-link active">
            Dashboard
          </Link>

          <Link to="/dashboard/transactions" className="sidebar-link">
            Transactions
          </Link>

          <a href="/dashboard/expensechart" className="sidebar-link">
            Budgets
          </a>

          <a href="/dashboard/analytics" className="sidebar-link">
            Analytics
          </a>

          <a href="/dashboard/profile" className="sidebar-link">
            Profile
          </a>

          <a href="/dashboard/settings" className="sidebar-link">
            Settings
          </a>

        </div>

      </div>

      {/* Logout Button */}
      <div>

        <button
          className="logout-btn w-100"
          onClick={() => signOut()}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;
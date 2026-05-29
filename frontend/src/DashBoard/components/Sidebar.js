import React from "react";
import "./../css/Dashboard.css";

import {
  useClerk,
  useUser
} from "@clerk/react";

import {
  NavLink
} from "react-router-dom";

function Sidebar() {

  const { signOut } = useClerk();
  const { user } = useUser();

  return (

    <div className="sidebar d-flex flex-column justify-content-between">

      {/* Top Section */}
      <div>

        {/* User Profile */}
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

        {/* Navigation */}
        <div className="d-flex flex-column gap-3">

          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive
              ?
              "sidebar-link active-link"
              :
              "sidebar-link"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/transactions"
            className={({ isActive }) =>
              isActive
              ?
              "sidebar-link active-link"
              :
              "sidebar-link"
            }
          >
            Transactions
          </NavLink>

          <NavLink
            to="/dashboard/expensechart"
            className={({ isActive }) =>
              isActive
              ?
              "sidebar-link active-link"
              :
              "sidebar-link"
            }
          >
            Budgets
          </NavLink>

          <NavLink
            to="/dashboard/analytics"
            className={({ isActive }) =>
              isActive
              ?
              "sidebar-link active-link"
              :
              "sidebar-link"
            }
          >
            Analytics
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              isActive
              ?
              "sidebar-link active-link"
              :
              "sidebar-link"
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              isActive
              ?
              "sidebar-link active-link"
              :
              "sidebar-link"
            }
          >
            Settings
          </NavLink>

        </div>

      </div>

      {/* Logout */}
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
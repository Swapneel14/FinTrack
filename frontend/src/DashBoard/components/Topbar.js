import React from "react";
import "./../css/Dashboard.css";

import { useUser } from "@clerk/react";

function Topbar() {

  const { user } = useUser();

  return (

    <div className="topbar d-flex justify-content-between align-items-center">

      {/* Left Section */}
      <div>

        <h3 className="fw-bold mb-1">
          Welcome back, {user?.firstName} 👋
        </h3>

        <p className="text-muted mb-0">
          Track your finances and manage your expenses.
        </p>

      </div>

      {/* Right Section */}
      <div className="d-flex align-items-center gap-3">

        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="form-control search-bar"
        />

        {/* User Image */}
        <img
          src={user?.imageUrl}
          alt="profile"
          className="topbar-profile"
        />

      </div>

    </div>

  );
}

export default Topbar;
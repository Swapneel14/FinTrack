import React from "react";

function Settings({
  darkMode,
  setDarkMode
}) {

  return (

    <div className="settings-page">

      <div className="settings-card">

        <div className="d-flex justify-content-between align-items-center">

          <div>

            <h3 className="settings-title">
              Appearance
            </h3>

            <p className="settings-subtitle">
              Toggle dashboard theme
            </p>

          </div>

          <button
            className="theme-toggle-btn"
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >

            {
              darkMode
              ?
              "☀️ Light Mode"
              :
              "🌙 Dark Mode"
            }

          </button>

        </div>

      </div>

    </div>

  );
}

export default Settings;
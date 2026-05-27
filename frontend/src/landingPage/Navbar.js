import { useClerk, UserButton, useUser } from "@clerk/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard } from "lucide-react";

function Navbar() {
  let { user } = useUser();
  const { openSignIn } = useClerk();

  const navigate = useNavigate();

  return (
    <>
      <nav

        className="navbar navbar-custom navbar-expand-lg mb-1 border-bottom py-3"
      >
        <div className="container">

          <a className="navbar-brand fw-bold fs-3" href="/">
            FinTrack
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >

            <ul className="navbar-nav align-items-center gap-3">

              <li className="nav-item">
                <a className="nav-link fw-semibold text-dark" href="/">
                  Home
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link fw-semibold text-dark" href="#features">
                  Features
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link fw-semibold text-dark" href="/about">
                  About
                </a>
              </li>



              <li className="nav-item">
                {
                  (!user) ? (
                    <button onClick={openSignIn}
                      className="btn btn-primary px-4 rounded-pill"

                    >
                      Login
                    </button>
                  ) : (
                    <UserButton>
                      <UserButton.MenuItems>
                        <UserButton.Action label="My Expenses" labelIcon={<CreditCard size={15} />} onClick={() => navigate("/dashboard")} />
                      </UserButton.MenuItems>
                    </UserButton>
                  )
                }
              </li>

            </ul>

          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
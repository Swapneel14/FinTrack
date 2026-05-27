import React from "react";
import "./css/Features.css";

function Features() {
  return (
    <>
      <div id="features" className="container mt-5 text-center">
        <div className="row align-items-center">
          <div className="col-md-6 border-end">
            <h1 className="display-4 fw-bold mb-4">Take Control of Your Finances</h1>
            <p className="lead text-muted mb-4">Monitor your daily expenses, track income, and visualize your spending habits with an intuitive dashboard designed for simplicity.</p>
            <button className="btn btn-primary btn-lg px-4">Signup Now</button>
          </div>

          <div className="col-md-6 ps-5">
            <div className="row g-4">
              <div className="col-6">
                <div className="card feature-card border-0 shadow-sm p-3 h-100 rounded-4" >
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Smart Tracking</h5>
                   
                    <p className="card-text text-muted"> Track income and expenses effortlessly.</p>
                   
                  </div>
                </div>
              </div>

              <div className="col-6">
               <div className="card feature-card border-0 shadow-sm p-3 h-100 rounded-4" >
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Analytics</h5>
                   
                    <p className="card-text text-muted"> Visualize spending with simple insights.</p>
                   
                  </div>
                </div>
              </div>
              <div className="col-6">
               <div className="card feature-card border-0 shadow-sm p-3 h-100 rounded-4" >
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Budget Goals</h5>
                   
                    <p className="card-text text-muted">Manage monthly spending efficiently.</p>
                   
                  </div>
                </div>
              </div>
              <div className="col-6">
               <div className="card feature-card border-0 shadow-sm p-3 h-100 rounded-4" >
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Secure Access</h5>
                   
                    <p className="card-text text-muted">Protected authentication for your data.</p>
                   
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Features;
import React, { useState } from "react";
import transactions from "../data/transactions";
import "./../css/Dashboard.css";

function ExpenseChart(){

  const [budgets, setBudgets] =
    useState([

      {
        category: "Food",
        limit: 5000
      },

      {
        category: "Entertainment",
        limit: 4000
      },

      {
        category: "Shopping",
        limit: 8000
      }

    ]);

  /* =========================
     FORM STATES
  ========================= */

  const [category, setCategory] =
    useState("");

  const [limit, setLimit] =
    useState("");

  /* =========================
     ADD BUDGET
  ========================= */

  function handleAddBudget() {

    if (!category || !limit)
      return;

    const newBudget = {

      category,

      limit: Number(limit)

    };

    setBudgets([
      ...budgets,
      newBudget
    ]);

    setCategory("");

    setLimit("");
  }

  /* =========================
     CURRENT MONTH FILTER
  ========================= */

  const today = new Date();

  const currentMonth =
    today.getMonth();

  const currentYear =
    today.getFullYear();

  const currentMonthExpenses =
    transactions.filter((t) => {

      const date =
        new Date(t.date);

      return (

        t.type === "expense" &&

        date.getMonth() ===
        currentMonth &&

        date.getFullYear() ===
        currentYear

      );

    });

  /* =========================
     OVERVIEW CALCULATIONS
  ========================= */

  const totalBudget =
    budgets.reduce(
      (acc, curr) =>
        acc + curr.limit,
      0
    );

  const totalSpent =
    currentMonthExpenses.reduce(
      (acc, curr) =>
        acc + curr.amount,
      0
    );

  const remainingBudget =
    totalBudget - totalSpent;

  const usedPercentage =
    totalBudget > 0
    ?
    (
      totalSpent / totalBudget
    ) * 100
    :
    0;

  /* =========================
     CATEGORY BUDGET DATA
  ========================= */

  const categoryBudgets =
    budgets.map((item) => {

      const spent =
        currentMonthExpenses

          .filter(
            (t) =>
              t.category ===
              item.category
          )

          .reduce(
            (acc, curr) =>
              acc + curr.amount,
            0
          );

      const percentage =
        item.limit > 0
        ?
        (spent / item.limit) * 100
        :
        0;

      return {

        category:
          item.category,

        spent,

        limit:
          item.limit,

        percentage

      };

    });

  return (

    <div className="budgets-page">

      {/* =========================
          OVERVIEW CARD
      ========================= */}

      <div className="budget-overview-card mb-4">

        <div className="d-flex justify-content-between align-items-center flex-wrap gap-4">

          <div>

            <p className="budget-label">
              MONTHLY OVERVIEW
            </p>

            <h2 className="budget-main-heading">
              Budget Summary
            </h2>

            <p className="budget-subtitle">
              Monitor your monthly spending limits
            </p>

          </div>

          <div className="budget-circle">

            {
              usedPercentage.toFixed(0)
            }%

            <span>
              Used
            </span>

          </div>

        </div>

        {/* Stats */}
        <div className="row mt-4 g-4">

          <div className="col-md-4">

            <div className="budget-stat-card">

              <p>Total Budget</p>

              <h3>
                ₹{totalBudget}
              </h3>

            </div>

          </div>

          <div className="col-md-4">

            <div className="budget-stat-card">

              <p>Total Spent</p>

              <h3 className="text-danger">
                ₹{totalSpent}
              </h3>

            </div>

          </div>

          <div className="col-md-4">

            <div className="budget-stat-card">

              <p>Remaining</p>

              <h3 className="text-success">
                ₹{remainingBudget}
              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* =========================
          ADD BUDGET FORM
      ========================= */}

      <div className="budget-form-card mb-4">

        <h3 className="mb-4">
          Add Budget
        </h3>

        <div className="row g-3">

          {/* Category */}
          <div className="col-md-5">

            <input
              type="text"
              className="form-control"
              placeholder="Category"

              value={category}

              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
            />

          </div>

          {/* Limit */}
          <div className="col-md-5">

            <input
              type="number"
              className="form-control"
              placeholder="Budget Limit"

              value={limit}

              onChange={(e) =>
                setLimit(
                  e.target.value
                )
              }
            />

          </div>

          {/* Button */}
          <div className="col-md-2">

            <button
              className="add-budget-btn w-100"
              onClick={
                handleAddBudget
              }
            >

              Add

            </button>

          </div>

        </div>

      </div>

      {/* =========================
          CATEGORY BUDGET CARDS
      ========================= */}

      <div className="row g-4">

        {
          categoryBudgets.map(
            (item, index) => (

            <div
              className="col-md-6"
              key={index}
            >

              <div className="category-budget-card">

                <div className="d-flex justify-content-between align-items-center mb-3">

                  <div>

                    <h4 className="category-title">

                      {item.category}

                    </h4>

                    <p className="category-subtitle">

                      ₹{item.spent}

                      {" / "}

                      ₹{item.limit}

                    </p>

                  </div>

                  <h5
                    className={

                      item.percentage > 85

                      ?

                      "text-danger"

                      :

                      item.percentage > 60

                      ?

                      "text-warning"

                      :

                      "text-success"

                    }
                  >

                    {
                      item.percentage
                      .toFixed(0)
                    }%

                  </h5>

                </div>

                {/* Progress */}
                <div className="progress custom-progress">

                  <div
                    className={

                      item.percentage > 85

                      ?

                      "progress-bar bg-danger"

                      :

                      item.percentage > 60

                      ?

                      "progress-bar bg-warning"

                      :

                      "progress-bar bg-success"

                    }

                    style={{
                      width:
                        `${item.percentage}%`
                    }}
                  />

                </div>

              </div>

            </div>

          ))
        }

      </div>

    </div>
  );
}

export default ExpenseChart;
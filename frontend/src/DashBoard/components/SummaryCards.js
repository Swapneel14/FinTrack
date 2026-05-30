import React from "react";
import transactions from "../data/transactions";
import "./../css/Dashboard.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

function SummaryCards({
  setShowModal
}) {
  const today = new Date();
  const last30DaysTransactions = transactions.filter((t) => {
    const transactionDate = new Date(t.date);

    const diff = today - transactionDate;
    const diffDays = diff / (1000 * 60 * 60 * 24);

    return diffDays <= 30;
  })

  const totalExpense = transactions.filter((t) => {
    return t.type === "expense"
  }).reduce((acc, curr) => acc + curr.amount, 0);

  const totalIncome = transactions.filter((t) => {
    return t.type === "income"
  }).reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  //Making Pie Charts:-

  //for Expenses:-
  const expenseTransactions =
    last30DaysTransactions.filter(
      (t) => t.type === "expense"
    );

  const expenseData = [];

  expenseTransactions.forEach((transaction) => {

    const existscategory = expenseData.find((item) => item.name === transaction.category);

    if (existscategory) {
      existscategory.value += transaction.amount;
    }
    else {
      expenseData.push({
        name: transaction.category,
        value: transaction.amount
      })
    }
  });

  // Income Data
  const incomeTransactions =
    last30DaysTransactions.filter(
      (t) => t.type === "income"
    );

  const incomeData = [];

  incomeTransactions.forEach((transaction) => {

    const existingCategory =
      incomeData.find(
        (item) =>
          item.name === transaction.category
      );

    if (existingCategory) {

      existingCategory.value +=
        transaction.amount;

    } else {

      incomeData.push({
        name: transaction.category,
        value: transaction.amount,
      });

    }

  });
  //Expense Colors

  const COLORS = ["#3A86FF", "#2EC4B6", "#FF9F1C", "#43AA8B", "#577590", "#06D6A0", "#118AB2", "#80ED99",
    "#F77F00", "#4CAF50", "#00BBF9", "#70E000", "#8338EC", "#3F37C9", "#4895EF", "#4CC9F0",
    "#E9C46A", "#F4A261", "#2A9D8F", "#264653", "#8D99AE", "#52B788", "#40916C", "#1B4332"];

  const INCOME_COLORS = ["#2DC653", "#FFBE0B", "#3A86FF", "#06D6A0", "#4CC9F0", "#80ED99",
    "#4895EF", "#E9C46A", "#52B788", "#00B4D8", "#90BE6D", "#F4A261",
    "#43AA8B", "#577590", "#70E000", "#118AB2"];

  //Making Line Charts
  const trendData = [];

  last30DaysTransactions.forEach((transaction) => {

    if (transaction.type === "expense") {

      const existingDate =
        trendData.find(
          (item) =>
            item.date === transaction.date
        );

      if (existingDate) {

        existingDate.expense +=
          transaction.amount;

      } else {

        trendData.push({

          date:
            new Date(
              transaction.date
            ).toLocaleDateString(
              "en-IN",
              {
                day: "numeric",
                month: "short",
              }
            ),

          expense:
            transaction.amount,

        });

      }

    }

  });

  //Highest spending day:-
  let highestSpendingDay = trendData[0];

  trendData.forEach((day) => {

    if (
      day.expense >
      highestSpendingDay.expense
    ) {

      highestSpendingDay = day;

    }

  });

  //avg expenses
  const avgDailyExpense =
    Math.round(
      totalExpense / 30
    );
  const totalTransactions =
    last30DaysTransactions.length;

  //highest spending cat
  let topCategory = expenseData[0];

  expenseData.forEach((category) => {

    if (
      category.value >
      topCategory.value
    ) {

      topCategory = category;

    }

  });


  return (
    <>

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="dashboard-title">
            Financial Overview
          </h2>

          <p className="dashboard-subtitle">
            Last 30 Days Summary
          </p>

        </div>

        <button
          className="add-transaction-btn"
          onClick={() =>
            setShowModal(true)
          }
        >
          + Add Transaction
        </button>

      </div>
      <div className="row g-4">

        {/* Balance Card */}
        <div className="col-md-6">

          <div className="summary-card balance-card p-4 rounded-4">

            <div className="d-flex justify-content-between align-items-start">

              <div>
                <p className="summary-title mb-2">
                  Available Balance
                </p>

                <h1 className="summary-amount fw-bold">
                  ₹{balance}
                </h1>

                <p className="summary-subtitle">
                  Updated from last 30 days
                </p>
              </div>

              <div className="summary-icon">
                💰
              </div>

            </div>

          </div>

        </div>

        {/* Expense Card */}
        <div className="col-md-6">

          <div className="summary-card expense-card p-4 rounded-4">

            <div className="d-flex justify-content-between align-items-start">

              <div>
                <p className="summary-title mb-2">
                  Last 30 Days Expense
                </p>

                <h1 className="chart-heading mb-4">
                  ₹{totalExpense}
                </h1>

                <p className="summary-subtitle">
                  Total spending this month
                </p>
              </div>

              <div className="summary-icon">
                📉
              </div>

            </div>

          </div>

        </div>
        {/* new part */}


        <div className="row mt-4">
          {/* Expense PieChart */}
          <div className="col-md-6">

            <div className="summary-card p-4">

              <h4 className="chart-heading">
                Expense Categories
              </h4>

              <p className="chart-subheading">
                Spending distribution for last 30 days
              </p>

              <ResponsiveContainer
                width="100%"
                height={310}
              >

                <PieChart>

                  <Pie
                    data={expenseData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={95}
                    label
                  >

                    {expenseData.map(
                      (entry, index) => (

                        <Cell
                          key={index}
                          fill={
                            COLORS[
                            index % COLORS.length
                            ]
                          }
                        />

                      )
                    )}

                  </Pie>

                  <Tooltip />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* Income Pie Chart */}
          <div className="col-md-6">

            <div className="summary-card p-3">

              <h4 className="chart-heading">
                Income Categories
              </h4>

              <p className="chart-subheading">
                Spending distribution for last 30 days
              </p>

              <ResponsiveContainer
                width="100%"
                height={310}
              >

                <PieChart>

                  <Pie
                    data={incomeData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={95}
                    label
                  >

                    {incomeData.map((entry, index) => (

                      <Cell
                        key={index}
                        fill={
                          INCOME_COLORS[
                          index %
                          INCOME_COLORS.length
                          ]
                        }
                      />

                    ))}

                  </Pie>

                  <Tooltip />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>
          {/* Line Chart */}
          <div className="row mt-4">

            <div className="col-12">

              <div className="summary-card p-4">

                <h4 className="chart-heading">
                  Last 30 Days Expense Trend
                </h4>

                <p className="chart-subheading">
                  Daily expense overview
                </p>

                <ResponsiveContainer
                  width="100%"
                  height={350}
                >

                  <LineChart data={trendData}>

                    <CartesianGrid
                      strokeDasharray="3 3"
                    />

                    <XAxis dataKey="date" />

                    <YAxis />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="expense"
                      stroke="#3A86FF"
                      strokeWidth={3}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </div>

            {/* highest spending day */}
            <div className="mt-4">

              <div className="insight-card">

                <p className="insight-title">
                  Highest Spending Day
                </p>

                <h4 className="fw-bold">
                  {highestSpendingDay.date}
                </h4>

                <p className="insight-value">
                  ₹{highestSpendingDay.expense}
                </p>

              </div>

            </div>
            <div className="row mt-4 g-4">

              {/* Avg Expense */}
              <div className="col-md-4">

                <div className="quick-stat-card">

                  <p className="quick-stat-title">
                    Avg Daily Expense
                  </p>

                  <h3>
                    ₹{avgDailyExpense}
                  </h3>

                </div>

              </div>

              {/* Transactions */}
              <div className="col-md-4">

                <div className="quick-stat-card">

                  <p className="quick-stat-title">
                    Transactions
                  </p>

                  <h3>
                    {totalTransactions}
                  </h3>

                </div>

              </div>

              {/* Top Category */}
              <div className="col-md-4">

                <div className="quick-stat-card">

                  <p className="quick-stat-title">
                    Top Category
                  </p>

                  <h3>
                    {topCategory.name}
                  </h3>

                </div>

              </div>

            </div>




          </div>

        </div>

      </div>
    </>
  )
}

export default SummaryCards;
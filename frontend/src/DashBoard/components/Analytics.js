import React from "react";
import transactions from "../data/transactions";
import "./../css/Dashboard.css";

import {

  ResponsiveContainer,

  LineChart,
  Line,

  XAxis,
  YAxis,

  CartesianGrid,

  Tooltip,

  BarChart,
  Bar

} from "recharts";

function Analytics() {

  /* =========================
     LAST 30 DAYS
  ========================= */

  const today = new Date();

  const last30DaysTransactions =
    transactions.filter((t) => {

      const transactionDate =
        new Date(t.date);

      const diff =
        today - transactionDate;

      const diffDays =
        diff /
        (1000 * 60 * 60 * 24);

      return (
        diffDays >= 0 &&
        diffDays <= 30
      );

    });

  /* =========================
     DAILY SPENDING TREND
  ========================= */

  const expenseTransactions =
    last30DaysTransactions.filter(
      (t) =>
        t.type === "expense"
    );

  const trendMap = {};

  expenseTransactions.forEach(
    (transaction) => {

      const date =
        new Date(
          transaction.date
        ).toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "short"
          }
        );

      if (trendMap[date]) {

        trendMap[date] +=
          transaction.amount;

      } else {

        trendMap[date] =
          transaction.amount;

      }

    }
  );

  const trendData =
    Object.keys(trendMap).map(
      (date) => ({

        date,

        amount:
          trendMap[date]

      })
    );

  /* =========================
     HIGHEST SPENDING CATEGORY
  ========================= */

  const categoryMap = {};

  expenseTransactions.forEach(
    (transaction) => {

      if (
        categoryMap[
          transaction.category
        ]
      ) {

        categoryMap[
          transaction.category
        ] += transaction.amount;

      } else {

        categoryMap[
          transaction.category
        ] = transaction.amount;

      }

    }
  );

  let topCategory = "";
  let topCategoryAmount = 0;

  Object.keys(categoryMap).forEach(
    (category) => {

      if (
        categoryMap[category] >
        topCategoryAmount
      ) {

        topCategory =
          category;

        topCategoryAmount =
          categoryMap[category];

      }

    }
  );

  /* =========================
     HIGHEST SPENDING DAY
  ========================= */

  let highestDay = "";
  let highestAmount = 0;

  Object.keys(trendMap).forEach(
    (date) => {

      if (
        trendMap[date] >
        highestAmount
      ) {

        highestAmount =
          trendMap[date];

        highestDay = date;

      }

    }
  );

  /* =========================
     INCOME VS EXPENSE
  ========================= */

  const totalIncome =
    last30DaysTransactions

      .filter(
        (t) =>
          t.type === "income"
      )

      .reduce(
        (acc, curr) =>
          acc + curr.amount,
        0
      );

  const totalExpense =
    expenseTransactions.reduce(
      (acc, curr) =>
        acc + curr.amount,
      0
    );

  const comparisonData = [

    {
      name: "Income",
      amount: totalIncome
    },

    {
      name: "Expense",
      amount: totalExpense
    }

  ];

  /* =========================
     AVERAGE DAILY SPENDING
  ========================= */

  const averageDailySpending =
    totalExpense / 30;


/* =========================
   MONTH COMPARISON
========================= */

const currentMonthExpenses =
  transactions.filter((t) => {

    const date =
      new Date(t.date);

    return (

      t.type === "expense" &&

      date.getMonth() ===
      today.getMonth() &&

      date.getFullYear() ===
      today.getFullYear()

    );

  });

const previousMonthExpenses =
  transactions.filter((t) => {

    const date =
      new Date(t.date);

    return (

      t.type === "expense" &&

      date.getMonth() ===
      today.getMonth() - 1 &&

      date.getFullYear() ===
      today.getFullYear()

    );

  });

const currentMonthTotal =
  currentMonthExpenses.reduce(
    (acc, curr) =>
      acc + curr.amount,
    0
  );

const previousMonthTotal =
  previousMonthExpenses.reduce(
    (acc, curr) =>
      acc + curr.amount,
    0
  );

const expenseChangePercentage =

  previousMonthTotal > 0

  ?

  (
    (
      currentMonthTotal -
      previousMonthTotal
    )

    /

    previousMonthTotal

  ) * 100

  :

  0;

/* =========================
   MOST FREQUENT CATEGORY
========================= */

const frequencyMap = {};

expenseTransactions.forEach(
  (transaction) => {

    if (
      frequencyMap[
        transaction.category
      ]
    ) {

      frequencyMap[
        transaction.category
      ] += 1;

    } else {

      frequencyMap[
        transaction.category
      ] = 1;

    }

  }
);

let mostFrequentCategory = "";

let highestFrequency = 0;

Object.keys(frequencyMap)
  .forEach((category) => {

    if (
      frequencyMap[category] >
      highestFrequency
    ) {

      highestFrequency =
        frequencyMap[category];

      mostFrequentCategory =
        category;

    }

  });

/* =========================
   BIGGEST SINGLE EXPENSE
========================= */

const biggestExpense =
  expenseTransactions.reduce(

    (max, transaction) =>

      transaction.amount >
      max.amount

      ?

      transaction

      :

      max

  );

/* =========================
   SAVINGS RATE
========================= */

const savingsRate =

  totalIncome > 0

  ?

  (
    (
      totalIncome -
      totalExpense
    )

    /

    totalIncome

  ) * 100

  :

  0;

  return (

    <div className="analytics-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="analytics-header mb-4">

        <div>

          <p className="analytics-label">
            LAST 30 DAYS
          </p>

          <h2 className="analytics-heading">
            Financial Analytics
          </h2>

          <p className="analytics-subheading">
            Understand your spending patterns
          </p>

        </div>

      </div>

      {/* =========================
          TREND CHART
      ========================= */}

      <div className="analytics-card mb-4">

        <div className="mb-4">

          <h4 className="chart-heading">
            Spending Trend
          </h4>

          <p className="chart-subheading">
            Daily expense activity
          </p>

        </div>

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
              dataKey="amount"
              stroke="#3A86FF"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* =========================
          INSIGHT CARDS
      ========================= */}

      <div className="row g-4 mb-4">

        {/* Top Category */}
        <div className="col-md-4">

          <div className="insight-card">

            <p className="insight-title">
              Top Category
            </p>

            <h3>
              {topCategory}
            </h3>

            <span>
              ₹{topCategoryAmount}
            </span>

          </div>

        </div>

        {/* Highest Day */}
        <div className="col-md-4">

          <div className="insight-card">

            <p className="insight-title">
              Highest Spending Day
            </p>

            <h3>
              {highestDay}
            </h3>

            <span>
              ₹{highestAmount}
            </span>

          </div>

        </div>

        {/* Average Spending */}
        <div className="col-md-4">

          <div className="insight-card">

            <p className="insight-title">
              Average Daily Spending
            </p>

            <h3>
              ₹{
                averageDailySpending
                .toFixed(0)
              }
            </h3>

            <span>
              Per Day
            </span>

          </div>

        </div>

      </div>

      {/* =========================
          COMPARISON CHART
      ========================= */}

      <div className="analytics-card">

        <div className="mb-4">

          <h4 className="chart-heading">
            Income vs Expense
          </h4>

          <p className="chart-subheading">
            Financial comparison overview
          </p>

        </div>

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <BarChart
            data={comparisonData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="amount"
              fill="#06D6A0"
              radius={[10,10,0,0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>
      <div className="row g-4 mb-4">

  {/* Month Comparison */}
  <div className="col-md-6">

    <div className="insight-card">

      <p className="insight-title">
        Monthly Expense Change
      </p>

      <h3>

        {
          expenseChangePercentage > 0
          ?
          "+"
          :
          ""
        }

        {
          expenseChangePercentage
          .toFixed(1)
        }%

      </h3>

      <span>

        Compared to last month

      </span>

    </div>

  </div>

  {/* Savings Rate */}
  <div className="col-md-6">

    <div className="insight-card">

      <p className="insight-title">
        Savings Rate
      </p>

      <h3>

        {
          savingsRate
          .toFixed(0)
        }%

      </h3>

      <span>

        Income saved this month

      </span>

    </div>

  </div>

</div>

{/* SECOND ROW */}

<div className="row g-4 mb-4">

  {/* Most Frequent */}
  <div className="col-md-6">

    <div className="insight-card">

      <p className="insight-title">
        Most Frequent Category
      </p>

      <h3>

        {
          mostFrequentCategory
        }

      </h3>

      <span>

        {
          highestFrequency
        } transactions

      </span>

    </div>

  </div>

  {/* Biggest Expense !*/}
  <div className="col-md-6">

    <div className="insight-card">

      <p className="insight-title">
        Biggest Expense
      </p>

      <h3>

        ₹{
          biggestExpense.amount
        }

      </h3>

      <span>

        {
          biggestExpense.name
        }

      </span>

    </div>

  </div>

</div>

    </div>
  );
}

export default Analytics;
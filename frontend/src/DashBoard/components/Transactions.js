import React from "react";
import transactions from "../data/transactions";
import "./../css/Dashboard.css";

function Transactions(){

   const today = new Date();

const last30DaysTransactions =
  transactions.filter((transaction) => {

    const transactionDate =
      new Date(transaction.date);

    const diff =
      today - transactionDate;

    const diffDays =
      diff / (1000 * 60 * 60 * 24);

    return (
      diffDays >= 0 &&
      diffDays <= 30
    );

  });

const sortedTransactions =
  [...last30DaysTransactions].sort(
    (a, b) =>
      new Date(b.date) -
      new Date(a.date)
  );

    return (
        <>
         <div className="transactions-page">

      {/* Heading */}
      <div className="transactions-topbar mb-4">

  <div>

    <p className="transactions-label mb-2">
      LAST 30 DAYS
    </p>

    <h2 className="transactions-heading mb-1">
      Recent Transactions
    </h2>

    <p className="transactions-subheading mb-0">
      Monitor your latest income and expenses activity
    </p>

  </div>

  <div className="transactions-count">

    {sortedTransactions.length}

    <span>
      Transactions
    </span>

  </div>

</div>

      {/* Table */}
      <div className="transactions-table">

        {/* Header */}
        <div className="transaction-row transaction-header">

          <div>Name</div>

          <div>Category</div>

          <div>Date</div>

          <div>Type</div>

          <div>Amount</div>

        </div>

        {/* Transactions */}
        {sortedTransactions.map((transaction) => (

          <div
            className="transaction-row"
            key={transaction.id}
          >

            {/* Name */}
            <div className="transaction-name">

              {transaction.name}

            </div>

            {/* Category */}
            <div>

              <span className="transaction-category">

                {transaction.category}

              </span>

            </div>

            {/* Date */}
            <div className="transaction-date">

              {
                new Date(
                  transaction.date
                ).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                )
              }

            </div>

            {/* Type */}
            <div>

              <span
                className={
                  transaction.type ===
                  "expense"
                  ?
                  "transaction-type expense"
                  :
                  "transaction-type income"
                }
              >

                {transaction.type}

              </span>

            </div>

            {/* Amount */}
            <div
              className={
                transaction.type ===
                "expense"
                ?
                "transaction-amount expense-text"
                :
                "transaction-amount income-text"
              }
            >

              {
                transaction.type ===
                "expense"
                ? "-"
                : "+"
              }

              ₹{transaction.amount}

            </div>

          </div>

        ))}

      </div>

    </div>
        </>
    )
}

export default Transactions;
import React from "react";
import transactions from "../data/transactions";
import "./../css/Dashboard.css";


function SummaryCards(){
    const today = new Date();
    const last30DaysTransactions = transactions.filter((t)=>{
        const transactionDate = new Date(t.date);

        const diff = today - transactionDate;
        const diffDays = diff/(1000*60*60*24);

        return diffDays<=30;
    })

    const totalExpense = transactions.filter((t)=>{
       return  t.type==="expense"
    }).reduce((acc,curr)=>acc+curr.amount,0);

    const totalIncome = transactions.filter((t)=>{
        return t.type==="income"
    }).reduce((acc,curr)=>acc+curr.amount,0);

    const balance = totalIncome-totalExpense;

    return (
        <>
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

          <h1 className="summary-amount fw-bold">
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

</div>
        </>
    )
}

export default SummaryCards;
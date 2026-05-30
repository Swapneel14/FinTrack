import React, { useState } from "react";

function AddTransactionModal({
  show,
  onClose,
}) {
  const [formData, setFormData] =
    useState({
      type: "expense",
      category: "",
      amount: "",
      date: "",
      description: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="transaction-modal">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Add Transaction</h3>

          <button
            onClick={onClose}
            className="close-btn"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label>Type</label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="form-control"
            >
              <option value="income">
                Income
              </option>

              <option value="expense">
                Expense
              </option>
            </select>
          </div>

          <div className="mb-3">
            <label>Category</label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label>Amount</label>

            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label>Date</label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-4">
            <label>Description</label>

            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Save Transaction
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddTransactionModal;
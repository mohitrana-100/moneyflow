import { useState } from "react";
import { formatCurrency } from "../utils/currency";


function TransactionList({
  transactions,
  onDeleteTransaction,
  onEditTransaction,
  currency
}) {

  // =========================
  // EDIT STATE
  // =========================

  const [editingId, setEditingId] = useState(null);

  const [editTitle, setEditTitle] = useState("");

  const [editAmount, setEditAmount] = useState("");

  const [editType, setEditType] = useState("expense");


  // =========================
  // SEARCH STATE
  // =========================

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");


  // =========================
  // START EDITING
  // =========================

  function startEditing(transaction) {

    setEditingId(transaction.id);

    setEditTitle(transaction.title);

    setEditAmount(transaction.amount);

    setEditType(transaction.type);

  }


  // =========================
  // CANCEL EDITING
  // =========================

  function cancelEditing() {

    setEditingId(null);

  }


  // =========================
  // SAVE EDIT
  // =========================

  function saveEdit(id) {

    if (editTitle.trim() === "") {
      return;
    }

    if (editAmount <= 0) {
      return;
    }


    const updatedTransaction = {

      id: id,

      title: editTitle,

      amount: Number(editAmount),

      type: editType

    };


    onEditTransaction(updatedTransaction);

    setEditingId(null);

  }


  // =========================
  // SEARCH + FILTER
  // =========================

  const filteredTransactions = transactions.filter(
    (transaction) => {

      // Search by title
      const matchesSearch =
        transaction.title
          .toLowerCase()
          .includes(search.toLowerCase());


      // Filter by transaction type
      const matchesFilter =
        filter === "all" ||
        transaction.type === filter;


      return matchesSearch && matchesFilter;

    }
  );


  return (

    <div className="transaction-list">


      {/* =========================
          HEADER
      ========================= */}

      <div className="transaction-list-header">

        <h2>
          Recent Transactions
        </h2>


        {/* SEARCH BOX */}

        <input
          className="search-input"
          type="text"
          placeholder="🔎 Search transactions..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>


      {/* =========================
          FILTER BUTTONS
      ========================= */}

      <div className="filter-buttons">

        <button
          className={filter === "all" ? "active-filter" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>


        <button
          className={filter === "income" ? "active-filter" : ""}
          onClick={() => setFilter("income")}
        >
          📈 Income
        </button>


        <button
          className={filter === "expense" ? "active-filter" : ""}
          onClick={() => setFilter("expense")}
        >
          💸 Expenses
        </button>

      </div>


      {/* =========================
          TRANSACTIONS
      ========================= */}

      {transactions.length === 0 ? (

        <p className="empty-message">
          No transactions yet.
        </p>

      ) : filteredTransactions.length === 0 ? (

        <p className="empty-message">
          No matching transactions found.
        </p>

      ) : (

        <div className="transactions">

          {filteredTransactions.map((transaction) => (

            <div
              className="transaction-item"
              key={transaction.id}
            >


              {/* =========================
                  EDIT MODE
              ========================= */}

              {editingId === transaction.id ? (

                <div className="edit-form">

                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) =>
                      setEditTitle(e.target.value)
                    }
                  />


                  <input
                    type="number"
                    value={editAmount}
                    onChange={(e) =>
                      setEditAmount(e.target.value)
                    }
                  />


                  <div className="edit-type">

                    <label>

                      <input
                        type="radio"
                        value="income"
                        checked={editType === "income"}
                        onChange={(e) =>
                          setEditType(e.target.value)
                        }
                      />

                      Income

                    </label>


                    <label>

                      <input
                        type="radio"
                        value="expense"
                        checked={editType === "expense"}
                        onChange={(e) =>
                          setEditType(e.target.value)
                        }
                      />

                      Expense

                    </label>

                  </div>


                  <div className="edit-buttons">

                    <button
                      className="save-button"
                      onClick={() =>
                        saveEdit(transaction.id)
                      }
                    >
                      Save
                    </button>


                    <button
                      className="cancel-button"
                      onClick={cancelEditing}
                    >
                      Cancel
                    </button>

                  </div>

                </div>

              ) : (

                /* =========================
                   NORMAL MODE
                ========================= */

                <>

                  <div className="transaction-info">

                    <div className="transaction-icon">

                      {transaction.type === "income"
                        ? "📈"
                        : "💸"}

                    </div>


                    <div>

                      <h3>
                        {transaction.title}
                      </h3>


                      <p>

                        {transaction.type === "income"
                          ? "Income"
                          : "Expense"}

                        </p>
                      <small>
    📅 {transaction.date}
  </small>


                    </div>

                  </div>


                  <div className="transaction-actions">

                    <div
                      className={
                        transaction.type === "income"
                          ? "transaction-amount income"
                          : "transaction-amount expense"
                      }
                    >

                      {transaction.type === "income"
                        ? "+"
                        : "-"}

                      {formatCurrency(transaction.amount, currency)}

                    </div>


                    {/* EDIT BUTTON */}

                    <button
                      className="edit-button"
                      onClick={() =>
                        startEditing(transaction)
                      }
                    >
                      ✏️
                    </button>


                    {/* DELETE BUTTON */}

                    <button
                      className="delete-button"
                      onClick={() =>
                        onDeleteTransaction(transaction.id)
                      }
                    >
                      🗑️
                    </button>

                  </div>

                </>

              )}

            </div>

          ))}

        </div>

      )}

    </div>

  );
}

export default TransactionList;
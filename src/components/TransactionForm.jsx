
import { useState } from "react";

function TransactionForm({ onAddTransaction }) {

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  // New: transaction date
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );


  function handleSubmit(e) {

    e.preventDefault();

    // Don't allow empty title
    if (title.trim() === "") {
      return;
    }

    // Don't allow invalid amount
    if (amount <= 0) {
      return;
    }


    const newTransaction = {

      id: Date.now(),

      title: title.trim(),

      amount: Number(amount),

      type: type,

      date: date

    };


    onAddTransaction(newTransaction);


    // Clear form
    setTitle("");
    setAmount("");

    // Keep today's date after adding
    setDate(
      new Date().toISOString().split("T")[0]
    );

  }


  return (

    <div className="transaction-form">

      <h2>
        Add Transaction
      </h2>


      <form onSubmit={handleSubmit}>


        {/* TITLE */}

        <div className="form-group">

          <label>
            Transaction
          </label>

          <input
            type="text"
            placeholder="e.g. Salary, Food, Shopping..."
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

        </div>


        {/* AMOUNT */}

        <div className="form-group">

          <label>
            Amount
          </label>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
          />

        </div>


        {/* TYPE */}

        <div className="form-group">

          <label>
            Transaction Type
          </label>


          <div className="type-buttons">

            <button
              type="button"
              className={
                type === "income"
                  ? "type-button active-income"
                  : "type-button"
              }
              onClick={() =>
                setType("income")
              }
            >
              {type === "income" && "✓ "}
              📈 Income
            </button>


            <button
              type="button"
              className={
                type === "expense"
                  ? "type-button active-expense"
                  : "type-button"
              }
              onClick={() =>
                setType("expense")
              }
            >
              {type === "expense" && "✓ "}
              💸 Expense
            </button>

          </div>

        </div>


        {/* DATE */}

        <div className="form-group">

          <label>
            Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
          />

        </div>


        {/* SUBMIT */}

        <button
          type="submit"
          className="add-transaction-button"
        >
          ➕ Add Transaction
        </button>


      </form>

    </div>

  );
}

export default TransactionForm;

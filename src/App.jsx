import Settings from "./components/Settings";
import { useEffect, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Analytics from "./components/Analytics";
import TransactionForm from "./components/TransactionForm";

import "./App.css";

function App() {

  const [transactions, setTransactions] = useState(() => {

    const savedTransactions =
      localStorage.getItem(
        "moneyflow-transactions"
      );

    if (savedTransactions) {
      return JSON.parse(savedTransactions);
    }

    return [
      {
        id: 1,
        title: "Freelance Project",
        amount: 8000,
        type: "income",
      },

      {
        id: 2,
        title: "Shopping",
        amount: 1200,
        type: "expense",
      },

      {
        id: 3,
        title: "Food",
        amount: 450,
        type: "expense",
      },

      {
        id: 4,
        title: "Salary",
        amount: 32000,
        type: "income",
      },
    ];

  });

  // Save transactions
  useEffect(() => {

    localStorage.setItem(
      "moneyflow-transactions",
      JSON.stringify(transactions)
    );

  }, [transactions]);


  // Currency
  const [currency, setCurrency] = useState(() => {

    const savedCurrency =
      localStorage.getItem("moneyflow-currency");

    return savedCurrency || "INR";

  });


  // Save currency
  useEffect(() => {

    localStorage.setItem(
      "moneyflow-currency",
      currency
    );

  }, [currency]);


  // Add
  function addTransaction(newTransaction) {

    setTransactions([
      ...transactions,
      newTransaction
    ]);

  }


  // Delete
  function deleteTransaction(id) {

    setTransactions(
      transactions.filter(
        transaction =>
          transaction.id !== id
      )
    );

  }


  // Clear all
  function clearTransactions() {

    setTransactions([]);

    localStorage.removeItem(
      "moneyflow-transactions"
    );

  }


  // Edit
  function editTransaction(updatedTransaction) {

    setTransactions(

      transactions.map(transaction => {

        if (
          transaction.id ===
          updatedTransaction.id
        ) {

          return {
            ...transaction,
            ...updatedTransaction
          };

        }

        return transaction;

      })

    );

  }


  return (

    <BrowserRouter>

      <div className="app">

        <Navbar />

        <div className="layout">

          <Sidebar />

          <div className="main-content">

  <div className="page-content">

    <Routes>

      {/* DASHBOARD */}
      <Route
        path="/"
        element={
          <div className="dashboard-page">

            <Dashboard
              transactions={transactions}
              onDeleteTransaction={
                deleteTransaction
              }
              onEditTransaction={
                editTransaction
              }
              currency={currency}
            />

            <TransactionForm
              onAddTransaction={
                addTransaction
              }
            />

          </div>
        }
      />

      {/* ANALYTICS */}
      <Route
        path="/analytics"
        element={
          <Analytics
            transactions={transactions}
            currency={currency}
          />
        }
      />

      {/* SETTINGS */}
      <Route
        path="/settings"
        element={
          <Settings
            currency={currency}
            setCurrency={setCurrency}
            onClearTransactions={
              clearTransactions
            }
          />
        }
      />

    </Routes>

  </div>

</div>

        </div>

      </div>

    </BrowserRouter>

  );

}
0
export default App;
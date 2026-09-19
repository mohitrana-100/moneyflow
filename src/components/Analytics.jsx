import { formatCurrency } from "../utils/currency";
import { useMemo, useState } from "react";
import AnalyticsCharts from "./AnalyticsCharts";


function Analytics({ transactions, currency }) {

  // ==========================================
  // AVAILABLE MONTHS
  // ==========================================

  const availableMonths = useMemo(() => {

    const months = [
      ...new Set(
        transactions
          .filter(transaction => transaction.date)
          .map(transaction =>
            transaction.date.slice(0, 7)
          )
      )
    ];

    return months.sort().reverse();

  }, [transactions]);


  // ==========================================
  // CURRENT MONTH
  // ==========================================

  const currentMonth =
    new Date().toISOString().slice(0, 7);


  const [selectedMonth, setSelectedMonth] =
    useState(
      availableMonths.includes(currentMonth)
        ? currentMonth
        : availableMonths[0] || currentMonth
    );


  // ==========================================
  // SELECTED MONTH TRANSACTIONS
  // ==========================================

  const filteredTransactions =
    transactions.filter(transaction =>
      transaction.date?.startsWith(selectedMonth)
    );


  // ==========================================
  // PREVIOUS TRANSACTIONS
  // ==========================================

  const previousTransactions =
    transactions.filter(transaction => {

      if (!transaction.date) return false;

      return transaction.date.slice(0, 7) <
        selectedMonth;

    });


  // ==========================================
  // OPENING BALANCE
  // ==========================================

  const openingBalance =
    previousTransactions.reduce(
      (balance, transaction) => {

        const amount =
          Number(transaction.amount);

        if (transaction.type === "income") {

          return balance + amount;

        }

        return balance - amount;

      },
      0
    );


  // ==========================================
  // MONTHLY INCOME
  // ==========================================

  const income =
    filteredTransactions
      .filter(
        transaction =>
          transaction.type === "income"
      )
      .reduce(
        (total, transaction) =>
          total + Number(transaction.amount),
        0
      );


  // ==========================================
  // MONTHLY EXPENSE
  // ==========================================

  const expenses =
    filteredTransactions
      .filter(
        transaction =>
          transaction.type === "expense"
      )
      .reduce(
        (total, transaction) =>
          total + Number(transaction.amount),
        0
      );


  // ==========================================
  // ACTUAL MONTH END BALANCE
  // ==========================================

  const balance =
    openingBalance +
    income -
    expenses;


  // ==========================================
  // FORMAT MONTH
  // ==========================================

  const formattedMonth =
    new Date(
      `${selectedMonth}-01`
    ).toLocaleDateString(
      "en-IN",
      {
        month: "long",
        year: "numeric"
      }
    );


  return (

    <main className="analytics">

      {/* =================================
          HEADER
      ================================= */}

      <div className="analytics-header">

        <div>

          <p className="analytics-label">
            FINANCIAL OVERVIEW
          </p>

          <h1>
            Analytics 📊
          </h1>

          <p>
            Your financial activity for{" "}
            <strong>
              {formattedMonth}
            </strong>
          </p>

        </div>


        {/* MONTH SELECTOR */}

        <div className="month-selector">

          <label>
            VIEWING
          </label>

          <select
            value={selectedMonth}
            onChange={(e) =>
              setSelectedMonth(e.target.value)
            }
          >

            {availableMonths.length === 0 ? (

              <option value={currentMonth}>
                {formattedMonth}
              </option>

            ) : (

              availableMonths.map(month => (

                <option
                  key={month}
                  value={month}
                >

                  {new Date(
                    `${month}-01`
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      month: "long",
                      year: "numeric"
                    }
                  )}

                </option>

              ))

            )}

          </select>

        </div>

      </div>


      {/* =================================
          SUMMARY CARDS
      ================================= */}

      <div className="analytics-summary">


        {/* BALANCE */}

        <div className="analytics-card">

          <div className="analytics-card-top">

            <span>
              Balance
            </span>

            <span className="analytics-icon">
              💰
            </span>

          </div>

          <h2>
            {formatCurrency(balance, currency)}
          </h2>

          <p className="analytics-card-description">

            After {formattedMonth}

          </p>

        </div>


        {/* INCOME */}

        <div className="analytics-card">

          <div className="analytics-card-top">

            <span>
              Income
            </span>

            <span className="analytics-icon">
              📈
            </span>

          </div>

          <h2 className="income-text">

            +{formatCurrency(income, currency)}

          </h2>

          <p className="analytics-card-description">

            During {formattedMonth}

          </p>

        </div>


        {/* EXPENSE */}

        <div className="analytics-card">

          <div className="analytics-card-top">

            <span>
              Expenses
            </span>

            <span className="analytics-icon">
              💸
            </span>

          </div>

          <h2 className="expense-text">

            -{formatCurrency(expenses, currency)}

          </h2>

          <p className="analytics-card-description">

            During {formattedMonth}

          </p>

        </div>

      </div>


      {/* =================================
          OPENING BALANCE INFORMATION
      ================================= */}

      <div className="opening-balance-card">

        <div className="opening-balance-icon">
          🏦
        </div>

        <div>

          <span>
            Opening Balance
          </span>

          <strong>
            {formatCurrency(openingBalance, currency)}
          </strong>

        </div>

      </div>


      {/* =================================
          CHARTS
      ================================= */}

      <AnalyticsCharts
        transactions={filteredTransactions}
        openingBalance={openingBalance}
        currency={currency}
      />


      {/* =================================
          EMPTY STATE
      ================================= */}

      {filteredTransactions.length === 0 && (

        <div className="analytics-empty">

          <span>
            📭
          </span>

          <h3>
            No transactions
          </h3>

          <p>
            There are no transactions
            for {formattedMonth}.
          </p>

        </div>

      )}

    </main>

  );

}


export default Analytics;
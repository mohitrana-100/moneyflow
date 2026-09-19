import StatCard from "./StatCard";
import TransactionList from "./TransactionList";
import { formatCurrency } from "../utils/currency";

function Dashboard({
  transactions,
  onDeleteTransaction,
  onEditTransaction,
  currency
}) {

  const income = transactions.reduce(
    (total, transaction) => {

      if (transaction.type === "income") {
        return total + transaction.amount;
      }

      return total;

    },
    0
  );


  const expenses = transactions.reduce(
    (total, transaction) => {

      if (transaction.type === "expense") {
        return total + transaction.amount;
      }

      return total;

    },
    0
  );


  const balance = income - expenses;


  return (

    <main className="dashboard">

      <div className="welcome">

        <h1>
          Welcome back 👋
        </h1>

        <p>
          Here's what's happening with your money.
        </p>

      </div>


      <div className="stats">

        <StatCard
          title="Total Balance"
          amount={formatCurrency(balance, currency)}
          icon="💰"
        />

        <StatCard
          title="Income"
          amount={formatCurrency(income, currency)}
          icon="📈"
        />

        <StatCard
          title="Expenses"
          amount={formatCurrency(expenses, currency)}
          icon="💸"
        />

      </div>


      <TransactionList
        transactions={transactions}
        onDeleteTransaction={onDeleteTransaction}
        onEditTransaction={onEditTransaction}
        currency={currency}
      />

    </main>

  );

}

export default Dashboard;
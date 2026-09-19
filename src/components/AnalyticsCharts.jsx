
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";


/* =========================================
   MONEY FLOW CHART
========================================= */

function MoneyFlowChart({ transactions }) {

  const dailyData = {};


  transactions.forEach(transaction => {

    if (!transaction.date) return;


    if (!dailyData[transaction.date]) {

      dailyData[transaction.date] = {
        date: transaction.date,
        income: 0,
        expense: 0,
      };

    }


    if (transaction.type === "income") {

      dailyData[transaction.date].income +=
        Number(transaction.amount);

    } else {

      dailyData[transaction.date].expense +=
        Number(transaction.amount);

    }

  });


  const chartData =
    Object.values(dailyData)
      .sort(
        (a, b) =>
          new Date(a.date) -
          new Date(b.date)
      )
      .map(item => ({

        ...item,

        displayDate:
          new Date(
            item.date
          ).toLocaleDateString(
            "en-IN",
            {
              day: "numeric",
              month: "short",
            }
          )

      }));


  return (

    <div className="chart-card">

      <div className="chart-header">

        <div>

          <span className="chart-label">
            MONEY FLOW
          </span>

          <h2>
            Income vs Expenses
          </h2>

          <p>
            Compare your money coming in
            and going out.
          </p>

        </div>

      </div>


      <div className="chart-container">

        {chartData.length === 0 ? (

          <div className="chart-empty">

            <span>
              📊
            </span>

            <p>
              Add transactions to see
              your money flow.
            </p>

          </div>

        ) : (

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >

              <CartesianGrid
                vertical={false}
                stroke="#ffffff"
                strokeOpacity={0.06}
              />


              <XAxis
                dataKey="displayDate"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#7d8495",
                  fontSize: 12,
                }}
              />


              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#7d8495",
                  fontSize: 12,
                }}
                tickFormatter={value =>
                  `₹${value}`
                }
              />


              <Tooltip
                cursor={{
                  fill: "#ffffff",
                  fillOpacity: 0.04,
                }}

                contentStyle={{
                  background: "#181c25",
                  border:
                    "1px solid #303544",
                  borderRadius: "12px",
                  color: "#ffffff",
                }}

                formatter={(value, name) => [

                  `₹${Number(value)
                    .toLocaleString("en-IN")}`,

                  name === "income"
                    ? "Income"
                    : "Expenses"

                ]}

              />


              <Bar
                dataKey="income"
                fill="#4ade80"
                radius={[6, 6, 0, 0]}
                maxBarSize={25}
              />


              <Bar
                dataKey="expense"
                fill="#f87171"
                radius={[6, 6, 0, 0]}
                maxBarSize={25}
              />

            </BarChart>

          </ResponsiveContainer>

        )}

      </div>


      <div className="chart-legend">

        <div>

          <span className="legend-dot income-dot" />

          Income

        </div>


        <div>

          <span className="legend-dot expense-dot" />

          Expenses

        </div>

      </div>

    </div>

  );
}


/* =========================================
   BALANCE TREND
========================================= */

function BalanceTrend({
  transactions,
  openingBalance
}) {

  const sortedTransactions =
    [...transactions].sort(
      (a, b) =>
        new Date(a.date) -
        new Date(b.date)
    );


  // =========================================
  // START WITH OPENING BALANCE
  // =========================================

  let runningBalance =
    Number(openingBalance) || 0;


  const balanceData = [

    {
      displayDate: "Opening",

      balance: runningBalance,

    }

  ];


  // =========================================
  // CALCULATE BALANCE AFTER EACH TRANSACTION
  // =========================================

  sortedTransactions.forEach(
    transaction => {

      const amount =
        Number(transaction.amount);


      if (transaction.type === "income") {

        runningBalance += amount;

      } else {

        runningBalance -= amount;

      }


      balanceData.push({

        displayDate:
          new Date(
            transaction.date
          ).toLocaleDateString(
            "en-IN",
            {
              day: "numeric",
              month: "short",
            }
          ),

        balance:
          runningBalance,

      });

    }
  );


  return (

    <div className="chart-card">

      <div className="chart-header">

        <div>

          <span className="chart-label">
            BALANCE
          </span>

          <h2>
            Balance Trend
          </h2>

          <p>
            Track your balance throughout
            the selected month.
          </p>

        </div>

      </div>


      <div className="chart-container">

        {sortedTransactions.length === 0 ? (

          <div className="chart-empty">

            <span>
              💰
            </span>

            <p>
              No balance activity
              this month.
            </p>

          </div>

        ) : (

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart
              data={balanceData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >

              <defs>

                <linearGradient
                  id="balanceGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="0%"
                    stopColor="#7c83fd"
                    stopOpacity={0.35}
                  />

                  <stop
                    offset="100%"
                    stopColor="#7c83fd"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>


              <CartesianGrid
                vertical={false}
                stroke="#ffffff"
                strokeOpacity={0.06}
              />


              <XAxis
                dataKey="displayDate"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#7d8495",
                  fontSize: 12,
                }}
              />


              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#7d8495",
                  fontSize: 12,
                }}
                tickFormatter={value =>
                  `₹${value}`
                }
              />


              <Tooltip
                contentStyle={{
                  background: "#181c25",
                  border:
                    "1px solid #303544",
                  borderRadius: "12px",
                  color: "#ffffff",
                }}

                formatter={value => [

                  `₹${Number(value)
                    .toLocaleString("en-IN")}`,

                  "Balance"

                ]}

              />


              <Area
                type="monotone"
                dataKey="balance"
                stroke="#7c83fd"
                strokeWidth={3}
                fill="url(#balanceGradient)"
                dot={false}
                activeDot={{
                  r: 6,
                }}
              />

            </AreaChart>

          </ResponsiveContainer>

        )}

      </div>

    </div>

  );
}


/* =========================================
   MAIN COMPONENT
========================================= */

function AnalyticsCharts({
  transactions,
  openingBalance
}) {

  return (

    <div className="analytics-charts">

      <MoneyFlowChart
        transactions={transactions}
      />


      <BalanceTrend
        transactions={transactions}
        openingBalance={openingBalance}
      />

    </div>

  );

}


export default AnalyticsCharts;


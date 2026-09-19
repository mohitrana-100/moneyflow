function Settings({
  currency,
  setCurrency,
  onClearTransactions
}) {

  return (

    <main className="settings-page">

      <div className="settings-header">

        <h1>Settings ⚙️</h1>

        <p>
          Customize your MoneyFlow experience.
        </p>

      </div>


      <div className="settings-container">


        {/* Currency */}

        <section className="settings-card">

          <div className="settings-card-info">

            <div className="settings-icon">
              💱
            </div>

            <div>

              <h2>Currency</h2>

              <p>
                Choose the currency used throughout
                your dashboard.
              </p>

            </div>

          </div>


          <select
            value={currency}
            onChange={(e) =>
              setCurrency(e.target.value)
            }
            className="currency-select"
          >

            <option value="INR">
              🇮🇳 Indian Rupee (₹)
            </option>

            <option value="USD">
              🇺🇸 US Dollar ($)
            </option>

            <option value="EUR">
              🇪🇺 Euro (€)
            </option>

            <option value="GBP">
              🇬🇧 British Pound (£)
            </option>

            <option value="JPY">
              🇯🇵 Japanese Yen (¥)
            </option>

          </select>

        </section>


        {/* Data */}

        <section className="settings-card danger-card">

          <div className="settings-card-info">

            <div className="settings-icon">
              🗑️
            </div>

            <div>

              <h2>Clear Transactions</h2>

              <p>
                Permanently remove all saved
                transactions from MoneyFlow.
              </p>

            </div>

          </div>


          <button
            className="clear-data-btn"
            onClick={onClearTransactions}
          >
            Clear All
          </button>

        </section>


        {/* About */}

        <section className="settings-card">

          <div className="settings-card-info">

            <div className="settings-icon">
              💰
            </div>

            <div>

              <h2>MoneyFlow</h2>

              <p>
                Your personal finance tracking dashboard.
              </p>

            </div>

          </div>

        </section>


      </div>

    </main>

  );

}

export default Settings;
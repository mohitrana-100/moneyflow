import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      {/* Logo / Title */}
      <div className="sidebar-title">
        <span className="sidebar-logo">M</span>
        <span>MoneyFlow</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          <span className="nav-icon">🏠</span>
          <span>Dashboard</span>
        </NavLink>


        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          <span className="nav-icon">📊</span>
          <span>Analytics</span>
        </NavLink>


        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          <span className="nav-icon">⚙️</span>
          <span>Settings</span>
        </NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;
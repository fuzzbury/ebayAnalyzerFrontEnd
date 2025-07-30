import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h2>eBay LEGO Analyzer</h2>
      </div>
      <ul className="sidebar-nav">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/inventory" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Inventory
          </NavLink>
        </li>
        <li>
          <NavLink to="/lego-sets" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            LEGO Sets
          </NavLink>
        </li>
        <li>
          <NavLink to="/stats" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Statistics
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
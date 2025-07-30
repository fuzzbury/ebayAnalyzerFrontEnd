import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavLink, Outlet } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import './App.css'

// Simple Layout component with working sidebar
function Layout() {
  return (
    <div className="app-layout">
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
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

// Simple placeholder components
function Inventory() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Inventory</h1>
      <p>Inventory page - API integration coming soon</p>
    </div>
  );
}

function LegoSets() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>LEGO Sets</h1>
      <p>LEGO Sets page - API integration coming soon</p>
    </div>
  );
}

function Stats() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Statistics</h1>
      <p>Statistics page - API integration coming soon</p>
    </div>
  );
}

function App() {
  console.log('App component rendering with router');
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="lego-sets" element={<LegoSets />} />
          <Route path="stats" element={<Stats />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App

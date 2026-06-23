import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function buildApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`
  }

  return 'http://localhost:8000/api'
}

function App() {
  const apiBaseUrl = buildApiBaseUrl()
  const isCodespaceConfigured = Boolean(import.meta.env.VITE_CODESPACE_NAME?.trim())

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="h3 mb-3">Octofit Tracker</h1>
        <p className="mb-2 text-secondary">React 19 presentation tier for the Octofit multi-tier app.</p>
        {!isCodespaceConfigured && (
          <div className="alert alert-warning py-2 mb-3" role="alert">
            VITE_CODESPACE_NAME is not set. Using localhost fallback for API requests.
          </div>
        )}
        <div className="small text-secondary mb-3">API base URL: {apiBaseUrl}</div>
        <nav className="nav nav-pills gap-2 flex-wrap">
          <NavLink
            to="/users"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : 'link-secondary'}`}
          >
            Users
          </NavLink>
          <NavLink
            to="/teams"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : 'link-secondary'}`}
          >
            Teams
          </NavLink>
          <NavLink
            to="/activities"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : 'link-secondary'}`}
          >
            Activities
          </NavLink>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : 'link-secondary'}`}
          >
            Leaderboard
          </NavLink>
          <NavLink
            to="/workouts"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : 'link-secondary'}`}
          >
            Workouts
          </NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users apiBaseUrl={apiBaseUrl} />} />
          <Route path="/teams" element={<Teams apiBaseUrl={apiBaseUrl} />} />
          <Route path="/activities" element={<Activities apiBaseUrl={apiBaseUrl} />} />
          <Route path="/leaderboard" element={<Leaderboard apiBaseUrl={apiBaseUrl} />} />
          <Route path="/workouts" element={<Workouts apiBaseUrl={apiBaseUrl} />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

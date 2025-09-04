import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout"
import Dashboard from "./pages/Dashboard"
import Users from "./pages/Users"

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap inside Layout */}
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </Router>
  )
}

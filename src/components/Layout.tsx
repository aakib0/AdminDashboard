import { Outlet, NavLink } from "react-router-dom"
import { Button } from "../components/ui/button"
import { LayoutDashboard, Users } from "lucide-react"

export default function Layout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-muted/20 border-r p-4 flex flex-col gap-2">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "font-semibold" : ""}>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <LayoutDashboard size={18}/> Dashboard
          </Button>
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => isActive ? "font-semibold" : ""}>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Users size={18}/> Users
          </Button>
        </NavLink>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  )
}

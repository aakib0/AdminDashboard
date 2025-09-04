import { Outlet, NavLink } from "react-router-dom"
import { Button } from "../components/ui/button"
import { LayoutDashboard, Users, Car, Menu } from "lucide-react"
import { useState } from "react"

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const navItems = [
    { 
      path: "/dashboard", 
      icon: LayoutDashboard, 
      label: "Drivers",
      description: "Manage driver accounts" 
    },
    { 
      path: "/users", 
      icon: Users, 
      label: "Users",
      description: "Manage user accounts" 
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-16'} transition-all duration-300 bg-sidebar border-r border-sidebar-border flex flex-col`}>
        {/* Header */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Car className="w-5 h-5 text-primary-foreground" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-lg font-semibold text-sidebar-foreground">TransportHub</h1>
                <p className="text-sm text-sidebar-foreground/60">Admin Dashboard</p>
              </div>
            )}
          </div>
        </div>

        {/* Toggle Button */}
        <div className="p-4 border-b border-sidebar-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full justify-start gap-2"
          >
            <Menu className="w-4 h-4" />
            {sidebarOpen && <span>Collapse</span>}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `group block p-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm' 
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && (
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className="text-xs opacity-60">{item.description}</p>
                    </div>
                  )}
                </div>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          {sidebarOpen && (
            <div className="text-center text-xs text-sidebar-foreground/50">
              © 2024 TransportHub
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}
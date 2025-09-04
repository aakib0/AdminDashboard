import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-white">
      
      <aside className="w-64 bg-emerald-900 shadow-md flex flex-col">
        <div className="h-16 flex items-center justify-center text-xl font-bold text-white border-b border-emerald-600">
          Loadgo
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block px-4 py-2 rounded text-white font-medium ${
                isActive ? "bg-emerald-600/70" : "hover:bg-emerald-600/70"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/Users"
            className={({ isActive }) =>
              `block px-4 py-2 rounded text-white font-medium ${
                isActive ? "bg-emerald-700/70" : "hover:bg-emerald-600/70"
              }`
            }
          >
            Users
          </NavLink>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col bg-white">
        
       

        
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

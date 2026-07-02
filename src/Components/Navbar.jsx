import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-violet-700 text-white shadow-sm"
        : "text-violet-100 hover:bg-violet-700/60 hover:text-white"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/Home");
  };

  return (
    <nav className="border-b border-violet-800 bg-violet-900 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <NavLink to="/Home" className="text-xl font-extrabold tracking-tight text-white">
          📖 Story Site
        </NavLink>

        <div className="flex flex-wrap gap-1.5">
          <NavLink to="/Home" className={linkClass}>Home</NavLink>
          <NavLink to="/ViewStory" className={linkClass}>Browse</NavLink>
          {isAuthenticated && <NavLink to="/AddStory" className={linkClass}>Write</NavLink>}
          {!isAuthenticated && <NavLink to="/login" className={linkClass}>Login</NavLink>}
          {!isAuthenticated && <NavLink to="/register" className={linkClass}>Register</NavLink>}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          {isAuthenticated ? (
            <>
              <span className="text-violet-200 text-xs">
                👤 {user?.email}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/20"
              >
                Logout
              </button>
            </>
          ) : (
            <span className="text-violet-300 text-xs">Guest User</span>
          )}
        </div>
      </div>
    </nav>
  );
}

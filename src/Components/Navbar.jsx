
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const linkClass = ({ isActive }) =>
        `rounded-md px-3 py-2 text-sm font-medium transition ${
            isActive
                ? "bg-white text-slate-950 shadow-sm"
                : "text-slate-600 hover:bg-white/70 hover:text-slate-950"
        }`;

    const handleLogout = () => {
        logout();
        navigate("/Home");
    };

    return(
        <nav className="border-b border-slate-200 bg-slate-50/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <h2 className="text-lg font-bold tracking-tight text-slate-950">
                    Story Site
                </h2>
                <div className="flex flex-wrap gap-2">
                    <NavLink to="/Home" className={linkClass}>Home</NavLink>
                    <NavLink to="/AddStory" className={linkClass}>AddStory</NavLink>
                    <NavLink to="/ViewStory" className={linkClass}>ViewStory</NavLink>
                    {!isAuthenticated && <NavLink to="/login" className={linkClass}>Login</NavLink>}
                    {!isAuthenticated && <NavLink to="/register" className={linkClass}>Register</NavLink>}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                    <span>
                        {isAuthenticated ? `Welcome back, ${user?.email}` : "Guest User"}
                    </span>
                    {isAuthenticated && (
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}

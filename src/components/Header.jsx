import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

export default function Header() {
  const { user, logoutUser, loading } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Only hide on auth forms; show header on landing/faq/contact too
  const HIDE_ON = ["/login", "/register"];
  const isAuthForm = HIDE_ON.includes(pathname);

  const navLinkClass = ({ isActive }) =>
    [
      "transition font-medium",
      isActive ? "text-amber-400" : "text-gray-300 hover:text-amber-300",
    ].join(" ");

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/landing", { replace: true });
    } catch (e) {
      console.error("Logout failed", e);
      navigate("/landing", { replace: true });
    }
  };

  // Do not render header at all on auth pages
  if (isAuthForm) return null;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#2d2420]/70 backdrop-blur-md shadow-md text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand routes: home for authed, landing for guests */}
        <Link to={user ? "/home" : "/landing"} className="text-xl font-bold text-amber-400">
          Moonbrew ☕
        </Link>

        {/* While loading, render a skeleton to avoid flashing wrong menus */}
        {loading ? (
          <div className="h-6 w-40 rounded bg-[#3a3028] animate-pulse" />
        ) : user ? (
          <nav className="flex gap-6">
            <NavLink to="/home" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/faq" className={navLinkClass}>
              FAQ
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact Us
            </NavLink>
          </nav>
        ) : (
          // Public nav for guests (visible on landing and other public pages)
          <nav className="flex gap-6">
            <NavLink to="/faq" className={navLinkClass}>
              FAQ
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact Us
            </NavLink>
          </nav>
        )}

        {/* Right side: auth actions */}
        <div className="flex items-center gap-4">
          {loading ? (
            <div className="h-8 w-24 rounded bg-[#3a3028] animate-pulse" />
          ) : user ? (
            <>
              <Link
                to="/view"
                className="px-3 py-1 rounded-lg border border-amber-700 text-amber-300 hover:bg-amber-900/30 text-sm font-semibold transition"
              >
                Profile
              </Link>
              <button
                disabled={loading}
                onClick={handleLogout}
                className="px-3 py-1 rounded-lg bg-amber-700 hover:bg-amber-800 disabled:opacity-60 text-white text-sm font-semibold transition"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="px-3 py-1 rounded-lg border border-amber-700 text-amber-300 hover:bg-amber-900/30 text-sm font-semibold transition"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold transition"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
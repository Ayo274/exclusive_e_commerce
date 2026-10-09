import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans">
        <p className="text-gray-500 font-medium">Verifying admin access...</p>
      </div>
    );
  }

  if (!user || !user.isAdmin) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-black text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-8 text-primaryRed">
            Admin Panel
          </h2>
          <nav className="flex flex-col gap-4">
            <Link
              to="/admin/products"
              className={`transition-colors font-medium text-sm ${
                location.pathname.includes("/admin/products")
                  ? "text-primaryRed font-bold"
                  : "hover:text-primaryRed text-gray-300"
              }`}
            >
              Manage Products
            </Link>
            <Link
              to="/admin/orders"
              className={`transition-colors font-medium text-sm ${
                location.pathname.includes("/admin/orders")
                  ? "text-primaryRed font-bold"
                  : "hover:text-primaryRed text-gray-300"
              }`}
            >
              Manage Orders
            </Link>
          </nav>
        </div>
        <Link to="/" className="text-xs text-gray-400 hover:text-white">
          ← Back to Store
        </Link>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

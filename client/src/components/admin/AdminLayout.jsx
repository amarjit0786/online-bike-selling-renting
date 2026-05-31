import { Link } from "react-router-dom";

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}

        <aside className="w-72 min-h-screen bg-black text-white p-6">
          <h1 className="text-3xl font-bold mb-10">Admin Panel</h1>

          <nav className="space-y-4">
            <Link
              to="/admin"
              className="block p-3 rounded-lg hover:bg-gray-800"
            >
              📊 Dashboard
            </Link>

            <Link
              to="/admin/users"
              className="block p-3 rounded-lg hover:bg-gray-800"
            >
              👥 Users
            </Link>

            <Link
              to="/admin/bikes"
              className="block p-3 rounded-lg hover:bg-gray-800"
            >
              🏍️ Bikes
            </Link>

            <Link
              to="/admin/bookings"
              className="block p-3 rounded-lg hover:bg-gray-800"
            >
              📋 Bookings
            </Link>
          </nav>
        </aside>

        {/* Content */}

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;

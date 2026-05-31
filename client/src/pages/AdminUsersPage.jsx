import { useContext, useEffect, useState } from "react";

import { getAllUsers, deleteUser } from "../services/adminService";

import { AuthContext } from "../context/AuthContext";
import AdminLayout from "../components/admin/AdminLayout";

function AdminUsersPage() {
  const { token } = useContext(AuthContext);

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const data = await getAllUsers(token);

    setUsers(data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure?");

    if (!confirmed) return;
    
    await deleteUser(id, token);

    fetchUsers();
  };

  return (
    <AdminLayout>
      <section className="min-h-screen bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-10">Users 👥</h1>

          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <h2>{user.name}</h2>

                  <p>{user.email}</p>

                  <p>{user.role}</p>
                </div>

                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}

export default AdminUsersPage;

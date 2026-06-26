import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getMyOrders } from "../services/orderService";
import usePageTitle from "../hooks/usePageTitle";

function MyOrdersPage() {
  usePageTitle("CityGlide || My Orders");

  const { token } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getMyOrders(token);
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-3xl font-bold">
        Loading Orders...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-center mb-12">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center bg-white rounded-2xl p-10 shadow">
            <h2 className="text-2xl font-bold">No Orders Yet</h2>

            <p className="text-gray-500 mt-3">
              Purchase your first bike from CityGlide.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow p-6 flex gap-6"
              >
                <img
                  src={order.bike.image}
                  alt={order.bike.title}
                  className="w-40 h-28 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{order.bike.title}</h2>

                  <p className="text-gray-500 mt-2">
                    Seller : {order.seller.name}
                  </p>

                  <p className="mt-2 font-semibold">Price : ₹{order.price}</p>

                  <p className="text-green-600 font-bold mt-2">✅ Completed</p>

                  <p className="text-gray-400 mt-2 text-sm">
                    Purchased : {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default MyOrdersPage;

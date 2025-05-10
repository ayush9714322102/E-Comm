import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Api from '../common/index';
import displayINRcurrency from '../helpers/DisplayCurrency';
import { toast } from 'react-toastify';

const OrderSuccess = () => {
  const [orders, setOrders] = useState([]);

  const fetchUserOrders = async () => {
    try {
      const res = await fetch(Api.getOrder.url, {
        method: Api.getOrder.method,
        credentials: "include"
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  const handleCancel = async (orderId) => {
    try {
      const res = await fetch(Api.cancelOrder.url(orderId), {
        method: Api.cancelOrder.method,
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Order Cancelled");
        fetchUserOrders();
      } else {
        toast.error(data.message || "Failed to cancel order");
      }
    } catch (err) {
      toast.error("Cancel error");
      console.error(err);
    }
  };
  
  const handleDelete = async (orderId) => {
    try {
      const res = await fetch(Api.deleteOrder.url(orderId), {
        method: Api.deleteOrder.method,
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Order Deleted");
        fetchUserOrders();
      } else {
        toast.error(data.message || "Failed to delete order");
      }
    } catch (err) {
      toast.error("Delete error");
      console.error(err);
    }
  };  

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center mt-36">
      {orders.length === 0 ? (
        <div className="w-full max-w-xl bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-red-600 mb-4">No Orders Found</h1>
          <p className="text-lg mb-6">It seems you haven't placed any orders yet.</p>
        </div>
      ) : (
        orders.map((order, orderIndex) => (
          <div key={orderIndex} className="w-full max-w-6xl bg-white shadow rounded-md border-2 border-pink-800 p-6 mb-6">
            <h1 className="text-2xl font-bold text-green-600 mb-2 u">
              {order.status === "Delivered" ? "Order Delivered" : "Payment Successful"}
            </h1>
            <p className="text-md mb-4 ">
              Order ID: {order.orderId} | Payment ID: {order.paymentId} <br />
              Date: {new Date(order.createdAt).toLocaleString()} | Status:{" "}
              <span
                className={`font-semibold ${order.status === "Cancelled"
                  ? "text-red-600"
                  : order.status === "Delivered"
                    ? "text-green-600"
                    : "text-blue-600"
                  }`}
              >
                {order.status}
              </span>
            </p>

            <h3 className="text-lg font-semibold mb-2 text-pink-800">Ordered Items</h3>
            <div className="grid gap-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 border rounded">
                  <img
                    src={item.product?.productImage?.[0] || 'https://via.placeholder.com/80'}
                    alt={item.product?.productName}
                    className="w-24 h-24 object-contain rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.product?.productName}</h4>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-sm text-pink-800 font-medium">
                      Total: {displayINRcurrency(item.quantity * (item.product?.sellingPrice || 0))}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add buttons here */}
            <div className="flex gap-3 mt-4">
              {order.status !== "Delivered" && order.status !== "Cancelled" && (
                <button
                  onClick={() => handleCancel(order._id)}
                  className="bg-green-700 text-white px-4 py-1 rounded hover:bg-green-600"
                >
                  Cancel Order
                </button>
              )}

              {order.status === "Cancelled" && (
                <button
                  onClick={() => handleDelete(order._id)}
                  className="bg-pink-800 text-white px-4 py-1 rounded hover:bg-pink-700"
                >
                  Delete Order
                </button>
              )}

            </div>
          </div>
        ))
      )}

      <Link to="/" className="mt-6 bg-pink-800 text-white px-4 py-2 rounded hover:bg-pink-700 transition">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;
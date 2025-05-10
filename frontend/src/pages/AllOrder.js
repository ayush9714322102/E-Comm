import React, { useEffect, useState } from 'react';
import Api from '../common/index';
import moment from 'moment';
import displayINRcurrency from '../helpers/DisplayCurrency';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(Api.getAllOrders.url, {
        method: Api.getAllOrders.method,
        credentials: 'include',
      });
      const data = await response.json();

      if (data.success) {
        setOrders(data.data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${Api.updateOrder.url}/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (data.success) {
        fetchOrders();
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      const response = await fetch(`${Api.deleteOrder.url}/${orderId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        fetchOrders();
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error('Failed to delete order:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-4 h-[calc(100vh-190px)] overflow-y-scroll">
      <h2 className="text-xl font-semibold mb-4">All Orders</h2>
      <div className="overflow-x-auto rounded shadow border">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-pink-800 text-white uppercase text-xs">
            <tr>
              <th className="p-3 border">No.</th>
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">User</th>
              <th className="p-3 border">Items</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Payment ID</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((order, index) => (
              <tr key={order._id} className="hover:bg-rose-50">
                <td className="p-3 font-semibold">{index + 1}</td>
                <td className="p-3">{order.orderId}</td>
                <td className="p-3">{order.user?.email || 'N/A'}</td>
                <td className="p-3 space-y-1">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      {item.product?.image && (
                        <img src={item.product.productImage?.[0]} alt="product" className="w-8 h-8 object-cover rounded" />
                      )}
                      <span className='text-xs line-clamp-2'>{item.product?.productName} × {item.quantity}</span>
                    </div>
                  ))}
                </td>
                <td className="p-3 text-green-800 font-semibold">{displayINRcurrency(order.totalAmount)}</td>
                <td className="p-3">{order.paymentId}</td>
                <td className="p-3 text-xs">{moment(order.createdAt).format('LLL')}</td>
                <td className="p-3">
                  <select
                    value={order.status}
                    onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm "
                  >
                    {["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="text-red-600 hover:underline text-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
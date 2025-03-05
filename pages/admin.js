import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      let { data, error } = await supabase
        .from('orders')
        .select('*, users(email, name)');

      if (data) setOrders(data);
    }
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {orders.map(order => (
        <div key={order.id}>
          <h2>Order {order.id}</h2>
          <p>Customer: {order.users?.name} ({order.users?.email})</p>
          <pre>{JSON.stringify(order.items, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}

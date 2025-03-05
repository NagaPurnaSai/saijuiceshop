import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      let { data, error } = await supabase.from('orders').select('*');
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
          <p>Customer Phone: {order.customer_phone}</p>
          <pre>{JSON.stringify(order.items, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}

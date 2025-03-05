import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  async function placeOrder() {
    if (!user) return alert('Please log in to place an order.');
    
    let { error } = await supabase.from('orders').insert({
      customer_id: user.id,
      items: cart,
    });

    if (!error) {
      alert('Order placed successfully!');
      setCart([]);
    }
  }

  return (
    <div>
      <h1>Cart</h1>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}


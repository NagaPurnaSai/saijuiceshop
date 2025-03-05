import { supabase } from '../lib/supabase';
import { useState, useEffect } from 'react';

export default function Home({ user }) {
  const [juices, setJuices] = useState([]);
  
  useEffect(() => {
    async function fetchJuices() {
      let { data, error } = await supabase.from('juices').select('*');
      if (data) setJuices(data);
    }
    fetchJuices();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  return (
    <div>
      <h1>Juice Shop</h1>
      {user ? (
        <p>Welcome, {user.email} <button onClick={handleLogout}>Logout</button></p>
      ) : (
        <a href="/login">Login</a>
      )}
      {juices.map(juice => (
        <div key={juice.id}>
          <h2>{juice.name}</h2>
          <p>Price: ${juice.price}</p>
          <img src={juice.image_url} alt={juice.name} width={150} />
        </div>
      ))}
    </div>
  );
}

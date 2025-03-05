import { supabase } from '../lib/supabase';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [juices, setJuices] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (!loggedInUser) {
      router.push('/login'); // Redirect to login if not logged in
    } else {
      setUser(JSON.parse(loggedInUser));
    }

    async function fetchJuices() {
      let { data, error } = await supabase.from('juices').select('*');
      if (error) {
        console.error('Error fetching juices:', error);
      } else {
        setJuices(data);
      }
    }
    fetchJuices();
  }, [router]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <h2>Juice Shop</h2>
      {juices.length === 0 ? <p>Loading...</p> : juices.map(juice => (
        <div key={juice.id}>
          <h2>{juice.name}</h2>
          <p>Price: ${juice.price}</p>
          <img src={juice.image_url} alt={juice.name} width={150} />
        </div>
      ))}
    </div>
  );
}

import { supabase } from '../lib/supabase';
import { useState, useEffect } from 'react';

export default function Home() {
  const [juices, setJuices] = useState([]);

  useEffect(() => {
    async function fetchJuices() {
      let { data, error } = await supabase.from('juices').select('*');
      if (data) setJuices(data);
    }
    fetchJuices();
  }, []);

  return (
    <div>
      <h1>Juice Shop</h1>
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


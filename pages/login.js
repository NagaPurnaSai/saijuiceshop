import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const router = useRouter();

  async function handleLogin() {
    if (!name || !phone) {
      alert('Please enter both name and phone number');
      return;
    }

    // Check if user exists
    let { data: existingUser, error } = await supabase
      .from('users')
      .select('*')
      .eq('phone', phone)
      .single();

    if (error && error.code !== 'PGRST116') {
      alert('Error checking user');
      return;
    }

    if (!existingUser) {
      // If user doesn't exist, insert them
      let { error: insertError } = await supabase
        .from('users')
        .insert([{ name, phone }]);

      if (insertError) {
        alert('Error saving user');
        return;
      }
    }

    // Save session in localStorage
    localStorage.setItem('user', JSON.stringify({ name, phone }));

    // Redirect to home page
    router.push('/');
  }

  return (
    <div>
      <h1>Login</h1>
      <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Enter Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

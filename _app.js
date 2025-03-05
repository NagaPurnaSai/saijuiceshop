import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  return <Component {...pageProps} user={user} />;
}

export default MyApp;

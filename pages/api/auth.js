import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  const { email, password } = req.body;

  const { user, error } = await supabase.auth.signInWithPassword({
    sro0618346@gmail.com,
    917727sAi,
  });

  if (error) return res.status(400).json({ error: error.message });
  
  res.status(200).json(user);
}


import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  const { email, password } = req.body;

const { user, error } = await supabase.auth.signInWithPassword({
  email: "sro0618346@gmail.com",
  password: "917727sAi"
});

  if (error) return res.status(400).json({ error: error.message });
  
  res.status(200).json(user);
}


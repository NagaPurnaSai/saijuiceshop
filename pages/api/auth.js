import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) return res.status(400).json({ error: error.message });

  // Fetch user details
  const { data: userDetails, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  // If user doesn't exist, insert into the users table
  if (!userDetails) {
    const { error: insertError } = await supabase
      .from("users")
      .insert([{ email, name: data.user.email.split('@')[0] }]);

    if (insertError) return res.status(500).json({ error: insertError.message });
  }

  res.status(200).json({ user: data.user });
}

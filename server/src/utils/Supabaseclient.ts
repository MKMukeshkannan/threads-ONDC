import { createClient } from "@supabase/supabase-js";

import dotenv from 'dotenv';

dotenv.config();

const supabase_public_anon_key = process.env.SUPABASE_PUBLIC_ANON_KEY || 'default_public_key';
const supabase_url             = process.env.SUPABASE_URL || 'https://your-supabase-url.com';


export const supabase = createClient(supabase_url,supabase_public_anon_key );
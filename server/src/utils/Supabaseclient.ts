import { createClient } from "@supabase/supabase-js";

import dotenv from "dotenv";

dotenv.config();

const supabase_public_anon_key = process.env.SUPABASE_PUBLIC_ANON_KEY as string;

const supabase_url = process.env.SUPABASE_URL as string;

export const supabase = createClient(supabase_url, supabase_public_anon_key);

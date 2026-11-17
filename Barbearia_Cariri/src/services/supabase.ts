import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://vmjictxglthtjeavswhn.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseAnonKey) {
  console.warn(
    "[Supabase] VITE_SUPABASE_ANON_KEY não foi informada no arquivo .env. Configure sua chave para consultar dados reais do Supabase."
  );
}

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey || "dummy-anon-key-placeholder", {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://vbarzuuvsjiwccpuazru.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiYXJ6dXV2c2ppd2NjcHVhenJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzODY0MjMsImV4cCI6MjAyNDk2MjQyM30.7Y_W51sxPYT6Ebyz7cbi5pWyXDAmaVVSgoPyKL90gAI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

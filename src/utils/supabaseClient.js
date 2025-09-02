import { createClient } from '@supabase/supabase-js';
import { config } from '../config/environment.js';

export const supabaseClient = createClient(config.supabaseUrl, config.supabaseKey);
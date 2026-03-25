import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lpvvcgrfynbqkervppsx.supabase.co'
const supabaseAnonKey = 'sb_publishable_VyiputyGtotGGS5Jz1EW-A_9ZhAVydH'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

// Client for public operations (uses anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations (uses service role key)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Auth helper functions for server-side
export const authHelpers = {
  // Create a new user
  createUser: async (email: string, password: string, firstName: string, lastName: string) => {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
      },
      email_confirm: true, // Auto-confirm for demo purposes
    })
    return { data, error }
  },

  // Get user by ID
  getUserById: async (userId: string) => {
    const { data, error } = await supabaseAdmin.auth.admin.getUserById(userId)
    return { data, error }
  },

  // Verify JWT token
  verifyToken: async (token: string) => {
    const { data, error } = await supabaseAdmin.auth.getUser(token)
    return { data, error }
  },

  // Update user metadata
  updateUserMetadata: async (userId: string, metadata: any) => {
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      user_metadata: metadata
    })
    return { data, error }
  },

  // Delete user
  deleteUser: async (userId: string) => {
    const { data, error } = await supabaseAdmin.auth.admin.deleteUser(userId)
    return { data, error }
  }
}

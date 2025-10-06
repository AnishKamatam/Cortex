// API base URL for backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

// Auth helper functions that use backend API
export const auth = {
  signUp: async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, firstName, lastName }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      return { data: null, error: { message: data.error } }
    }

    return { data, error: null }
  },

  signIn: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      return { data: null, error: { message: data.error } }
    }

    // Store the session token
    if (data.session?.access_token) {
      localStorage.setItem('auth_token', data.session.access_token)
    }

    return { data, error: null }
  },

  signOut: async () => {
    const token = localStorage.getItem('auth_token')
    
    if (token) {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
    }

    localStorage.removeItem('auth_token')
    return { error: null }
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('auth_token')
    
    if (!token) {
      return { data: { user: null }, error: null }
    }

    const response = await fetch(`${API_BASE_URL}/auth/session`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    
    if (!response.ok) {
      localStorage.removeItem('auth_token')
      return { data: { user: null }, error: { message: data.error } }
    }

    return { data: { user: data.user }, error: null }
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    // For now, we'll implement a simple polling mechanism
    // In a real app, you might want to use WebSockets or Server-Sent Events
    const checkAuth = async () => {
      const { data } = await auth.getCurrentUser()
      callback('SIGNED_IN', data.user ? { user: data.user } : null)
    }

    checkAuth()
    
    // Check auth state every 30 seconds
    const interval = setInterval(checkAuth, 30000)
    
    return {
      data: {
        subscription: {
          unsubscribe: () => clearInterval(interval)
        }
      }
    }
  },

  getToken: () => {
    return localStorage.getItem('auth_token')
  }
}

import { NextResponse } from 'next/server'
import { withAuth, AuthenticatedRequest } from '@/middleware/auth'
import { authHelpers } from '@/lib/supabase'

async function getHandler(request: AuthenticatedRequest) {
  try {
    const user = request.user

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get full user details
    const { data: userData, error } = await authHelpers.getUserById(user.id)

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch user data' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      user: {
        id: userData.user.id,
        email: userData.user.email,
        firstName: userData.user.user_metadata?.first_name,
        lastName: userData.user.user_metadata?.last_name,
        createdAt: userData.user.created_at,
        lastSignIn: userData.user.last_sign_in_at,
      }
    })

  } catch (error) {
    console.error('Profile error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function putHandler(request: AuthenticatedRequest) {
  try {
    const user = request.user
    const { firstName, lastName } = await request.json()

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: 'First name and last name are required' },
        { status: 400 }
      )
    }

    // Update user metadata
    const { data, error } = await authHelpers.updateUserMetadata(user.id, {
      first_name: firstName,
      last_name: lastName,
    })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to update user data' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: {
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.user_metadata?.first_name,
        lastName: data.user.user_metadata?.last_name,
      }
    })

  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export const GET = withAuth(getHandler)
export const PUT = withAuth(putHandler)
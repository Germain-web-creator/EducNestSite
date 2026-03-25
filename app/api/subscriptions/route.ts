import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching subscription:', error)
      return NextResponse.json(
        { error: 'Failed to fetch subscription' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      subscription,
      hasActiveSubscription: !!subscription 
    })

  } catch (error) {
    console.error('Error fetching subscription:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, planType } = body

    if (!userId || !planType) {
      return NextResponse.json(
        { error: 'User ID and plan type are required' },
        { status: 400 }
      )
    }

    const price = planType === 'monthly' ? 400 : 4000
    const expiresAt = new Date()
    expiresAt.setMonth(expiresAt.getMonth() + (planType === 'monthly' ? 1 : 12))

    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: userId,
        plan_type: planType,
        price,
        tokens_remaining: 10,
        is_active: true,
        expires_at: expiresAt.toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating subscription:', error)
      return NextResponse.json(
        { error: 'Failed to create subscription' },
        { status: 500 }
      )
    }

    return NextResponse.json({ subscription })

  } catch (error) {
    console.error('Error creating subscription:', error)
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    )
  }
}

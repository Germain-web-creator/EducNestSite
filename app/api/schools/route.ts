import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const universityId = searchParams.get('universityId')

    let query = supabase
      .from('schools')
      .select('*, universities(id, name, acronym)')
      .order('name')

    if (universityId) {
      query = query.eq('university_id', universityId)
    }

    const { data: schools, error } = await query

    if (error) {
      console.error('Error fetching schools:', error)
      return NextResponse.json(
        { error: 'Failed to fetch schools' },
        { status: 500 }
      )
    }

    return NextResponse.json({ schools })

  } catch (error) {
    console.error('Error fetching schools:', error)
    return NextResponse.json(
      { error: 'Failed to fetch schools' },
      { status: 500 }
    )
  }
}

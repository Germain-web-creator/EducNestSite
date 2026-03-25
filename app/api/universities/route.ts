import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: universities, error } = await supabase
      .from('universities')
      .select('*, schools(id, name, acronym)')
      .order('name')

    if (error) {
      console.error('Error fetching universities:', error)
      return NextResponse.json(
        { error: 'Failed to fetch universities' },
        { status: 500 }
      )
    }

    return NextResponse.json({ universities })

  } catch (error) {
    console.error('Error fetching universities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch universities' },
      { status: 500 }
    )
  }
}

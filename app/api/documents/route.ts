import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lpvvcgrfynbqkervppsx.supabase.co'
const supabaseAnonKey = 'sb_publishable_VyiputyGtotGGS5Jz1EW-A_9ZhAVydH'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const schoolId = searchParams.get('schoolId') || ''
    const level = searchParams.get('level') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limitPerPage = 12

    let query = supabase
      .from('documents')
      .select(`
        *,
        schools (name, acronym),
        universities (name, acronym)
      `)
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .range((page - 1) * limitPerPage, page * limitPerPage - 1)

    // Apply filters
    if (category && category !== 'all') {
      query = query.eq('category', category)
    }
    if (schoolId && schoolId !== 'all') {
      query = query.eq('school_id', schoolId)
    }
    if (level && level !== 'all') {
      query = query.eq('level', level)
    }

    const { data: documents, error, count } = await query

    if (error) {
      console.error('Error fetching documents:', error)
      return NextResponse.json(
        { error: 'Failed to fetch documents' },
        { status: 500 }
      )
    }

    // Client-side filtering for search
    let filteredDocuments = documents || []
    if (search) {
      filteredDocuments = documents.filter(doc =>
        doc.title.toLowerCase().includes(search.toLowerCase()) ||
        doc.author.toLowerCase().includes(search.toLowerCase())
      )
    }

    return NextResponse.json({
      documents: filteredDocuments,
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limitPerPage)
    })

  } catch (error) {
    console.error('Error fetching documents:', error)
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { documentId, action } = body

    if (action === 'download') {
      // Increment download count
      const { data, error } = await supabase
        .from('documents')
        .update({ downloads_count: new Date().toISOString() })
        .eq('id', documentId)
        .select('downloads_count')
        .single()

      if (error) {
        console.error('Error updating download count:', error)
        return NextResponse.json(
          { error: 'Failed to update download count' },
          { status: 500 }
        )
      }

      return NextResponse.json({ 
        success: true, 
        downloadCount: data?.downloads_count || 0 
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })

  } catch (error) {
    console.error('Error updating document:', error)
    return NextResponse.json(
      { error: 'Failed to update document' },
      { status: 500 }
    )
  }
}

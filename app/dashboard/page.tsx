'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Download, Search, Filter, Users, FileText, TrendingUp } from 'lucide-react'

interface Document {
  id: string
  title: string
  author: string
  category: 'memoire' | 'cours' | 'epreuve' | 'these' | 'td'
  type: string
  school_name: string
  university_name: string
  file_size: number
  price: number
  level?: string
  year?: number
  downloads_count: number
}

const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Mémoire de fin de cycle - Gestion durable des ressources forestières',
    author: 'Marie KPOHINOU',
    category: 'memoire',
    type: 'PDF',
    school_name: 'EForT',
    university_name: 'UNA',
    file_size: 2500000,
    price: 400,
    level: 'M2',
    year: 2024,
    downloads_count: 156
  },
  {
    id: '2',
    title: 'Cours de Macroéconomie - Dr CLOHOUNTO Justin',
    author: 'Dr CLOHOUNTO Justin',
    category: 'cours',
    type: 'PDF',
    school_name: 'CAG',
    university_name: 'UNA',
    file_size: 1048814,
    price: 200,
    level: 'L2',
    year: 2025,
    downloads_count: 89
  },
  {
    id: '3',
    title: 'Motorisation des opérations agricoles - Chapitre 1',
    author: 'Dr.Ir. Sendra A. BOKO',
    category: 'cours',
    type: 'PDF',
    school_name: 'CAG',
    university_name: 'UNA',
    file_size: 1144186,
    price: 150,
    level: 'L3',
    year: 2025,
    downloads_count: 234
  }
]

export default function DashboardPage() {
  const { user } = useAuth()
  const [documents, setDocuments] = useState<Document[]>(mockDocuments)
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>(mockDocuments)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedSchool, setSelectedSchool] = useState<string>('all')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')

  const categories = [
    { value: 'all', label: 'Toutes catégories' },
    { value: 'memoire', label: 'Mémoires' },
    { value: 'cours', label: 'Cours' },
    { value: 'epreuve', label: 'Épreuves' },
    { value: 'these', label: 'Thèses' },
    { value: 'td', label: 'TD/TP' }
  ]

  const schools = [
    { value: 'all', label: 'Toutes les écoles' },
    { value: 'CAG', label: 'CAG' },
    { value: 'EForT', label: 'EForT' },
    { value: 'EAPA', label: 'EAPA' },
    { value: 'EAQ', label: 'EAQ' },
    { value: 'EDSAE', label: 'EDSAE' },
    { value: 'EGESE', label: 'EGESE' },
    { value: 'EGPVS', label: 'EGPVS' },
    { value: 'EGR', label: 'EGR' },
    { value: 'EHEAV', label: 'EHEAV' },
    { value: 'ERSVA', label: 'ERSVA' },
    { value: 'ESTCTPA', label: 'ESTCTPA' }
  ]

  const levels = [
    { value: 'all', label: 'Tous niveaux' },
    { value: 'L1', label: 'Licence 1' },
    { value: 'L2', label: 'Licence 2' },
    { value: 'L3', label: 'Licence 3' },
    { value: 'M1', label: 'Master 1' },
    { value: 'M2', label: 'Master 2' },
    { value: 'Doctorat', label: 'Doctorat' }
  ]

  useEffect(() => {
    let filtered = documents

    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(doc => doc.category === selectedCategory)
    }

    if (selectedSchool !== 'all') {
      filtered = filtered.filter(doc => doc.school_name === selectedSchool)
    }

    if (selectedLevel !== 'all') {
      filtered = filtered.filter(doc => doc.level === selectedLevel)
    }

    setFilteredDocuments(filtered)
  }, [searchTerm, selectedCategory, selectedSchool, selectedLevel, documents])

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'memoire': return 'bg-blue-100 text-blue-800'
      case 'cours': return 'bg-green-100 text-green-800'
      case 'epreuve': return 'bg-red-100 text-red-800'
      case 'these': return 'bg-purple-100 text-purple-800'
      case 'td': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'memoire': return 'Mémoire'
      case 'cours': return 'Cours'
      case 'epreuve': return 'Épreuve'
      case 'these': return 'Thèse'
      case 'td': return 'TD/TP'
      default: return category
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Accès Restreint</CardTitle>
            <CardDescription>
              Veuillez vous connecter pour accéder à la bibliothèque
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.href = '/login'} className="w-full">
              Se connecter
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bibliothèque Numérique
          </h1>
          <p className="text-gray-600">
            Explorez notre collection de ressources académiques de l'UNA
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              <FileText className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{documents.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mémoires</CardTitle>
              <BookOpen className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {documents.filter(d => d.category === 'memoire').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cours</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {documents.filter(d => d.category === 'cours').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtres de recherche
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un document..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700"
              >
                {schools.map(school => (
                  <option key={school.value} value={school.value}>{school.label}</option>
                ))}
              </select>
              
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700"
              >
                {levels.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2 mb-2">
                      {document.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Par {document.author}
                    </CardDescription>
                  </div>
                  <Badge className={getCategoryColor(document.category)}>
                    {getCategoryLabel(document.category)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{document.school_name} - {document.university_name}</span>
                    <span>{formatFileSize(document.file_size)}</span>
                  </div>
                  
                  {document.level && (
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Niveau: {document.level}</span>
                      <span>{document.year}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {document.downloads_count} téléchargements
                    </span>
                    <span className="font-semibold text-green-700">
                      {document.price} FCFA
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-green-700 hover:bg-green-800">
                      Télécharger
                    </Button>
                    <Button variant="outline">
                      Aperçu
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun document trouvé
            </h3>
            <p className="text-gray-600">
              Essayez d'ajuster vos filtres de recherche
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Download, Eye, Share2, Bookmark, FileText, User, Calendar, School, Clock } from 'lucide-react'

interface Document {
  id: string
  title: string
  author: string
  category: 'memoire' | 'cours' | 'epreuve' | 'these' | 'td'
  type: string
  school_name: string
  university_name: string
  file_url: string
  file_size: number
  price: number
  description?: string
  level?: string
  year?: number
  downloads_count: number
  pages_count?: number
  language: string
  keywords: string[]
  created_at: string
}

const mockDocument: Document = {
  id: '1',
  title: 'Mémoire de fin de cycle - Gestion durable des ressources forestières au Bénin',
  author: 'Marie KPOHINOU',
  category: 'memoire',
  type: 'PDF',
  school_name: 'EForT',
  university_name: 'UNA',
  file_url: '/docs/sample.pdf',
  file_size: 2500000,
  price: 400,
  description: 'Ce mémoire analyse les stratégies de gestion durable des ressources forestières dans le contexte béninois, en proposant des solutions innovantes pour la conservation et la valorisation des écosystèmes forestiers.',
  level: 'M2',
  year: 2024,
  downloads_count: 156,
  pages_count: 87,
  language: 'Français',
  keywords: ['foresterie', 'conservation', 'gestion durable', 'Bénin', 'environnement'],
  created_at: '2024-03-15T10:30:00Z'
}

export default function DocumentViewerPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [document, setDocument] = useState<Document | null>(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    // Simuler le chargement du document
    setTimeout(() => {
      setDocument(mockDocument)
      setLoading(false)
      // Simuler la vérification d'accès
      setHasAccess(true) // En réalité, vérifier l'abonnement de l'utilisateur
    }, 1000)
  }, [params.id])

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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

  const handleDownload = async () => {
    if (!hasAccess) {
      // Rediriger vers la page d'abonnement
      router.push('/subscription')
      return
    }

    setDownloading(true)
    try {
      // Simuler le téléchargement
      await new Promise(resolve => setTimeout(resolve, 2000))
      // En réalité, appeler l'API de téléchargement avec watermarking
      console.log('Téléchargement avec watermarking...')
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error)
    } finally {
      setDownloading(false)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document?.title,
        text: `Découvrez ce document sur EducNest: ${document?.title}`,
        url: window.location.href
      })
    } else {
      // Fallback: copier le lien dans le presse-papiers
      navigator.clipboard.writeText(window.location.href)
      alert('Lien copié dans le presse-papiers!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du document...</p>
        </div>
      </div>
    )
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Document non trouvé
          </h2>
          <p className="text-gray-600 mb-4">
            Le document demandé n'existe pas ou a été supprimé.
          </p>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Partager
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Document Header */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getCategoryColor(document.category)}>
                        {getCategoryLabel(document.category)}
                      </Badge>
                      <Badge variant="outline">{document.type}</Badge>
                    </div>
                    <CardTitle className="text-2xl mb-2">
                      {document.title}
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Par {document.author}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {document.description && (
                  <p className="text-gray-700 mb-4">{document.description}</p>
                )}
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {document.keywords.map((keyword, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Document Viewer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Aperçu du document
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!hasAccess ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Accès requis
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Vous devez être abonné pour accéder au contenu complet de ce document.
                    </p>
                    <Button className="bg-green-700 hover:bg-green-800">
                      S'abonner pour {document.price} FCFA/mois
                    </Button>
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Visionneuse de document (PDF Viewer avec watermarking)
                    </p>
                    <p className="text-sm text-gray-500">
                      Cette zone affichera le document avec watermarking dynamique 
                      basé sur l'utilisateur connecté.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Document Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <School className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{document.school_name} - {document.university_name}</span>
                </div>
                
                {document.level && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Niveau: {document.level}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{document.year}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{formatDate(document.created_at)}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{document.pages_count} pages</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{document.downloads_count} téléchargements</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Taille:</span>
                  <span className="text-sm">{formatFileSize(document.file_size)}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Langue:</span>
                  <span className="text-sm">{document.language}</span>
                </div>
              </CardContent>
            </Card>

            {/* Download Section */}
            <Card>
              <CardHeader>
                <CardTitle>Téléchargement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-2xl font-bold text-green-700">
                    {document.price} FCFA
                  </div>
                  <p className="text-sm text-gray-600">
                    Abonnement mensuel requis pour le téléchargement
                  </p>
                  <Button 
                    className="w-full bg-green-700 hover:bg-green-800"
                    onClick={handleDownload}
                    disabled={downloading || !hasAccess}
                  >
                    {downloading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Téléchargement...
                      </>
                    ) : hasAccess ? (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        S'abonner pour télécharger
                      </>
                    )}
                  </Button>
                  {!hasAccess && (
                    <p className="text-xs text-gray-500">
                      L'abonnement inclut un accès illimité à tous les documents
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Related Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Documents similaires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-medium text-sm mb-1">
                      Mémoire sur la biodiversité forestière
                    </h4>
                    <p className="text-xs text-gray-600">Jean ADOVI - 2024</p>
                    <p className="text-xs text-green-700 font-medium mt-1">400 FCFA</p>
                  </div>
                  <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-medium text-sm mb-1">
                      Gestion des écosystèmes tropicaux
                    </h4>
                    <p className="text-xs text-gray-600">Marie SANNON - 2023</p>
                    <p className="text-xs text-green-700 font-medium mt-1">400 FCFA</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

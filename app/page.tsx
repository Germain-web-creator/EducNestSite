'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Users, 
  Search, 
  Star, 
  Download,
  TrendingUp,
  Award,
  Library,
  ArrowRight,
  CheckCircle,
  Globe,
  Target
} from 'lucide-react'

export default function HomePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('features')

  const features = [
    {
      icon: <Library className="h-8 w-8 text-green-700" />,
      title: 'Bibliothèque Numérique',
      description: 'Accédez à des milliers de documents académiques',
      stats: '10,000+ documents'
    },
    {
      icon: <Search className="h-8 w-8 text-green-700" />,
      title: 'Recherche Avancée',
      description: 'Trouvez rapidement les ressources dont vous avez besoin',
      stats: 'Recherche intelligente'
    },
    {
      icon: <Users className="h-8 w-8 text-green-700" />,
      title: 'Communauté Active',
      description: 'Rejoignez des milliers d\'étudiants et enseignants',
      stats: '5,000+ utilisateurs'
    },
    {
      icon: <Award className="h-8 w-8 text-green-700" />,
      title: 'Qualité Garantie',
      description: 'Documents vérifiés et approuvés par des experts',
      stats: '100% vérifié'
    }
  ]

  const stats = [
    { label: 'Documents', value: '10,000+', icon: <BookOpen className="h-5 w-5" /> },
    { label: 'Utilisateurs', value: '5,000+', icon: <Users className="h-5 w-5" /> },
    { label: 'Téléchargements', value: '50,000+', icon: <Download className="h-5 w-5" /> },
    { label: 'Écoles', value: '8+', icon: <Award className="h-5 w-5" /> }
  ]

  const testimonials = [
    {
      name: 'Marie KPOHINOU',
      role: 'Étudiante M2 - EForT',
      content: 'EducNest a transformé ma façon d\'étudier. J\'accède facilement à tous les documents dont j\'ai besoin.',
      rating: 5
    },
    {
      name: 'Jean TOSSAVI',
      role: 'Enseignant - EAQ',
      content: 'Une plateforme indispensable pour l\'enseignement et la recherche à l\'UNA.',
      rating: 5
    },
    {
      name: 'Sophie ADANDONON',
      role: 'Étudiante L3 - EGPVS',
      content: 'Je recommande EducNest à tous les étudiants. C\'est simple, rapide et efficace.',
      rating: 5
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-700 via-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                La Bibliothèque Numérique de l'UNA
              </h1>
              <p className="text-xl mb-8 text-green-100">
                Accédez à des milliers de ressources académiques pour réussir vos études à l'Université Nationale d'Agriculture
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {user ? (
                  <Link href="/dashboard">
                    <Button size="lg" className="bg-white text-green-700 hover:bg-green-50">
                      <Library className="h-5 w-5 mr-2" />
                      Accéder à la bibliothèque
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/register">
                      <Button size="lg" className="bg-white text-green-700 hover:bg-green-50">
                        S'inscrire gratuitement
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-700">
                        Se connecter
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-200" />
                  <span>Accès gratuit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-200" />
                  <span>Documents vérifiés</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-200" />
                  <span>Mise à jour régulière</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <BookOpen className="h-8 w-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">10,000+</div>
                    <div className="text-sm">Documents</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <Users className="h-8 w-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">5,000+</div>
                    <div className="text-sm">Utilisateurs</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <Download className="h-8 w-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">50,000+</div>
                    <div className="text-sm">Téléchargements</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <Award className="h-8 w-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">8+</div>
                    <div className="text-sm">Écoles</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir EducNest ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une plateforme conçue spécifiquement pour les besoins des étudiants et enseignants de l'UNA
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {feature.stats}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos utilisateurs
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez les témoignages de la communauté EducNest
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(testimonial.rating)}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-700 to-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Prêt à commencer votre voyage académique ?
          </h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Rejoignez des milliers d'étudiants qui utilisent déjà EducNest pour réussir leurs études
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link href="/dashboard">
                <Button size="lg" className="bg-white text-green-700 hover:bg-green-50">
                  <Target className="h-5 w-5 mr-2" />
                  Explorer la bibliothèque
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/register">
                  <Button size="lg" className="bg-white text-green-700 hover:bg-green-50">
                    Commencer maintenant
                  </Button>
                </Link>
                <Link href="/orientation">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-700">
                      <Globe className="h-5 w-5 mr-2" />
                      Découvrir l'UNA
                    </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer Preview */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center text-white font-bold">
                  E
                </div>
                <span className="text-xl font-bold">EducNest</span>
              </div>
              <p className="text-gray-400">
                La bibliothèque numérique de référence pour l'Université Nationale d'Agriculture
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Bibliothèque</Link></li>
                <li><Link href="/orientation" className="hover:text-white transition-colors">Portail UNA</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Ressources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Documents</Link></li>
                <li><Link href="/register" className="hover:text-white transition-colors">S'inscrire</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Se connecter</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>contact@educnest.bj</li>
                <li>Parakou, Bénin</li>
                <li>+229 00 00 00 00</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EducNest. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

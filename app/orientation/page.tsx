'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, GraduationCap, Users, BookOpen, Phone, Mail, Globe } from 'lucide-react'

interface University {
  id: string
  name: string
  description: string
  sites: Site[]
}

interface Site {
  name: string
  location: string
  description: string
  coordinates: string
  contact: {
    phone?: string
    email?: string
    website?: string
  }
  schools: School[]
}

interface School {
  name: string
  acronym: string
  description: string
  programs: string[]
  director: string
}

const unaData: University = {
  id: 'una',
  name: 'Université Nationale d\'Agriculture',
  description: 'Première université agricole du Bénin, dédiée à la formation et à la recherche en sciences agronomiques.',
  sites: [
    {
      name: 'Site de Kétou',
      location: 'Kétou, Plateau',
      description: 'Campus principal abritant les écoles de gestion et de production agricole',
      coordinates: '7.3217° N, 2.9385° E',
      contact: {
        phone: '+229 21 31 00 00',
        email: 'contact@una.bj',
        website: 'www.una.bj'
      },
      schools: [
        {
          name: 'Centre Agricole et de Gestion',
          acronym: 'CAG',
          description: 'Formation en gestion agricole, économie rurale et développement',
          programs: ['Licence Gestion Agricole', 'Master Économie Rurale', 'Doctorat Sciences Agronomiques'],
          director: 'Prof. Dr. Ir. S. A. BOKO'
        },
        {
          name: 'École de Gestion et de Revenus',
          acronym: 'EGR',
          description: 'Formation en gestion financière et comptabilité agricole',
          programs: ['Licence Comptabilité', 'Master Finance Agricole'],
          director: 'Dr. M. KPOHINOU'
        },
        {
          name: 'École Supérieure des Techniques et de la Commercialisation des Produits Agricoles',
          acronym: 'ESTCTPA',
          description: 'Formation en transformation et commercialisation des produits agricoles',
          programs: ['Licence Agroalimentaire', 'Master Marketing Agricole'],
          director: 'Dr. A. ADJOVI'
        }
      ]
    },
    {
      name: 'Site de Parakou',
      location: 'Parakou, Borgou',
      description: 'Campus spécialisé dans les productions animales et aquacoles',
      coordinates: '9.3575° N, 2.6163° E',
      contact: {
        phone: '+229 21 32 00 00',
        email: 'parakou@una.bj'
      },
      schools: [
        {
          name: 'École d\'Aménagement et de Production Animale',
          acronym: 'EAPA',
          description: 'Formation en élevage et production animale',
          programs: ['Licence Production Animale', 'Master Zootechnie'],
          director: 'Dr. J. TCHABI'
        },
        {
          name: 'École d\'Aquaculture',
          acronym: 'EAQ',
          description: 'Formation en pisciculture et aquaculture',
          programs: ['Licence Aquaculture', 'Master Pisciculture'],
          director: 'Dr. S. AHOUANSOU'
        },
        {
          name: 'École de Recherche et de Services Vétérinaires et Agricoles',
          acronym: 'ERSVA',
          description: 'Formation en santé animale et services vétérinaires',
          programs: ['Licence Santé Animale', 'Master Médecine Vétérinaire'],
          director: 'Dr. M. GBAGUIDI'
        }
      ]
    },
    {
      name: 'Site de Dassa',
      location: 'Dassa-Zoumè, Collines',
      description: 'Campus forestier et environnemental',
      coordinates: '7.7542° N, 2.1667° E',
      contact: {
        phone: '+229 21 33 00 00',
        email: 'dassa@una.bj'
      },
      schools: [
        {
          name: 'École de Foresterie Tropicale',
          acronym: 'EForT',
          description: 'Formation en foresterie, environnement et gestion des ressources naturelles',
          programs: ['Licence Foresterie', 'Master Environnement', 'Doctorat Sciences Forestières'],
          director: 'Dr. Ir. K. I. DELEKE KOKO MIDIOHOUAN'
        },
        {
          name: 'École des Hautes Études d\'Aménagement et de Valorisation',
          acronym: 'EHEAV',
          description: 'Formation en aménagement du territoire et valorisation des ressources',
          programs: ['Master Aménagement', 'Doctorat Gestion des Ressources'],
          director: 'Prof. Dr. Ir. A. YEVIDE'
        }
      ]
    },
    {
      name: 'Site de Tchetti',
      location: 'Tchetti, Collines',
      description: 'Campus technologique et de génie agricole',
      coordinates: '7.7500° N, 1.8833° E',
      contact: {
        phone: '+229 21 34 00 00',
        email: 'tchetti@una.bj'
      },
      schools: [
        {
          name: 'École de Génie des Équipements et de la Sécurité Alimentaire',
          acronym: 'EGESE',
          description: 'Formation en mécanisation agricole et sécurité alimentaire',
          programs: ['Licence Génie Rural', 'Master Mécanisation Agricole'],
          director: 'Dr. Ir. G. SALAKO'
        },
        {
          name: 'École de Génie des Procédés et de la Valorisation des Systèmes',
          acronym: 'EGPVS',
          description: 'Formation en transformation agroalimentaire et procédés industriels',
          programs: ['Licence Agro-industrie', 'Master Procédés Alimentaires'],
          director: 'Dr. C. FADOUN'
        },
        {
          name: 'École Doctorale des Sciences Agronomiques et de l\'Environnement',
          acronym: 'EDSAE',
          description: 'Formation doctorale en sciences agronomiques et environnement',
          programs: ['Doctorat Sciences Agronomiques', 'Doctorat Environnement', 'HDR'],
          director: 'Prof. Dr. Ir. E. HOUNGBO'
        }
      ]
    }
  ]
}

export default function OrientationPage() {
  const [selectedSite, setSelectedSite] = useState<Site | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            Portail d'Orientation UNA
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les 4 sites de l'Université Nationale d'Agriculture et leurs écoles 
            pour faire le bon choix pour votre avenir académique
          </p>
        </div>

        {/* University Overview */}
        <Card className="mb-12 bg-gradient-to-r from-green-700 to-emerald-700 text-white">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <GraduationCap className="h-8 w-8" />
              {unaData.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-50 mb-6">{unaData.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-200">4</div>
                <div className="text-green-100">Sites</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-200">11</div>
                <div className="text-green-100">Écoles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-200">30+</div>
                <div className="text-green-100">Programmes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-200">5000+</div>
                <div className="text-green-100">Étudiants</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {unaData.sites.map((site, index) => (
            <Card 
              key={index} 
              className={`cursor-pointer transition-all hover:shadow-xl ${
                selectedSite?.name === site.name ? 'ring-2 ring-green-500' : ''
              }`}
              onClick={() => setSelectedSite(site)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-700" />
                  {site.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <span className="text-green-600">📍</span>
                  {site.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{site.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {site.schools.map((school, schoolIndex) => (
                    <span 
                      key={schoolIndex}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                    >
                      {school.acronym}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {site.contact.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {site.contact.phone}
                    </span>
                  )}
                  {site.contact.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {site.contact.email}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Site Details */}
        {selectedSite && (
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-6 w-6 text-green-700" />
                {selectedSite.name} - Détails
              </CardTitle>
              <CardDescription>
                {selectedSite.location} • {selectedSite.coordinates}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Contact
                  </h3>
                  <div className="space-y-2">
                    {selectedSite.contact.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{selectedSite.contact.phone}</span>
                      </div>
                    )}
                    {selectedSite.contact.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{selectedSite.contact.email}</span>
                      </div>
                    )}
                    {selectedSite.contact.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-gray-500" />
                        <span>{selectedSite.contact.website}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Schools */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Écoles disponibles
                  </h3>
                  <div className="space-y-4">
                    {selectedSite.schools.map((school, schoolIndex) => (
                      <div key={schoolIndex} className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-semibold text-green-800">
                          {school.name} ({school.acronym})
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">{school.description}</p>
                        <p className="text-sm text-gray-500 mb-2">
                          <strong>Directeur:</strong> {school.director}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {school.programs.map((program, programIndex) => (
                            <span 
                              key={programIndex}
                              className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs"
                            >
                              {program}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Prêt à rejoindre l'UNA ?
          </h2>
          <p className="text-green-50 mb-6 max-w-2xl mx-auto">
            Choisissez votre site et votre école, puis inscrivez-vous pour commencer 
            votre voyage académique avec nous.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 px-8 py-3">
              Postuler maintenant
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-700 px-8 py-3">
              Demander plus d'informations
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

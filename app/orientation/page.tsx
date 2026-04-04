'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { schools } from '@/lib/data/schools'
import { universities } from '@/lib/data/universities'
import { 
  Users, 
  BookOpen, 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  Globe,
  User,
  GraduationCap
} from 'lucide-react'

export default function OrientationPage() {
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null)

  const getSchoolIcon = (schoolId: string) => {
    switch (schoolId) {
      case 'eaq': return '🐟'
      case 'eapa': return '🌾'
      case 'srv': return '👥'
      case 'egpvs': return '🌱'
      case 'egese': return '🐄'
      case 'efort': return '🌳'
      case 'estc': return '🔬'
      default: return '🎓'
    }
  }

  const getSchoolColor = (schoolId: string) => {
    const colors = {
      'eaq': 'bg-blue-100 text-blue-800 border-blue-200',
      'eapa': 'bg-green-100 text-green-800 border-green-200',
      'srv': 'bg-purple-100 text-purple-800 border-purple-200',
      'egpvs': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'egese': 'bg-orange-100 text-orange-800 border-orange-200',
      'efort': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'estc': 'bg-red-100 text-red-800 border-red-200'
    }
    return colors[schoolId as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Portail d'Orientation UNA
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les différentes écoles et programmes de l'Université Nationale d'Agriculture
          </p>
        </div>

        {/* University Info */}
        <Card className="mb-12 bg-gradient-to-r from-green-700 to-green-800 text-white">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-green-800">UNA</span>
              </div>
              <div>
                <CardTitle className="text-2xl text-white">
                  {universities[0].name}
                </CardTitle>
                <CardDescription className="text-green-100">
                  {universities[0].description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-green-200" />
                <span className="text-green-100">Parakou, Bénin</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-green-200" />
                <a 
                  href={universities[0].website} 
                  className="text-green-100 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {universities[0].website}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-200" />
                <span className="text-green-100">contact@una.bj</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {schools.map((school) => (
            <Card 
              key={school.id} 
              className={`cursor-pointer transition-all hover:shadow-xl border-2 ${getSchoolColor(school.id)}`}
              onClick={() => setSelectedSchool(selectedSchool === school.id ? null : school.id)}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{getSchoolIcon(school.id)}</div>
                  <div>
                    <CardTitle className="text-lg">{school.name}</CardTitle>
                    <CardDescription className="font-semibold">
                      {school.acronym}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {school.description}
                </p>
                
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">
                    {school.director}
                  </span>
                </div>

                {school.programs.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {school.programs.map((program) => (
                      <Badge key={program} variant="secondary" className="text-xs">
                        {program}
                      </Badge>
                    ))}
                  </div>
                )}

                {selectedSchool === school.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Programmes disponibles
                    </h4>
                    <ul className="text-sm space-y-1">
                      {school.programs.map((program) => (
                        <li key={program} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full" />
                          {program}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="bg-gray-100">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900">
              Besoin d'informations supplémentaires ?
            </CardTitle>
            <CardDescription className="text-gray-600">
              Notre équipe d'orientation est à votre disposition
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <Phone className="h-8 w-8 text-green-700" />
                <span className="font-semibold">Téléphone</span>
                <span className="text-sm text-gray-600">+229 00 00 00 00</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Mail className="h-8 w-8 text-green-700" />
                <span className="font-semibold">Email</span>
                <span className="text-sm text-gray-600">orientation@una.bj</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <MapPin className="h-8 w-8 text-green-700" />
                <span className="font-semibold">Adresse</span>
                <span className="text-sm text-gray-600">Parakou, Bénin</span>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button size="lg" className="bg-green-700 hover:bg-green-800">
                <BookOpen className="h-5 w-5 mr-2" />
                Postuler maintenant
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

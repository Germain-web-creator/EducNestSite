'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { useAuth } from '@/lib/auth'

interface University {
  id: string
  name: string
  acronym: string
}

interface School {
  id: string
  name: string
  acronym: string
  university_id: string
}

const universities: University[] = [
  { id: 'una', name: 'Université Nationale d\'Agriculture', acronym: 'UNA' },
]

const schools: School[] = [
  { id: 'cag', name: 'Centre Agricole et Gestion', acronym: 'CAG', university_id: 'una' },
  { id: 'efort', name: 'École de Foresterie Tropicale', acronym: 'EForT', university_id: 'una' },
  { id: 'eapa', name: 'École d\'Aménagement et de Production Animale', acronym: 'EAPA', university_id: 'una' },
  { id: 'eaq', name: 'École d\'Aquaculture', acronym: 'EAQ', university_id: 'una' },
  { id: 'edsae', name: 'École Doctorale des Sciences Agronomiques et de l\'Environnement', acronym: 'EDSAE', university_id: 'una' },
  { id: 'egese', name: 'École de Génie des Équipements et de la Sécurité Alimentaire', acronym: 'EGESE', university_id: 'una' },
  { id: 'egpvs', name: 'École de Génie des Procédés et de la Valorisation des Systèmes', acronym: 'EGPVS', university_id: 'una' },
  { id: 'egr', name: 'École de Gestion et de Revenus', acronym: 'EGR', university_id: 'una' },
  { id: 'eheav', name: 'École des Hautes Études d\'Aménagement et de Valorisation', acronym: 'EHEAV', university_id: 'una' },
  { id: 'ersva', name: 'École de Recherche et de Services Vétérinaires et Agricoles', acronym: 'ERSVA', university_id: 'una' },
  { id: 'estctpa', name: 'École Supérieure des Techniques et de la Commercialisation des Produits Agricoles', acronym: 'ESTCTPA', university_id: 'una' },
]

export function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'student' as 'student' | 'teacher',
    universityId: '',
    schoolId: '',
    level: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signUp } = useAuth()
  const router = useRouter()

  const filteredSchools = schools.filter(school => school.university_id === formData.universityId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      setLoading(false)
      return
    }

    const userData = {
      role: formData.role,
      first_name: formData.firstName,
      last_name: formData.lastName,
      school_id: formData.schoolId,
      university_id: formData.universityId,
      level: formData.level,
    }

    const { error } = await signUp(formData.email, formData.password, userData)
    
    if (error) {
      setError(error.message)
    } else {
      router.push('/login?message=Inscription réussie! Veuillez vérifier votre email.')
    }
    
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-green-800">Inscription</CardTitle>
        <CardDescription>
          Rejoignez la communauté EducNest et accédez à des milliers de ressources académiques
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                Prénom
              </label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Jean"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                Nom
              </label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Dupont"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="votre.email@exemple.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="•••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirmer le mot de passe
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="•••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium text-gray-700">
              Rôle
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700"
              required
            >
              <option value="student">Étudiant</option>
              <option value="teacher">Enseignant</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="universityId" className="text-sm font-medium text-gray-700">
                Université
              </label>
              <select
                id="universityId"
                name="universityId"
                value={formData.universityId}
                onChange={handleChange}
                className="flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700"
                required
              >
                <option value="">Sélectionner une université</option>
                {universities.map(uni => (
                  <option key={uni.id} value={uni.id}>
                    {uni.name} ({uni.acronym})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="schoolId" className="text-sm font-medium text-gray-700">
                École/Faculté
              </label>
              <select
                id="schoolId"
                name="schoolId"
                value={formData.schoolId}
                onChange={handleChange}
                className="flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700"
                required
                disabled={!formData.universityId}
              >
                <option value="">Sélectionner une école</option>
                {filteredSchools.map(school => (
                  <option key={school.id} value={school.id}>
                    {school.name} ({school.acronym})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {formData.role === 'student' && (
            <div className="space-y-2">
              <label htmlFor="level" className="text-sm font-medium text-gray-700">
                Niveau d'étude
              </label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-700"
                required
              >
                <option value="">Sélectionner votre niveau</option>
                <option value="L1">Licence 1</option>
                <option value="L2">Licence 2</option>
                <option value="L3">Licence 3</option>
                <option value="M1">Master 1</option>
                <option value="M2">Master 2</option>
                <option value="Doctorat">Doctorat</option>
              </select>
            </div>
          )}

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800"
            disabled={loading}
          >
            {loading ? 'Inscription...' : 'S\'inscrire'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Déjà un compte ?{' '}
            <a href="/login" className="text-green-700 hover:underline font-medium">
              Se connecter
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

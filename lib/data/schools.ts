export interface School {
  id: string
  name: string
  acronym: string
  director: string
  description: string
  programs: string[]
  university_id: string
}

export const schools: School[] = [
  {
    id: 'eaq',
    name: 'École d\'Aquaculture',
    acronym: 'EAQ',
    director: 'Professeur Darius TOSSAVI',
    description: 'Formation spécialisée en aquaculture et pisciculture',
    programs: ['Licence', 'Master', 'Doctorat'],
    university_id: 'una'
  },
  {
    id: 'eapa',
    name: 'École d\'Agrobusiness et de Politiques Agricoles',
    acronym: 'EAPA',
    director: 'Professeur Nounagnon Emile HOUNGBO',
    description: 'Formation en management agroalimentaire et politiques agricoles',
    programs: ['Licence', 'Master', 'Doctorat'],
    university_id: 'una'
  },
  {
    id: 'srv',
    name: 'École de Sociologie Rurale et Vulgarisation Agricole',
    acronym: 'SRVA',
    director: 'Professeur Wilfried PADONOU',
    description: 'Formation en sociologie rurale et vulgarisation agricole',
    programs: ['Licence', 'Master', 'Doctorat'],
    university_id: 'una'
  },
  {
    id: 'egpvs',
    name: 'École de Gestion de la Production Végétale et Semencière',
    acronym: 'EGPVS',
    director: 'Professeur Apollinaire ADANDONON',
    description: 'Formation en production végétale et semences',
    programs: ['Licence', 'Master', 'Doctorat'],
    university_id: 'una'
  },
  {
    id: 'egese',
    name: 'École de Gestion et d\'Exploitation des Systèmes d\'Élevage',
    acronym: 'EGESE',
    director: 'Professeur Sabbas ATTINDEHOU',
    description: 'Formation en gestion des systèmes d\'élevage',
    programs: ['Licence', 'Master', 'Doctorat'],
    university_id: 'una'
  },
  {
    id: 'efort',
    name: 'École de Foresterie Tropicale',
    acronym: 'EForT',
    director: 'Professeur Olou Toussaint LOUGBEGNON',
    description: 'Formation en foresterie tropicale et gestion des ressources forestières',
    programs: ['Licence', 'Master', 'Doctorat'],
    university_id: 'una'
  },
  {
    id: 'estc',
    name: 'École des Sciences et Techniques de Conservation',
    acronym: 'ESTC',
    director: 'Professeure Flora CHADARE',
    description: 'Formation en sciences et techniques de conservation des produits agricoles',
    programs: ['Licence', 'Master', 'Doctorat'],
    university_id: 'una'
  }
]

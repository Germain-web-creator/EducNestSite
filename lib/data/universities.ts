export interface University {
  id: string
  name: string
  acronym: string
  description: string
  logo?: string
  website?: string
}

export const universities: University[] = [
  {
    id: 'una',
    name: 'Université Nationale d\'Agriculture',
    acronym: 'UNA',
    description: 'Première université spécialisée en sciences agronomiques au Bénin',
    website: 'https://una.bj'
  }
]

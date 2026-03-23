/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { School, Site, Document, Masterclass, UserRole, DocType, DocStatus } from './types';

export const COLORS = {
  primary: '#14532D', // Vert Profond Africain
  secondary: '#1F2937', // Noir Anthracite
  tertiary: '#FFFFFF', // Blanc Pur
  accent: '#B45309', // Ocre Africain
};

export const SITES: Site[] = [
  { id: 'akpotokou', name: "Site d'Akpotokou", location: 'Ouémé' },
  { id: 'porto-novo', name: 'Site de Porto-Novo', location: 'Capitale' },
  { id: 'sakete', name: 'Site de Sakété', location: 'Plateau' },
  { id: 'ketou', name: 'Site de Kétou', location: 'Plateau' },
];

export const SCHOOLS: School[] = [
  {
    id: 'epv',
    name: 'École de Production Végétale',
    siteId: 'akpotokou',
    description: 'Formation en techniques de production végétale durable.',
    image: 'https://picsum.photos/seed/agriculture/800/600',
  },
  {
    id: 'eha',
    name: 'École d’Horticulture et d’Aménagement des Espaces Verts',
    siteId: 'akpotokou',
    description: 'Expertise en jardins et espaces verts.',
    image: 'https://picsum.photos/seed/garden/800/600',
  },
  {
    id: 'ef',
    name: 'École de Foresterie',
    siteId: 'akpotokou',
    description: 'Gestion durable des ressources forestières.',
    image: 'https://picsum.photos/seed/forest/800/600',
  },
];

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: 'doc1',
    title: 'Impact du changement climatique sur le maïs au Bénin',
    author: 'Germain NOUMONVI',
    authorId: 'user1',
    schoolId: 'epv',
    siteId: 'akpotokou',
    level: 'L3',
    domain: 'Production Végétale',
    type: DocType.LICENCE_THESIS,
    fileUrl: '#',
    downloadCount: 125,
    status: DocStatus.APPROVED,
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'doc2',
    title: 'Techniques modernes d’irrigation maraîchère',
    author: 'Odirick DJAGBA',
    authorId: 'user2',
    schoolId: 'epv',
    siteId: 'akpotokou',
    level: 'M2',
    domain: 'Horticulture',
    type: DocType.MASTER_THESIS,
    fileUrl: '#',
    downloadCount: 89,
    status: DocStatus.APPROVED,
    createdAt: '2026-02-15T14:30:00Z',
  },
];

export const MOCK_MASTERCLASSES: Masterclass[] = [
  {
    id: 'v1',
    title: 'Analyse de sol rapide sur le terrain',
    authorId: 'user2',
    authorName: 'Odirick DJAGBA',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-farmer-walking-through-a-field-of-crops-4245-large.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/soil/400/700',
    category: 'Technique',
    likes: 450,
    createdAt: '2026-03-10T09:00:00Z',
  },
];

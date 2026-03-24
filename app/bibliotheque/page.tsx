/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Metadata } from 'next'
import LibraryPage from '../../../components/LibraryPage'

export const metadata: Metadata = {
  title: 'Bibliothèque Numérique - EducNest',
  description: 'Accédez à des milliers de mémoires, thèses, cours et ressources académiques validés par les enseignants de l\'UNA.',
}

export default function BibliothequePage() {
  return <LibraryPage />
}

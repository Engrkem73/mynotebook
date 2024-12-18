import { Suspense } from 'react';
import NotebookView from './notebook-view';
import { PageProps } from '../../../types';

/**
 * Notebook page component
 */
export default function NotebookPage({ params }: PageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotebookView params={params} />
    </Suspense>
  );
}

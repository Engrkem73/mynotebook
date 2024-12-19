import { Suspense } from 'react';
import NotebookView from './notebook-view';
import { PageProps } from '../../../types';

/**
 * Notebook page component
 */
export default function NotebookPage({ params }: PageProps) {
  return (
    <Suspense fallback={<div className='flex flex-col items-center justify-center bg-gray-800 w-[600px] h-[400px] pt-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg gap-4'>Loading...</div>}>
      <NotebookView params={params} />
    </Suspense>
  );
}

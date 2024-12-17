import { Suspense } from 'react';
import NotebookView from './notebook-view';

export default function NotebookPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotebookView id={params.id} />
    </Suspense>
  );
}

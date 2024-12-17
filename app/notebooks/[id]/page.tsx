import { Suspense } from 'react';
import NotebookView from './notebook-view';

export default function NotebookPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotebookView id={id} />
    </Suspense>
  );
}

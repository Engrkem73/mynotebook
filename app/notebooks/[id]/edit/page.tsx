import EditNotebookForm from './edit-form';
import { Suspense } from 'react';

export default function EditNotebookPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditNotebookForm id={id} />
    </Suspense>
  );
}

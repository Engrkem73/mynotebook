import EditNotebookForm from './edit-form';
import { Suspense } from 'react';

export default function EditNotebookPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditNotebookForm id={params.id} />
    </Suspense>
  );
}

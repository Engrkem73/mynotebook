import EditNotebookForm from './edit-form';
import { Suspense } from 'react';
import { PageProps } from '../../../../types';



export default async function EditNotebookPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditNotebookForm id={id} />
    </Suspense>
  );
}
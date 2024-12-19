import EditNotebookForm from './edit-form';
import { Suspense } from 'react';
import { PageProps } from '../../../../types';



export default async function EditNotebookPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<div className='flex flex-col items-center justify-center bg-gray-800 w-[600px] h-[400px] pt-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg gap-4'>Loading...</div>}>
      <EditNotebookForm id={id} />
    </Suspense>
  );
}
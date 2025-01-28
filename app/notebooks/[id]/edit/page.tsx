import EditNotebookForm from './edit-form';
import { PageProps } from '../../../../types';



export default async function EditNotebookPage({ params }: PageProps) {
  const { id } = await params;

  return (
      <EditNotebookForm id={id} />
  );
}
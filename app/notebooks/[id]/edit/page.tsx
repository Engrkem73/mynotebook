import EditNotebookForm from './edit-form';
import { PageProps } from '../../../../types';



export default async function EditNotebookPage({ params }: PageProps) {
  const { notebookId } = await params;

  return (
      <EditNotebookForm id={notebookId} />
  );
}
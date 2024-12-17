import { PencilOff } from 'lucide-react';
import Link from 'next/link';

interface EditButtonProps {
  notebookId: string;
}

function EditButton({ notebookId }: EditButtonProps) {
  return (
    <Link href={`/notebooks/${notebookId}/edit`} className="edit-link">
      <PencilOff className='edit-button' />
    </Link>
  );
}

export default EditButton;

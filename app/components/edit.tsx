import { PencilOff } from 'lucide-react';
import Link from 'next/link';
import useHoverHook from '../hooks/useHoverHook';

interface EditButtonProps {
  notebookId: string;
}

function EditButton({ notebookId }: EditButtonProps) {
  const { hover, onHover, onLeave } = useHoverHook()

  return (
    <Link href={`/notebooks/${notebookId}/edit`} className="relative" >
      <button aria-label='Edit Button' onMouseEnter={onHover} onMouseLeave={onLeave}>
         <PencilOff size={14} />
      </button>
      {hover ? <div className='bg-gray-600 text-xs absolute bottom-7 right-1 p-2 rounded-md'>Edit</div>: null }
    </Link>
  );
}

export default EditButton;

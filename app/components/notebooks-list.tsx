"use client";

import EditButton from './edit';
import DeleteButton from './delete';
import Link from 'next/link';
import { Notebook } from '@prisma/client';

interface NotebooksListProps {
  notebooks: Notebook[];
}

export default function NotebooksList({ notebooks }: NotebooksListProps) {
  return (
    <>
      {notebooks.length === 0 ? (
        <p>You have no notebooks. Create one below!</p>
      ) : (
        <ul>
      
          {notebooks.map((notebook) => (
            <li key={notebook.id} className='flex justify-between items-center w-[600px]'>
              <div className='flex flex-row items-center justify-between bg-gray-200 p-4 h-10 w-[500px] rounded-md'>
                <Link href={`/notebooks/${notebook.id}`} className='text-blue-600'>{notebook.title}</Link>
                <div className='edit-delete ml-auto'>
                  <EditButton notebookId={notebook.id} />
                  <DeleteButton 
                    notebookId={notebook.id} 
                    onDelete={() => {
                      // Refresh the page to show updated list
                      window.location.reload();
                    }} 
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

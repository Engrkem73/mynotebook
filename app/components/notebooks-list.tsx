"use client";

import EditButton from './edit';
import Link from 'next/link';
import { Notebook } from '@prisma/client';
import DeleteIcon from './delete-icon';
import { useState } from 'react';

interface NotebooksListProps {
  notebooks: Notebook[];
}

export default function NotebooksList({ notebooks: initialNotebooks }: NotebooksListProps) {
  const [notebooks, setNotebooks] = useState<Notebook[]>(initialNotebooks);
  const handleDelete = (notebookId: string) => {
    setNotebooks((prevNotebooks) => 
      prevNotebooks.filter((notebook) => notebook.id !== notebookId)
    );
  };
  return (
    <>
      {notebooks.length === 0 ? (
        <p>You have no notebooks. Create one below!</p>
      ) : (
        <ul>
      
          {notebooks.map((notebook) => (
            <li key={notebook.id} className='notebook-list'>
              <div className='flex flex-row items-center justify-between bg-gray-200 p-4 h-10 w-[500px] rounded-md'>
                <Link href={`/notebooks/${notebook.id}`} className='text-blue-600'>{notebook.title}</Link>
                <div className='edit-delete ml-auto'>
                  <EditButton notebookId={notebook.id} />
                  <DeleteIcon
                    notebookId={notebook.id} 
                    onDelete={() => {
                      handleDelete(notebook.id);
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

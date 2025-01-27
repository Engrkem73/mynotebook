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
    <div className='flex-col justify-start'>
      {notebooks.length === 0 ? (
        <p>You have no notebooks. Create one below!</p>
      ) : (
        <ul className='flex flex-col justify-start items-center gap-5 w-screen'>
      
          {notebooks.map((notebook) => (
            <li key={notebook.id} className='w-4/5 md:w-3/5 h-12 flex flex-row items-center justify-between'>
                <div className='r'>
                  <Link href={`/notebooks/${notebook.id}`} className='text-white'>{notebook.title}</Link>
                </div>
                <div className='flex flex-row justify-between items-center pr-4 gap-4'>
                  <EditButton notebookId={notebook.id} />
                  <DeleteIcon
                    notebookId={notebook.id} 
                    onDelete={() => {
                      handleDelete(notebook.id);
                    }} 
                  />
                </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

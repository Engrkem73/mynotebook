"use client";

import { useEffect, useState } from 'react';
import { Notebook } from '@prisma/client';
import Link from 'next/link';
import { PageProps } from '../../../types';

export default function NotebookView({ params }: PageProps) {
  const [notebook, setNotebook] = useState<Notebook | null>(null);

  useEffect(() => {
    async function fetchNotebook() {
      const resolvedParams = await params;
      const response = await fetch(`/api/notebooks/${resolvedParams.id}`);
      if (response.ok) {
        const data = await response.json();
        setNotebook(data);
      }
    }
    fetchNotebook();
  }, [params]);

  if (!notebook) {
    return <div className='flex flex-col items-center justify-center bg-gray-800 w-[600px] h-[400px] pt-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg gap-4'>Loading...</div>;
  }

  return (
    <main>
    <div className="create-notebook">
      <div className="notebook-form">
        <div className="label">
          <span className="text-2xl font-bold w-[100px]">Title:</span>
          <div className="title-input bg-gray-200">{notebook.title}</div>
        </div>
        <div className="button-container">
          <div className="right-padding"></div>
          <div className="left-padding">
            <div className="button-container">
              <Link href="/"><button className="cancel-button">
                Back
              </button></Link>
              <Link href={`/notebooks/${notebook.id}/edit`}><button className="create-button">
                Edit
              </button></Link>
            </div>
          </div>
        </div>
        <div className="label">
          <span className="text-2xl font-bold w-[100px] self-start">Content:</span>
          <div className="content-input whitespace-pre-wrap bg-gray-200">{notebook.content}</div>
        </div>
      </div>
    </div>
    </main>
  );
}

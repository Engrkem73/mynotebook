"use client";

import { useEffect, useState } from 'react';
import { Notebook } from '@prisma/client';
import Link from 'next/link';

export default function NotebookView({ id }: { id: string }) {
  const [notebook, setNotebook] = useState<Notebook | null>(null);

  useEffect(() => {
    async function fetchNotebook() {
      const response = await fetch(`/api/notebooks/${id}`);
      if (response.ok) {
        const data = await response.json();
        setNotebook(data);
      }
    }
    fetchNotebook();
  }, [id]);

  if (!notebook) {
    return <div>Loading...</div>;
  }

  return (
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
              <Link href={`/notebooks/${id}/edit`}><button className="create-button">
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
  );
}
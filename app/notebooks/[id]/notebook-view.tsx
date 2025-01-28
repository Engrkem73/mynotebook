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
    return <div className="min-h-screen flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="text-lg text-gray-600">Loading...</p>
              </div>
            </div>
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
        <div className="p-6 rounded-lg shadow-md h-screen w-4/5 flex flex-col">
          <div className="block mb-4 h-[50px]">
            <div className="bg-gray-600 m-2 p-2 text-white block h-full w-full rounded-md border-gray-300 shadow-sm">{notebook.title}</div>
          </div>
          <div className="flex justify-end gap-4 items-center h-1/10">
            <Link href="/"><button className="cancel-button bg-red-500 text-white px-4 py-2 rounded-md">Back</button></Link>
            <Link href={`/notebooks/${notebook.id}/edit`}><button className="create-button bg-blue-500 text-white px-4 py-2 rounded-md">Edit</button></Link>
          </div>
          <div className="block flex-1">
            <div className="bg-gray-600 m-2 p-2 text-white block w-full h-full rounded-md border-gray-300 shadow-sm">{notebook.content}</div>
          </div>
        </div>
    </main>
  );
}

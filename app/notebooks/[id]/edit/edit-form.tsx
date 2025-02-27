"use client";

import { useEffect, useState} from 'react';
import { useRouter } from 'next/navigation'; // Correct to use in Next.js 13 app dir
import { Notebook } from '@prisma/client';
import Cancel from '@/app/components/cancel';

type EditNotebookFormProps = {
  id: string;
};

export default function EditNotebookForm({ id }: EditNotebookFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchNotebook() {
      const response = await fetch(`/api/notebooks/${id}`);
      if (response.ok) {
        const notebook: Notebook = await response.json();
        setTitle(notebook.title);
        setContent(notebook.content);
      }
    }
    fetchNotebook();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);

    const response = await fetch(`/api/notebooks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });
    setIsSaving(false);

    if (response.ok) {
      router.push('/'); // Redirect to homepage or notebook list
    } else {
      alert('Failed to update notebook');
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-md h-screen w-screen md:w-4/5 flex flex-col">
        <label className="block mb-4 h-[50px]">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="bg-gray-600 m-2 p-2 text-white block h-full w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <div className="flex justify-end gap-4 items-center h-1/10">
          <Cancel />
          <button type="submit" className="bg-blue-500 w-[100px] text-center text-white px-4 py-2 rounded-md mb-4" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
        <label className="block flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="bg-gray-600 m-2 p-2 text-white block w-full h-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
      </form>
    </main>
  );
}

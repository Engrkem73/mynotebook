"use client";

import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // Correct to use in Next.js 13 app dir
import { Notebook } from '@prisma/client';
import Link from 'next/link';
import Cancel from '@/app/components/cancel';

type EditNotebookFormProps = {
  id: string;
};

export default function EditNotebookForm({ id }: EditNotebookFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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

  async function handleSubmit(event: any) {
    event.preventDefault();

    const response = await fetch(`/api/notebooks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      router.push('/'); // Redirect to homepage or notebook list
    } else {
      alert('Failed to update notebook');
    }
  }

  return (
    <div className="create-notebook">
      <form className="notebook-form">
        <label className="label">
          <span className="text-2xl font-bold w-[100px]">Title:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="title-input"
          />
        </label>
        <div className="button-container">
          <div className="right-padding"></div>
          <div className="left-padding">
            <div className="button-container">
              <Cancel />
              <button type="button" onClick={handleSubmit} className="create-button">
                Update
              </button>
            </div>
          </div>
        </div>
        <label className="label">
          <span className="text-2xl font-bold w-[100px] self-start">Content:</span>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="content-input"
          />
        </label>
      </form>
    </div>
  );
}

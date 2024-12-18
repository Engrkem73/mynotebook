"use client";

import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // Correct to use in Next.js 13 app dir
import { Notebook } from '@prisma/client';
import Link from 'next/link';

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

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
      <form onSubmit={handleSubmit} className="notebook-form">
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
              <Link href={`/notebooks/${id}`}><button type="button" className="cancel-button">
                Cancel
              </button></Link>
              <button type="submit" className="create-button">
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

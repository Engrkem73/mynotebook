"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewNotebook() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch("/api/notebooks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      router.push("/");
    } else {
      alert("Failed to create notebook");
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
            <Link href="/"><button type="reset" className="cancel-button">
              Cancel
            </button></Link>
            <button type="submit" className="create-button">
              Create
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

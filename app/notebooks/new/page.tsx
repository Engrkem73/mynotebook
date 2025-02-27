"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Cancel from "@/app/components/cancel";

export default function NewNotebook() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);

    const response = await fetch("/api/notebooks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    

    setIsSaving(false);

    if (response.ok) {
      router.push("/");
    } else {
      alert("Failed to create notebook");
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-md h-screen w-screen sm:w-4/5 flex flex-col">
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
            {isSaving ? "Saving..." : "Create"}
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

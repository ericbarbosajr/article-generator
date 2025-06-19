"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "../../../../supabaseClient";

export default function EditArticle() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();
      if (!error && data) {
        setTitle(data.title);
        setContent(data.content);
      }
    }
    if (id) fetchArticle();
  }, [id]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from("articles")
      .update({ title, content })
      .eq("id", id);
    setLoading(false);
    if (!error) router.push("/");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Article</h1>
      <form
        onSubmit={handleUpdate}
        className="space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded"
          disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}

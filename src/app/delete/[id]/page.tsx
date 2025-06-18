"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "../../../supabaseClient";

interface Article {
  id: number;
  title: string;
  content: string;
}

export default function DeleteArticle() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();
      if (!error && data) setArticle(data);
    }
    if (id) fetchArticle();
  }, [id]);

  async function handleDelete() {
    setLoading(true);
    const { error } = await supabase.from("articles").delete().eq("id", id);
    setLoading(false);
    if (!error) router.push("/");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Delete Article</h1>
      {article ? (
        <div className="mb-4">
          <h2 className="font-semibold text-lg">{article.title}</h2>
          <p>{article.content}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="flex gap-2">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
          disabled={loading}>
          {loading ? "Deleting..." : "Confirm Delete"}
        </button>
        <button
          onClick={() => router.push("/")}
          className="bg-gray-400 text-white px-4 py-2 rounded"
          disabled={loading}>
          Cancel
        </button>
      </div>
    </div>
  );
}

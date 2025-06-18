"use client";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

interface Article {
  id: number;
  title: string;
  content: string;
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editing, setEditing] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    setLoading(true);
    const { data, error } = await supabase.from("articles").select("*");
    if (!error && data) setArticles(data);
    setLoading(false);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !content) return;
    const { data, error } = await supabase
      .from("articles")
      .insert([{ title, content }])
      .select();
    if (!error && data) setArticles((prev) => [...prev, ...data]);
    setTitle("");
    setContent("");
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    const { data, error } = await supabase
      .from("articles")
      .update({ title, content })
      .eq("id", editing.id)
      .select();
    if (!error && data) {
      setArticles((prev) =>
        prev.map((a) => (a.id === editing.id ? data[0] : a))
      );
      setEditing(null);
      setTitle("");
      setContent("");
    }
  }

  async function handleDelete(id: number) {
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (!error) setArticles((prev) => prev.filter((a) => a.id !== id));
  }

  function startEdit(article: Article) {
    setEditing(article);
    setTitle(article.title);
    setContent(article.content);
  }

  function cancelEdit() {
    setEditing(null);
    setTitle("");
    setContent("");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Articles</h1>
      <form
        onSubmit={editing ? handleUpdate : handleCreate}
        className="mb-6 space-y-2">
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
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}>
            {editing ? "Update" : "Create"}
          </button>
          {editing && (
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {articles.map((article) => (
            <li
              key={article.id}
              className="border p-4 rounded bg-white">
              <h2 className="font-semibold text-lg">{article.title}</h2>
              <p className="mb-2">{article.content}</p>
              <div className="flex gap-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                  onClick={() => startEdit(article)}>
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(article.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

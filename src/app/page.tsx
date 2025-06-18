"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

interface Article {
  id: number;
  title: string;
  content: string;
}

export default function Dashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Articles</h1>
      <div className="mb-6">
        <Link
          href="/create"
          className="bg-blue-600 text-white px-4 py-2 rounded">
          Create New Article
        </Link>
      </div>
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
                <Link
                  href={`/edit/${article.id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded">
                  Edit
                </Link>
                <Link
                  href={`/delete/${article.id}`}
                  className="bg-red-600 text-white px-3 py-1 rounded">
                  Delete
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";

interface Article {
  id: number;
  title: string;
  content: string;
}

export default async function ArticlesPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    if (error) console.error(error);
    redirect("/login");
  }

  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .eq("user_id", user.id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Articles</h1>
      <div className="mb-6">
        <Link href="/articles/create">
          <Button className="bg-blue-600 text-white px-4 py-2 rounded">
            Create New Article
          </Button>
        </Link>
      </div>
      {error && typeof error === "object" && "message" in error && (
        <p className="text-red-500">{(error as { message: string }).message}</p>
      )}
      {!articles || articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <ul className="space-y-4">
          {articles.map((article: Article) => (
            <li
              key={article.id}
              className="border p-4 rounded bg-white">
              <Link
                href={`/articles/edit/${article.id}`}
                className="font-semibold text-lg hover:underline">
                {article.title}
              </Link>
              <p className="mb-2">{article.content}</p>
              <div className="flex gap-2">
                <Link href={`/articles/delete/${article.id}`}>
                  <Button
                    variant="destructive"
                    className="bg-red-600 text-white px-3 py-1 rounded">
                    Delete
                  </Button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

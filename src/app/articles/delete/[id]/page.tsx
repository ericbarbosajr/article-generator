import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function DeleteArticle({ params }: { params: any }) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    if (error) console.error(error);
    redirect("/login");
  }

  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!article) {
    return <div>Article not found</div>;
  }

  async function handleDelete() {
    "use server";
    const supabase = await createClient();
    const { error } = await supabase
      .from("articles")
      .delete()
      .eq("id", params.id);
    if (!error) {
      redirect("/articles");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Delete Article</h1>
      <div className="mb-4">
        <h2 className="font-semibold text-lg">{article.title}</h2>
        <p>{article.content}</p>
      </div>
      <div className="flex gap-2">
        <form action={handleDelete}>
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded">
            Confirm Delete
          </button>
        </form>
        <form action="/articles">
          <button
            type="submit"
            className="bg-gray-400 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

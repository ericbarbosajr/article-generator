import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function EditArticle({ params }: { params: any }) {
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
    .eq("user_id", user.id)
    .single();

  if (!article) {
    return <div>Article not found</div>;
  }

  async function handleUpdate(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    if (!title || !content) return;

    const supabase = await createClient();
    const { error } = await supabase
      .from("articles")
      .update({ title, content })
      .eq("id", params.id);

    if (!error) {
      redirect("/articles");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Article</h1>
      <form
        action={handleUpdate}
        className="space-y-2">
        <input
          name="title"
          className="border p-2 w-full"
          placeholder="Title"
          defaultValue={article.title}
        />
        <textarea
          name="content"
          className="border p-2 w-full"
          placeholder="Content"
          defaultValue={article.content}
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}

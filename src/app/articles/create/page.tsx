import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function CreateArticle() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    if (error) console.error(error);
    redirect("/login");
  }

  async function handleCreate(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    if (!title || !content) return;

    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) return;

    const { error } = await supabase
      .from("articles")
      .insert([{ title, content, user_id: user.id }]);

    console.log(error);

    if (!error) {
      redirect("/articles");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Article</h1>
      <form
        action={handleCreate}
        className="space-y-2">
        <input
          name="title"
          className="border p-2 w-full"
          placeholder="Title"
        />
        <textarea
          name="content"
          className="border p-2 w-full"
          placeholder="Content"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}

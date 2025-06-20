import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function CreateArticle() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  async function handleCreate(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    if (!title || !content) return;

    const supabase = createServerComponentClient({ cookies });
    const { error } = await supabase
      .from("articles")
      .insert([{ title, content }]);
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

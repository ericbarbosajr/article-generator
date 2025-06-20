import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    if (error) console.error(error);
    redirect("/login");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="space-y-4">
        <p>
          Welcome to the Article Generator app! This application helps you
          generate high-quality articles using AI.
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>
            Provide reference URLs and any supplementary content to guide the AI
            in generating your articles.
          </li>
          <li>
            Easily manage, edit, and delete your generated articles from your
            dashboard.
          </li>
        </ul>
        <p className="italic text-gray-600">
          <strong>Coming soon:</strong> A webhook feature will allow external
          endpoints to automatically receive generated articles as soon as they
          are created.
        </p>
      </div>
    </div>
  );
}

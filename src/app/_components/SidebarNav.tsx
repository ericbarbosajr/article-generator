import Link from "next/link";
import type { User } from "@supabase/supabase-js";

type SidebarNavProps = {
  user: User | null;
};

export default function SidebarNav({ user }: SidebarNavProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 h-full min-h-screen flex flex-col">
      <nav className="flex flex-col flex-1">
        <ul className="space-y-4 flex flex-col h-full flex-1 ">
          <li className="font-bold text-lg">Article Generator</li>
          <li>
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/articles/generate"
              className="text-gray-700 hover:text-blue-600">
              Generate Article
            </Link>
          </li>
          <li>
            <Link
              href="/articles"
              className="text-gray-700 hover:text-blue-600">
              Articles
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className="text-gray-700 hover:text-blue-600">
              Settings
            </Link>
          </li>
          <div className="flex-grow" />
          {user && (
            <li className="text-gray-500 text-sm truncate mb-2">
              {user.email}
            </li>
          )}
          <li>
            {user ? (
              <form
                action="/auth/logout"
                method="post">
                <button
                  type="submit"
                  className="text-gray-700 hover:text-blue-600">
                  Logout
                </button>
              </form>
            ) : (
              <Link
                href="/login"
                className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
}

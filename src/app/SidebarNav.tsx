import Link from "next/link";

export default function SidebarNav() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">
      <nav>
        <ul className="space-y-4">
          <li className="font-bold text-lg">Article Generator</li>
          <li>
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-blue-600">
              Dashboard
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
        </ul>
      </nav>
    </aside>
  );
}

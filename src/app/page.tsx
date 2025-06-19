"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Article Generator</h1>
      <p className="text-lg mb-8">
        A simple article management app using Next.js and Supabase
      </p>
      <div className="space-x-4">
        <Link
          href="/dashboard"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Go to Dashboard
        </Link>
        <Link
          href="/articles"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
          View Articles
        </Link>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const GenerateArticlePage = () => {
  const [input, setInput] = useState("");
  const [generated, setGenerated] = useState<{
    title: string;
    content: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const MAX_INPUT_LENGTH = parseInt(
    process.env.NEXT_PUBLIC_MAX_INPUT_LENGTH || "2000",
    10
  );

  const handleGenerate = async () => {
    setErrorMsg("");
    if (input.length > MAX_INPUT_LENGTH) {
      setErrorMsg(
        `Input is too long. Maximum allowed is ${MAX_INPUT_LENGTH} characters.`
      );
      return;
    }
    setLoading(true);
    setGenerated(null);

    try {
      const response = await fetch("/api/generate-article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: input }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate article");
      }

      const data = await response.json();
      setGenerated(data);
    } catch (error) {
      console.error(error);
      setErrorMsg("An error occurred while generating the article.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!generated) return;
    const supabase = createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      alert("You must be logged in to save articles.");
      return;
    }
    const { error } = await supabase.from("articles").insert([
      {
        title: generated.title,
        content: generated.content,
        user_id: user.id,
      },
    ]);
    if (error) {
      alert("Failed to save article: " + error.message);
    } else {
      alert("Article saved!");
      router.push("/articles");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Generate Article</h1>
      <textarea
        className="w-full border rounded p-2 mb-4 min-h-[120px]"
        placeholder="Paste your text content here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
        maxLength={MAX_INPUT_LENGTH + 1}
      />
      <div className="text-sm text-gray-500 mb-2">
        {input.length}/{MAX_INPUT_LENGTH} characters
      </div>
      {errorMsg && <div className="text-red-600 mb-2">{errorMsg}</div>}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleGenerate}
        disabled={loading || !input.trim()}>
        {loading ? "Generating..." : "Generate"}
      </button>

      {generated && (
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">{generated.title}</h2>
          <p className="mb-4 whitespace-pre-line">{generated.content}</p>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={handleSave}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateArticlePage;

import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MAX_INPUT_LENGTH = parseInt(
  process.env.NEXT_PUBLIC_MAX_INPUT_LENGTH || "2000",
  10
);

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    if (content.length > MAX_INPUT_LENGTH) {
      return NextResponse.json(
        {
          error: `Content is too long. Maximum allowed is ${MAX_INPUT_LENGTH} characters.`,
        },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert article writer.
          Given the text provided by the user, generate a compelling article with a title.
          Return the result as a JSON object with "title" and "content" keys.`,
        },
        {
          role: "user",
          content: content,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = completion.choices[0].message.content;

    if (!result) {
      return NextResponse.json(
        { error: "Failed to generate article" },
        { status: 500 }
      );
    }

    // The result from OpenAI should be a JSON string, so we parse it.
    const article = JSON.parse(result);

    return NextResponse.json(article);
  } catch (error) {
    console.error("Error generating article:", error);
    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}

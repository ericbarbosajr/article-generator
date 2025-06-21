// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

console.info("server started");

Deno.serve(async (req: Request) => {
  const payload = await req.json();
  const { name } = payload;

  console.log(JSON.stringify(payload, null, 2));

  console.log("name", name);

  const data = {
    message: `Hello ${name}!`,
  };

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      Connection: "keep-alive",
    },
  });
});

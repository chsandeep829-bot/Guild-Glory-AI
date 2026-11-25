export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      if (url.pathname === "/api/health" && request.method === "GET") {
        return Response.json({
          ok: true,
          service: "guild-glory-api",
          configured: {
            turso: Boolean(env.TURSO_DATABASE_URL && env.TURSO_AUTH_TOKEN),
            b2: Boolean(env.B2_KEY_ID && env.B2_APPLICATION_KEY && env.B2_BUCKET_NAME && env.B2_ENDPOINT && env.B2_REGION),
            gemini: Boolean(env.GEMINI_API_KEY)
          },
          note: "Deployment health check only. Guild data endpoints are not migrated from Firestore yet."
        }, { headers: { "Cache-Control": "no-store" } });
      }
      return Response.json({ error: "API route not found" }, { status: 404 });
    }

    return env.ASSETS.fetch(request);
  }
};

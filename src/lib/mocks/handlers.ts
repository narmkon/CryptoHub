import { http, HttpResponse } from "msw";
import { db, createPaginatedResponse } from "./db";
import { BASE_URL } from "@/config";

export const handlers = [
  http.get(BASE_URL + "/api/data", ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const size = Number(url.searchParams.get("size")) || 50;

    const paginatedData = createPaginatedResponse(page, size, "/api/data");

    return HttpResponse.json(paginatedData);
  }),

  http.get("/api/data/:crypto", ({ params }) => {
    const { crypto } = params;
    const found = db.cryptocurrency.findFirst({
      where: {
        cryptocurrency: {
          contains: crypto as string,
        },
      },
    });

    if (!found) {
      return HttpResponse.json(
        { error: "Cryptocurrency not found" },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      perf_24h: found.perf_24h,
      perf_7d: found.perf_7d,
      perf_30d: found.perf_30d,
      perf_90d: found.perf_90d,
      cryptocurrency: found.cryptocurrency,
    });
  }),
];

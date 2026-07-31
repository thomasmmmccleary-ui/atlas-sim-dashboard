import { ACTIVITY_ORDER } from "@/lib/activities";

const GITHUB_CONTENTS_URL =
  "https://api.github.com/repos/thomasmmmccleary-ui/atlas-sim-dashboard/contents/public/status.json";

function isActivityKey(v: unknown): v is (typeof ACTIVITY_ORDER)[number] {
  return typeof v === "string" && (ACTIVITY_ORDER as string[]).includes(v);
}

const OK_HEADERS = {
  "Cache-Control": "s-maxage=30, stale-while-revalidate=120",
  "Content-Type": "application/json",
};

function fail() {
  return Response.json({ ok: false }, { status: 200, headers: OK_HEADERS });
}

export async function GET() {
  try {
    const res = await fetch(GITHUB_CONTENTS_URL, {
      headers: { Accept: "application/vnd.github.raw" },
      next: { revalidate: 90 },
    });
    if (!res.ok) return fail();

    const data = await res.json();
    if (
      !isActivityKey(data.activity) ||
      typeof data.label !== "string" ||
      typeof data.updated_at !== "string"
    ) {
      return fail();
    }

    return Response.json(
      {
        ok: true,
        activity: data.activity,
        label: data.label,
        updated_at: data.updated_at,
      },
      { status: 200, headers: OK_HEADERS }
    );
  } catch {
    return fail();
  }
}

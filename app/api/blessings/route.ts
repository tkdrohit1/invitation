import { NextRequest, NextResponse } from "next/server";
import { getAllBlessings, saveBlessing, toggleBlessingApproval, deleteBlessing } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";
    const blessings = getAllBlessings(!all);
    return NextResponse.json({ success: true, blessings });
  } catch (error) {
    console.error("GET Blessings error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch blessings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { authorName, relation, message } = body;

    if (!authorName || !message) {
      return NextResponse.json({ success: false, error: "Name and message are required" }, { status: 400 });
    }

    const saved = saveBlessing(authorName.trim(), message.trim(), relation);
    return NextResponse.json({ success: true, blessing: saved });
  } catch (error) {
    console.error("POST Blessing error:", error);
    return NextResponse.json({ success: false, error: "Failed to post blessing" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, action } = body;

    if (action === "toggle") {
      const ok = toggleBlessingApproval(id);
      return NextResponse.json({ success: ok });
    }

    if (action === "delete") {
      const ok = deleteBlessing(id);
      return NextResponse.json({ success: ok });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("PATCH Blessing error:", error);
    return NextResponse.json({ success: false, error: "Failed to update blessing" }, { status: 500 });
  }
}

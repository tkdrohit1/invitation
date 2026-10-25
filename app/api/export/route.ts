import { NextRequest, NextResponse } from "next/server";
import { getAllRsvps } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const rsvps = getAllRsvps();

    // Generate CSV Header
    const headers = [
      "ID",
      "Guest Name",
      "Attending",
      "Party Size",
      "Dietary Preference",
      "Dietary Notes",
      "Events Attending",
      "Contact Info",
      "Message to Couple",
      "Submitted At",
    ];

    const rows = rsvps.map((r) => [
      r.id,
      `"${(r.guestName || "").replace(/"/g, '""')}"`,
      r.attending.toUpperCase(),
      r.attending === "yes" ? r.guestCount : 0,
      r.dietaryPreference,
      `"${(r.dietaryNotes || "").replace(/"/g, '""')}"`,
      `"${(r.eventsAttending || []).join(", ")}"`,
      `"${(r.emailOrPhone || "").replace(/"/g, '""')}"`,
      `"${(r.message || "").replace(/"/g, '""')}"`,
      new Date(r.createdAt).toLocaleString(),
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\r\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="wedding-rsvp-list-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ success: false, error: "Failed to generate CSV" }, { status: 500 });
  }
}

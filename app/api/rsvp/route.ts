import { NextRequest, NextResponse } from "next/server";
import { getAllRsvps, saveRsvp } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    // Optional admin security check or stats view
    const rsvps = getAllRsvps();
    const totalCount = rsvps.reduce((acc, curr) => (curr.attending === "yes" ? acc + (Number(curr.guestCount) || 1) : acc), 0);
    const confirmedCount = rsvps.filter((r) => r.attending === "yes").length;
    const declinedCount = rsvps.filter((r) => r.attending === "no").length;

    const dietaryBreakdown = rsvps.reduce((acc, curr) => {
      if (curr.attending === "yes") {
        acc[curr.dietaryPreference] = (acc[curr.dietaryPreference] || 0) + (Number(curr.guestCount) || 1);
      }
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      success: true,
      stats: {
        totalGuestsAttending: totalCount,
        confirmedRsvps: confirmedCount,
        declinedRsvps: declinedCount,
        dietaryBreakdown,
      },
      rsvps,
    });
  } catch (error) {
    console.error("GET RSVP error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch RSVPs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { guestName, emailOrPhone, attending, guestCount, dietaryPreference, dietaryNotes, eventsAttending, message } = body;

    if (!guestName || !attending) {
      return NextResponse.json({ success: false, error: "Guest name and attendance status are required" }, { status: 400 });
    }

    const saved = saveRsvp({
      guestName: guestName.trim(),
      emailOrPhone: emailOrPhone?.trim() || "",
      attending,
      guestCount: attending === "yes" ? Number(guestCount) || 1 : 0,
      dietaryPreference: dietaryPreference || "vegetarian",
      dietaryNotes: dietaryNotes?.trim() || "",
      eventsAttending: Array.isArray(eventsAttending) ? eventsAttending : [],
      message: message?.trim() || "",
    });

    return NextResponse.json({ success: true, rsvp: saved });
  } catch (error) {
    console.error("POST RSVP error:", error);
    return NextResponse.json({ success: false, error: "Failed to submit RSVP" }, { status: 500 });
  }
}

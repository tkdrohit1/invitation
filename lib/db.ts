import fs from "fs";
import path from "path";
import { RsvpSubmission, BlessingItem } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const RSVP_FILE = path.join(DATA_DIR, "rsvps.json");
const BLESSINGS_FILE = path.join(DATA_DIR, "blessings.json");

// Ensure data folder and files exist
function ensureFiles() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(RSVP_FILE)) {
    const initialRsvps: RsvpSubmission[] = [
      {
        id: "rsvp-seed-1",
        guestName: "Rohit Verma & Family",
        emailOrPhone: "rohit@example.com",
        attending: "yes",
        guestCount: 3,
        dietaryPreference: "vegetarian",
        dietaryNotes: "No mushrooms please",
        eventsAttending: ["mehendi", "sangeet", "haldi", "wedding", "reception"],
        message: "Can't wait to celebrate with you both in Udaipur!",
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      },
      {
        id: "rsvp-seed-2",
        guestName: "Dr. Alok & Meena Sen",
        emailOrPhone: "+91 98765 43210",
        attending: "yes",
        guestCount: 2,
        dietaryPreference: "jain",
        dietaryNotes: "Strict Jain meal",
        eventsAttending: ["wedding", "reception"],
        message: "Heartfelt congratulations to Aarav and Ananya!",
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
    ];
    fs.writeFileSync(RSVP_FILE, JSON.stringify(initialRsvps, null, 2), "utf-8");
  }

  if (!fs.existsSync(BLESSINGS_FILE)) {
    const initialBlessings: BlessingItem[] = [
      {
        id: "blessing-1",
        authorName: "Dadi & Dadaji",
        relation: "Grandparents",
        message:
          "May Lord Shiva and Parvati shower both of you with eternal harmony, deep love, and prosperous years together. God bless you, our dearest children!",
        approved: true,
        createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
      },
      {
        id: "blessing-2",
        authorName: "Kunal & Simran",
        relation: "College Friends",
        message:
          "From study sessions in Delhi to the Royal Palaces of Udaipur! So thrilled for you two! Looking forward to setting the Sangeet dance floor on fire!",
        approved: true,
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        id: "blessing-3",
        authorName: "The Kapoor Family",
        relation: "Family Friends",
        message:
          "Wishing Aarav and Ananya a lifetime of laughter, mutual understanding, and endless happiness. Counting down the days to the royal celebration!",
        approved: true,
        createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      },
    ];
    fs.writeFileSync(BLESSINGS_FILE, JSON.stringify(initialBlessings, null, 2), "utf-8");
  }
}

// RSVP Operations
export function getAllRsvps(): RsvpSubmission[] {
  ensureFiles();
  try {
    const data = fs.readFileSync(RSVP_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading RSVPs:", err);
    return [];
  }
}

export function saveRsvp(submission: Omit<RsvpSubmission, "id" | "createdAt">): RsvpSubmission {
  ensureFiles();
  const rsvps = getAllRsvps();
  const newRsvp: RsvpSubmission = {
    ...submission,
    id: `rsvp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
  };

  rsvps.unshift(newRsvp);
  fs.writeFileSync(RSVP_FILE, JSON.stringify(rsvps, null, 2), "utf-8");
  return newRsvp;
}

// Blessings Operations
export function getAllBlessings(onlyApproved = true): BlessingItem[] {
  ensureFiles();
  try {
    const data = fs.readFileSync(BLESSINGS_FILE, "utf-8");
    const blessings: BlessingItem[] = JSON.parse(data);
    return onlyApproved ? blessings.filter((b) => b.approved) : blessings;
  } catch (err) {
    console.error("Error reading blessings:", err);
    return [];
  }
}

export function saveBlessing(authorName: string, message: string, relation?: string): BlessingItem {
  ensureFiles();
  const blessings = getAllBlessings(false);
  const newBlessing: BlessingItem = {
    id: `blessing-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    authorName,
    relation: relation?.trim() || "Well-wisher",
    message,
    approved: true, // auto-approve by default, can be toggled in admin
    createdAt: new Date().toISOString(),
  };

  blessings.unshift(newBlessing);
  fs.writeFileSync(BLESSINGS_FILE, JSON.stringify(blessings, null, 2), "utf-8");
  return newBlessing;
}

export function toggleBlessingApproval(id: string): boolean {
  ensureFiles();
  const blessings = getAllBlessings(false);
  const item = blessings.find((b) => b.id === id);
  if (item) {
    item.approved = !item.approved;
    fs.writeFileSync(BLESSINGS_FILE, JSON.stringify(blessings, null, 2), "utf-8");
    return true;
  }
  return false;
}

export function deleteBlessing(id: string): boolean {
  ensureFiles();
  const blessings = getAllBlessings(false);
  const filtered = blessings.filter((b) => b.id !== id);
  fs.writeFileSync(BLESSINGS_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}

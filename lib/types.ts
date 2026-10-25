export interface WeddingEvent {
  id: string;
  name: string;
  subtitle?: string;
  date: string; // e.g. "December 12, 2026"
  time: string; // e.g. "4:00 PM onwards"
  venue: string;
  location: string;
  dressCode?: string;
  description: string;
  iconName: string;
  googleCalendarUrl?: string;
}

export interface VenueDetail {
  id: string;
  name: string;
  address: string;
  city: string;
  description: string;
  mapEmbedUrl?: string;
  directionsUrl: string;
  accommodationNotes?: string;
}

export interface StoryMilestone {
  year: string;
  title: string;
  description: string;
  image?: string;
}

export interface GalleryPhoto {
  url: string;
  caption: string;
  alt: string;
}

export interface WeddingConfig {
  couple: {
    groom: {
      firstName: string;
      fullName: string;
      parents: string;
    };
    bride: {
      firstName: string;
      fullName: string;
      parents: string;
    };
    hashtag: string;
    weddingDate: string; // ISO date for countdown: e.g. "2026-12-12T16:00:00+05:30"
    displayDate: string; // e.g. "12 . 12 . 2026"
    city: string;
    quote: string;
    invitationLetter: string;
    heroImage?: string;
  };
  theme: {
    maroonDark: string; // "#2b060d"
    maroonBase: string; // "#5c121e"
    goldAccent: string;  // "#e8c98a"
    goldLight: string;   // "#f6e6c2"
    ivory: string;       // "#fcf8f2"
  };
  music: {
    title: string;
    artist: string;
    audioUrl: string;
  };
  events: WeddingEvent[];
  venues: VenueDetail[];
  story: StoryMilestone[];
  gallery: GalleryPhoto[];
}

export interface RsvpSubmission {
  id: string;
  guestName: string;
  emailOrPhone: string;
  attending: "yes" | "no";
  guestCount: number;
  dietaryPreference: "vegetarian" | "non-veg" | "halal" | "jain" | "other";
  dietaryNotes?: string;
  eventsAttending: string[];
  message?: string;
  createdAt: string;
}

export interface BlessingItem {
  id: string;
  authorName: string;
  relation?: string;
  message: string;
  approved: boolean;
  createdAt: string;
}

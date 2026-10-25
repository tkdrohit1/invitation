import { WeddingConfig } from "@/lib/types";

export const weddingConfig: WeddingConfig = {
  couple: {
    groom: {
      firstName: "Deepak",
      fullName: "Deepak Kumar",
      parents: "Son of Mrs. & Mr. Kumar",
    },
    bride: {
      firstName: "Pooja",
      fullName: "Pooja Sharma",
      parents: "Daughter of Mrs. & Mr. Sharma",
    },
    hashtag: "#DeepakWedsPooja",
    weddingDate: "2026-11-24T17:00:00+05:30",
    displayDate: "24 · 11 · 2026",
    city: "Kaushambi, Uttar Pradesh",
    quote: "At 11:11, you don't merely make a wish — you seal an eternal promise: ‘Be mine forever.’",
    invitationLetter:
      "Together with our families, we joyfully invite you to celebrate the beginning of our forever. Your love, laughter, and blessings will make our special day truly magical as we tie the knot in Kaushambi.",
    heroImage: "/images/couple-fairytale-v2.jpg",
  },
  theme: {
    maroonDark: "#2b060d",
    maroonBase: "#5c121e",
    goldAccent: "#e8c98a",
    goldLight: "#f5dfaa",
    ivory: "#fcf8f2",
  },
  music: {
    title: "Enchanted Vows (Ambient Flute & Sitar)",
    artist: "Royal Symphony Ensemble",
    audioUrl: "/music/wedding-theme.mp3",
  },
  events: [
    {
      id: "mehendi",
      name: "Mehendi & Sangeet Night",
      subtitle: "Colors, Henna & Musical Revelry",
      date: "Monday, November 23, 2026",
      time: "05:00 PM onwards",
      venue: "Royal Garden",
      location: "Kaushambi, Uttar Pradesh",
      dressCode: "Vibrant Traditional & Festive Ethnic",
      description:
        "An enchanting evening infused with fragrant henna, celebratory music, dancing, and delicious gourmet delicacies.",
      iconName: "Music",
      googleCalendarUrl:
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mehendi+%26+Sangeet+-+Deepak+%26+Pooja&dates=20261123T113000Z/20261123T163000Z&details=Mehendi+and+Sangeet+celebration&location=Royal+Garden,+Kaushambi,+Uttar+Pradesh",
    },
    {
      id: "haldi",
      name: "Phoolon Ki Haldi",
      subtitle: "Auspicious Morning Turmeric Ceremony",
      date: "Tuesday, November 24, 2026",
      time: "10:00 AM – 01:00 PM",
      venue: "Royal Garden (Courtyard)",
      location: "Kaushambi, Uttar Pradesh",
      dressCode: "Shades of Sunlit Yellow & Marigold",
      description:
        "A joyous morning of holy turmeric, sweet flower petal showers, and auspicious family blessings.",
      iconName: "Sun",
      googleCalendarUrl:
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Haldi+-+Deepak+%26+Pooja&dates=20261124T043000Z/20261124T073000Z&details=Phoolon+ki+haldi+ceremony&location=Royal+Garden,+Kaushambi,+Uttar+Pradesh",
    },
    {
      id: "wedding",
      name: "The Wedding & Pheras",
      subtitle: "Sacred Union & Seven Vows",
      date: "Tuesday, November 24, 2026",
      time: "06:00 PM – Baraat | 08:00 PM – Pheras",
      venue: "Royal Garden (Grand Lawns)",
      location: "Kaushambi, Uttar Pradesh",
      dressCode: "Regal Indian Heritage & Royal Attire",
      description:
        "Join us by the sacred mandap as Deepak and Pooja take their seven vows around the holy fire amidst chanting and love.",
      iconName: "Heart",
      googleCalendarUrl:
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+Ceremony+-+Deepak+%26+Pooja&dates=20261124T123000Z/20261124T183000Z&details=Wedding+Ceremony+and+Pheras&location=Royal+Garden,+Kaushambi,+Uttar+Pradesh",
    },
  ],
  venues: [
    {
      id: "royal-garden",
      name: "Royal Garden",
      address: "FM9M+CMG, Manikpur, Prayagraj, Uttar Pradesh 212208",
      city: "Manikpur, Prayagraj (Kaushambi Border)",
      description:
        "A premier royal wedding lawn and grand banquet venue adorned with lush green landscaping, shimmering chandeliers, and elegant celebration spaces.",
      directionsUrl: "https://www.google.com/maps/search/?api=1&query=FM9M%2BCMG%2C+Manikpur%2C+Prayagraj%2C+Uttar+Pradesh+212208",
      accommodationNotes:
        "Valet parking, guest welcome counter, and hospitality desks available at the main entrance.",
    },
  ],
  story: [
    {
      year: "2022",
      title: "When Destinies Crossed Paths",
      description:
        "What started as a warm conversation soon revealed how beautifully our thoughts, values, and dreams aligned.",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
    },
    {
      year: "2024",
      title: "Growing Stronger Together",
      description:
        "Through every celebration and season, our bond blossomed into mutual respect, unwavering care, and immense happiness.",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
    },
    {
      year: "2026",
      title: "Forever Begins Now",
      description:
        "With the heartfelt blessings of our loving parents and families, we take the sacred step into our lifelong journey together.",
      image: "/images/couple-hero.jpg",
    },
  ],
  gallery: [
    {
      url: "/images/couple-hero.jpg",
      caption: "Deepak & Pooja — Drifting into forever",
      alt: "Pooja and Deepak in royal maroon and ivory attire",
    },
    {
      url: "/images/pooja-2.jpg",
      caption: "Pooja — Grace & Elegance",
      alt: "Pooja in traditional festive attire",
    },
    {
      url: "/images/deepak-2.jpg",
      caption: "Deepak — Ready for the Big Day",
      alt: "Deepak smiling",
    },
    {
      url: "/images/pooja-1.jpg",
      caption: "Moments of Joy & Radiance",
      alt: "Pooja smiling",
    },
    {
      url: "/images/deepak-1.jpg",
      caption: "Cherished Memories & Anticipation",
      alt: "Deepak outdoors",
    },
  ],
};

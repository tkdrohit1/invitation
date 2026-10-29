export type Language = "en" | "hi";

export interface TranslationContent {
  nav: {
    schedule: string;
    venue: string;
    blessings: string;
    venueMapBtn: string;
    switchLang: string;
  };
  envelope: {
    badge: (guestName?: string) => string;
    saveTheDate: string;
    letter: string;
    displayDate: string;
    city: string;
    tapToBreak: string;
    enterCelebration: string;
    switchLangPrompt: string;
  };
  hero: {
    ganpatiInvocation?: string;
    badge: (guestName?: string) => string;
    saveTheDate: string;
    groomFirstName: string;
    brideFirstName: string;
    andSymbol: string;
    tagline: string;
    displayDate: string;
    venuePill: string;
    countdownTitle: string;
    countdownDays: string;
    countdownHours: string;
    countdownMins: string;
    countdownSecs: string;
    eventsBtn: string;
    mapBtn: string;
    scrollToExplore: string;
  };
  scratchCard: {
    title: string;
    dateUnveiled: string;
    scratchHint: (percent: number) => string;
    canvasTopText: string;
    canvasSubText: string;
    revealedSubtitle: string;
    revealedDate: string;
    revealedCity: string;
    bottomHint: string;
    revealBtn: string;
    revealedBtn: string;
  };
  schedule: {
    badge: string;
    title: string;
    subtitle: string;
    attireLabel: string;
    events: Array<{
      id: string;
      name: string;
      subtitle: string;
      dayOfWeek: string;
      date: string;
      time: string;
      venue: string;
      location: string;
      dressCode: string;
      description: string;
      iconName: string;
    }>;
  };
  venue: {
    badge: string;
    title: string;
    subtitle: string;
    name: string;
    city: string;
    description: string;
    addressLabel: string;
    address: string;
    logisticsLabel: string;
    logistics: string;
    mapBtn: string;
  };
  blessings: {
    badge: string;
    title: string;
    subtitle: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    relationLabel: string;
    relationPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    successToast: string;
    errorToast: string;
    wallTitle: string;
    approvedOnlyHint: string;
    emptyState: string;
    defaultBlessings: Array<{
      authorName: string;
      relation: string;
      message: string;
      date: string;
    }>;
  };
  footer: {
    hashtag: string;
    displayDate: string;
    city: string;
    invitationNote: string;
    allRightsReserved: string;
    organizerPortal: string;
  };
  mobileNav: {
    top: string;
    events: string;
    venue: string;
    blessings: string;
    celebrateTooltip: string;
  };
}

export const translations: Record<Language, TranslationContent> = {
  en: {
    nav: {
      schedule: "Schedule",
      venue: "Royal Garden Venue",
      blessings: "Blessings",
      venueMapBtn: "Venue Map",
      switchLang: "हिंदी",
    },
    envelope: {
      badge: (guestName) =>
        guestName ? `A Personal Invitation for ${guestName}` : "A Royal Wedding Invitation",
      saveTheDate: "Save the Date",
      letter:
        "Together with our families, we joyfully invite you to celebrate the beginning of our forever. Your love, laughter, and blessings will make our special day truly magical as we tie the knot in Kaushambi.",
      displayDate: "24 · 11 · 2026",
      city: "Kaushambi, Uttar Pradesh",
      tapToBreak: "TAP TO BREAK SEAL",
      enterCelebration: "Enter The Celebration",
      switchLangPrompt: "View in Hindi",
    },
    hero: {
      ganpatiInvocation: undefined,
      badge: (guestName) =>
        guestName ? `Warmest Welcome, ${guestName}` : "Together with our families",
      saveTheDate: "SAVE THE DATE",
      groomFirstName: "Deepak",
      brideFirstName: "Pooja",
      andSymbol: "&",
      tagline: "DRIFTING INTO FOREVER",
      displayDate: "24 NOVEMBER 2026",
      venuePill: "Royal Garden",
      countdownTitle: "COUNTDOWN TO THE AUSPICIOUS CEREMONY",
      countdownDays: "DAYS",
      countdownHours: "HOURS",
      countdownMins: "MINS",
      countdownSecs: "SECS",
      eventsBtn: "Celebration Events",
      mapBtn: "Royal Garden Map",
      scrollToExplore: "Scroll to Explore",
    },
    scratchCard: {
      title: "Save The Date",
      dateUnveiled: "Date Unveiled",
      scratchHint: (percent) => `Scratch ${percent}%`,
      canvasTopText: "✦ RUB GOLD FOIL TO REVEAL ✦",
      canvasSubText: "Scratch with your finger or mouse",
      revealedSubtitle: "Forever Begins On",
      revealedDate: "24 · 11 · 2026",
      revealedCity: "Kaushambi, Uttar Pradesh",
      bottomHint: "Auspicious wedding ceremony",
      revealBtn: "Reveal date",
      revealedBtn: "Revealed",
    },
    schedule: {
      badge: "Celebration Itinerary",
      title: "Events & Celebrations",
      subtitle:
        "We invite you to join us across two unforgettable days of joy, rituals, and celebration.",
      attireLabel: "Attire & Palette",
      events: [
        {
          id: "mehendi",
          name: "Mehendi & Sangeet Night",
          subtitle: "Colors, Henna & Musical Revelry",
          dayOfWeek: "Monday",
          date: "Monday, November 23, 2026",
          time: "05:00 PM onwards",
          venue: "Royal Garden",
          location: "Kaushambi, Uttar Pradesh",
          dressCode: "Vibrant Traditional & Festive Ethnic",
          description:
            "An enchanting evening infused with fragrant henna, celebratory music, dancing, and delicious gourmet delicacies.",
          iconName: "Music",
        },
        {
          id: "haldi",
          name: "Phoolon Ki Haldi",
          subtitle: "Auspicious Morning Turmeric Ceremony",
          dayOfWeek: "Tuesday",
          date: "Tuesday, November 24, 2026",
          time: "10:00 AM – 01:00 PM",
          venue: "Royal Garden (Courtyard)",
          location: "Kaushambi, Uttar Pradesh",
          dressCode: "Shades of Sunlit Yellow & Marigold",
          description:
            "A joyous morning of holy turmeric, sweet flower petal showers, and auspicious family blessings.",
          iconName: "Sun",
        },
        {
          id: "wedding",
          name: "The Wedding & Pheras",
          subtitle: "Sacred Union & Seven Vows",
          dayOfWeek: "Tuesday",
          date: "Tuesday, November 24, 2026",
          time: "06:00 PM – Baraat | 08:00 PM – Pheras",
          venue: "Royal Garden (Grand Lawns)",
          location: "Kaushambi, Uttar Pradesh",
          dressCode: "Regal Indian Heritage & Royal Attire",
          description:
            "Join us by the sacred mandap as Deepak and Pooja take their seven vows around the holy fire amidst chanting and love.",
          iconName: "Heart",
        },
      ],
    },
    venue: {
      badge: "Venue & Directions",
      title: "The Wedding Setting",
      subtitle: "We look forward to welcoming you to the magnificent Royal Garden.",
      name: "Royal Garden",
      city: "Manikpur, Prayagraj (Kaushambi Border)",
      description:
        "A premier royal wedding lawn and grand banquet venue adorned with lush green landscaping, shimmering chandeliers, and elegant celebration spaces.",
      addressLabel: "Venue Address",
      address: "FM9M+CMG, Manikpur, Prayagraj, Uttar Pradesh 212208",
      logisticsLabel: "Guest Logistics",
      logistics:
        "Valet parking, guest welcome counter, and hospitality desks available at the main entrance.",
      mapBtn: "Open Royal Garden in Google Maps",
    },
    blessings: {
      badge: "Warmest Wishes",
      title: "The Blessings Wall",
      subtitle:
        "Leave your loving messages, advice, and prayers for Deepak and Pooja to treasure forever.",
      formTitle: "Write a Blessing",
      formSubtitle: "Your message will appear live on the wall for the couple and guests to see.",
      nameLabel: "Your Name *",
      namePlaceholder: "e.g. Ramesh Uncle, Priya Sharma",
      relationLabel: "Relationship to the Couple",
      relationPlaceholder: "e.g. Family Friend, Cousin, Colleague",
      messageLabel: "Your Blessing / Message *",
      messagePlaceholder: "Share your heartfelt wishes, advice, or celebration memories...",
      submitBtn: "Send Your Blessing",
      submittingBtn: "Posting Blessing...",
      successToast: "Your blessing has been posted on the wall!",
      errorToast: "Could not post blessing. Please try again.",
      wallTitle: "Loving Blessings & Wishes",
      approvedOnlyHint: "Blessings appear in real-time",
      emptyState: "Be the first to leave a blessing for Deepak & Pooja!",
      defaultBlessings: [
        {
          authorName: "Dadi & Dadaji",
          relation: "Grandparents",
          message:
            "“May Lord Shiva and Parvati shower both of you with eternal harmony, deep love, and prosperous years together. God bless you, Pooja and Deepak!”",
          date: "Oct 21, 2026",
        },
        {
          authorName: "The Patel Family",
          relation: "Family Friends",
          message:
            "“Wishing Deepak and Pooja a lifetime of togetherness, laughter, and endless happiness. Counting down to the grand celebration on 24th November!”",
          date: "Oct 24, 2026",
        },
      ],
    },
    footer: {
      hashtag: "#DeepakWedsPooja",
      displayDate: "24 · 11 · 2026",
      city: "Kaushambi, Uttar Pradesh",
      invitationNote:
        "Made with love to celebrate our journey with our cherished family and friends.",
      allRightsReserved: "Deepak & Pooja",
      organizerPortal: "Organizer Portal",
    },
    mobileNav: {
      top: "Top",
      events: "Events",
      venue: "Venue",
      blessings: "Wishes",
      celebrateTooltip: "Celebrate & Open Invitation",
    },
  },
  hi: {
    nav: {
      schedule: "कार्यक्रम",
      venue: "विवाह स्थल",
      blessings: "शुभकामनाएं",
      venueMapBtn: "मार्ग दर्शन (मैप)",
      switchLang: "English",
    },
    envelope: {
      badge: (guestName) =>
        guestName ? `सादर स्नेह निमंत्रण — ${guestName} जी हेतु` : "शुभ विवाह सादर स्नेह निमंत्रण",
      saveTheDate: "मांगलिक निमंत्रण",
      letter:
        "परमपिता परमेश्वर की असीम अनुकम्पा से, हमारे परिवार दीपक एवं पूजा के शुभ विवाह समारोह में आपको सप्रेम आमंत्रित करते हैं। आपकी मंगलमयी उपस्थिति और स्नेहाशीष हमारे इस पावन अवसर को अविस्मरणीय बनाएगा।",
      displayDate: "२४ · ११ · २०२६",
      city: "कौशाम्बी, उत्तर प्रदेश",
      tapToBreak: "मुहर खोलें और पधारें",
      enterCelebration: "विवाह उत्सव में प्रवेश करें",
      switchLangPrompt: "View in English",
    },
    hero: {
      ganpatiInvocation: "॥ श्री गणेशाय नमः ॥",
      badge: (guestName) =>
        guestName ? `हार्दिक स्वागत, ${guestName} जी` : "समस्त परिवार की ओर से सादर आमंत्रण",
      saveTheDate: "शुभ विवाह निमंत्रण",
      groomFirstName: "दीपक",
      brideFirstName: "पूजा",
      andSymbol: "संग",
      tagline: "मंगल परिणय संस्कार",
      displayDate: "२४ नवम्बर २०२६",
      venuePill: "रॉयल गार्डन, कौशाम्बी",
      countdownTitle: "मांगलिक लग्न मुहूर्त की उलटी गिनती",
      countdownDays: "दिन",
      countdownHours: "घंटे",
      countdownMins: "मिनट",
      countdownSecs: "सेकंड",
      eventsBtn: "मांगलिक कार्यक्रम",
      mapBtn: "विवाह स्थल (गूगल मैप)",
      scrollToExplore: "विस्तार से देखें",
    },
    scratchCard: {
      title: "शुभ लग्न व तिथि",
      dateUnveiled: "शुभ तिथि प्रकट हुई",
      scratchHint: (percent) => `रगड़ें ${percent}%`,
      canvasTopText: "✦ तिथि जानने के लिए सोने की परत रगड़ें ✦",
      canvasSubText: "अपनी उंगली या माउस से रगड़ें",
      revealedSubtitle: "जीवन भर का पावन साथ आरम्भ",
      revealedDate: "२४ · ११ · २०२६",
      revealedCity: "कौशाम्बी, उत्तर प्रदेश",
      bottomHint: "शुभ विवाह एवं पाणिग्रहण संस्कार",
      revealBtn: "तिथि देखें",
      revealedBtn: "प्रकट हुई",
    },
    schedule: {
      badge: "मांगलिक कार्यक्रम विवरण",
      title: "उत्सव एवं मांगलिक कार्यक्रम",
      subtitle:
        "दो दिवसीय पावन समारोह में आपकी गरिमामयी उपस्थिति और स्नेहाशीष सादर प्रार्थनीय है।",
      attireLabel: "परिधान एवं रंग",
      events: [
        {
          id: "mehendi",
          name: "मेहंदी एवं संगीत संध्या",
          subtitle: "रंग, मेहंदी और सुरमयी संगीत का उल्लास",
          dayOfWeek: "सोमवार",
          date: "सोमवार, २३ नवम्बर २०२६",
          time: "सायं ०५:०० बजे से",
          venue: "रॉयल गार्डन",
          location: "कौशाम्बी, उत्तर प्रदेश",
          dressCode: "पारंपरिक एवं उत्सव परिधान",
          description:
            "मेहंदी की सोंधी खुशबू, ढोलक की थाप, मधुर गीतों और स्वादिष्ट व्यंजनों से सजी एक अविस्मरणीय शाम।",
          iconName: "Music",
        },
        {
          id: "haldi",
          name: "फूलों की हल्दी",
          subtitle: "शुभ प्रभात पावन हल्दी रस्म",
          dayOfWeek: "मंगलवार",
          date: "मंगलवार, २४ नवम्बर २०२६",
          time: "प्रातः १०:०० बजे से दोपहर ०१:०० बजे तक",
          venue: "रॉयल गार्डन (प्रांगण)",
          location: "कौशाम्बी, उत्तर प्रदेश",
          dressCode: "पीताम्बरी व बसंती परिधान",
          description:
            "उबटन, पावन हल्दी, पीले फूलों की वर्षा और बड़ों के मंगल आशीर्वाद के साथ एक आनंदमयी प्रभात।",
          iconName: "Sun",
        },
        {
          id: "wedding",
          name: "शुभ विवाह एवं पाणिग्रहण",
          subtitle: "पवित्र अग्नि के समक्ष सात फेरे",
          dayOfWeek: "मंगलवार",
          date: "मंगलवार, २४ नवम्बर २०२६",
          time: "बरात प्रस्थान: सायं ०६:०० बजे | पाणिग्रहण (फेरे): रात्रि ०८:०० बजे",
          venue: "रॉयल गार्डन (मुख्य लॉन)",
          location: "कौशाम्बी, उत्तर प्रदेश",
          dressCode: "शाही भारतीय पारंपरिक परिधान",
          description:
            "मंत्रोच्चार और बड़ों के आशीर्वाद के बीच पवित्र अग्नि के सात फेरे लेकर दीपक और पूजा जीवन भर का साथ निभाएंगे।",
          iconName: "Heart",
        },
      ],
    },
    venue: {
      badge: "विवाह स्थल एवं मार्ग निर्देश",
      title: "विवाह स्थल",
      subtitle: "रॉयल गार्डन में आपका स्वागत करने के लिए हम अत्यंत उत्सुक हैं।",
      name: "रॉयल गार्डन (Royal Garden)",
      city: "माणिकपुर, प्रयागराज (कौशाम्बी सीमा)",
      description:
        "सुंदर हरियाली, विशाल लॉन, भव्य झूमर और उत्कृष्ट व्यवस्था से सुसज्जित एक मनोहारी विवाह स्थल।",
      addressLabel: "विवाह स्थल का पता",
      address: "FM9M+CMG, माणिकपुर, प्रयागराज, उत्तर प्रदेश 212208",
      logisticsLabel: "अतिथि सुविधाएं",
      logistics:
        "मुख्य प्रवेश द्वार पर वैले पार्किंग, अतिथि स्वागत काउंटर एवं सहायता डेस्क उपलब्ध रहेगी।",
      mapBtn: "गूगल मैप्स पर रॉयल गार्डन का मार्ग देखें",
    },
    blessings: {
      badge: "स्नेह एवं मंगलकामनाएं",
      title: "आशीर्वाद संदेश",
      subtitle:
        "नवदम्पति दीपक एवं पूजा के सुखद दांपत्य जीवन हेतु अपने मंगल आशीष प्रेषित करें।",
      formTitle: "अपना आशीर्वाद संदेश लिखें",
      formSubtitle: "आपका संदेश वर-वधू और सभी अतिथियों के दर्शनार्थ दीवार पर लाइव प्रदर्शित होगा।",
      nameLabel: "आपका शुभ नाम *",
      namePlaceholder: "उदा. रमेश जी, प्रिया शर्मा",
      relationLabel: "वर/वधू से संबंध",
      relationPlaceholder: "उदा. चाचा जी, मामा जी, मित्र, स्नेहीजन",
      messageLabel: "आपका आशीर्वाद एवं शुभकामनाएं *",
      messagePlaceholder: "नवदम्पति के लिए अपने पावन विचार एवं शुभकामनाएं लिखें...",
      submitBtn: "आशीर्वाद संदेश भेजें",
      submittingBtn: "संदेश प्रेषित हो रहा है...",
      successToast: "आपका आशीर्वाद संदेश सफलतापूर्वक जोड़ दिया गया है!",
      errorToast: "संदेश भेजने में त्रुटि हुई। कृपया पुनः प्रयास करें।",
      wallTitle: "स्नेहमयी आशीर्वाद व शुभकामनाएं",
      approvedOnlyHint: "आशीर्वाद संदेश तुरंत प्रदर्शित होते हैं",
      emptyState: "दीपक और पूजा के लिए सबसे पहले अपना आशीर्वाद संदेश लिखें!",
      defaultBlessings: [
        {
          authorName: "दादी एवं दादाजी",
          relation: "वर/वधू के दादा-दादी",
          message:
            "“भगवान शिव और माता पार्वती की असीम कृपा आप दोनों पर सदैव बनी रहे। दीपक और पूजा, तुम दोनों का दांपत्य जीवन सुख, प्रेम और समृद्धि से परिपूर्ण हो। हमारा हार्दिक आशीर्वाद!”",
          date: "२१ अक्टूबर २०२६",
        },
        {
          authorName: "पटेल परिवार",
          relation: "पारिवारिक स्नेहीजन",
          message:
            "“दीपक और पूजा को जीवन भर के अटूट साथ, खुशियों और मुस्कान की ढेरों शुभकामनाएं। २४ नवंबर के भव्य विवाह उत्सव की उत्सुकता से प्रतीक्षा है!”",
          date: "२४ अक्टूबर २०२६",
        },
      ],
    },
    footer: {
      hashtag: "#DeepakWedsPooja",
      displayDate: "२४ · ११ · २०२६",
      city: "कौशाम्बी, उत्तर प्रदेश",
      invitationNote:
        "दर्शनाभिलाषी: समस्त परिवार एवं स्नेहीजन। आपकी गरिमामयी उपस्थिति सादर प्रार्थनीय है।",
      allRightsReserved: "दीपक संग पूजा",
      organizerPortal: "प्रबंधक पोर्टल",
    },
    mobileNav: {
      top: "शीर्ष",
      events: "कार्यक्रम",
      venue: "स्थल",
      blessings: "आशीष",
      celebrateTooltip: "उत्सव मनाएं एवं निमंत्रण खोलें",
    },
  },
};

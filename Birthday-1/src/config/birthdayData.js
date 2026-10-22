/**
 * Central configuration for Birthday Wishes website.
 * The NAME variable can be changed here or edited dynamically in real-time.
 */
import IMG1 from "../Image/1.jpg";
import IMG4 from "../Image/4.jpg";
import IMG11 from "../Image/11.jpg";
import IMG6 from "../Image/6.jpg";
import IMG15 from "../Image/15.jpg";
import IMG18 from "../Image/18.jpg";
export const DEFAULT_NAME = "Anindita";

export const BIRTHDAY_CONFIG = {
  // Target birthday date for countdown (October 22).
  targetDate: new Date(new Date().getFullYear(), 9, 22),

  // Opening screen
  opening: {
    badge: "✨ A Special Surprise Awaits You ✨",
    buttonText: "🎁 Open Your Birthday Surprise",
  },

  // Hero Section
  hero: {
    headingTemplate: (name) => `🎂 Happy Birthday, ${name}! 🎉`,
    subtitle: "Today is all about celebrating YOU! ❤️",
  },

  // Birthday Message Section
  messageSection: {
    title: "To Someone Truly Special ❤️",
    message:
      "May your birthday be filled with endless happiness, beautiful memories, genuine smiles, and all the love your heart can hold. May this new chapter of your life bring you exciting adventures, wonderful opportunities, and countless reasons to smile. You deserve nothing but the very best. Keep shining, keep smiling, and keep being the amazing person you are. Happy Birthday! 🎂❤️",
  },

  // Memory / Photo Gallery Section (6 curated aesthetic high-res photos)
  memories: [
    {
      id: 1,
      url: IMG1,
      caption: "A beautiful moment ❤️",
      tag: "Celebration",
      date: "Magic Hour",
    },
    {
      id: 2,
      url: IMG4,
      caption: "Memories to treasure ✨",
      tag: "Pure Joy",
      date: "Golden Days",
    },
    {
      id: 3,
      url: IMG11,
      caption: "That unforgettable smile 😊",
      tag: "Radiance",
      date: "Brightest Smile",
    },
    {
      id: 4,
      url: IMG6,
      caption: "Forever special 💕",
      tag: "Warmth",
      date: "Heartfelt",
    },
    {
      id: 5,
      url: IMG15,
      caption: "Good times, great memories 🎉",
      tag: "Sweet Days",
      date: "Party Vibes",
    },
    {
      id: 6,
      url: IMG18,
      caption: "Moments that matter ❤️",
      tag: "Together",
      date: "Cherished",
    },
  ],

  // Interactive Birthday Cake Section
  cake: {
    title: "Make a Wish 🎂✨",
    buttonBlow: "Blow the Candles 🕯️",
    buttonRelight: "Relight Candles 🕯️",
    wishMadeText: "🎉 Wish Made! May It Come True! ✨",
  },

  // Reasons You're Special Section
  reasons: [
    {
      icon: "🌟",
      title: "Your Smile",
      description:
        "It lights up every room and turns any ordinary day into something truly magical.",
      color: "from-amber-400/20 to-orange-500/20",
      border: "border-amber-400/30",
    },
    {
      icon: "❤️",
      title: "Your Kind Heart",
      description:
        "You care so deeply, listen so patiently, and bring comfort to everyone around you.",
      color: "from-rose-500/20 to-pink-600/20",
      border: "border-rose-400/30",
    },
    {
      icon: "✨",
      title: "Your Beautiful Soul",
      description:
        "Gentle, thoughtful, and wonderfully authentic in everything you do.",
      color: "from-purple-500/20 to-violet-600/20",
      border: "border-purple-400/30",
    },
    {
      icon: "😊",
      title: "Your Positive Energy",
      description:
        "An infectious optimism that inspires smiles, laughter, and courage in others.",
      color: "from-yellow-400/20 to-amber-500/20",
      border: "border-yellow-400/30",
    },
    {
      icon: "🫶",
      title: "The Happiness You Bring",
      description:
        "Life simply feels warmer, sweeter, and infinitely more joyful with you here.",
      color: "from-pink-400/20 to-rose-500/20",
      border: "border-pink-400/30",
    },
    {
      icon: "🎀",
      title: "Simply Being You",
      description:
        "There is nobody else like you in the entire universe. Perfect just as you are.",
      color: "from-indigo-400/20 to-cyan-500/20",
      border: "border-indigo-400/30",
    },
  ],

  // Countdown Section
  countdown: {
    title: "Until The Next Celebration 🎉",
  },

  // Final Surprise Section
  finalSurprise: {
    previewText: "One Last Surprise... 🎁",
    buttonText: "✨ Reveal Your Surprise ✨",
    headingTemplate: (name) => `HAPPY BIRTHDAY, ${name.toUpperCase()}! 🎂🎉❤️`,
    message:
      "May all your dreams come true. Keep smiling, keep shining, and make every moment count! ✨",
  },

  // Final Footer
  footer: {
    message: "Made with ❤️ just to make your birthday a little more magical.",
  },
};

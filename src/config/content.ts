export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  unlockDate: string; // ISO string format: YYYY-MM-DDTHH:mm:ss+HH:MM
  description: string;
}

export interface OpenWhenLetter {
  id: string;
  title: string;
  emoji: string;
  description: string;
  content: string;
}

export interface Memory {
  id: number;
  date: string;
  title: string;
  description: string;
  mediaType: 'image' | 'video' | 'voice';
  mediaUrl: string;
  caption: string;
}

export interface Song {
  id: number;
  title: string;
  artist: string;
  url: string;
  duration: string;
}

export interface Coupon {
  id: number;
  title: string;
  description: string;
  emoji: string;
}

export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: "Chapter 1: The Beginning",
    subtitle: "A galaxy of memories, starting with a spark.",
    unlockDate: "2026-07-01T00:00:00+05:30",
    description: "Welcome to our little digital world. Here we begin our journey through the stars of our past."
  },
  {
    id: 2,
    title: "Chapter 2: Written in the Stars",
    subtitle: "A letter from my heart directly to yours.",
    unlockDate: "2026-07-08T00:00:00+05:30",
    description: "A digital envelope holding thoughts too deep to speak aloud, waiting to unfold."
  },
  {
    id: 3,
    title: "Chapter 3: The Memory Lane",
    subtitle: "A stroll through our shared time.",
    unlockDate: "2026-07-15T00:00:00+05:30",
    description: "A interactive horizontal timeline of the days we laughed, cried, and grew together."
  },
  {
    id: 4,
    title: "Chapter 4: A Playful Spark",
    subtitle: "Find the hearts, claim the rewards.",
    unlockDate: "2026-07-22T00:00:00+05:30",
    description: "A playful heart hunt minigame that unlocks a digital book of coupons for you."
  },
  {
    id: 5,
    title: "Chapter 5: Happy Birthday!",
    subtitle: "July 29 - The day the universe was blessed with you.",
    unlockDate: "2026-07-29T00:00:00+05:30",
    description: "The grand finale: fireworks, cake, music, a custom cinematic photo album, and the final reveal."
  }
];

export const OPEN_WHEN_LETTERS: OpenWhenLetter[] = [
  {
    id: "sad",
    title: "Open when you are sad",
    emoji: "😔",
    description: "When the skies are grey and you need a little sunshine.",
    content: "Hey beautiful,\n\nIf you're reading this, it means today is a bit heavy, and I hate that I'm not right there to hug the sadness out of you. I want you to close your eyes, take a deep breath, and remember how loved you are. You are the strongest, most resilient person I know, but it is okay to not be okay right now. Let the tears fall if they need to. Just remember that this storm is temporary, and I will always be here to hold your hand through it. You make my world infinitely brighter, and I'll do whatever it takes to bring that beautiful smile back to your face. I love you, always."
  },
  {
    id: "angry",
    title: "Open when you are angry at me",
    emoji: "😤",
    description: "When I've said or done something silly and you need space.",
    content: "My love,\n\nFirst, I want to say: I am so sorry. Whatever I did or said to hurt or annoy you, please know it was never, ever my intention. I love you more than words can express, and the last thing I ever want to do is cause you pain or frustration. I might be stubborn, silly, or just plain thick-headed sometimes, but my heart is always yours. Take all the time and space you need to cool down. When you're ready, I'm here to listen, to apologize properly, and to make it right. Thank you for loving me despite my flaws. I'm waiting with open arms."
  },
  {
    id: "cant-sleep",
    title: "Open when you can't sleep",
    emoji: "🌙",
    description: "When the night is long and your mind won't rest.",
    content: "Hey sleepyhead (or not-so-sleepyhead),\n\nIt's late, the world is quiet, and your mind is running. I wish I was lying right next to you, letting you rest your head on my chest while I stroke your hair until you drift off. Since I can't be there in person, let this letter be a warm blanket. Inhale... exhale. Think about our happiest days: walking together, laughing at stupid jokes, or just holding hands. You are safe, you are loved, and tomorrow is a brand new day. Let go of whatever is keeping you awake. I'll be dreaming of you, and I hope to meet you in yours. Sweet dreams, my angel."
  },
  {
    id: "miss-me",
    title: "Open when you miss me",
    emoji: "🥺",
    description: "When the distance feels too long and you need a hug.",
    content: "My dearest,\n\nI miss you too. I miss you every single second we are apart. Distance is hard, but it only proves how strong our bond is. Every mile between us is just a reminder of how much I want to be near you. Close your eyes, wrap your arms around yourself, and squeeze. That's a hug from me, sent across the distance. We will be back together soon, laughing and creating more memories. Until then, hold onto this: you are in my every thought, my every prayer, and my entire heart. We've got this. I love you to the moon and back."
  }
];

export const MEMORIES: Memory[] = [
  {
    id: 1,
    date: "July 2024",
    title: "Our First Conversation",
    description: "A simple text message that sparked a beautiful fire.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=600",
    caption: "The moment the stars aligned. Who knew a single 'hello' would lead to a lifetime of love?"
  },
  {
    id: 2,
    date: "October 2024",
    title: "Our First Date",
    description: "We met under the autumn trees and talked for hours.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=600",
    caption: "My heart was beating so fast. Seeing you in person for the first time felt like a dream come true."
  },
  {
    id: 3,
    date: "December 2024",
    title: "Winter Walk & Hot Cocoa",
    description: "Huddled together in the cold, sharing a warm drink.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&q=80&w=600",
    caption: "Cold hands, but the warmest hearts. Sharing hot chocolate with you is my favorite winter memory."
  },
  {
    id: 4,
    date: "February 2025",
    title: "Valentine's Surprise",
    description: "A handwritten letter and a box of chocolates.",
    mediaType: "voice",
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Demo MP3 URL
    caption: "You whispered 'I love you' and my heart melted. Press play to hear an ambient romantic tone."
  },
  {
    id: 5,
    date: "May 2025",
    title: "Watching the Sunset",
    description: "Sitting silently on the hilltop, watching the sky turn pink and orange.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=600",
    caption: "The sky was beautiful, but I couldn't keep my eyes off you."
  }
];

export const SONGS: Song[] = [
  {
    id: 1,
    title: "Romantic Lofi",
    artist: "Lofi Dreamer",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: "6:12"
  },
  {
    id: 2,
    title: "Midnight Walk",
    artist: "Acoustic Stars",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: "7:05"
  },
  {
    id: 3,
    title: "You and Me",
    artist: "Serenade Club",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: "5:44"
  },
  {
    id: 4,
    title: "Stars in Your Eyes",
    artist: "Lullaby Node",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    duration: "5:02"
  }
];

export const DAILY_QUOTES = [
  "You are my sun, my moon, and all my stars.",
  "In all the world, there is no heart for me like yours.",
  "I love you not only for what you are, but for what I am when I am with you.",
  "If I know what love is, it is because of you.",
  "You make me want to be a better man.",
  "My heart is and always will be yours.",
  "Every love story is beautiful, but ours is my favorite.",
  "I swear I couldn't love you more than I do right now, and yet I know I will tomorrow.",
  "You are the finest, loveliest, tenderest, and most beautiful person I have ever known.",
  "Whatever our souls are made of, his and mine are the same.",
  "Grow old along with me! The best is yet to be.",
  "I want all of you, forever, you and me, every day.",
  "You are my today and all of my tomorrows."
];

export const COUPONS: Coupon[] = [
  { id: 1, title: "Cozy Movie Night", description: "Good for one movie night. You pick the movie, I bring the popcorn and cuddles.", emoji: "🍿" },
  { id: 2, title: "Endless Warm Hugs", description: "Redeemable anytime for a 3-minute warm embrace.", emoji: "🤗" },
  { id: 3, title: "Ice Cream Date", description: "Double scoop of your favorite flavor, on me, anytime you want.", emoji: "🍦" },
  { id: 4, title: "Late-Night Scenic Drive", description: "Good for a midnight cruise with your favorite playlist.", emoji: "🚗" },
  { id: 5, title: "Infinite Sweet Kisses", description: "Redeemable for a forehead, cheek, or lip kiss whenever you need one.", emoji: "💋" }
];

export const SECRET_PASSWORD = "foreverandalways";
export const EASTER_EGG_KEYBOARD = "love";

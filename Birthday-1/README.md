# ✨ Magical Birthday Wishes Celebration Website

A premium, fully animated, romantic, modern, and interactive birthday website built with **React**, **Tailwind CSS**, and **Framer Motion**.

---

## 🌟 Highlights & Features

- **🎁 Opening Screen Surprise:**
  - Full-screen animated curtain with _"✨ A Special Surprise Awaits You ✨"_
  - _"🎁 Open Your Birthday Surprise"_ animated button with confetti burst, sound fanfare, and smooth transition.
  - Automatic music start upon first interaction (adheres to browser autoplay policies).

- **🎂 Hero Section:**
  - Shimmering gradient animated heading: _"🎂 Happy Birthday, [NAME]! 🎉"_
  - Subtitle: _"Today is all about celebrating YOU! ❤️"_
  - Centerpiece multi-tier birthday cake with animated flickering flames, sparklers, and floating balloons.
  - Interactive click-to-celebrate confetti triggers.

- **💌 Typewriter Birthday Letter:**
  - Glassmorphism card titled _"To Someone Truly Special ❤️"_
  - Smooth character-by-character typewriter animation that begins when scrolled into view.
  - Controls to replay the typewriter animation or skip to full text.
  - Wax seal emblem with glowing heart.

- **📸 Beautiful Memories Photo Gallery:**
  - 6 curated aesthetic image placeholders with rounded glass frames and hover zoom.
  - Fullscreen Lightbox modal with keyboard navigation (Esc, Arrow Left, Arrow Right).
  - Like button with confetti burst.
  - Option to upload and swap custom photos directly from the browser.
  - Captions:
    - _"A beautiful moment ❤️"_
    - _"Memories to treasure ✨"_
    - _"That unforgettable smile 😊"_
    - _"Forever special 💕"_
    - _"Good times, great memories 🎉"_
    - _"Moments that matter ❤️"_

- **🕯️ Interactive Birthday Cake & Wish:**
  - _"Make a Wish 🎂✨"_
  - Animated multi-tier cake with realistic candle flames.
  - Tap individual candles or click _"Blow the Candles 🕯️"_.
  - Realistic smoke wisps ascend, screen briefly flashes with golden aurora glow, confetti explodes, and reveals: _"🎉 Wish Made! May It Come True! ✨"_.
  - _"Relight Candles 🕯️"_ button to make another wish anytime!

- **💖 Why You're So Special:**
  - 6 glassmorphic tribute cards that animate upward into viewport:
    - 🌟 Your Smile
    - ❤️ Your Kind Heart
    - ✨ Your Beautiful Soul
    - 😊 Your Positive Energy
    - 🫶 The Happiness You Bring
    - 🎀 Simply Being You

- **⏳ Countdown Timer:**
  - _"Until The Next Celebration 🎉"_
  - Days | Hours | Minutes | Seconds with animated number transitions.

- **🎆 Grand Finale Surprise:**
  - _"One Last Surprise... 🎁"_
  - Clicking _"✨ Reveal Your Surprise ✨"_ triggers full-screen fireworks, multi-cannon confetti, heart shower, and reveals:
    - _"HAPPY BIRTHDAY, [NAME]! 🎂🎉❤️"_
    - _"May all your dreams come true. Keep smiling, keep shining, and make every moment count! ✨"_
  - Interactive _"Send a Virtual Hug 🤗"_ and _"More Fireworks! 🎆"_ buttons.

- **🎶 Built-in Background Music & Sound Effects:**
  - Web Audio API music box synthesizer plays gentle celesta "Happy Birthday" melody and ambient arpeggios (zero network reliance, 100% offline & zero broken links).
  - Floating player pill with Play/Pause, Mute/Unmute, and animated visualizer bars.
  - Sound effects for candle blowing, balloon popping, and fanfare.

- **🎈 Interactive Balloon Popping:**
  - Floating balloons bobbing continuously in the background can be clicked to pop with a sound effect and mini confetti burst!

- **✨ Fairy Dust Cursor Trail:**
  - Mouse movement and mobile touches create magical sparkles that trail across the screen.

---

## 🛠️ How to Customize the Recipient's Name

### Option 1: Directly in the UI

Click the **"Name"** button on the floating top navigation bar to open the personalization modal. Type any name or select a preset and watch the entire website update in real-time!

### Option 2: In Code

Open [`src/config/birthdayData.js`](file:///C:/Users/SHOUVIK%20KUMAR%20MAITY/.gemini/antigravity/scratch/birthday-wishes/src/config/birthdayData.js) and change:

```javascript
export const DEFAULT_NAME = "Anindita"; // Change to your beloved's name
```

---

## 🚀 Running the Project

1. Navigate to the project folder:
   ```bash
   <!-- cd "C:\Users\SHOUVIK KUMAR MAITY\.gemini\antigravity\scratch\birthday-wishes" -->
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173/` in your browser.

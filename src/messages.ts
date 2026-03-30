import type { MotivationContext } from "./types";

const messages: Record<MotivationContext, string[]> = {
  "unmarked-today": [
    "You don't need a perfect day. You just need to not disappear.",
    "This day still has time to count.",
    "Show up in a small way, but show up.",
    "A small action still counts. Zero is what breaks momentum.",
    "Your future self is watching what you do with today.",
    "You don't need to do a lot. You just need to stay in motion.",
  ],
  "missed-yesterday": [
    "The chain is hurt, not gone.",
    "Missing once is a moment. Come back before it becomes a pattern.",
    "Repair the thread today.",
    "Come back today. Repair the chain before your mind drifts further.",
    "One bad day is a moment. Quitting is a pattern.",
  ],

  "consistent-streak": [
    "Quiet consistency is changing you.",
    "Every crossed day is a vote for the person you want to become.",
    "You are building self-trust.",
    "The streak is evidence. You are becoming someone who keeps going.",
    "This is what discipline looks like from the inside.",
  ],
  "at-risk": [
    "You're close to losing momentum. One small action can keep it alive.",
    "Don't let today be the day the pattern breaks.",
    "The hardest days to show up are the ones that matter most.",
  ],
  "returning-after-absence": [
    "You disappeared for a bit. That's okay. What matters is you're here now.",
    "A few missed days don't erase everything you built. Pick up where you left off.",
    "The hardest part of coming back is opening the app. You already did that.",
    "Gaps happen. Quitting is when you stop returning. You didn't quit.",
    "You're not starting over. You're starting from experience.",
    "Every comeback story has a chapter that starts exactly like this.",
  ],
};

export function getMotivationalMessage(context: MotivationContext): string {
  const pool = messages[context];
  return pool[Math.floor(Math.random() * pool.length)];
}

import { useSyncExternalStore } from "react";
import { cafeTimeZone, hours } from "@/data/botanica";

export interface OpenStatus {
  open: boolean;
  label: string;
}

function toMinutes(clock: string): number {
  const [h, m] = clock.split(":").map(Number);
  return h * 60 + m;
}

/** Day + minutes-past-midnight on the cafe's own clock. */
function cafeNow(date: Date): { day: string; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: cafeTimeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return { day: get("weekday"), minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

export function openStatus(date = new Date()): OpenStatus {
  const { day, minutes } = cafeNow(date);
  const week = hours.schedule;
  const todayIdx = week.findIndex((d) => d.day === day);
  const today = week[todayIdx];

  if (today?.open && today.close) {
    if (minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
      return { open: true, label: `Open now · until ${today.close}` };
    }
    if (minutes < toMinutes(today.open)) {
      return { open: false, label: `Opens today at ${today.open}` };
    }
  }

  for (let i = 1; i <= week.length; i++) {
    const next = week[(todayIdx + i) % week.length];
    if (next.open) {
      const when = i === 1 ? "tomorrow" : next.day;
      return { open: false, label: `Closed · opens ${when} ${next.open}` };
    }
  }
  return { open: false, label: "Closed" };
}

// The static export is rendered once at build time, so "now" can only be read
// in the browser. The server snapshot is null; callers render a neutral
// placeholder until hydration swaps in the live status. Snapshots are cached
// per minute so React sees a stable value between renders.
let cached: { minute: number; status: OpenStatus } | null = null;

function snapshot(): OpenStatus {
  const minute = Math.floor(Date.now() / 60_000);
  if (!cached || cached.minute !== minute) cached = { minute, status: openStatus() };
  return cached.status;
}

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(id);
}

export function useOpenStatus(): OpenStatus | null {
  return useSyncExternalStore(subscribe, snapshot, () => null);
}

// Strict domain types for Cafe Botanica.

export type MenuCategoryName = "Morning" | "Midday" | "Bakery" | "Botanicals";

export interface MenuItem {
  /** Dish or drink name, set in monospace on the ledger. */
  name: string;
  /** Compact 13px receipt-style description. One grounded sentence. */
  description: string;
  /** Price in whole dollars, rendered with a leading currency mark. */
  price: number;
  /** Optional terracotta tag for a single notable item per category. */
  tag?: string;
  /** False when 86'd or out of season. Defaults to true. */
  isAvailable: boolean;
}

export interface MenuCategory {
  name: MenuCategoryName;
  /** Short framing line for the category. */
  note: string;
  items: MenuItem[];
}

export interface Gathering {
  title: string;
  /** ISO date, formatted for display at render time. */
  date: string;
  /** Start time in 24h clock, e.g. "18:30". */
  time: string;
  /** Seats held for the evening. */
  seats: number;
  /** One grounded sentence describing the evening. */
  detail: string;
}

export interface DayHours {
  /** Three-letter day label, e.g. "Mon". */
  day: string;
  /** Opening clock or null when closed. */
  open: string | null;
  /** Closing clock or null when closed. */
  close: string | null;
}

export interface OperatingHours {
  schedule: DayHours[];
  /** Free-text line for kitchen or seasonal notes. */
  note: string;
}

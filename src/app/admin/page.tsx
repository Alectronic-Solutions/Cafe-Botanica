"use client";

import { useState } from "react";
import { menu } from "@/data/botanica";
import type { MenuCategory, MenuItem } from "@/types";

type ItemState = { category: string; item: MenuItem };

function buildState(categories: MenuCategory[]): ItemState[] {
  return categories.flatMap((cat) =>
    cat.items.map((item) => ({ category: cat.name, item: { ...item } }))
  );
}

export default function AdminPage() {
  const [items, setItems] = useState<ItemState[]>(() => buildState(menu));

  function toggle(index: number) {
    setItems((prev) =>
      prev.map((entry, i) =>
        i === index
          ? { ...entry, item: { ...entry.item, isAvailable: !entry.item.isAvailable } }
          : entry
      )
    );
  }

  const categories = Array.from(new Set(items.map((e) => e.category)));

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 font-mono">
      <div className="mb-12 border-b border-espresso pb-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-espresso/50">Cafe Botanica</p>
        <h1 className="mt-1 font-display text-3xl font-bold">86 Board</h1>
        <p className="mt-2 text-[12px] text-espresso/60">
          Toggle items off when they run out. Changes live in memory — restart to reset.
        </p>
      </div>

      {categories.map((cat) => (
        <div key={cat} className="mb-10">
          <p className="mb-4 text-[11px] uppercase tracking-[0.18em] text-terracotta">{cat}</p>
          <ul className="space-y-px">
            {items
              .filter((e) => e.category === cat)
              .map((entry, localIdx) => {
                const globalIdx = items.indexOf(entry);
                return (
                  <li
                    key={entry.item.name}
                    className="flex items-baseline justify-between border-b border-espresso/10 py-3"
                  >
                    <div className="flex-1">
                      <span
                        className={`text-[13px] ${
                          entry.item.isAvailable ? "text-espresso" : "text-espresso/30 line-through"
                        }`}
                      >
                        {entry.item.name}
                      </span>
                      <span className="ml-4 text-[11px] text-espresso/40">
                        ${entry.item.price.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => toggle(globalIdx)}
                      className={`ml-6 w-10 rounded-none border text-[10px] uppercase tracking-[0.14em] transition-colors ${
                        entry.item.isAvailable
                          ? "border-espresso bg-espresso text-linen"
                          : "border-espresso/30 bg-transparent text-espresso/30"
                      }`}
                      style={{ padding: "3px 0" }}
                      aria-label={`Toggle ${entry.item.name}`}
                    >
                      {entry.item.isAvailable ? "on" : "off"}
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      ))}

      <p className="mt-16 text-[11px] text-espresso/30">
        Production: wire toggle to PATCH /api/menu/:id and persist to your data store.
      </p>
    </main>
  );
}

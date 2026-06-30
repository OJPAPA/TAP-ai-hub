"use client";

import { useMemo, useState } from "react";
import { Tool } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";

export default function ToolHub({
  tools,
  categories,
}: {
  tools: Tool[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory =
        activeCategory === "All" || tool.category === activeCategory;
      const matchesQuery =
        query.trim() === "" ||
        tool.title.toLowerCase().includes(query.toLowerCase()) ||
        tool.subtitle.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [tools, activeCategory, query]);

  const popularTools = useMemo(
    () => [...tools].sort((a, b) => b.views - a.views).slice(0, 4),
    [tools]
  );

  const grouped = useMemo(() => {
    const map = new Map<string, Tool[]>();
    for (const tool of filtered) {
      const list = map.get(tool.category) ?? [];
      list.push(tool);
      map.set(tool.category, list);
    }
    return map;
  }, [filtered]);

  const showPopular = query.trim() === "" && activeCategory === "All";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="relative mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search tools..."
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-400"
        />
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory("All")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            activeCategory === "All"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              activeCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {showPopular && popularTools.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
            🔥 Popular Tools
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularTools.map((tool) => (
              <ToolCard key={tool.title} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {[...grouped.entries()].map(([category, items]) => (
        <section key={category} className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
            <span className="h-5 w-1 rounded bg-blue-600" />
            {category}
            <span className="text-sm font-normal text-gray-400">
              {items.length}
            </span>
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((tool) => (
              <ToolCard key={tool.title} tool={tool} />
            ))}
          </div>
        </section>
      ))}

      {filtered.length === 0 && (
        <p className="py-20 text-center text-gray-400">找不到符合的工具</p>
      )}
    </div>
  );
}

import Papa from "papaparse";

export type Tool = {
  title: string;
  subtitle: string;
  category: string;
  imageUrl: string;
  link: string;
  views: number;
  hot: boolean;
};

// Publish your Google Sheet to the web as CSV:
// File > Share > Publish to web > select sheet > CSV
// Paste that URL into .env.local as SHEET_CSV_URL
const SHEET_CSV_URL = process.env.SHEET_CSV_URL;

const FALLBACK_TOOLS: Tool[] = [
  {
    title: "員工請假行事曆",
    subtitle: "顯示9Z組組員請假狀況",
    category: "領導管理",
    imageUrl: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600",
    link: "#",
    views: 36,
    hot: true,
  },
  {
    title: "中油綠能疑單管理",
    subtitle: "微電/土建回覆即時查詢<文瑜>",
    category: "永續設計轉換",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
    link: "#",
    views: 28,
    hot: true,
  },
  {
    title: "人力管理雙周表",
    subtitle: "AI Manpower Master",
    category: "行政",
    imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600",
    link: "#",
    views: 26,
    hot: true,
  },
  {
    title: "AI 會議記錄幫手",
    subtitle: "會議記錄 AI Meeting Notetaker",
    category: "專案管理",
    imageUrl: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600",
    link: "#",
    views: 17,
    hot: true,
  },
];

function parseCsv(csvText: string): Tool[] {
  const { data } = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  return data
    .filter((row) => row.title)
    .map((row) => ({
      title: row.title?.trim() ?? "",
      subtitle: row.subtitle?.trim() ?? "",
      category: row.category?.trim() ?? "未分類",
      imageUrl: row.imageUrl?.trim() ?? "",
      link: row.link?.trim() ?? "#",
      views: Number(row.views) || 0,
      hot: (row.hot ?? "").trim().toUpperCase() === "TRUE",
    }));
}

export async function getTools(): Promise<Tool[]> {
  if (!SHEET_CSV_URL) {
    return FALLBACK_TOOLS;
  }

  try {
    const res = await fetch(SHEET_CSV_URL, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Failed to fetch sheet: ${res.status}`);
    const csvText = await res.text();
    const tools = parseCsv(csvText);
    return tools.length > 0 ? tools : FALLBACK_TOOLS;
  } catch (err) {
    console.error("Falling back to local tool list:", err);
    return FALLBACK_TOOLS;
  }
}

export function getCategories(tools: Tool[]): string[] {
  return Array.from(new Set(tools.map((t) => t.category)));
}

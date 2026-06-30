import { getTools, getCategories } from "@/lib/tools";
import ToolHub from "@/components/ToolHub";

export default async function Home() {
  const tools = await getTools();
  const categories = getCategories(tools);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-lg font-bold text-blue-700">🔧 AI 工具導覽平台</h1>
        </div>
      </header>
      <ToolHub tools={tools} categories={categories} />
    </div>
  );
}

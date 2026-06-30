import Image from "next/image";
import { getTools, getCategories } from "@/lib/tools";
import ToolHub from "@/components/ToolHub";

export default async function Home() {
  const tools = await getTools();
  const categories = getCategories(tools);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-4">
          <Image src="/logo.png" alt="群甡 Logo" width={32} height={32} />
          <h1 className="text-lg font-bold text-orange-600">群甡AI Hub</h1>
        </div>
      </header>
      <ToolHub tools={tools} categories={categories} />
    </div>
  );
}

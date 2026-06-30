import { Tool } from "@/lib/tools";

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <a
      href={tool.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-36 w-full overflow-hidden bg-gray-200">
        {tool.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={tool.imageUrl}
            alt={tool.title}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        )}
        <span className="absolute left-2 top-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
          {tool.category}
        </span>
        {tool.hot && (
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded bg-orange-500 px-2 py-0.5 text-xs font-semibold text-white">
            🔥 HOT
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{tool.title}</h3>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            👁 {tool.views}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-gray-500">{tool.subtitle}</p>
        <span className="mt-auto pt-2 text-sm font-medium text-blue-600 group-hover:underline">
          {tool.title} ↗
        </span>
      </div>
    </a>
  );
}

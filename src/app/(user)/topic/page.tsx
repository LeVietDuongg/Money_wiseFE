import Link from "next/link";

const topics = [
  { slug: "lifetime-money", title: "lifetime money" },
  { slug: "retire-55", title: "retire 55" },
  { slug: "where-money", title: "where money" },
];

export default function TopicListPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
        Danh sách chủ đề
      </h1>

      {/* Desktop/Laptop: danh sách dọc */}
      <ul className="hidden sm:block space-y-4">
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link
              href={`/topic/${topic.slug}`}
              className="text-blue-600 hover:underline text-lg"
            >
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile/Tablet: grid card */}
      <div className="grid grid-cols-1 gap-4 sm:hidden">
        {topics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/topic/${topic.slug}`}
            className="border-2 rounded-xl p-6 min-h-[80px] shadow hover:shadow-lg active:scale-95 transition-all bg-white text-center text-blue-700 font-semibold text-lg flex items-center justify-center touch-manipulation"
          >
            {topic.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

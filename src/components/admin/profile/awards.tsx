"use client";
import Image from "next/image";

export default function ProfileAwards() {
  const awards = [
    {
      title: "Top Reader",
      desc: "Borrowed more than 50 books",
      color: "text-yellow-500",
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      link: "#",
    },
    {
      title: "Active Member",
      desc: "Visited the library 100+ times",
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      link: "#",
    },
    {
      title: "Early Bird",
      desc: "Always returns books on time",
      color: "text-green-500",
      bg: "bg-green-100 dark:bg-green-900/30",
      link: "#",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow border border-gray-200 dark:border-gray-800 mt-8">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Achievements & Awards</h2>

      {awards.map((a, i) => (
        <div
          key={i}
          className={`flex items-center w-full rounded-2xl bg-white dark:bg-gray-800 p-4 shadow-xl border 
          border-gray-200 dark:border-gray-700 ${i !== 0 ? "mt-4" : ""}`}
        >
          {/* Image */}
          <div className="h-[83px] w-[83px] flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
            <Image
              src="/images/awards/piagam.png"
              alt="Piagam"
              width={150}
              height={150}
              className="object-contain"
            />
          </div>

          {/* Text */}
          <div className="ml-4 flex-1">
            <p className="text-base font-semibold dark:text-white flex items-center gap-2">
              {/* Icon with original color */}
              <span className={`text-xl ${a.color}`}>●</span>
              {a.title}
            </p>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {a.desc}
              <a
                href={a.link}
                className="ml-1 font-medium text-[#294B29] hover:text-[#1f3e1f] dark:text-[#86A789]"
              >
                View details
              </a>
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

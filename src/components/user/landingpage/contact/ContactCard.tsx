export default function ContactCard({ icon, text }) {
  return (
    <div
      className="
        flex items-center gap-4 p-4 rounded-xl
        border border-[#FFC428]/30 dark:border-[#FFC428]/10
        bg-white/60 dark:bg-[#1A1A1A]/40
        backdrop-blur-xl shadow-lg
        hover:scale-[1.03] hover:bg-white/70
        dark:hover:bg-[#1A1A1A]/60
        transition-all duration-300 cursor-default
      "
    >
      <div className="p-3 rounded-full 
        bg-[#FFC428]/20 text-[#FFC428]">
        {icon}
      </div>
      <span className="text-gray-700 dark:text-gray-300 font-medium">
        {text}
      </span>
    </div>
  );
}

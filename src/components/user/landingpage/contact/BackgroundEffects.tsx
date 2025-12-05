export default function BackgroundEffects() {
  return (
    <>
      {/* GRADIENT BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br 
        from-[#FFF8E7] via-[#FFEBBB] to-[#FFE08A]
        dark:from-[#1A1A1A] dark:via-[#0F0F0F] dark:to-black
      " />

      {/* GOLD BLOBS */}
      <div className="absolute -top-20 -left-20 w-72 h-72 
        bg-[#FFC428]/30 blur-3xl rounded-full animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-80 h-80 
        bg-[#FFC428]/20 blur-3xl rounded-full animate-pulse-slow" />

      {/* SOFT GRID */}
      <div className="absolute inset-0 opacity-[0.07] 
        bg-grid-black dark:bg-grid-white" />
    </>
  );
}

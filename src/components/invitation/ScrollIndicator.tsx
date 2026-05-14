import { motion } from "framer-motion";

export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6, y: [0, -5, 0] }}
      transition={{
        opacity: { delay: 1.5, duration: 1 },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      }}
      whileHover={{ opacity: 1 }}
      className="hidden md:flex fixed left-6 lg:left-8 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4 pointer-events-auto"
      style={{ opacity: 0.6 }}
    >
      <div className="flex flex-col items-center gap-[2px]">
        {"SCROLL TO EXPLORE".split("").map((ch, i) => (
          <span
            key={i}
            className="font-cinzel text-[10px] tracking-[0.3em] text-[#4169E1] leading-none"
            style={{ minHeight: ch === " " ? "8px" : "auto" }}
          >
            {ch === " " ? "·" : ch}
          </span>
        ))}
      </div>

      <div
        className="relative w-px h-[60px] overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(139,92,246,0.1), rgba(139,92,246,0.8), rgba(65,105,225,0.2))",
        }}
      >
        <motion.span
          className="absolute left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#4169E1]"
          style={{ boxShadow: "0 0 8px #4169E1" }}
          animate={{ top: ["-6px", "60px"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeIn" }}
        />
      </div>
    </motion.div>
  );
}
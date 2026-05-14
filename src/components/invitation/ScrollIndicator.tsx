import { motion } from "framer-motion";

export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7, y: [0, 5, 0] }}
      transition={{
        opacity: { delay: 1, duration: 1 },
        y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      }}
      whileHover={{ opacity: 1 }}
      className="flex flex-col items-center gap-2 cursor-pointer pointer-events-auto"
    >
      {/* Horizontal Text */}
      <p className="font-cinzel text-[10px] tracking-[0.2em] text-[#4169E1] uppercase whitespace-nowrap">
        Scroll to Explore
      </p>

      {/* Modern Bouncing Arrow */}
      <div className="text-[#4169E1]">
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>

      {/* Optional: Subtle Glow Dot */}
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-1 h-1 bg-[#4169E1] rounded-full blur-[1px]"
      />
    </motion.div>
  );
}

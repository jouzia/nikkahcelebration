import { motion } from "framer-motion";

export function Doors({ onOpen, opened }: { onOpen: () => void; opened: boolean }) {
  // Using the gold hex consistently
  const goldHex = "#D4AF37";

  return (
    <motion.div
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ perspective: "2000px" }}
      initial={false}
      animate={opened ? { opacity: 0 } : { opacity: 1 }}
      transition={{ delay: opened ? 1.6 : 0, duration: 0.6 }}
      onAnimationComplete={() => {
        if (opened) {
          const el = document.getElementById("doors-root");
          if (el) el.style.display = "none";
        }
      }}
      id="doors-root"
    >
      {/* Left door */}
      <motion.div
        className="absolute top-0 left-0 h-full w-1/2 door-panel pointer-events-auto"
        style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
        animate={opened ? { rotateY: -105 } : { rotateY: 0 }}
        transition={{ duration: 1.6, ease: [0.7, 0, 0.3, 1] }}
      >
        <div className="absolute inset-6 border border-[color:var(--gold)]/40 rounded-sm" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 flex items-center justify-center">
          {/* Changed bg to a subtle off-white to make the Gold 'T' pop */}
          <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-[#FFFCF8] border-2 border-[#D4AF37] shadow-[0_0_60px_rgba(212,168,87,0.4)] flex items-center justify-center">
            <span 
              className="font-serif-display text-5xl md:text-6xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] -mr-4"
              style={{ color: goldHex }}
            >
              T
            </span>
          </div>
        </div>
      </motion.div>

      {/* Right door */}
      <motion.div
        className="absolute top-0 right-0 h-full w-1/2 door-panel pointer-events-auto"
        style={{ transformOrigin: "right center", transformStyle: "preserve-3d" }}
        animate={opened ? { rotateY: 105 } : { rotateY: 0 }}
        transition={{ duration: 1.6, ease: [0.7, 0, 0.3, 1] }}
      >
        <div className="absolute inset-6 border border-[color:var(--gold)]/40 rounded-sm" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
          {/* Changed bg to a subtle off-white to make the Gold 'A' pop */}
          <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-[#FFFCF8] border-2 border-[#D4AF37] shadow-[0_0_60px_rgba(212,168,87,0.4)] flex items-center justify-center">
            <span 
              className="font-serif-display text-5xl md:text-6xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] -ml-4"
              style={{ color: goldHex }}
            >
              A
            </span>
          </div>
        </div>
      </motion.div>

      {/* Open button - sits between doors */}
      {!opened && (
        <motion.button
          onClick={onOpen}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 pointer-events-auto px-8 py-3 rounded-full border-2 border-[#D4AF37] bg-[#FFFCF8] font-cinzel text-xs md:text-sm shadow-[0_10px_40px_rgba(212,168,87,0.3)]"
          style={{ color: goldHex }}
        >
          Open Invitation
        </motion.button>
      )}
    </motion.div>
  );
}

import { motion } from "framer-motion";

export function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <p className={className}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: Math.min(i * 0.025, 1.5) }}
          className="inline-block mr-[0.25em]"
        >
          {w}
        </motion.span>
      ))}
    </p>
  );
}
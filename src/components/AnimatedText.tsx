import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
}

export default function AnimatedText({ text }: AnimatedTextProps) {
  const words = text.split(' ');

  return (
    <span className="inline-block">
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: i * 0.1,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
        >
          {word}
          {i !== words.length - 1 && '\u00A0'} {/* Add non-breaking space between words */}
        </motion.span>
      ))}
    </span>
  );
}
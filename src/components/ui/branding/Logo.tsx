import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Logo() {
  return (
    <Link to="/" className="relative group">
      <motion.div
        className="relative inline-block font-bold text-2xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="relative inline-block text-white"
          animate={{
            filter: [
              'drop-shadow(0 0 5px #2D00F7)',
              'drop-shadow(2px 2px 5px #2D00F7)',
              'drop-shadow(-2px -2px 5px #2D00F7)',
              'drop-shadow(0 0 5px #2D00F7)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          ROOBOY
        </motion.span>
        <motion.span
          className="absolute top-0 left-0 text-[#2D00F7] mix-blend-screen [clip-path:inset(10%_0_90%_0)]"
          animate={{
            x: [-1, 1, -1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          ROOBOY
        </motion.span>
        <motion.span
          className="absolute top-0 left-0 text-cyan-400 mix-blend-screen [clip-path:inset(80%_0_10%_0)]"
          animate={{
            x: [1, -1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          ROOBOY
        </motion.span>
      </motion.div>
    </Link>
  );
}
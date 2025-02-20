import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '@/config/route-constants';

const NotFound = (): JSX.Element => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-retro-black text-retro-white p-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Page not found</p>
        <Link
          to={HOME_ROUTE}
          className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white font-semibold transition-all duration-300 hover:bg-primary/80"
        >
          Return Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound; 
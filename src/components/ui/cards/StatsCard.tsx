import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

export interface StatItem {
  value: string;
  label: string;
  icon?: LucideIcon;
}

interface StatsCardProps {
  title: string;
  subtitle?: string;
  stats: StatItem[];
  className?: string;
}

export function StatsCard({
  title,
  subtitle,
  stats,
  className = ''
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden rounded-lg bg-black/30 backdrop-blur-sm border border-primary/20 p-8 ${className}`}
    >
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        {subtitle && (
          <p className="text-gray-300 mb-6">{subtitle}</p>
        )}
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center"
            >
              {stat.icon && (
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              )}
              <div className="text-3xl font-bold text-white mb-1 bg-clip-text text-transparent bg-gradient-to-r from-primary to-white">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
    </motion.div>
  );
} 
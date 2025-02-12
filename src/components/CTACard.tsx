import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CTACardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  Icon?: LucideIcon;
  pattern?: 'dwennimmen' | 'gye-nyame' | 'sankofa' | 'adinkra' | 'kente';
  className?: string;
}

export function CTACard({
  title,
  description,
  buttonText,
  buttonHref,
  Icon,
  pattern = 'adinkra',
  className = ''
}: CTACardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden rounded-lg bg-black/30 backdrop-blur-sm border border-primary/20 p-8 ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <img
          src={`/patterns/${pattern}.svg`}
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          {Icon && <Icon className="h-8 w-8 text-primary" />}
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-gray-300 mb-6 leading-relaxed">{description}</p>
        <motion.a
          href={buttonHref}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(45,0,247,0.3)]"
        >
          {buttonText}
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </motion.a>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
    </motion.div>
  );
} 
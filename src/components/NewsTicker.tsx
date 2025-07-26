import React from 'react';
import { motion } from 'framer-motion';
import { mockNews } from '../lib/supabase';

const NewsTicker: React.FC = () => {
  const newsText = mockNews.map(item => item.text).join(' • ');

  return (
    <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 py-2 overflow-hidden">
      <motion.div
        animate={{ x: ['100%', '-100%'] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="whitespace-nowrap text-black font-medium text-sm"
      >
        📢 {newsText} 📢
      </motion.div>
    </div>
  );
};

export default NewsTicker;
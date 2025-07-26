import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { newsService } from '../lib/supabase';
import { NewsItem } from '../types';

const NewsTicker: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const newsData = await newsService.getAll();
      setNews(newsData);
    } catch (error) {
      console.error('Error loading news:', error);
    }
  };

  const newsText = news.map(item => item.text).join(' • ');

  if (!newsText) {
    return null;
  }

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
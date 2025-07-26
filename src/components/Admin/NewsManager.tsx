import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, MessageSquare } from 'lucide-react';
import { NewsItem } from '../../types';

interface NewsManagerProps {
  news: NewsItem[];
  onSave: (news: NewsItem[]) => void;
}

const NewsManager: React.FC<NewsManagerProps> = ({ news, onSave }) => {
  const [editingNews, setEditingNews] = useState<NewsItem[]>(news);
  const [isEditing, setIsEditing] = useState(false);

  const addNews = () => {
    const newNews: NewsItem = {
      id: `news-${Date.now()}`,
      text: '',
      order: editingNews.length + 1
    };
    setEditingNews([...editingNews, newNews]);
  };

  const updateNews = (id: string, field: keyof NewsItem, value: string | number) => {
    setEditingNews(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeNews = (id: string) => {
    setEditingNews(prev => prev.filter(item => item.id !== id));
  };

  const handleSave = () => {
    const validNews = editingNews
      .filter(item => item.text.trim() !== '')
      .map((item, index) => ({ ...item, order: index + 1 }));
    
    onSave(validNews);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingNews(news);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">إدارة الشريط الإخباري</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-2 px-4 rounded-lg"
          >
            <Edit className="w-4 h-4" />
            <span>تعديل</span>
          </button>
        ) : (
          <div className="flex space-x-3 rtl:space-x-reverse">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
            >
              إلغاء
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
            >
              <Save className="w-4 h-4" />
              <span>حفظ</span>
            </button>
          </div>
        )}
      </div>

      {!isEditing ? (
        <div className="bg-gray-800/50 rounded-xl p-6 border border-yellow-500/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <MessageSquare className="w-5 h-5 ml-2" />
            معاينة الشريط الإخباري
          </h3>
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 py-3 px-4 rounded-lg overflow-hidden">
            <motion.div
              animate={{ x: ['100%', '-100%'] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear'
              }}
              className="whitespace-nowrap text-black font-medium"
            >
              📢 {news.map(item => item.text).join(' • ')} 📢
            </motion.div>
          </div>
          
          <div className="mt-4 space-y-2">
            {news.map((item, index) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <span className="text-gray-300">{item.text}</span>
                <span className="text-yellow-400 text-sm">#{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={addNews}
            className="flex items-center space-x-2 rtl:space-x-reverse text-yellow-400 hover:text-yellow-300 mb-4"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة خبر جديد</span>
          </button>

          {editingNews.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 rounded-xl p-6 border border-yellow-500/20"
            >
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    نص الخبر
                  </label>
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => updateNews(item.id, 'text', e.target.value)}
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 border border-gray-600"
                    placeholder="اكتب نص الخبر هنا..."
                  />
                </div>

                <div className="w-24">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    الترتيب
                  </label>
                  <input
                    type="number"
                    value={item.order}
                    onChange={(e) => updateNews(item.id, 'order', Number(e.target.value))}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 border border-gray-600"
                    min="1"
                  />
                </div>

                <button
                  onClick={() => removeNews(item.id)}
                  className="text-red-400 hover:text-red-300 p-2 mt-6"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsManager;
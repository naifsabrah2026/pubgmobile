import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Image as ImageIcon } from 'lucide-react';
import { BannerImage } from '../../types';

interface BannerManagerProps {
  banners: BannerImage[];
  onSave: (banners: BannerImage[]) => void;
}

const BannerManager: React.FC<BannerManagerProps> = ({ banners, onSave }) => {
  const [editingBanners, setEditingBanners] = useState<BannerImage[]>(banners);
  const [isEditing, setIsEditing] = useState(false);

  const addBanner = () => {
    const newBanner: BannerImage = {
      id: `banner-${Date.now()}`,
      url: '',
      alt: '',
      order: editingBanners.length + 1
    };
    setEditingBanners([...editingBanners, newBanner]);
  };

  const updateBanner = (id: string, field: keyof BannerImage, value: string | number) => {
    setEditingBanners(prev => prev.map(banner => 
      banner.id === id ? { ...banner, [field]: value } : banner
    ));
  };

  const removeBanner = (id: string) => {
    setEditingBanners(prev => prev.filter(banner => banner.id !== id));
  };

  const handleSave = () => {
    const validBanners = editingBanners
      .filter(banner => banner.url.trim() !== '' && banner.alt.trim() !== '')
      .map((banner, index) => ({ ...banner, order: index + 1 }));
    
    onSave(validBanners);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingBanners(banners);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">إدارة البانر</h2>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 rounded-xl overflow-hidden border border-yellow-500/20"
            >
              <div className="aspect-video">
                <img
                  src={banner.url}
                  alt={banner.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-medium">{banner.alt}</h3>
                <p className="text-gray-400 text-sm">ترتيب: {banner.order}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={addBanner}
            className="flex items-center space-x-2 rtl:space-x-reverse text-yellow-400 hover:text-yellow-300 mb-4"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة بانر جديد</span>
          </button>

          {editingBanners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 rounded-xl p-6 border border-yellow-500/20"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    رابط الصورة
                  </label>
                  <input
                    type="url"
                    value={banner.url}
                    onChange={(e) => updateBanner(banner.id, 'url', e.target.value)}
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 border border-gray-600"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    النص البديل
                  </label>
                  <input
                    type="text"
                    value={banner.alt}
                    onChange={(e) => updateBanner(banner.id, 'alt', e.target.value)}
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 border border-gray-600"
                    placeholder="وصف الصورة"
                  />
                </div>

                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      الترتيب
                    </label>
                    <input
                      type="number"
                      value={banner.order}
                      onChange={(e) => updateBanner(banner.id, 'order', Number(e.target.value))}
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 border border-gray-600"
                      min="1"
                    />
                  </div>
                  <button
                    onClick={() => removeBanner(banner.id)}
                    className="text-red-400 hover:text-red-300 p-2 mt-6"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {banner.url && (
                <div className="mt-4">
                  <div className="aspect-video w-full max-w-xs">
                    <img
                      src={banner.url}
                      alt={banner.alt}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerManager;
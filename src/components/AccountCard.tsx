import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from 'lucide-react';
import { Account } from '../types';

interface AccountCardProps {
  account: Account;
}

const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % account.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + account.images.length) % account.images.length);
  };

  const handlePurchase = () => {
    const message = `مرحباً، أريد شراء هذا الحساب:
    
العنوان: ${account.title}
السعر: ${account.price} ريال

تفاصيل الحساب:
${account.details.map(detail => `${detail.label}: ${detail.value}`).join('\n')}

يرجى التواصل معي لإتمام عملية الشراء.`;

    const whatsappUrl = `https://wa.me/967777826667?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden shadow-2xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300"
    >
      {/* Image Gallery */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={account.images[currentImage]}
          alt={account.title}
          className="w-full h-full object-cover"
        />
        
        {account.featured && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center">
            <Star className="w-3 h-3 mr-1" />
            مميز
          </div>
        )}

        {account.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
          {account.images.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full ${
                index === currentImage ? 'bg-yellow-400' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2">{account.title}</h3>
        
        <div className="space-y-2 mb-4">
          {account.details.slice(0, 5).map((detail) => (
            <div key={detail.id} className="flex justify-between text-sm">
              <span className="text-gray-400">{detail.label}:</span>
              <span className="text-yellow-400 font-medium">{detail.value}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-right">
            <span className="text-2xl font-bold text-yellow-400">{account.price}</span>
            <span className="text-gray-400 text-sm mr-1">ريال</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePurchase}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-2 px-4 rounded-lg flex items-center space-x-2 rtl:space-x-reverse transition-all duration-200"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>شراء</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default AccountCard;
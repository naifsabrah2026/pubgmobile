import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Upload, Save } from 'lucide-react';
import { Account, AccountDetail } from '../../types';

interface AccountFormProps {
  account?: Account;
  onSave: (account: Omit<Account, 'id' | 'created_at'>) => void;
  onCancel: () => void;
}

const AccountForm: React.FC<AccountFormProps> = ({ account, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: account?.title || '',
    price: account?.price || 0,
    category: account?.category || 'various' as const,
    images: account?.images || [''],
    featured: account?.featured || false
  });

  const [details, setDetails] = useState<Omit<AccountDetail, 'id'>[]>(
    account?.details || [{ label: '', value: '' }]
  );

  const addImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const updateImage = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  const addDetail = () => {
    setDetails(prev => [...prev, { label: '', value: '' }]);
  };

  const removeDetail = (index: number) => {
    setDetails(prev => prev.filter((_, i) => i !== index));
  };

  const updateDetail = (index: number, field: 'label' | 'value', value: string) => {
    setDetails(prev => prev.map((detail, i) => 
      i === index ? { ...detail, [field]: value } : detail
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const accountData = {
      ...formData,
      images: formData.images.filter(img => img.trim() !== ''),
      details: details
        .filter(detail => detail.label.trim() !== '' && detail.value.trim() !== '')
        .map((detail, index) => ({ ...detail, id: `detail-${index}` }))
    };

    onSave(accountData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 rounded-xl p-6 border border-yellow-500/20"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          {account ? 'تعديل الحساب' : 'إضافة حساب جديد'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              عنوان الحساب
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 border border-gray-600"
              placeholder="مثال: حساب كونكرر - مستوى عال"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              السعر (ريال)
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
              className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 border border-gray-600"
              placeholder="500"
              min="0"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              الفئة
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as 'premium' | 'various' }))}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 border border-gray-600"
            >
              <option value="premium">حسابات مميزة</option>
              <option value="various">حسابات متنوعة</option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="flex items-center space-x-3 rtl:space-x-reverse">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="w-5 h-5 text-yellow-500 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500/50"
              />
              <span className="text-gray-300">حساب مميز</span>
            </label>
          </div>
        </div>

        {/* Images */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-gray-300">
              صور الحساب
            </label>
            <button
              type="button"
              onClick={addImage}
              className="flex items-center space-x-2 rtl:space-x-reverse text-yellow-400 hover:text-yellow-300"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة صورة</span>
            </button>
          </div>
          
          <div className="space-y-3">
            {formData.images.map((image, index) => (
              <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
                <input
                  type="url"
                  value={image}
                  onChange={(e) => updateImage(index, e.target.value)}
                  className="flex-1 bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 border border-gray-600"
                  placeholder="رابط الصورة"
                />
                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="text-red-400 hover:text-red-300 p-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-gray-300">
              تفاصيل الحساب
            </label>
            <button
              type="button"
              onClick={addDetail}
              className="flex items-center space-x-2 rtl:space-x-reverse text-yellow-400 hover:text-yellow-300"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة تفصيل</span>
            </button>
          </div>
          
          <div className="space-y-3">
            {details.map((detail, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={detail.label}
                  onChange={(e) => updateDetail(index, 'label', e.target.value)}
                  className="bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 border border-gray-600"
                  placeholder="مثال: المستوى"
                />
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <input
                    type="text"
                    value={detail.value}
                    onChange={(e) => updateDetail(index, 'value', e.target.value)}
                    className="flex-1 bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 border border-gray-600"
                    placeholder="مثال: كونكرر"
                  />
                  {details.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDetail(index)}
                      className="text-red-400 hover:text-red-300 p-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4 rtl:space-x-reverse pt-6 border-t border-gray-700">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="flex items-center space-x-2 rtl:space-x-reverse px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold rounded-lg transition-all"
          >
            <Save className="w-4 h-4" />
            <span>حفظ</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AccountForm;
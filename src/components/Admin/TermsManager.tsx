import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Edit, X, FileText } from 'lucide-react';
import { settingsService } from '../../lib/supabase';

const TermsManager: React.FC = () => {
  const [sellingTerms, setSellingTerms] = useState('');
  const [buyingTerms, setBuyingTerms] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadTerms();
  }, []);

  const loadTerms = async () => {
    try {
      setLoading(true);
      const terms = await settingsService.getTerms();
      setSellingTerms(terms.selling_terms);
      setBuyingTerms(terms.buying_terms);
    } catch (error) {
      console.error('Error loading terms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await settingsService.updateTerms(sellingTerms, buyingTerms);
      setIsEditing(false);
      alert('تم حفظ الشروط بنجاح!');
    } catch (error) {
      console.error('Error saving terms:', error);
      alert('حدث خطأ أثناء حفظ الشروط');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    loadTerms(); // Reset to original values
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <FileText className="w-6 h-6 ml-2" />
          إدارة شروط المتجر
        </h2>
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
              disabled={saving}
            >
              إلغاء
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'جاري الحفظ...' : 'حفظ'}</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Selling Terms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-2xl p-6 border border-red-500/20"
        >
          <h3 className="text-xl font-bold text-red-400 mb-4">شروط بيع الحساب</h3>
          
          {!isEditing ? (
            <div className="space-y-2">
              {sellingTerms.split('\n').map((line, index) => (
                <p key={index} className="text-gray-300 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          ) : (
            <textarea
              value={sellingTerms}
              onChange={(e) => setSellingTerms(e.target.value)}
              className="w-full h-64 bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500/50 border border-gray-600 resize-none"
              placeholder="اكتب شروط بيع الحساب هنا..."
            />
          )}
        </motion.div>

        {/* Buying Terms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-2xl p-6 border border-green-500/20"
        >
          <h3 className="text-xl font-bold text-green-400 mb-4">شروط شراء الحساب</h3>
          
          {!isEditing ? (
            <div className="space-y-2">
              {buyingTerms.split('\n').map((line, index) => (
                <p key={index} className="text-gray-300 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          ) : (
            <textarea
              value={buyingTerms}
              onChange={(e) => setBuyingTerms(e.target.value)}
              className="w-full h-64 bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/50 border border-gray-600 resize-none"
              placeholder="اكتب شروط شراء الحساب هنا..."
            />
          )}
        </motion.div>
      </div>

      {/* Preview Section */}
      {!isEditing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 rounded-xl p-6 border border-yellow-500/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4">معاينة الشروط في الموقع</h3>
          <p className="text-gray-400 text-sm">
            هذه الشروط ستظهر في صفحة "شروط المتجر" للزوار
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default TermsManager;
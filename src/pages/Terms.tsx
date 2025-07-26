import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, MessageCircle } from 'lucide-react';
import { settingsService } from '../lib/supabase';

const Terms: React.FC = () => {
  const [sellingTerms, setSellingTerms] = useState<string[]>([]);
  const [buyingTerms, setBuyingTerms] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTerms();
  }, []);

  const loadTerms = async () => {
    try {
      setLoading(true);
      const terms = await settingsService.getTerms();
      setSellingTerms(terms.selling_terms.split('\n').filter(term => term.trim() !== ''));
      setBuyingTerms(terms.buying_terms.split('\n').filter(term => term.trim() !== ''));
    } catch (error) {
      console.error('Error loading terms:', error);
      // Fallback to default terms
      setSellingTerms([
        'تصفير حسابك من كل الارتباطات',
        'إزالة كل بريد إلكتروني في اللعبة',
        'إزالة كل حساب تواصل اجتماعي (X، فيسبوك، وغيرها)',
        'اجعل فقط ارتباط الهاتف الخاص بك في اللعبة',
        'تواصل معنا وعند الاتفاق سنقوم بعمل إيميل جديد لحسابك',
        'سنرسل أموالك خلال 21 يوم لسياسة شركة PUBG للاسترجاع'
      ]);
      setBuyingTerms([
        'قم باختيار الحساب المطلوب',
        'قم بإضافة معلوماتك الشخصية',
        'اضغط على "إرسال إلى الواتساب"',
        'سيتم إرسالك إلى الواتساب تلقائياً مع معلوماتك',
        'سيتم إرسال معلومات الحساب الذي تريده'
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mb-4"></div>
          <p className="text-white">جاري تحميل الشروط...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            شروط المتجر
          </h1>
          <p className="text-gray-300 text-lg">
            اقرأ الشروط والأحكام بعناية قبل التعامل
          </p>
        </motion.div>

        {/* Selling Terms Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-2xl p-8 border border-red-500/20">
            <div className="flex items-center mb-6">
              <AlertCircle className="w-8 h-8 text-red-400 ml-3" />
              <h2 className="text-2xl font-bold text-red-400">شروط بيع حسابك</h2>
            </div>
            
            <div className="space-y-4">
              {sellingTerms.map((term, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start space-x-3 rtl:space-x-reverse"
                >
                  <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-300 leading-relaxed">{term}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 p-4 bg-red-500/10 rounded-lg border border-red-500/20"
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MessageCircle className="w-6 h-6 text-green-400" />
                <div>
                  <p className="text-white font-medium">للتواصل:</p>
                  <a
                    href="https://wa.me/967777826667"
                    className="text-green-400 hover:underline"
                  >
                    واتساب: +967777826667
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Buying Terms Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-2xl p-8 border border-green-500/20">
            <div className="flex items-center mb-6">
              <CheckCircle className="w-8 h-8 text-green-400 ml-3" />
              <h2 className="text-2xl font-bold text-green-400">شروط شراء حساب</h2>
            </div>
            
            <div className="space-y-4">
              {buyingTerms.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start space-x-3 rtl:space-x-reverse"
                >
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-300 leading-relaxed">{step}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-8 p-6 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-lg border border-yellow-500/20"
            >
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">معلومات مهمة:</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• يتم التسليم خلال 24 ساعة كحد أقصى</li>
                <li>• جميع الحسابات مضمونة ومفحوصة</li>
                <li>• في حالة وجود مشكلة، يتم استرداد المبلغ كاملاً</li>
                <li>• الدعم الفني متاح على مدار الساعة</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-2xl p-8 border border-yellow-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              هل لديك أسئلة؟
            </h3>
            <p className="text-gray-300 mb-6">
              لا تتردد في التواصل معنا للحصول على المساعدة
            </p>
            <motion.a
              href="https://wa.me/967777826667"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-3 rtl:space-x-reverse bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg"
            >
              <MessageCircle className="w-6 h-6" />
              <span>تواصل معنا على الواتساب</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
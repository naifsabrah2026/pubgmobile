import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Zap, Users } from 'lucide-react';
import HeroBanner from '../components/HeroBanner';
import AccountCard from '../components/AccountCard';
import { accountsService } from '../lib/supabase';
import { Account } from '../types';

const Home: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      setLoading(true);
      const accountsData = await accountsService.getAll();
      setAccounts(accountsData);
    } catch (error) {
      console.error('Error loading accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const featuredAccounts = accounts.filter(account => account.featured);

  const features = [
    {
      icon: Shield,
      title: 'ضمان شامل',
      description: 'جميع الحسابات مضمونة ومفحوصة بعناية'
    },
    {
      icon: Zap,
      title: 'تسليم فوري',
      description: 'تسليم سريع خلال دقائق من إتمام الدفع'
    },
    {
      icon: Users,
      title: 'دعم 24/7',
      description: 'فريق دعم متاح على مدار الساعة'
    },
    {
      icon: Star,
      title: 'أفضل الأسعار',
      description: 'أسعار منافسة وعروض حصرية'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent"
          >
            لماذا تختار متجرنا؟
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 bg-gray-800/50 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Accounts */}
      {featuredAccounts.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent"
            >
              الحسابات المميزة
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredAccounts.map((account) => (
                <AccountCard key={account.id} account={account} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-2xl p-8 border border-yellow-500/20"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              ابدأ رحلتك في عالم PUBG Mobile
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              اكتشف مجموعة واسعة من الحسابات المميزة بأفضل الأسعار
            </p>
            <motion.a
              href="/accounts"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 px-8 rounded-lg text-lg"
            >
              تصفح الحسابات
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
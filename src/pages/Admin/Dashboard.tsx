import React, { useState } from 'react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  Settings,
  Plus,
  Edit,
  Image,
  MessageSquare,
  LogOut,
  Trash2,
  FileText
} from 'lucide-react';
import AccountForm from '../../components/Admin/AccountForm';
import BannerManager from '../../components/Admin/BannerManager';
import NewsManager from '../../components/Admin/NewsManager';
import TermsManager from '../../components/Admin/TermsManager';
import { 
  accountsService,
  bannersService,
  newsService
} from '../../lib/supabase';
import { Account, BannerImage, NewsItem } from '../../types';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [banners, setBanners] = useState<BannerImage[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [showAccountForm, setShowAccountForm] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [accountsData, bannersData, newsData] = await Promise.all([
        accountsService.getAll(),
        bannersService.getAll(),
        newsService.getAll()
      ]);
      
      setAccounts(accountsData);
      setBanners(bannersData);
      setNews(newsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'overview', name: 'نظرة عامة', icon: BarChart3 },
    { id: 'accounts', name: 'إدارة الحسابات', icon: Users },
    { id: 'banners', name: 'إدارة البانر', icon: Image },
    { id: 'news', name: 'الشريط الإخباري', icon: MessageSquare },
    { id: 'terms', name: 'إدارة الشروط', icon: FileText },
    { id: 'settings', name: 'الإعدادات', icon: Settings }
  ];

  const stats = [
    { name: 'إجمالي الحسابات', value: accounts.length.toString(), change: '+12%', color: 'from-blue-500 to-blue-600' },
    { name: 'المبيعات اليوم', value: '8', change: '+23%', color: 'from-green-500 to-green-600' },
    { name: 'إجمالي المبيعات', value: '156', change: '+5%', color: 'from-yellow-500 to-yellow-600' },
    { name: 'العملاء النشطين', value: '89', change: '+8%', color: 'from-purple-500 to-purple-600' }
  ];

  const handleSaveAccount = async (accountData: Omit<Account, 'id' | 'created_at'>) => {
    try {
      if (editingAccount) {
        // Update existing account
        const updatedAccount = await accountsService.update(editingAccount.id, accountData);
        setAccounts(prev => prev.map(acc => 
          acc.id === editingAccount.id ? updatedAccount : acc
        ));
      } else {
        // Add new account
        const newAccount = await accountsService.create(accountData);
        setAccounts(prev => [newAccount, ...prev]);
      }
      setShowAccountForm(false);
      setEditingAccount(undefined);
      alert('تم حفظ الحساب بنجاح!');
    } catch (error) {
      console.error('Error saving account:', error);
      alert('حدث خطأ أثناء حفظ الحساب');
    }
  };

  const handleEditAccount = (account: Account) => {
    setEditingAccount(account);
    setShowAccountForm(true);
  };

  const handleDeleteAccount = async (accountId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الحساب؟')) {
      try {
        await accountsService.delete(accountId);
        setAccounts(prev => prev.filter(acc => acc.id !== accountId));
        alert('تم حذف الحساب بنجاح!');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('حدث خطأ أثناء حذف الحساب');
      }
    }
  };

  const handleSaveBanners = async (newBanners: BannerImage[]) => {
    try {
      await bannersService.updateAll(newBanners);
      setBanners(newBanners);
      alert('تم حفظ البانر بنجاح!');
    } catch (error) {
      console.error('Error saving banners:', error);
      alert('حدث خطأ أثناء حفظ البانر');
    }
  };

  const handleSaveNews = async (newNews: NewsItem[]) => {
    try {
      await newsService.updateAll(newNews);
      setNews(newNews);
      alert('تم حفظ الأخبار بنجاح!');
    } catch (error) {
      console.error('Error saving news:', error);
      alert('حدث خطأ أثناء حفظ الأخبار');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mb-4"></div>
          <p className="text-white">جاري تحميل لوحة الإدارة...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-black/50 backdrop-blur-sm border-r border-yellow-500/20 min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-black" />
              </div>
              <span className="text-xl font-bold text-white">لوحة الإدارة</span>
            </div>

            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20'
                        : 'text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>

            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-200 mt-8"
            >
              <LogOut className="w-5 h-5" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-3xl font-bold text-white mb-8">نظرة عامة</h1>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-gradient-to-r ${stat.color} p-6 rounded-xl text-white`}
                  >
                    <h3 className="text-sm font-medium opacity-90">{stat.name}</h3>
                    <div className="flex items-end justify-between mt-2">
                      <span className="text-3xl font-bold">{stat.value}</span>
                      <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
                        {stat.change}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-yellow-500/20">
                <h2 className="text-xl font-semibold text-white mb-4">إجراءات سريعة</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveTab('accounts')}
                    className="flex items-center space-x-3 rtl:space-x-reverse p-4 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg border border-blue-500/20 text-blue-400 transition-all duration-200"
                  >
                    <Plus className="w-5 h-5" />
                    <span>إضافة حساب جديد</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('banners')}
                    className="flex items-center space-x-3 rtl:space-x-reverse p-4 bg-green-500/10 hover:bg-green-500/20 rounded-lg border border-green-500/20 text-green-400 transition-all duration-200"
                  >
                    <Edit className="w-5 h-5" />
                    <span>تحديث البانر</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('news')}
                    className="flex items-center space-x-3 rtl:space-x-reverse p-4 bg-yellow-500/10 hover:bg-yellow-500/20 rounded-lg border border-yellow-500/20 text-yellow-400 transition-all duration-200"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>تحديث الأخبار</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'accounts' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {showAccountForm ? (
                <AccountForm
                  account={editingAccount}
                  onSave={handleSaveAccount}
                  onCancel={() => {
                    setShowAccountForm(false);
                    setEditingAccount(undefined);
                  }}
                />
              ) : (
                <>
                  <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">إدارة الحسابات</h1>
                    <button 
                      onClick={() => setShowAccountForm(true)}
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-2 px-4 rounded-lg flex items-center space-x-2 rtl:space-x-reverse"
                    >
                      <Plus className="w-4 h-4" />
                      <span>إضافة حساب</span>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {accounts.map((account) => (
                      <motion.div
                        key={account.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-800/50 rounded-xl overflow-hidden border border-yellow-500/20"
                      >
                        <div className="aspect-video">
                          <img
                            src={account.images[0]}
                            alt={account.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-white font-bold mb-2">{account.title}</h3>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-yellow-400 font-bold">{account.price} ريال</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              account.category === 'premium' 
                                ? 'bg-purple-500/20 text-purple-400' 
                                : 'bg-blue-500/20 text-blue-400'
                            }`}>
                              {account.category === 'premium' ? 'مميز' : 'متنوع'}
                            </span>
                          </div>
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <button
                              onClick={() => handleEditAccount(account)}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm flex items-center justify-center space-x-1 rtl:space-x-reverse"
                            >
                              <Edit className="w-3 h-3" />
                              <span>تعديل</span>
                            </button>
                            <button
                              onClick={() => handleDeleteAccount(account.id)}
                              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-sm flex items-center justify-center space-x-1 rtl:space-x-reverse"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>حذف</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}

          {activeTab === 'banners' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <BannerManager banners={banners} onSave={handleSaveBanners} />
            </motion.div>
          )}

          {activeTab === 'news' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <NewsManager news={news} onSave={handleSaveNews} />
            </motion.div>
          )}

          {activeTab === 'terms' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <TermsManager />
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-3xl font-bold text-white mb-8">
                الإعدادات العامة
              </h1>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-yellow-500/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">معلومات المتجر</h3>
                    <p className="text-gray-400 text-sm mb-4">تحديث معلومات المتجر الأساسية</p>
                    <button 
                      onClick={() => alert('قريباً...')}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm"
                    >
                      تعديل المعلومات
                    </button>
                  </div>
                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">معلومات التواصل</h3>
                    <p className="text-gray-400 text-sm mb-4">تحديث معلومات التواصل والواتساب</p>
                    <button 
                      onClick={() => alert('قريباً...')}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm"
                    >
                      تعديل التواصل
                    </button>
                  </div>
                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">النسخ الاحتياطي</h3>
                    <p className="text-gray-400 text-sm mb-4">إنشاء نسخة احتياطية من البيانات</p>
                    <button 
                      onClick={() => alert('قريباً...')}
                      className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm"
                    >
                      إنشاء نسخة احتياطية
                    </button>
                  </div>
                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">إعدادات الأمان</h3>
                    <p className="text-gray-400 text-sm mb-4">تغيير كلمة مرور الإدارة</p>
                    <button 
                      onClick={() => alert('قريباً...')}
                      className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm"
                    >
                      تغيير كلمة المرور
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
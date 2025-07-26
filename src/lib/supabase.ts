import { createClient } from '@supabase/supabase-js';
import { Account, BannerImage, NewsItem } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Database functions
export const accountsService = {
  async getAll(): Promise<Account[]> {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching accounts:', error);
        return mockAccounts;
      }
      
      return data || mockAccounts;
    } catch (error) {
      console.error('Error fetching accounts:', error);
      return mockAccounts;
    }
  },

  async create(account: Omit<Account, 'id' | 'created_at'>): Promise<Account> {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .insert([account])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating account:', error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  },

  async update(id: string, account: Partial<Account>): Promise<Account> {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .update(account)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating account:', error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Error updating account:', error);
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('accounts')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting account:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      throw error;
    }
  }
};

export const bannersService = {
  async getAll(): Promise<BannerImage[]> {
    try {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('order', { ascending: true });
      
      if (error) {
        console.error('Error fetching banners:', error);
        return mockBanners;
      }
      
      return data || mockBanners;
    } catch (error) {
      console.error('Error fetching banners:', error);
      return mockBanners;
    }
  },

  async updateAll(banners: BannerImage[]): Promise<void> {
    try {
      // Delete all existing banners
      await supabase.from('banners').delete().neq('id', '');
      
      // Insert new banners
      if (banners.length > 0) {
        const { error } = await supabase
          .from('banners')
          .insert(banners);
        
        if (error) {
          console.error('Error updating banners:', error);
          throw error;
        }
      }
    } catch (error) {
      console.error('Error updating banners:', error);
      throw error;
    }
  }
};

export const newsService = {
  async getAll(): Promise<NewsItem[]> {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('order', { ascending: true });
      
      if (error) {
        console.error('Error fetching news:', error);
        return mockNews;
      }
      
      return data || mockNews;
    } catch (error) {
      console.error('Error fetching news:', error);
      return mockNews;
    }
  },

  async updateAll(news: NewsItem[]): Promise<void> {
    try {
      // Delete all existing news
      await supabase.from('news').delete().neq('id', '');
      
      // Insert new news
      if (news.length > 0) {
        const { error } = await supabase
          .from('news')
          .insert(news);
        
        if (error) {
          console.error('Error updating news:', error);
          throw error;
        }
      }
    } catch (error) {
      console.error('Error updating news:', error);
      throw error;
    }
  }
};

export const settingsService = {
  async getTerms(): Promise<{ selling_terms: string; buying_terms: string }> {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('selling_terms, buying_terms')
        .eq('key', 'terms')
        .single();
      
      if (error) {
        console.error('Error fetching terms:', error);
        return {
          selling_terms: 'تصفير حسابك من كل الارتباطات\n• إزالة كل بريد إلكتروني في اللعبة\n• إزالة كل حساب تواصل اجتماعي (X، فيسبوك، وغيرها)\n• اجعل فقط ارتباط الهاتف الخاص بك في اللعبة\n• تواصل معنا وعند الاتفاق سنقوم بعمل إيميل جديد لحسابك\n• سنرسل أموالك خلال 21 يوم لسياسة شركة PUBG للاسترجاع',
          buying_terms: 'قم باختيار الحساب المطلوب\n• قم بإضافة معلوماتك الشخصية\n• اضغط على "إرسال إلى الواتساب"\n• سيتم إرسالك إلى الواتساب تلقائياً مع معلوماتك\n• سيتم إرسال معلومات الحساب الذي تريده'
        };
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching terms:', error);
      return {
        selling_terms: 'تصفير حسابك من كل الارتباطات\n• إزالة كل بريد إلكتروني في اللعبة\n• إزالة كل حساب تواصل اجتماعي (X، فيسبوك، وغيرها)\n• اجعل فقط ارتباط الهاتف الخاص بك في اللعبة\n• تواصل معنا وعند الاتفاق سنقوم بعمل إيميل جديد لحسابك\n• سنرسل أموالك خلال 21 يوم لسياسة شركة PUBG للاسترجاع',
        buying_terms: 'قم باختيار الحساب المطلوب\n• قم بإضافة معلوماتك الشخصية\n• اضغط على "إرسال إلى الواتساب"\n• سيتم إرسالك إلى الواتساب تلقائياً مع معلوماتك\n• سيتم إرسال معلومات الحساب الذي تريده'
      };
    }
  },

  async updateTerms(selling_terms: string, buying_terms: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('settings')
        .upsert({
          key: 'terms',
          selling_terms,
          buying_terms
        });
      
      if (error) {
        console.error('Error updating terms:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error updating terms:', error);
      throw error;
    }
  }
};
// Mock data for development
export const mockAccounts = [
  {
    id: '1',
    title: 'حساب كونكرر - مستوى عال',
    price: 500,
    category: 'premium' as const,
    images: [
      'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
      'https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg',
      'https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg',
      'https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg',
      'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg'
    ],
    details: [
      { id: '1', label: 'المستوى', value: 'كونكرر' },
      { id: '2', label: 'نقاط التصنيف', value: '6500+' },
      { id: '3', label: 'عدد الانتصارات', value: '2500+' },
      { id: '4', label: 'معدل القتل', value: '4.2' },
      { id: '5', label: 'الأسلحة المطورة', value: '15+' },
      { id: '6', label: 'الرتبة الحالية', value: 'كونكرر' },
      { id: '7', label: 'عدد الألعاب', value: '3000+' },
      { id: '8', label: 'نسبة البقاء', value: '85%' },
      { id: '9', label: 'أعلى ضرر', value: '4500' },
      { id: '10', label: 'الموسم الحالي', value: 'C1S4' }
    ],
    featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'حساب إيس - محترف',
    price: 300,
    category: 'various' as const,
    images: [
      'https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg',
      'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
      'https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg',
      'https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg',
      'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg'
    ],
    details: [
      { id: '1', label: 'المستوى', value: 'إيس' },
      { id: '2', label: 'نقاط التصنيف', value: '4200+' },
      { id: '3', label: 'عدد الانتصارات', value: '1200+' },
      { id: '4', label: 'معدل القتل', value: '3.8' },
      { id: '5', label: 'الأسلحة المطورة', value: '10+' },
      { id: '6', label: 'الرتبة الحالية', value: 'إيس' },
      { id: '7', label: 'عدد الألعاب', value: '1800+' },
      { id: '8', label: 'نسبة البقاء', value: '78%' },
      { id: '9', label: 'أعلى ضرر', value: '3200' },
      { id: '10', label: 'الموسم الحالي', value: 'C1S4' }
    ],
    featured: false,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'حساب كراون - متقدم',
    price: 200,
    category: 'various' as const,
    images: [
      'https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg',
      'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
      'https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg'
    ],
    details: [
      { id: '1', label: 'المستوى', value: 'كراون' },
      { id: '2', label: 'نقاط التصنيف', value: '3500+' },
      { id: '3', label: 'عدد الانتصارات', value: '800+' },
      { id: '4', label: 'معدل القتل', value: '3.2' },
      { id: '5', label: 'الأسلحة المطورة', value: '8+' }
    ],
    featured: true,
    created_at: new Date().toISOString()
  }
];

export const mockBanners = [
  {
    id: '1',
    url: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
    alt: 'عروض خاصة على حسابات PUBG',
    order: 1
  },
  {
    id: '2',
    url: 'https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg',
    alt: 'حسابات مميزة بأفضل الأسعار',
    order: 2
  },
  {
    id: '3',
    url: 'https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg',
    alt: 'أحدث حسابات PUBG Mobile',
    order: 3
  }
];

export const mockNews = [
  { id: '1', text: 'عروض خاصة على حسابات الكونكرر لفترة محدودة!', order: 1 },
  { id: '2', text: 'تم إضافة حسابات جديدة بمميزات رائعة', order: 2 },
  { id: '3', text: 'خصم 20% على جميع حسابات فئة الإيس', order: 3 }
];
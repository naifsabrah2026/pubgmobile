import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key-here';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
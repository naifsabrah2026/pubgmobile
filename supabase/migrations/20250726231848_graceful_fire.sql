/*
  # إدراج البيانات التجريبية

  1. البيانات المدرجة
    - حسابات PUBG تجريبية
    - صور البانر
    - أخبار المتجر

  2. ملاحظات
    - هذه بيانات تجريبية للاختبار
    - يمكن تعديلها من لوحة الإدارة
*/

-- إدراج الحسابات التجريبية
INSERT INTO accounts (title, price, category, images, details, featured) VALUES
(
  'حساب كونكرر - مستوى عال',
  500,
  'premium',
  '["https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg", "https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg", "https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg", "https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg", "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg"]'::jsonb,
  '[
    {"id": "1", "label": "المستوى", "value": "كونكرر"},
    {"id": "2", "label": "نقاط التصنيف", "value": "6500+"},
    {"id": "3", "label": "عدد الانتصارات", "value": "2500+"},
    {"id": "4", "label": "معدل القتل", "value": "4.2"},
    {"id": "5", "label": "الأسلحة المطورة", "value": "15+"},
    {"id": "6", "label": "الرتبة الحالية", "value": "كونكرر"},
    {"id": "7", "label": "عدد الألعاب", "value": "3000+"},
    {"id": "8", "label": "نسبة البقاء", "value": "85%"},
    {"id": "9", "label": "أعلى ضرر", "value": "4500"},
    {"id": "10", "label": "الموسم الحالي", "value": "C1S4"}
  ]'::jsonb,
  true
),
(
  'حساب إيس - محترف',
  300,
  'various',
  '["https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg", "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg", "https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg", "https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg", "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg"]'::jsonb,
  '[
    {"id": "1", "label": "المستوى", "value": "إيس"},
    {"id": "2", "label": "نقاط التصنيف", "value": "4200+"},
    {"id": "3", "label": "عدد الانتصارات", "value": "1200+"},
    {"id": "4", "label": "معدل القتل", "value": "3.8"},
    {"id": "5", "label": "الأسلحة المطورة", "value": "10+"},
    {"id": "6", "label": "الرتبة الحالية", "value": "إيس"},
    {"id": "7", "label": "عدد الألعاب", "value": "1800+"},
    {"id": "8", "label": "نسبة البقاء", "value": "78%"},
    {"id": "9", "label": "أعلى ضرر", "value": "3200"},
    {"id": "10", "label": "الموسم الحالي", "value": "C1S4"}
  ]'::jsonb,
  false
),
(
  'حساب كراون - متقدم',
  200,
  'various',
  '["https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg", "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg", "https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg"]'::jsonb,
  '[
    {"id": "1", "label": "المستوى", "value": "كراون"},
    {"id": "2", "label": "نقاط التصنيف", "value": "3500+"},
    {"id": "3", "label": "عدد الانتصارات", "value": "800+"},
    {"id": "4", "label": "معدل القتل", "value": "3.2"},
    {"id": "5", "label": "الأسلحة المطورة", "value": "8+"}
  ]'::jsonb,
  true
);

-- إدراج صور البانر
INSERT INTO banners (url, alt, "order") VALUES
('https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg', 'عروض خاصة على حسابات PUBG', 1),
('https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg', 'حسابات مميزة بأفضل الأسعار', 2),
('https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg', 'أحدث حسابات PUBG Mobile', 3);

-- إدراج الأخبار
INSERT INTO news (text, "order") VALUES
('عروض خاصة على حسابات الكونكرر لفترة محدودة!', 1),
('تم إضافة حسابات جديدة بمميزات رائعة', 2),
('خصم 20% على جميع حسابات فئة الإيس', 3);
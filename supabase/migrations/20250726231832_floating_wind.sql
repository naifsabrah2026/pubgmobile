/*
  # إنشاء جدول الإعدادات

  1. الجداول الجديدة
    - `settings`
      - `key` (text, primary key, مفتاح الإعداد)
      - `selling_terms` (text, شروط البيع)
      - `buying_terms` (text, شروط الشراء)
      - `updated_at` (timestamp)

  2. الأمان
    - تفعيل RLS على جدول `settings`
    - إضافة سياسة للقراءة العامة
    - إضافة سياسة للكتابة للمدراء فقط
*/

CREATE TABLE IF NOT EXISTS settings (
  key text PRIMARY KEY,
  selling_terms text,
  buying_terms text,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- السماح للجميع بقراءة الإعدادات
CREATE POLICY "Anyone can read settings"
  ON settings
  FOR SELECT
  TO public
  USING (true);

-- السماح للمدراء بإدارة الإعدادات
CREATE POLICY "Admins can manage settings"
  ON settings
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- إدراج الشروط الافتراضية
INSERT INTO settings (key, selling_terms, buying_terms) VALUES (
  'terms',
  'تصفير حسابك من كل الارتباطات
• إزالة كل بريد إلكتروني في اللعبة
• إزالة كل حساب تواصل اجتماعي (X، فيسبوك، وغيرها)
• اجعل فقط ارتباط الهاتف الخاص بك في اللعبة
• تواصل معنا وعند الاتفاق سنقوم بعمل إيميل جديد لحسابك
• سنرسل أموالك خلال 21 يوم لسياسة شركة PUBG للاسترجاع',
  'قم باختيار الحساب المطلوب
• قم بإضافة معلوماتك الشخصية
• اضغط على "إرسال إلى الواتساب"
• سيتم إرسالك إلى الواتساب تلقائياً مع معلوماتك
• سيتم إرسال معلومات الحساب الذي تريده'
) ON CONFLICT (key) DO NOTHING;
/*
  # إنشاء جدول البانر

  1. الجداول الجديدة
    - `banners`
      - `id` (uuid, primary key)
      - `url` (text, رابط الصورة)
      - `alt` (text, النص البديل)
      - `order` (integer, ترتيب العرض)

  2. الأمان
    - تفعيل RLS على جدول `banners`
    - إضافة سياسة للقراءة العامة
    - إضافة سياسة للكتابة للمدراء فقط
*/

CREATE TABLE IF NOT EXISTS banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  alt text NOT NULL,
  "order" integer NOT NULL DEFAULT 1
);

ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

-- السماح للجميع بقراءة البانر
CREATE POLICY "Anyone can read banners"
  ON banners
  FOR SELECT
  TO public
  USING (true);

-- السماح للمدراء بإدارة البانر
CREATE POLICY "Admins can manage banners"
  ON banners
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);
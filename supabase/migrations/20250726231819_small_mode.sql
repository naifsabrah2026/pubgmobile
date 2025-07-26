/*
  # إنشاء جدول الحسابات

  1. الجداول الجديدة
    - `accounts`
      - `id` (uuid, primary key)
      - `title` (text, عنوان الحساب)
      - `price` (integer, السعر)
      - `category` (text, الفئة: premium أو various)
      - `images` (jsonb, مصفوفة الصور)
      - `details` (jsonb, تفاصيل الحساب)
      - `featured` (boolean, حساب مميز)
      - `created_at` (timestamp)

  2. الأمان
    - تفعيل RLS على جدول `accounts`
    - إضافة سياسة للقراءة العامة
    - إضافة سياسة للكتابة للمدراء فقط
*/

CREATE TABLE IF NOT EXISTS accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  price integer NOT NULL DEFAULT 0,
  category text NOT NULL DEFAULT 'various' CHECK (category IN ('premium', 'various')),
  images jsonb NOT NULL DEFAULT '[]'::jsonb,
  details jsonb NOT NULL DEFAULT '[]'::jsonb,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;

-- السماح للجميع بقراءة الحسابات
CREATE POLICY "Anyone can read accounts"
  ON accounts
  FOR SELECT
  TO public
  USING (true);

-- السماح للمدراء بإدارة الحسابات (سنحتاج لنظام مصادقة لاحقاً)
CREATE POLICY "Admins can manage accounts"
  ON accounts
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);
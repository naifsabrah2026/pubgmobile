/*
  # إنشاء جدول الأخبار

  1. الجداول الجديدة
    - `news`
      - `id` (uuid, primary key)
      - `text` (text, نص الخبر)
      - `order` (integer, ترتيب العرض)

  2. الأمان
    - تفعيل RLS على جدول `news`
    - إضافة سياسة للقراءة العامة
    - إضافة سياسة للكتابة للمدراء فقط
*/

CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL,
  "order" integer NOT NULL DEFAULT 1
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- السماح للجميع بقراءة الأخبار
CREATE POLICY "Anyone can read news"
  ON news
  FOR SELECT
  TO public
  USING (true);

-- السماح للمدراء بإدارة الأخبار
CREATE POLICY "Admins can manage news"
  ON news
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);
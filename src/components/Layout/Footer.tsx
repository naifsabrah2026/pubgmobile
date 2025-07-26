import React from 'react';
import { MessageCircle, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-yellow-500/20 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Store Info */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">متجر PUBG Mobile</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              أفضل متجر لبيع وشراء حسابات PUBG Mobile بأسعار منافسة وضمان كامل
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/accounts" className="text-gray-300 hover:text-yellow-400 transition-colors">حسابات PUBG</a></li>
              <li><a href="/terms" className="text-gray-300 hover:text-yellow-400 transition-colors">شروط المتجر</a></li>
              <li><a href="/admin" className="text-gray-300 hover:text-yellow-400 transition-colors">لوحة الإدارة</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">تواصل معنا</h3>
            <div className="space-y-3">
              <a
                href="https://wa.me/967777826667"
                className="flex items-center space-x-3 rtl:space-x-reverse text-gray-300 hover:text-green-400 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">واتساب: +967777826667</span>
              </a>
              <a
                href="tel:+967777826667"
                className="flex items-center space-x-3 rtl:space-x-reverse text-gray-300 hover:text-blue-400 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="text-sm">هاتف: +967777826667</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-yellow-500/20 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 متجر PUBG Mobile. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
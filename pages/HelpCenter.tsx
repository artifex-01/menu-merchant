import React from 'react';
import { MessageCircle, Mail, ChevronDown, HelpCircle } from 'lucide-react';

const HelpCenter: React.FC = () => {
  const faqs = [
      { q: "How do I update my menu?", a: "Go to the Menu Builder section from your store dashboard to add or edit items." },
      { q: "When do I get paid?", a: "Payouts are processed every Monday for the previous week's earnings." },
      { q: "How to contact support?", a: "You can use the live chat below or email us for urgent issues." },
  ];

  return (
    <div className="px-6 py-6 space-y-8">
        
        {/* Support Actions */}
        <div className="grid grid-cols-2 gap-4">
            <button className="bg-orange-500 text-white p-5 rounded-3xl shadow-lg shadow-orange-500/30 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform">
                <MessageCircle size={28} />
                <span className="font-bold text-sm">Live Chat</span>
            </button>
            <button className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700 p-5 rounded-3xl shadow-sm flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform">
                <Mail size={28} className="text-gray-400" />
                <span className="font-bold text-sm">Email Us</span>
            </button>
        </div>

        {/* FAQ Section */}
        <div>
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <HelpCircle size={20} className="text-orange-500" />
                Frequently Asked
            </h3>
            <div className="space-y-3">
                {faqs.map((faq, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 group cursor-pointer">
                        <div className="flex justify-between items-center">
                            <h4 className="font-bold text-sm text-gray-900 dark:text-white">{faq.q}</h4>
                            <ChevronDown size={16} className="text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{faq.a}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="text-center pt-8 opacity-50">
            <p className="text-xs font-medium text-gray-400">Merchant Hub Support • v2.4.0</p>
        </div>
    </div>
  );
};

export default HelpCenter;
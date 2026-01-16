import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = "917814051678";
  const message = "Hi! I'm interested in Axenora AI services. Can you help me?";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setIsOpen(false);
  };

  return (
    <>
      {/* WhatsApp Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring" }}
        className="fixed bottom-6 right-6 z-50"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform duration-200"
          aria-label="Chat on WhatsApp"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>
      </motion.div>

      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-[#25D366] p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">Axenora AI Support</h3>
                  <p className="text-xs opacity-90">Typically replies instantly</p>
                </div>
              </div>
            </div>

            {/* Message Body */}
            <div className="p-4 bg-background">
              <div className="bg-card/50 rounded-xl p-4 mb-4">
                <p className="text-sm mb-2">👋 Hi there!</p>
                <p className="text-sm text-muted-foreground">
                  Have questions about our AI solutions? Chat with us on WhatsApp and we'll respond within minutes!
                </p>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2 mb-4">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full text-left p-3 rounded-lg bg-card hover:bg-accent/10 border border-border transition-colors text-sm"
                >
                  💬 Chat about AI Solutions
                </button>
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full text-left p-3 rounded-lg bg-card hover:bg-accent/10 border border-border transition-colors text-sm"
                >
                  📞 Request a Demo Call
                </button>
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full text-left p-3 rounded-lg bg-card hover:bg-accent/10 border border-border transition-colors text-sm"
                >
                  💰 Get Pricing Information
                </button>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Start WhatsApp Chat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
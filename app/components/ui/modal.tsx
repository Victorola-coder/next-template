import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({
  isOpen,
  onClose,
  title,
  close,
  children,
  className,
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`bg-[#1A202B] rounded-[32px] border border-[#FFFFFF1A] p-6 
                w-full max-w-[500px] max-h-[90vh] flex flex-col ${className}`}
            >
              {title && (
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[18px] font-semibold font-aloeSemBold text-white">
                    {title}
                  </h3>
                  <button
                    onClick={onClose}
                    className="text-white hover:opacity-80"
                  >
                    <X size={24} />
                  </button>
                </div>
              )}
              {close && (
                <button
                  onClick={onClose}
                  className="text-white hover:opacity-80"
                >
                  <X size={24} />
                </button>
              )}
              <div className="overflow-y-auto custom-scrollbar flex-1">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

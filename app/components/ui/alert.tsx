"use client";

import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useKeyboard } from "@/app/hooks";

const variantStyles = {
  info: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  success: "bg-green-500/10 border-green-500/30 text-green-400",
  warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
  error: "bg-red-500/10 border-red-500/30 text-red-400",
};

const defaultIcons = {
  info: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  success: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export function Alert({
  variant = "info",
  title,
  description,
  icon,
  onClose,
  className,
}: AlertProps) {
  return (
    <div
      role="alert"
      className={clsx(
        "relative p-4 rounded-lg border",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          {icon || defaultIcons[variant]}
        </div>
        <div className="flex-1">
          {title && (
            <h5 className="font-semibold mb-1">{title}</h5>
          )}
          <p className="text-sm opacity-90">{description}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-2 hover:opacity-70 transition-opacity"
            aria-label="Close alert"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

// Alert Dialog Component
export function AlertDialog({
  open,
  onClose,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  variant = "info",
  loading = false,
}: AlertDialogProps) {
  useKeyboard("Escape", onClose);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.3 }}
              role="alertdialog"
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              className="bg-[#1A1A1A] border border-[#FFFFFF20] rounded-lg p-6 max-w-md w-full shadow-xl"
            >
              <div className="flex gap-3 mb-4">
                <div className={clsx("flex-shrink-0", variantStyles[variant].split(" ")[2])}>
                  {defaultIcons[variant]}
                </div>
                <div className="flex-1">
                  <h2
                    id="alert-dialog-title"
                    className="text-lg font-semibold text-white mb-2"
                  >
                    {title}
                  </h2>
                  <p
                    id="alert-dialog-description"
                    className="text-sm text-[#FFFFFF80]"
                  >
                    {description}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-[#283142] text-white hover:bg-[#3A4558] transition-colors disabled:opacity-50"
                >
                  {cancelText}
                </button>
                {onConfirm && (
                  <button
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                    disabled={loading}
                    className={clsx(
                      "px-4 py-2 rounded-lg text-white transition-colors disabled:opacity-50",
                      variant === "error" && "bg-red-500 hover:bg-red-600",
                      variant === "warning" && "bg-yellow-500 hover:bg-yellow-600",
                      variant === "success" && "bg-green-500 hover:bg-green-600",
                      variant === "info" && "bg-blue-500 hover:bg-blue-600"
                    )}
                  >
                    {loading ? "Loading..." : confirmText}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

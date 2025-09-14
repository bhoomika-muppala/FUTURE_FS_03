// src/app/context/ToastContext.jsx
"use client";

import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext(null);

export default function ToastProvider({ children }) {
  const [message, setMessage] = useState(null);

  function showToast(msg, ms = 2500) {
    setMessage(msg);
    setTimeout(() => setMessage(null), ms);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && (
        <div className="fixed right-4 top-4 z-50 rounded bg-gray-900 text-white px-4 py-2 shadow">
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

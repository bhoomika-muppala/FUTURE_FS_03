// src/app/context/ToastContext.jsx
"use client";
import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext(null);
export function useToast() { return useContext(ToastContext); }

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState(null);

  function showToast(text, ms = 2500) {
    setMsg(text);
    setTimeout(() => setMsg(null), ms);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {msg && (
        <div className="fixed right-6 bottom-6 bg-black text-white px-4 py-2 rounded shadow">
          {msg}
        </div>
      )}
    </ToastContext.Provider>
  );
}

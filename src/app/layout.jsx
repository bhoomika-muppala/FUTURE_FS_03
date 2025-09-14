// src/app/layout.jsx
import "./globals.css";
import React from "react";
import { CartProvider } from "./context/CartContext";
import ToastProvider from "./context/ToastContext";
import Header from "./components/Header";
import Footer from "./components/Footer"; // if you have it

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <ToastProvider>
            <Header />
            <main>{children}</main>
            {Footer && <Footer />}
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}

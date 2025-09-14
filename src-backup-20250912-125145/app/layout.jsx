import { CartProvider } from './context/CartContext';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {/* navbar */}
          {children}
          {/* footer */}
        </CartProvider>
      </body>
    </html>
  );
}

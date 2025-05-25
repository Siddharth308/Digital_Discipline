import 'antd/dist/reset.css';
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Digital Discipline',
  description: 'Guide-based digital detox & habit tracker',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

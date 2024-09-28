import type { PropsWithChildren } from 'react';
import { Inter } from 'next/font/google';

import '@/styles/index.css';

const font = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = { title: 'App' };

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang='en' className={font.variable}>
    <body>{children}</body>
  </html>
);

export default RootLayout;

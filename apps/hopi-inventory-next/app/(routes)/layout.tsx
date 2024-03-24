import Header from '@/_components/Header/Header';
import { PiToast } from '@/_components/PiToasts';
import QueryProvider from '@/_lib/QueryProvider';
import '@/_styles/global.css';
import '@/_styles/reset.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hopi Inventory',
  description: 'Hopi Inventory',
};

interface Prop {
  children: React.ReactNode;
}

export default function RootLayout({ children, }: Prop) {
  return (
    <QueryProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <main className='main'>
            {children}
          </main>
          <PiToast />
        </body>
      </html >
    </QueryProvider>
  );
}

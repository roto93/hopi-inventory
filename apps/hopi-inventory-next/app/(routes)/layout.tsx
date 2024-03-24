import Header from '@/_components/Header/Header';
import { PiToast } from '@/_components/PiToasts';
import AntdProvider from '@/_lib/AntdProvider';
import QueryProvider from '@/_lib/QueryProvider';
import { inter } from '@/_lib/fonts';
import '@/_styles/global.css';
import '@/_styles/reset.css';
import { Metadata } from 'next';

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
          <AntdProvider>
            <Header />
            <main className='main'>
              {children}
            </main>
            <PiToast />
          </AntdProvider>
        </body>
      </html >
    </QueryProvider>
  );
}

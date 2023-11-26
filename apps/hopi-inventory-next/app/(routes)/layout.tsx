import Header from '@/_components/Header/Header';
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
    <html lang="en">
      <body>
        <Header />
        <main className='main'>
          {children}
        </main>
      </body>
    </html>
  );
}

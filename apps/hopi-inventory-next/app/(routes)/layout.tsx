import Header from '@/_components/Header/Header';
import '@/_styles/global.css';
import '@/_styles/reset.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hopi Inventory',
  description: 'Hopi Inventory',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}

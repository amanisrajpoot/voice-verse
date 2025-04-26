import '../styles/globals.css'; 
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'EchoVerse',
  description: 'Record and revisit your voice moments',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white font-sans">
          {children}
        </div>
        <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
      </body>
    </html>
  );
}

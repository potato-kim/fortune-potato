import type { Metadata } from "next";
import { Poor_Story } from "next/font/google";
import "./globals.css";

const poorStory = Poor_Story({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poor-story",
  preload: false,
});

export const metadata: Metadata = {
  title: "🥔 Potato Fortune Cookie",
  description: "당신의 운세를 확인해보세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${poorStory.className} antialiased selection:bg-stone-200`}>
        <div className="min-h-screen bg-potato-bg">
          <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-none shadow-sm">
            <nav className="max-w-4xl mx-auto px-5 md:px-8 h-18 flex items-center justify-between">
              <a href="/" className="text-2xl font-bold text-potato-primary flex items-center gap-2">
                <span className="bg-potato-accent p-1.5 rounded-xl">🥔</span>
                <span className="tracking-tight">감자 포춘</span>
              </a>
              <div className="flex gap-6">
                <a href="/submit" className="text-sm font-semibold text-stone-500 hover:text-potato-primary transition-colors">등록</a>
                <a href="/top" className="text-sm font-semibold text-stone-500 hover:text-potato-primary transition-colors">랭킹</a>
              </div>
            </nav>
          </header>
          <main className="max-w-4xl mx-auto px-5 md:px-8 py-10">
            {children}
          </main>
          <footer className="bg-white py-16 text-center">
            <p className="text-sm font-medium text-stone-400">© 2026 Potato Fortune. All Potatoes Reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}

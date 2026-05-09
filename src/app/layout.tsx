import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Homework Helper | 숙제 도우미",
  description: "중학생을 위한 즐거운 숙제 도우미 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <header>
          <div className="container">
            <nav>
              <Link href="/" className="logo">
                StudyQuest
              </Link>
              <div className="nav-links">
                <div className="points-badge">
                  ⭐ 150 pts
                </div>
                <Link href="/profile" className="nav-link">내 프로필</Link>
              </div>
            </nav>
          </div>
        </header>
        <main className="container">
          <div className="main-layout">
            <aside className="sidebar">
              <Link href="/" className="sidebar-item">🏠 홈</Link>
              <Link href="/ai-tutor" className="sidebar-item">🤖 AI 튜터</Link>
              <Link href="/community" className="sidebar-item">👥 커뮤니티</Link>
              <Link href="/planner" className="sidebar-item">📅 플래너</Link>
              <Link href="/resources" className="sidebar-item">📚 학습 자료</Link>
            </aside>
            <section className="content">
              {children}
            </section>
          </div>
        </main>
      </body>
    </html>
  );
}

import { useEffect, useState } from 'react';
import Header from './components/header';
import Home from './components/Home';
import Profile from './components/Profile';
import Career from './components/Career';
import Competence from './components/Competence';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Editor from './components/Editor';
import { PortfolioProvider } from './portfolio/store';

function Site() {
  const [editing, setEditing] = useState(false);

  // 숨은 진입 경로 ①: Ctrl/⌘ + Shift + E
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setEditing((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <Header />
      <main className="wrap">
        <Home />
        <Profile />
        <Career />
        <Competence />
        <Projects />
        {/* 숨은 진입 경로 ②: 푸터 끝의 마침표 세 번 */}
        <Footer onSecret={() => setEditing(true)} />
      </main>

      {editing && <Editor onClose={() => setEditing(false)} />}
    </>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <Site />
    </PortfolioProvider>
  );
}

import Header from './components/header';
import Home from './components/Home';
import Profile from './components/Profile';
import Career from './components/Career';
import Competence from './components/Competence';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Editor from './components/Editor';
import { PortfolioProvider } from './portfolio/store';

/** 공개되지 않은 편집 경로 */
const UPLOAD_PATH = '/upload';

const isUploadRoute = () =>
  window.location.pathname.replace(/\/+$/, '').toLowerCase() === UPLOAD_PATH;

function Site() {
  return (
    <>
      <Header />
      <main className="wrap">
        <Home />
        <Profile />
        <Career />
        <Competence />
        <Projects />
        <Footer />
      </main>
    </>
  );
}

export default function App() {
  const upload = isUploadRoute();

  return (
    <PortfolioProvider writable={upload}>{upload ? <Editor /> : <Site />}</PortfolioProvider>
  );
}

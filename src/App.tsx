import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ScrollManager } from './components/ScrollManager'
import { SiteBackground } from './components/SiteBackground'
import Home from './pages/Home'
import ProjectPage from './pages/ProjectPage'
import ResearchPage from './pages/ResearchPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
      >
        跳到主要内容
      </a>
      <SiteBackground />
      <ScrollManager />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/research/:slug" element={<ResearchPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

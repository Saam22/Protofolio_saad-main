import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastProvider } from './hooks/useToast';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import { Education, Certificates, Courses } from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import BackToTop from './components/BackToTop';
import { MotionSection, fadeInUp } from './animations';
import './App.css';

const sections = [
  { id: 'hero', Component: Hero },
  { id: 'about', Component: About },
  { id: 'skills', Component: Skills },
  { id: 'experience', Component: Experience },
  { id: 'projects', Component: Projects },
  { id: 'education', Component: Education },
  { id: 'courses', Component: Courses },
  { id: 'certificates', Component: Certificates },
  { id: 'contact', Component: Contact },
];

export const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: 'smooth' });
  window.dispatchEvent(new CustomEvent('navigate', { detail: { section: id } }));
};

export const useActiveSection = (ids, offset = 120) => {
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop - offset <= scrollY) {
          setActive(ids[i]);
          return;
        }
      }
      setActive(ids[0]);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids, offset]);

  return active;
};

const LoadingScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 1500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="loader"
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } }}
    >
      <div className="loader-content">
        <motion.div
          className="loader-icon"
          animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          SM
        </motion.div>
        <div className="loader-bar-track">
          <motion.div
            className="loader-bar-fill"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
        <p className="loader-text">Loading experience...</p>
      </div>
    </motion.div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Cursor />
      <AnimatePresence>
        {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      </AnimatePresence>

      <ToastProvider>
        <motion.div
          className="App"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div
            className="scroll-progress"
            style={{ width: `${scrollProgress}%` }}
            animate={{ opacity: scrollProgress > 0 ? 1 : 0 }}
          />
          <Header />
          <main>
            {sections.map(({ id, Component }, idx) => (
              <MotionSection key={id} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: idx * 0.05 }}>
                <Component />
              </MotionSection>
            ))}
          </main>
          <Footer />
          <BackToTop />
        </motion.div>
      </ToastProvider>
    </>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaMoon, FaSun, FaCode } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToSection, useActiveSection } from '../App';
import './Header.css';

const links = [
  { name: 'Home', href: '#hero', id: 'hero' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];
const linkIds = links.map((l) => l.id);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');
  const activeSection = useActiveSection(linkIds);

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    scrollToSection(id);
  };

  return (
    <motion.header
      className={`header${scrolled ? ' scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <nav className="navbar container">
        <motion.a
          href="#hero"
          className="nav-brand"
          onClick={(e) => handleClick(e, 'hero')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <FaCode className="nav-brand-icon" /> SM<span>.</span>
        </motion.a>

        <ul className={`nav-menu${isOpen ? ' active' : ''}`}>
          {links.map((l, i) => (
            <motion.li
              key={l.name}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
            >
              <a
                href={l.href}
                className={`nav-link${activeSection === l.id ? ' active' : ''}`}
                onClick={(e) => handleClick(e, l.id)}
              >
                <span className="nav-indicator" />
                <span className="nav-link-text">{l.name}</span>
                <span className="nav-underline" />
              </a>
            </motion.li>
          ))}
        </ul>

        <div className="nav-actions">
          <motion.button
            onClick={toggleTheme}
            className="theme-btn"
            aria-label="Toggle theme"
            whileHover={{ scale: 1.1, borderColor: 'var(--p)', color: 'var(--p)' }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </motion.span>
          </motion.button>

          <motion.button
            className="nav-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;

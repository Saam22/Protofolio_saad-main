import React, { useState, useEffect, useRef, useMemo } from 'react';
import { FaArrowRight, FaDownload } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { scrollToSection } from '../App';
import './Hero.css';

const roles = ['Web Developer', 'Full-Stack Developer', 'React Developer', 'UI/UX Enthusiast'];

const Typewriter = ({ texts }) => {
  const [display, setDisplay] = useState('');
  const [index, setIndex] = useState(0);
  const [char, setChar] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];
    let timeout;
    if (!deleting && char < current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, char + 1));
        setChar((c) => c + 1);
      }, 80);
    } else if (!deleting && char === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && char > 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, char - 1));
        setChar((c) => c - 1);
      }, 40);
    } else if (deleting && char === 0) {
      setDeleting(false);
      setIndex((index + 1) % texts.length);
    }
    return () => clearTimeout(timeout);
  }, [char, deleting, index, texts]);

  return (
    <span className="typewriter-text">
      {display}<span className="typewriter-cursor">|</span>
    </span>
  );
};

const AnimatedCounter = ({ target, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = Math.ceil(target / (1500 / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Particles = ({ count = 40 }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const isAmber = Math.random() > 0.5;
        return {
          id: i,
          size: Math.random() * 4 + 1.5,
          x: Math.random() * 100,
          y: Math.random() * 100,
          dx: (Math.random() - 0.5) * 400,
          dy: (Math.random() - 0.5) * 400,
          duration: Math.random() * 16 + 14,
          delay: Math.random() * 8,
          color: isAmber ? 'var(--p)' : 'var(--s)',
          glow: isAmber ? 'var(--p-glow)' : 'var(--s-glow)',
        };
      }),
    [count]
  );

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            '--ps': `${p.size}px`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            '--dx': `${p.dx}px`,
            '--dy': `${p.dy}px`,
            '--pd': `${p.duration}s`,
            '--pdelay': `${p.delay}s`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
};

const Scanlines = () => (
  <div className="scanlines" aria-hidden="true" />
);

const GridOverlay = () => (
  <div className="hero-grid-overlay" aria-hidden="true" />
);

const DiagonalAccent = () => (
  <div className="diagonal-accent" aria-hidden="true" />
);

const NoiseOverlay = () => (
  <div className="noise-overlay" aria-hidden="true" />
);

const Hero = () => {
  const codeRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const handleMove = (e) => {
    if (!codeRef.current) return;
    const rect = codeRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const scroll = (id) => (e) => { e.preventDefault(); scrollToSection(id); };

  const nameParts = portfolioData.personal.name.split(' ');

  return (
    <section id="hero" className="hero-section">
      <NoiseOverlay />
      <GridOverlay />
      <DiagonalAccent />
      <div className="gradient-bg hero-gradient" />
      <Particles />
      <div className="container hero-content">
        <div className="hero-text">
          <motion.div
            className="subsection-label"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="dot" />
            Available for opportunities
          </motion.div>

          <h1 className="hero-name">
            {nameParts.map((part, i) => (
              <motion.span
                key={i}
                className={`hero-name-line ${i === nameParts.length - 1 ? 'hero-name-accent' : ''}`}
                initial={{ opacity: 0, y: 60, rotateX: 15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5 + i * 0.15,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                {part}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="hero-role"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Typewriter texts={roles} />{' '}
            <span className="hero-role-divider">—</span>{' '}
            React / Django / Node.js
          </motion.p>

          <motion.p
            className="hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            I build fast, accessible, and visually stunning web experiences.
            Passionate about clean architecture, modern UI, and shipping things that matter.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <motion.a
              href="#projects"
              className="btn btn-primary cta-btn"
              onClick={scroll('projects')}
              whileHover={{ scale: 1.05, boxShadow: '0 12px 32px rgba(var(--p-rgb), 0.4), 0 0 48px rgba(var(--p-rgb), 0.15)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              View Projects <FaArrowRight />
            </motion.a>
            <motion.a
              href="#contact"
              className="btn btn-outline cta-btn"
              onClick={scroll('contact')}
              whileHover={{ scale: 1.05, borderColor: 'var(--p)', color: 'var(--p)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              Contact Me
            </motion.a>
            <motion.a
              href="images/Saad_Hassan_FullStack_CV.pdf"
              download="Saad_Mohamed_Hassan_CV"
              className="btn btn-outline cta-btn cv-btn"
              whileHover={{ scale: 1.05, borderColor: 'var(--s)', color: 'var(--s)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <FaDownload /> CV
            </motion.a>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            {[
              { num: 1, suffix: '+', label: 'Years learning' },
              { num: 8, suffix: '+', label: 'Projects built' },
              { num: 3, suffix: '', label: 'Internships' },
            ].map((s) => (
              <motion.div
                key={s.label}
                className="stat-item"
                whileHover={{ scale: 1.08, y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="stat-num">
                  <AnimatedCounter target={s.num} suffix={s.suffix} />
                </div>
                <div className="stat-label">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 80, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.0, ease: [0.23, 1, 0.32, 1], delay: 0.7 }}
        >
          <motion.div
            ref={codeRef}
            className="code-window glass"
            onMouseMove={handleMove}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            animate={{
              rotateX: hover ? mousePos.y * -14 : 1,
              rotateY: hover ? mousePos.x * 14 : 2,
              rotateZ: hover ? mousePos.x * mousePos.y * 3 : 0.5,
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            style={{ perspective: 1200 }}
          >
            <Scanlines />
            <div className="win-header">
              <span className="win-dot r" /><span className="win-dot y" /><span className="win-dot g" />
              <span className="win-tab">developer.ts</span>
            </div>
            <pre className="code-content">
              <span className="kw">const</span> developer = {'{'}{'\n'}
              {'  '}<span className="key">name</span>: <span className="str">"Saad Mohamed Hassan"</span>,{'\n'}
              {'  '}<span className="key">role</span>: <span className="str">"Full-Stack Developer"</span>,{'\n'}
              {'  '}<span className="key">stack</span>: [<span className="str">"React"</span>, <span className="str">"Node.js"</span>, <span className="str">"Django"</span>, <span className="str">"ASP.NET"</span>],{'\n'}
              {'  '}<span className="key">passion</span>: <span className="str">"Building web magic"</span>,{'\n'}
              {'  '}<span className="key">status</span>: <span className="str">"Open to work"</span>,{'\n'}
              {'}'};
            </pre>
            <div className="code-window-glow" />
          </motion.div>

          <motion.div
            className="status-card glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            whileHover={{ scale: 1.02, borderColor: 'var(--bd-s)' }}
          >
            <span className="status-dot" />
            <p className="status-text">
              <strong>Open to work</strong> — Actively looking for frontend & full-stack roles
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

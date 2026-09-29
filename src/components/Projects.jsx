import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import {
  FaExternalLinkAlt, FaGithub, FaCode, FaRocket, FaStar,
  FaSearch, FaTimes, FaExpand, FaCompress, FaArrowLeft, FaArrowRight,
  FaChevronRight, FaPlay, FaEye
} from 'react-icons/fa';
import { staggerContainer, staggerItemScale, springHover } from '../animations';
import './Projects.css';

const typeConfig = {
  Frontend: { cls: 'frontend', color: '#818cf8', glow: 'rgba(129,140,248,0.35)', icon: <FaStar /> },
  Backend: { cls: 'backend', color: '#34d399', glow: 'rgba(52,211,153,0.35)', icon: <FaCode /> },
  FullStack: { cls: 'fullstack', color: '#f472b6', glow: 'rgba(244,114,182,0.35)', icon: <FaRocket /> },
  'Full Stack': { cls: 'fullstack', color: '#f472b6', glow: 'rgba(244,114,182,0.35)', icon: <FaRocket /> },
};

/* ─── Browser Frame ───────────────────────────── */
const BrowserFrame = ({ url, children, label }) => {
  const displayUrl = url ? url.replace(/^https?:\/\//, '') : 'preview unavailable';

  return (
    <div className="browser-frame">
      <div className="browser-topbar">
        <div className="browser-dots">
          <span className="browser-dot r" /><span className="browser-dot y" /><span className="browser-dot g" />
        </div>
        <div className="browser-url">
          <FaRocket className="browser-url-icon" />
          <span>{displayUrl}</span>
        </div>
        <div className="browser-spacer" />
      </div>
      <div className="browser-content">
        {children}
      </div>
    </div>
  );
};

/* ─── Screenshot Carousel Fallback ─────────────── */
const ScreenshotCarousel = ({ screenshots }) => {
  const [current, setCurrent] = useState(0);
  const imgs = screenshots && screenshots.length > 0 ? screenshots : [];

  if (imgs.length === 0) {
    return (
      <div className="carousel-empty">
        <FaEye className="carousel-empty-icon" />
        <p>Preview unavailable</p>
      </div>
    );
  }

  const next = () => setCurrent((c) => (c + 1) % imgs.length);
  const prev = () => setCurrent((c) => (c - 1 + imgs.length) % imgs.length);

  return (
    <div className="carousel">
      <div className="carousel-viewport">
        {imgs.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Screenshot ${i + 1}`}
            className="carousel-img"
            style={{ transform: `translateX(${(i - current) * 100}%)` }}
          />
        ))}
        {imgs.length > 1 && (
          <>
            <button className="carousel-btn carousel-prev" onClick={prev}><FaArrowLeft /></button>
            <button className="carousel-btn carousel-next" onClick={next}><FaArrowRight /></button>
          </>
        )}
      </div>
      {imgs.length > 1 && (
        <div className="carousel-dots">
          {imgs.map((_, i) => (
            <span
              key={i}
              className={`carousel-dot${i === current ? ' active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Project Preview Modal (full-screen) ───────── */
const ProjectPreviewModal = ({ project, onClose }) => {
  const iframeRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const hasLive = project.live && project.live !== '#';

  return (
    <motion.div
      className="preview-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        className={`preview-modal${fullscreen ? ' fullscreen' : ''}`}
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 40 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="preview-modal-header">
          <div className="preview-modal-info">
            <h2 className="preview-modal-title">{project.title}</h2>
            <span className="preview-modal-sub">{project.subtitle}</span>
          </div>
          <div className="preview-modal-actions">
            {hasLive && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="preview-action-btn">
                <FaExternalLinkAlt /> Open in Tab
              </a>
            )}
            <button className="preview-action-btn" onClick={() => setFullscreen(!fullscreen)}>
              {fullscreen ? <FaCompress /> : <FaExpand />}
            </button>
            <button className="preview-action-btn close" onClick={onClose}>
              <FaTimes />
            </button>
          </div>
        </div>
        <div className="preview-modal-body">
          {hasLive ? (
            <BrowserFrame url={project.live}>
              {!loaded && <div className="iframe-loading"><div className="iframe-loader" /></div>}
              <iframe
                ref={iframeRef}
                src={project.live}
                title={`${project.title} preview`}
                className="preview-iframe"
                onLoad={() => setLoaded(true)}
                style={{ opacity: loaded ? 1 : 0 }}
                allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </BrowserFrame>
          ) : (
            <ScreenshotCarousel screenshots={project.screenshots} />
          )}
        </div>
        <div className="preview-modal-footer">
          <div className="preview-tech">
            {project.technologies.map((tech, i) => (
              <span key={i} className="preview-tech-pill">{tech}</span>
            ))}
          </div>
          <div className="preview-footer-links">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="preview-footer-link">
                <FaGithub /> Source Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Project Detail Modal ─────────────────────── */
const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const type = typeConfig[project.type] || typeConfig.Frontend;

  return (
    <motion.div
      className="project-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        className="project-modal glass"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        <button className="project-modal-close" onClick={onClose}><FaTimes /></button>

        <div className="project-modal-layout">
          <div className="project-modal-preview">
            {project.live && project.live !== '#' ? (
              <BrowserFrame url={project.live}>
                <iframe
                  src={project.live}
                  title={`${project.title} preview`}
                  className="preview-iframe"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </BrowserFrame>
            ) : (
              <div className="project-modal-img-wrap">
                <img src={project.image} alt={project.title} className="project-modal-img" />
              </div>
            )}
          </div>

          <div className="project-modal-content">
            <span className="modal-type-badge" style={{ background: type.color, color: '#fff' }}>
              {type.icon} {project.type}
            </span>
            <h2 className="project-modal-title">{project.title}</h2>
            <p className="project-modal-desc">{project.description}</p>

            {project.features && (
              <div className="project-modal-features">
                <h4>Key Features</h4>
                <ul>
                  {project.features.map((f, i) => (
                    <li key={i}><FaChevronRight className="feature-icon" /> {f}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="project-modal-tech">
              <h4>Tech Stack</h4>
              <div className="modal-tech-pills">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="modal-tech-pill">{tech}</span>
                ))}
              </div>
            </div>

            <div className="project-modal-links">
              {project.live && project.live !== '#' && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <FaRocket /> Live Demo
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <FaGithub /> Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── 3D Tilt Card Hook ─────────────────────────── */
const useTilt = () => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -12, y: x * 12 });
  }, []);

  const onMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return { ref, tilt, onMouseMove, onMouseLeave };
};

/* ─── Project Card ──────────────────────────────── */
const ProjectCard = ({ project, index, onOpenPreview, onOpenDetail }) => {
  const type = typeConfig[project.type] || typeConfig.Frontend;
  const { ref, tilt, onMouseMove, onMouseLeave } = useTilt();

  return (
    <motion.article
      className={`project-card glass`}
      style={{
        '--type-color': type.color,
        '--type-glow': type.glow,
        '--tilt-x': `${tilt.x}deg`,
        '--tilt-y': `${tilt.y}deg`,
      }}
      variants={staggerItemScale}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: false, amount: 0.1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      {project.featured && <div className="featured-ribbon">Featured</div>}

      <div
        ref={ref}
        className="card-tilt-wrap"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div className="card-glow" />
        <div className="card-orb" />

        <div className="card-badge" style={{ borderColor: type.color }}>
          <span className="badge-dot" style={{ background: type.color }} />
          {type.icon} {project.type}
        </div>

        {/* Image Section */}
        <div className="project-image-wrap">
          <div className="project-img-inner">
            <motion.img
              src={project.image}
              alt={project.title}
              className="project-img"
              loading="lazy"
              whileHover={{ scale: 1.12 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            />
            <div className="img-shine" />
          </div>
          {/* Hover overlay */}
          <motion.div
            className="img-overlay glass"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          >
            <motion.div
              className="overlay-inner"
              initial={{ y: 16 }}
              whileHover={{ y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <span className="overlay-icon">{type.icon}</span>
              <span>Explore Project</span>
              <div className="overlay-dots"><span /><span /><span /></div>
            </motion.div>
          </motion.div>
        </div>

        {/* Card Body */}
        <div className="project-body">
          <h3 className="project-title">
            <span className="title-line" />
            {project.title}
          </h3>
          {project.subtitle && <span className="project-subtitle">{project.subtitle}</span>}
          <p className="project-desc">{project.description}</p>

          <div className="tech-pills">
            {project.technologies.map((tech, i) => (
              <motion.span
                key={i}
                className="tech-pill"
                whileHover={{ y: -2, scale: 1.06, background: 'var(--p)', color: 'var(--bg)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <div className="project-links">
            <motion.button
              className="proj-link preview-link"
              onClick={() => onOpenPreview(project)}
              whileHover={{ gap: '12px' }}
              transition={{ duration: 0.2 }}
            >
              <FaPlay /> Open Preview <FaChevronRight className="preview-arrow" />
            </motion.button>
            <motion.button
              className="proj-link details-link"
              onClick={() => onOpenDetail(project)}
              whileHover={{ scale: 1.02 }}
            >
              <FaEye /> Details
            </motion.button>
          </div>
        </div>

        <div className="corner tl" />
        <div className="corner br" />
      </div>
    </motion.article>
  );
};

/* ─── Main Projects Section ─────────────────────── */
const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [previewProject, setPreviewProject] = useState(null);
  const [detailProject, setDetailProject] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      if (e.detail.section === 'projects') {
        setFilter('All');
        setSearch('');
        setPreviewProject(null);
        setDetailProject(null);
      }
    };
    window.addEventListener('navigate', handler);
    return () => window.removeEventListener('navigate', handler);
  }, []);

  const types = ['All', ...new Set(portfolioData.projects.map((p) => p.type))];

  const filtered = useMemo(() => {
    return portfolioData.projects.filter((p) => {
      const matchType = filter === 'All' || p.type === filter;
      const matchSearch = !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.technologies.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchType && matchSearch;
    });
  }, [filter, search]);

  const getCount = (type) => {
    if (type === 'All') return portfolioData.projects.length;
    return portfolioData.projects.filter((p) => p.type === type).length;
  };

  return (
    <section id="projects" className="projects-section">
      <div className="gradient-bg" />
      <div className="floating-orbs">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="orb"
            style={{
              '--s': `${Math.random() * 120 + 60}px`,
              '--d': `${Math.random() * 5}s`,
              '--dur': `${Math.random() * 12 + 14}s`,
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container">
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="subsection-label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="dot" /> My Work
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Featured <span className="accent-word">Projects</span>
          </motion.h2>
          <motion.p
            className="projects-sub"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Click any project to see a live preview — try the actual app right here
          </motion.p>
        </motion.div>

        <motion.div
          className="projects-toolbar"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="filter-tabs">
            {types.map((t) => (
              <motion.button
                key={t}
                className={`filter-tab${filter === t ? ' active' : ''}`}
                onClick={() => setFilter(t)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {t}
                <span className="filter-count">{getCount(t)}</span>
              </motion.button>
            ))}
          </div>
          <div className="search-wrap">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={staggerContainer.viewport}
        >
          <AnimatePresence initial={false}>
            {filtered.length > 0 ? filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onOpenPreview={setPreviewProject}
                onOpenDetail={setDetailProject}
              />
            )) : (
              <motion.div
                className="projects-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p>No projects match your search. Try a different filter or keyword.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="view-all"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.a
            href="https://github.com/Saam22"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            {...springHover}
          >
            View More on GitHub <FaExternalLinkAlt />
          </motion.a>
        </motion.div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewProject && (
          <ProjectPreviewModal
            project={previewProject}
            onClose={() => setPreviewProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {detailProject && (
          <ProjectModal
            project={detailProject}
            onClose={() => setDetailProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;

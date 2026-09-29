import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { FaCalendarAlt, FaBuilding } from 'react-icons/fa';
import { fadeIn } from '../animations';
import './Experience.css';

const Experience = () => (
  <section id="experience" className="experience-section">
    <div className="gradient-bg" />
    <div className="container">
      <motion.h2 className="section-title" {...fadeIn}>
        Work <span className="accent-word">Experience</span>
      </motion.h2>
      <div className="timeline">
        {portfolioData.experience.map((exp, i) => (
          <motion.div
            key={i}
            className="timeline-item"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              className="timeline-dot"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 + 0.3, type: 'spring', stiffness: 300, damping: 12 }}
            />
            <div className="timeline-line" />
            <motion.div
              className="timeline-card glass"
              whileHover={{ x: 6, borderColor: 'var(--bd-p)' }}
              transition={{ duration: 0.2 }}
            >
              <span className="timeline-period">
                <FaCalendarAlt /> {exp.period}
              </span>
              <h3 className="timeline-title">{exp.title}</h3>
              <h4 className="timeline-company"><FaBuilding /> {exp.company}</h4>
              {exp.description && <p className="timeline-desc">{exp.description}</p>}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;

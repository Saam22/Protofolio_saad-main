import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { FaAward, FaBookOpen, FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { fadeIn, springIcon } from '../animations';
import './Education.css';

const cardAnim = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
};

export const Education = () => (
  <section id="education" className="education-section">
    <div className="container">
      <motion.h2 className="section-title" {...fadeIn}>
        <span className="accent-word">Education</span>
      </motion.h2>
      <div className="edu-grid">
        {portfolioData.education.map((edu, i) => (
          <motion.div
            key={i}
            className="edu-card glass"
            {...cardAnim}
            transition={{ ...cardAnim.transition, delay: i * 0.1 }}
            whileHover={{ x: 6 }}
          >
            <motion.div className="edu-icon" {...springIcon}>
              <FaGraduationCap />
            </motion.div>
            <div className="edu-degree">{edu.degree}</div>
            <div className="edu-institution">{edu.institution}</div>
            {edu.department && <div className="edu-dept">{edu.department}</div>}
            <div className="edu-meta">
              <span><FaCalendarAlt /> {edu.period}</span>
              <span><FaMapMarkerAlt /> {edu.location}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const Certificates = () => (
  <section id="certificates" className="certificates-section">
    <div className="gradient-bg" />
    <div className="container">
      <motion.h2 className="section-title" {...fadeIn}>
        <span className="accent-word">Certificates</span>
      </motion.h2>
      <div className="certs-grid">
        {portfolioData.certificates.map((cert, i) => (
          <motion.div
            key={i}
            className="cert-card glass"
            {...cardAnim}
            transition={{ ...cardAnim.transition, delay: i * 0.08 }}
            whileHover={{ y: -8 }}
          >
            <motion.div className="cert-icon" {...springIcon}>
              <FaAward />
            </motion.div>
            <div className="cert-title">{cert.title}</div>
            <div className="cert-issuer">{cert.issuer}</div>
            <span className="cert-date"><FaCalendarAlt /> {cert.date}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const Courses = () => (
  <section id="courses" className="courses-section">
    <div className="container">
      <motion.h2 className="section-title" {...fadeIn}>
        Courses & <span className="accent-word">Training</span>
      </motion.h2>
      <div className="courses-grid">
        {portfolioData.courses.map((course, i) => (
          <motion.div
            key={i}
            className="course-card glass"
            {...cardAnim}
            transition={{ ...cardAnim.transition, delay: i * 0.06 }}
            whileHover={{ y: -6 }}
          >
            <motion.div className="course-icon" {...springIcon}>
              <FaBookOpen />
            </motion.div>
            <div>
              <h3>{course}</h3>
              <span className="course-badge"><FaCheckCircle /> Completed</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

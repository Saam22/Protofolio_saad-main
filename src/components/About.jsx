import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import { fadeIn, fadeInRight, staggerContainer, staggerItem } from '../animations';
import './About.css';

const tags = ['React JS', 'Node.js', 'Django', 'JavaScript', 'ASP.NET', 'PostgreSQL', 'MongoDB', 'Git'];

const About = () => (
  <section id="about" className="about-section">
    <div className="gradient-bg" />
    <div className="container">
      <motion.h2 className="section-title" {...fadeIn}>
        About <span className="accent-word">Me</span>
      </motion.h2>

      <div className="about-layout">
        <motion.div {...fadeIn}>
          <motion.div
            className="about-avatar-wrap"
            whileHover={{ scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <div className="about-avatar glass">
              <img src="/images/my_image.png" alt={portfolioData.personal.name} className="about-avatar-img" />
            </div>
            <span className="about-badge glass">Cairo, Egypt</span>
          </motion.div>

          <h3 className="about-headline">
            Full-Stack Developer with a <em>passion</em> for clean code
          </h3>
          <p className="about-body">{portfolioData.profile}</p>

          <motion.div
            className="about-tags"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={staggerContainer.viewport}
          >
            {tags.map((t) => (
              <motion.span key={t} className="about-tag" variants={staggerItem} whileHover={{ y: -3, borderColor: 'var(--p)', color: 'var(--p)', background: 'var(--p-glow)' }}>
                {t}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="about-sidebar" {...fadeInRight}>
          <motion.div className="info-block glass" whileHover={{ borderColor: 'var(--bd-p)', y: -4 }}>
            <div className="info-header"><FaBriefcase /> Personal Info</div>
            <InfoRow icon={<FaMapMarkerAlt />} label="Location" value={portfolioData.personal.location} />
            <InfoRow icon={<FaEnvelope />} label="Email" value={portfolioData.personal.email} accent />
            <InfoRow icon={<FaPhone />} label="Phone" value={portfolioData.personal.phone} />
          </motion.div>

          <motion.div className="info-block glass" whileHover={{ borderColor: 'var(--bd-p)', y: -4 }}>
            <div className="info-header"><FaGraduationCap /> Education</div>
            <InfoRow label="Degree" value="Bachelor of CS" />
            <InfoRow label="University" value="Ain Shams University" />
            <InfoRow label="Year" value="2019 – 2024" />
          </motion.div>

          <motion.div className="info-block glass" whileHover={{ borderColor: 'var(--bd-p)', y: -4 }}>
            <div className="info-header"><FaBriefcase /> Status</div>
            <InfoRow label="Availability" value="Open to work" accent />
            <InfoRow label="Type" value="Full-time / Remote" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

const InfoRow = ({ icon, label, value, accent }) => (
  <div className="info-row">
    {icon && <span className="info-icon">{icon}</span>}
    <span className="info-label">{label}</span>
    <span className={`info-value${accent ? ' accent' : ''}`}>{value}</span>
  </div>
);

export default About;

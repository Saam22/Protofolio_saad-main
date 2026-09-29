import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { FaReact, FaNodeJs, FaPython, FaGitAlt } from 'react-icons/fa';
import { SiDotnet, SiDjango } from 'react-icons/si';
import { fadeIn, springIcon } from '../animations';
import './Skills.css';

const SkillCard = ({ icon, title, items, accentColor, index }) => (
  <motion.div
    className="skill-card glass"
    style={{ '--card-accent': accentColor }}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
    whileHover={{ y: -8, transition: { duration: 0.2 } }}
  >
    <motion.span className="skill-icon" {...springIcon}>
      {icon}
    </motion.span>
    <h3 className="skill-card-title">{title}</h3>
    <div className="skill-tags">
      {items.map((s) => (
        <span key={s} className="skill-tag">{s}</span>
      ))}
    </div>
  </motion.div>
);

const SkillsBar = ({ name, level, delay }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setWidth(level), delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, level, delay]);

  return (
    <div className="skill-bar-item" ref={ref}>
      <div className="skill-bar-header">
        <span className="skill-bar-name">{name}</span>
        <motion.span
          className="skill-bar-percent"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay / 1000 + 0.5 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          style={{ width: `${width}%` }}
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${level}%` } : { width: '0%' }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: delay / 1000 }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const { skills } = portfolioData;

  const cards = [
    { icon: <FaReact color="#61dafb" />, title: 'Frontend Development', items: [...skills.frontend.languages, ...skills.frontend.libraries], accentColor: '#61dafb' },
    { icon: <FaNodeJs color="#68a063" />, title: 'Node.js Backend', items: skills.backend.nodejs, accentColor: '#68a063' },
    { icon: <SiDjango color="#34d399" />, title: 'Django Backend', items: skills.backend.django, accentColor: '#34d399' },
    { icon: <SiDotnet color="#818cf8" />, title: '.NET Backend', items: skills.backend.dotnet, accentColor: '#818cf8' },
    { icon: <FaPython color="#fbbf24" />, title: 'Programming Languages', items: skills.programmingLanguages, accentColor: '#fbbf24' },
    { icon: <FaGitAlt color="#f87171" />, title: 'Other Skills', items: skills.other, accentColor: '#f87171' },
  ];

  const coreSkills = [
    { name: 'React.js', level: 90 },
    { name: 'JavaScript ', level: 85 },
    { name: 'Node.js / Express', level: 80 },
    { name: 'Python / Django', level: 75 },
    { name: 'ASP.NET / C#', level: 70 },
    { name: 'HTML / CSS', level: 95 },
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="gradient-bg" />
      <div className="container">
        <motion.h2 className="section-title" {...fadeIn}>
          My <span className="accent-word">Skills</span>
        </motion.h2>

        <motion.div
          className="skills-bars-wrap"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <h3 className="skills-bars-title">Core Proficiency</h3>
          <div className="skills-bars">
            {coreSkills.map((s, i) => (
              <SkillsBar key={s.name} {...s} delay={i * 150} />
            ))}
          </div>
        </motion.div>

        <div className="skills-grid">
          {cards.map((c, i) => (
            <SkillCard key={c.title} {...c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

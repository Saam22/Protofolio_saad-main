import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';
import './Contact.css';

const Footer = () => (
  <motion.footer
    className="footer"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <div className="container">
      <div className="footer-top">
        <motion.div
          className="footer-brand"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3>SM<span>.</span></h3>
          <p>Full-Stack Web Developer</p>
        </motion.div>
        <motion.div
          className="footer-social"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {[
            { icon: <FaLinkedin />, href: `https://${portfolioData.personal.linkedin}`, label: 'LinkedIn' },
            { icon: <FaGithub />, href: portfolioData.personal.github, label: 'GitHub' },
            { icon: <FaEnvelope />, href: `mailto:${portfolioData.personal.email}`, label: 'Email' },
          ].map(({ icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="social-icon-rotate"
              whileHover={{ y: -6, borderColor: 'var(--bd-p)', color: 'var(--p)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 12 }}
            >
              {icon}
            </motion.a>
          ))}
        </motion.div>
      </div>
      <motion.div
        className="footer-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p>&copy; {new Date().getFullYear()} {portfolioData.personal.name} — Built with React &amp; passion</p>
      </motion.div>
    </div>
  </motion.footer>
);

export default Footer;

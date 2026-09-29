import React, { useState, useRef, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin, FaMapMarkerAlt, FaPaperPlane, FaSpinner, FaCopy, FaCheck } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';
import { fadeIn, fadeInLeft, fadeInRight, springHover, springRotate } from '../animations';
import { useToast } from '../hooks/useToast';
import './Contact.css';

const Contact = () => {
  const form = useRef();
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const { addToast } = useToast();

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: '', message: '' });
    emailjs
      .sendForm('service_8rqwlwo', 'template_6i8cg27', form.current, 'wjOB0eAAApcdj2E3b')
      .then(() => {
        setStatus({ type: 'success', message: "Message sent! I'll get back to you soon." });
        addToast('Message sent successfully! 🎉', 'success');
        form.current.reset();
      })
      .catch(() => {
        setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
        addToast('Failed to send message. Please try again.', 'error');
      })
      .finally(() => setSending(false));
  };

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(portfolioData.personal.email).then(() => {
      setCopied(true);
      addToast('Email copied to clipboard!', 'info');
      setTimeout(() => setCopied(false), 2000);
    });
  }, [addToast]);

  const items = [
    { icon: <FaEnvelope />, label: 'Email', value: portfolioData.personal.email, href: `mailto:${portfolioData.personal.email}`, copyable: true },
    { icon: <FaPhone />, label: 'Phone', value: portfolioData.personal.phone, href: `tel:${portfolioData.personal.phone}` },
    { icon: <FaLinkedin />, label: 'LinkedIn', value: 'View Profile', href: `https://${portfolioData.personal.linkedin}`, target: '_blank' },
    { icon: <FaMapMarkerAlt />, label: 'Location', value: portfolioData.personal.location, href: null },
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="gradient-bg" />
      <div className="container">
        <motion.h2 className="section-title" {...fadeIn}>
          Get In <span className="accent-word">Touch</span>
        </motion.h2>

        <div className="contact-grid">
          <motion.div className="contact-info" {...fadeInLeft}>
            <h3 className="contact-tagline">
              Let's build something <em>great</em> together
            </h3>
            <p className="contact-sub">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <div className="contact-items">
              {items.map((item) => {
                const inner = (
                  <>
                    <motion.div className="ci-icon" {...springRotate}>
                      {item.icon}
                    </motion.div>
                    <div className="ci-text">
                      <div className="ci-label">{item.label}</div>
                      <div className="ci-value">{item.value}</div>
                    </div>
                  </>
                );
                return item.href ? (
                  <motion.a key={item.label} href={item.href} target={item.target} rel="noopener noreferrer" className="contact-item" whileHover={{ x: 6 }} transition={{ duration: 0.2 }}>
                    {inner}
                  </motion.a>
                ) : (
                  <div key={item.label} className="contact-item">{inner}</div>
                );
              })}
            </div>
            <motion.button
              className="copy-email-btn"
              onClick={copyEmail}
              whileHover={{ scale: 1.02, borderColor: 'var(--bd-p)', color: 'var(--p)', background: 'var(--p-glow)' }}
              whileTap={{ scale: 0.98 }}
            >
              {copied ? (
                <><FaCheck /> Email Copied!</>
              ) : (
                <><FaCopy /> Copy Email Address</>
              )}
            </motion.button>
          </motion.div>

          <motion.div {...fadeInRight}>
            <form ref={form} onSubmit={sendEmail} className="contact-form glass">
              <div className="form-row">
                {['user_name', 'user_email'].map((name, i) => (
                  <motion.div key={name} className={`form-group${focusedField === name ? ' focused' : ''}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.1 }}>
                    <label className={`form-label${focusedField === name ? ' label-float' : ''}`}>{name === 'user_name' ? 'Name' : 'Email'}</label>
                    <input type={name === 'user_email' ? 'email' : 'text'} name={name} placeholder={name === 'user_name' ? 'Your name' : 'your@email.com'} required onFocus={() => setFocusedField(name)} onBlur={() => setFocusedField(null)} />
                  </motion.div>
                ))}
              </div>
              <motion.div className={`form-group${focusedField === 'subject' ? ' focused' : ''}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                <label className={`form-label${focusedField === 'subject' ? ' label-float' : ''}`}>Subject</label>
                <input type="text" name="subject" placeholder="What's this about?" onFocus={() => setFocusedField('subject')} onBlur={() => setFocusedField(null)} />
              </motion.div>
              <motion.div className={`form-group${focusedField === 'message' ? ' focused' : ''}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                <label className={`form-label${focusedField === 'message' ? ' label-float' : ''}`}>Message</label>
                <textarea name="message" placeholder="Tell me about your project..." rows="5" required onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)} />
              </motion.div>
              {status.message && (
                <motion.div className={`status-message ${status.type}`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
                  {status.message}
                </motion.div>
              )}
              <motion.button type="submit" className="btn-submit" disabled={sending} {...springHover}>
                {sending ? <><FaSpinner className="spinner" /> Sending...</> : <><FaPaperPlane /> Send Message</>}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

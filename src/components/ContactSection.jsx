import React, { useState, useEffect, useRef } from 'react';
import { Send, Mail, MapPin, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import '../styles/contactsection.scss';
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const [focusedField, setFocusedField] = useState('');
  const sectionRef = useRef(null);
  const formRef = useRef();

  const [formData, setFormData] = useState({
    from_name: '',
    reply_to: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      await emailjs.sendForm(
        '101002033389404077493', // Service ID
        'template_gn800zm',      // Template ID
        formRef.current,
        'jrZEuHWLKnhPVkVRu'      // Public key
      );
      setFormStatus('success');
      setFormData({ from_name: '', reply_to: '', subject: '', message: '' });
      setTimeout(() => setFormStatus(''), 3000);
    } catch (error) {
      console.error(error);
      setFormStatus('error');
      setTimeout(() => setFormStatus(''), 3000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'belhocine.arnold@gmail.com',
      href: 'mailto:belhocine.arnold@gmail.com'
    },
    {
      icon: MapPin,
      label: 'Localisation',
      value: 'France',
      href: null
    },
    {
      icon: Phone,
      label: 'Disponibilité',
      value: 'Lun - Ven, 9h - 18h',
      href: null
    }
  ];

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="contact-container">
        <div className={`contact-header ${isVisible ? 'header-visible' : ''}`}>
          <h2 className="contact-title">Discutons de votre projet</h2>
          <div className="contact-divider" />
          <p className="contact-subtitle">
            Vous avez un projet en tête ? N'hésitez pas à me contacter pour en discuter.
          </p>
        </div>

        <div className="contact-content">
          <div className={`contact-info ${isVisible ? 'info-visible' : ''}`}>
            <h3 className="info-title">Restons en contact</h3>
            <p className="info-description">
              Je suis toujours intéressé par de nouveaux défis et opportunités de collaboration.
            </p>
            <div className="info-items">
              {contactInfo.map((item, index) => (
                <div key={index} className="info-item" style={{ transitionDelay: `${index * 100}ms` }}>
                  <div className="info-icon"><item.icon size={20} /></div>
                  <div className="info-content">
                    <span className="info-label">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className="info-value info-link">{item.value}</a>
                    ) : (
                      <span className="info-value">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`contact-form-container ${isVisible ? 'form-visible' : ''}`}>
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="from_name" className={`form-label ${focusedField === 'from_name' || formData.from_name ? 'label-focused' : ''}`}>
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('from_name')}
                    onBlur={() => setFocusedField('')}
                    className="form-input"
                                        required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="reply_to" className={`form-label ${focusedField === 'reply_to' || formData.reply_to ? 'label-focused' : ''}`}>
                    Adresse email
                  </label>
                  <input
                    type="email"
                    id="reply_to"
                    name="reply_to"
                    value={formData.reply_to}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('reply_to')}
                    onBlur={() => setFocusedField('')}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject" className={`form-label ${focusedField === 'subject' || formData.subject ? 'label-focused' : ''}`}>
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField('')}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className={`form-label ${focusedField === 'message' || formData.message ? 'label-focused' : ''}`}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField('')}
                  className="form-textarea"
                  rows="5"
                  required
                />
              </div>

              <button type="submit" className={`form-submit ${formStatus}`} disabled={formStatus === 'sending'}>
                <span className="submit-text">
                  {formStatus === 'sending'
                    ? 'Envoi...'
                    : formStatus === 'success'
                    ? 'Envoyé !'
                    : formStatus === 'error'
                    ? 'Erreur'
                    : 'Envoyer le message'}
                </span>
                <div className="submit-icon">
                  {formStatus === 'success' ? (
                    <CheckCircle size={18} />
                  ) : formStatus === 'error' ? (
                    <AlertCircle size={18} />
                  ) : (
                    <Send size={18} />
                  )}
                </div>
                <div className="submit-background" />
              </button>

              {formStatus === 'success' && (
                <div className="form-message form-success">
                  Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.
                </div>
              )}

              {formStatus === 'error' && (
                <div className="form-message form-error">
                  Une erreur s'est produite. Veuillez réessayer ou me contacter directement par email.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <div className="contact-background" />
    </section>
  );
};

export default ContactSection;

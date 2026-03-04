import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaEnvelope, FaGithub, FaLinkedin, FaPaperPlane } from 'react-icons/fa';
import profile from '../data/profile';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        // For now, open a mailto link. Replace with Formspree / EmailJS later.
        const mailto = `mailto:${profile.email}?subject=Portfolio Contact from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.email}`;
        window.open(mailto, '_blank');
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <section id="contact" className="section">
            <Container>
                <p className="text-center text-muted-custom mono" data-aos="fade-up">
                    <FaEnvelope style={{ marginRight: 8 }} /> Contact
                </p>
                <h2 className="section-title text-center" data-aos="fade-up">
                    Get In Touch
                </h2>
                <p className="section-subtitle text-center" data-aos="fade-up">
                    Have a question or want to work together? Drop me a line.
                </p>

                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <div className="glass-card" data-aos="fade-up" style={{ cursor: 'default' }}>
                            <form onSubmit={handleSubmit} id="contact-form">
                                <div style={{ marginBottom: 16 }}>
                                    <label
                                        htmlFor="contact-name"
                                        style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6 }}
                                    >
                                        Name
                                    </label>
                                    <input
                                        id="contact-name"
                                        name="name"
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={handleChange}
                                        style={inputStyle}
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div style={{ marginBottom: 16 }}>
                                    <label
                                        htmlFor="contact-email"
                                        style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6 }}
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={handleChange}
                                        style={inputStyle}
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <div style={{ marginBottom: 20 }}>
                                    <label
                                        htmlFor="contact-message"
                                        style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6 }}
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        required
                                        rows={5}
                                        value={form.message}
                                        onChange={handleChange}
                                        style={{ ...inputStyle, resize: 'vertical' }}
                                        placeholder="Your message..."
                                    />
                                </div>
                                <button type="submit" className="btn-accent" style={{ width: '100%', justifyContent: 'center' }}>
                                    {submitted ? '✓ Sent!' : <><FaPaperPlane /> Send Message</>}
                                </button>
                            </form>
                        </div>

                        {/* Social links beneath */}
                        <div
                            className="text-center"
                            style={{ marginTop: 32 }}
                            data-aos="fade-up"
                            data-aos-delay="100"
                        >
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: 12 }}>
                                Or reach me on
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
                                <a href={profile.github} target="_blank" rel="noreferrer" className="contact-social-link">
                                    <FaGithub size={22} />
                                </a>
                                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-social-link">
                                    <FaLinkedin size={22} />
                                </a>
                                <a href={`mailto:${profile.email}`} className="contact-social-link">
                                    <FaEnvelope size={22} />
                                </a>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 10,
    border: '1px solid var(--glass-border)',
    background: 'rgba(255,255,255,0.03)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
};

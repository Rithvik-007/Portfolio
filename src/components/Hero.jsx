import { useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt, FaGamepad } from 'react-icons/fa';
import profile from '../data/profile';
import './Hero.css';

export default function Hero() {
    const typingRef = useRef(null);

    useEffect(() => {
        const roles = ['Software Developer', 'ML Engineer', 'Full-Stack Builder', 'Problem Solver'];
        let roleIdx = 0;
        let charIdx = 0;
        let deleting = false;
        let timeout;

        function tick() {
            const current = roles[roleIdx];
            if (!deleting) {
                charIdx++;
                if (typingRef.current)
                    typingRef.current.textContent = current.slice(0, charIdx);
                if (charIdx === current.length) {
                    deleting = true;
                    timeout = setTimeout(tick, 1800);
                    return;
                }
                timeout = setTimeout(tick, 90);
            } else {
                charIdx--;
                if (typingRef.current)
                    typingRef.current.textContent = current.slice(0, charIdx);
                if (charIdx === 0) {
                    deleting = false;
                    roleIdx = (roleIdx + 1) % roles.length;
                    timeout = setTimeout(tick, 400);
                    return;
                }
                timeout = setTimeout(tick, 45);
            }
        }

        tick();
        return () => clearTimeout(timeout);
    }, []);

    return (
        <section id="hero" className="hero-section">
            {/* Animated gradient blobs */}
            <div className="hero-blob hero-blob-1" />
            <div className="hero-blob hero-blob-2" />
            <div className="hero-blob hero-blob-3" />

            <Container className="hero-container">
                <Row className="align-items-center justify-content-center" style={{ minHeight: '100vh', paddingTop: 60 }}>
                    {/* ─── Left: Main hero content ─── */}
                    <Col lg={7} className="text-center text-lg-start">
                        <p className="hero-greeting" data-aos="fade-down">Hello, I'm</p>
                        <h1 className="hero-name" data-aos="fade-up" data-aos-delay="100">
                            {profile.name}
                        </h1>
                        <div className="hero-typing-wrap" data-aos="fade-up" data-aos-delay="200">
                            <span className="mono hero-typing-prefix">{'> '}</span>
                            <span ref={typingRef} className="mono hero-typing-text"></span>
                            <span className="hero-cursor">|</span>
                        </div>
                        <p className="hero-bio" data-aos="fade-up" data-aos-delay="300">
                            {profile.bio}
                        </p>

                        {/* Skill chips */}
                        <div className="hero-skills" data-aos="fade-up" data-aos-delay="400">
                            {profile.skills.map((s) => (
                                <span key={s} className="skill-tag">{s}</span>
                            ))}
                        </div>

                        {/* CTA + Social */}
                        <div className="hero-actions" data-aos="fade-up" data-aos-delay="500">
                            <a href={profile.resumeUrl} className="btn-accent" target="_blank" rel="noreferrer">
                                <FaFileAlt /> Resume
                            </a>
                            <a href="#contact" className="btn-outline"
                                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                                <FaEnvelope /> Contact
                            </a>
                        </div>
                        <div className="hero-socials" data-aos="fade-up" data-aos-delay="600">
                            <a href={profile.github} target="_blank" rel="noreferrer"><FaGithub /></a>
                            <a href={profile.linkedin} target="_blank" rel="noreferrer"><FaLinkedin /></a>
                            <a href={`mailto:${profile.email}`}><FaEnvelope /></a>
                        </div>
                    </Col>

                    {/* ─── Right: About Me side card ─── */}
                    {profile.aboutMe && (
                        <Col lg={4} className="d-none d-lg-block" data-aos="fade-left" data-aos-delay="400">
                            <div className="hero-about-card">
                                <h4 className="hero-about-title">
                                    <span className="hero-about-emoji">⚡</span> Beyond the Code
                                </h4>
                                <p className="hero-about-story">{profile.aboutMe.story}</p>

                                <div className="hero-about-divider" />

                                <div className="hero-about-row">
                                    <span className="hero-about-label">Hobbies</span>
                                    <div className="hero-about-chips">
                                        <span className="hero-about-chip"><FaGamepad /> Video Games</span>
                                    </div>
                                </div>

                                <div className="hero-about-row">
                                    <span className="hero-about-label">Soft Skills</span>
                                    <div className="hero-about-chips">
                                        {profile.aboutMe.transferableSkills.map((s) => (
                                            <span key={s} className="hero-about-skill">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    )}
                </Row>
            </Container>
        </section>
    );
}

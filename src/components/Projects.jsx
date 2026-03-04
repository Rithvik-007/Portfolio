import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaCode, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import profile from '../data/profile';
import DetailModal from './DetailModal';

export default function Projects() {
    const [selected, setSelected] = useState(null);

    return (
        <section id="projects" className="section">
            <Container>
                <p className="text-center text-muted-custom mono" data-aos="fade-up">
                    <FaCode style={{ marginRight: 8 }} /> Projects
                </p>
                <h2 className="section-title text-center" data-aos="fade-up">
                    Featured Projects
                </h2>
                <p className="section-subtitle text-center" data-aos="fade-up">
                    Highlight reel of things I've built
                </p>

                <Row className="g-4">
                    {profile.projects.map((p, i) => (
                        <Col md={6} key={p.id}>
                            <div
                                className="glass-card h-100"
                                data-aos="fade-up"
                                data-aos-delay={i * 100}
                                onClick={() => setSelected(p)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && setSelected(p)}
                                id={`project-card-${p.id}`}
                            >
                                <h5 style={{ fontWeight: 700, marginBottom: 8 }}>{p.title}</h5>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: 16 }}>
                                    {p.shortDesc}
                                </p>
                                <div style={{ marginBottom: 16 }}>
                                    {p.tech.map((t) => (
                                        <span key={t} className="tech-tag">{t}</span>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                                    {p.github && p.github !== '#' && (
                                        <a
                                            href={p.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', transition: 'color 0.2s' }}
                                            onMouseEnter={(e) => (e.target.style.color = 'var(--accent)')}
                                            onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
                                        >
                                            <FaGithub />
                                        </a>
                                    )}
                                    {p.demo && p.demo !== '#' && (
                                        <a
                                            href={p.demo}
                                            target="_blank"
                                            rel="noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', transition: 'color 0.2s' }}
                                            onMouseEnter={(e) => (e.target.style.color = 'var(--accent)')}
                                            onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
                                        >
                                            <FaExternalLinkAlt />
                                        </a>
                                    )}
                                    <span style={{ marginLeft: 'auto', color: 'var(--accent)', fontSize: '0.78rem', fontWeight: 500 }}>
                                        Click for details →
                                    </span>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>

            <DetailModal
                show={!!selected}
                onHide={() => setSelected(null)}
                title={selected?.title}
                data={selected}
            />

            {/* Floating GitHub Bubble */}
            <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="floating-github-bubble"
                onClick={(e) => e.stopPropagation()}
            >
                <FaGithub style={{ fontSize: '1.2rem' }} />
                <span>Wanna see more like this? 🚀</span>
            </a>
        </section>
    );
}

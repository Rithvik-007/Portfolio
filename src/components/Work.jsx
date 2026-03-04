import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa';
import profile from '../data/profile';
import DetailModal from './DetailModal';

export default function Work() {
    const [selected, setSelected] = useState(null);

    return (
        <section id="work" className="section">
            <Container>
                <p className="text-center text-muted-custom mono" data-aos="fade-up">
                    <FaBriefcase style={{ marginRight: 8 }} /> Experience
                </p>
                <h2 className="section-title text-center" data-aos="fade-up">
                    Work Experience
                </h2>
                <p className="section-subtitle text-center" data-aos="fade-up">
                    Where I've contributed and grown as an engineer
                </p>

                <Row className="g-4">
                    {profile.work.map((w, i) => (
                        <Col md={6} lg={4} key={w.id}>
                            <div
                                className="glass-card h-100"
                                data-aos="fade-up"
                                data-aos-delay={i * 100}
                                onClick={() => setSelected(w)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && setSelected(w)}
                                id={`work-card-${w.id}`}
                            >
                                <h5 style={{ fontWeight: 700, marginBottom: 4 }}>{w.role}</h5>
                                <p style={{ color: 'var(--accent)', fontWeight: 500, fontSize: '0.92rem', marginBottom: 4 }}>
                                    {w.company}
                                </p>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: 12 }}>
                                    <FaMapMarkerAlt style={{ marginRight: 4 }} />{w.location} &middot; {w.duration}
                                </p>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 16 }}>
                                    {w.shortDesc}
                                </p>
                                <div>
                                    {w.tech.slice(0, 3).map((t) => (
                                        <span key={t} className="tech-tag">{t}</span>
                                    ))}
                                    {w.tech.length > 3 && <span className="tech-tag">+{w.tech.length - 3}</span>}
                                </div>
                                <p style={{ color: 'var(--accent)', fontSize: '0.78rem', marginTop: 14, fontWeight: 500 }}>
                                    Click for details →
                                </p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>

            <DetailModal
                show={!!selected}
                onHide={() => setSelected(null)}
                title={selected?.role}
                data={selected}
            />
        </section>
    );
}

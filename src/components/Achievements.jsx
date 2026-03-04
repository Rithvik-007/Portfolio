import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaTrophy } from 'react-icons/fa';
import profile from '../data/profile';
import DetailModal from './DetailModal';

export default function Achievements() {
    const [selected, setSelected] = useState(null);

    return (
        <section id="achievements" className="section">
            <Container>
                <p className="text-center text-muted-custom mono" data-aos="fade-up">
                    <FaTrophy style={{ marginRight: 8 }} /> Achievements
                </p>
                <h2 className="section-title text-center" data-aos="fade-up">
                    Achievements & Certifications
                </h2>
                <p className="section-subtitle text-center" data-aos="fade-up">
                    Milestones along the way
                </p>

                <Row className="g-4 justify-content-center">
                    {profile.achievements.map((a, i) => (
                        <Col md={6} lg={3} key={a.id}>
                            <div
                                className="glass-card text-center h-100"
                                data-aos="zoom-in"
                                data-aos-delay={i * 100}
                                onClick={() => setSelected(a)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && setSelected(a)}
                                id={`achievement-card-${a.id}`}
                            >
                                <div
                                    style={{
                                        width: 52,
                                        height: 52,
                                        borderRadius: '50%',
                                        background: 'var(--accent-gradient)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 16px',
                                        fontSize: '1.3rem',
                                        color: '#fff',
                                    }}
                                >
                                    <FaTrophy />
                                </div>
                                <h6 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 8 }}>
                                    {a.title}
                                </h6>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.6 }}>
                                    {a.description}
                                </p>
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
        </section>
    );
}

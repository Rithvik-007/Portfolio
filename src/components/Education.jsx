import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaGraduationCap } from 'react-icons/fa';
import profile from '../data/profile';
import './Education.css';

export default function Education() {
    return (
        <section id="education" className="section">
            <Container>
                <p className="text-center text-muted-custom mono" data-aos="fade-up">
                    <FaGraduationCap style={{ marginRight: 8 }} /> Education
                </p>
                <h2 className="section-title text-center" data-aos="fade-up">
                    Education
                </h2>
                <p className="section-subtitle text-center" data-aos="fade-up">
                    Academic background and relevant coursework
                </p>

                <div className="edu-timeline">
                    {profile.education.map((edu, i) => (
                        <div
                            className="edu-timeline-item"
                            key={i}
                            data-aos="fade-up"
                            data-aos-delay={i * 150}
                        >
                            <div className="edu-timeline-dot" />
                            <div className="glass-card edu-card" style={{ cursor: 'default' }}>
                                <Row className="align-items-start">
                                    <Col>
                                        <h5 style={{ fontWeight: 700, marginBottom: 4 }}>{edu.degree}</h5>
                                        <p style={{ color: 'var(--accent)', fontWeight: 500, marginBottom: 4 }}>
                                            {edu.school}
                                        </p>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 4 }}>
                                            {edu.duration}
                                        </p>
                                        {edu.gpa && (
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: 12 }}>
                                                GPA: <strong style={{ color: 'var(--text-primary)' }}>{edu.gpa}</strong>
                                            </p>
                                        )}
                                        <div>
                                            {edu.coursework.map((c) => (
                                                <span key={c} className="tech-tag">{c}</span>
                                            ))}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

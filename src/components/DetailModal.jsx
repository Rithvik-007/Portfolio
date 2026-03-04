import Modal from 'react-bootstrap/Modal';

export default function DetailModal({ show, onHide, title, data }) {
    if (!data) return null;

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title style={{ fontWeight: 700 }}>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {data.role && (
                    <p style={{ color: 'var(--accent)', fontWeight: 600, marginBottom: 2 }}>
                        {data.role}
                    </p>
                )}
                {data.company && (
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 4 }}>
                        {data.company} &middot; {data.duration}
                    </p>
                )}
                {data.location && (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: 16 }}>
                        {data.location}
                    </p>
                )}

                {data.description && (
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
                        {data.description}
                    </p>
                )}

                {data.details && (
                    <ul style={{ paddingLeft: 20, marginBottom: 20 }}>
                        {data.details.map((d, i) => (
                            <li key={i} style={{ color: 'var(--text-secondary)', marginBottom: 8, lineHeight: 1.7 }}>
                                {d}
                            </li>
                        ))}
                    </ul>
                )}

                {data.tech && (
                    <div style={{ marginBottom: 16 }}>
                        {data.tech.map((t) => (
                            <span key={t} className="tech-tag">{t}</span>
                        ))}
                    </div>
                )}

                {(data.github || data.demo) && (
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        {data.github && data.github !== '#' && (
                            <a href={data.github} className="btn-outline" target="_blank" rel="noreferrer" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                                GitHub
                            </a>
                        )}
                        {data.demo && data.demo !== '#' && (
                            <a href={data.demo} className="btn-accent" target="_blank" rel="noreferrer" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                                Live Demo
                            </a>
                        )}
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
}

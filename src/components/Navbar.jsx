import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { HiMenu } from 'react-icons/hi';
import { useState } from 'react';

export default function NavbarComponent({ sections = [], activeIndex = 0, onNavigate }) {
    const [expanded, setExpanded] = useState(false);

    const handleClick = (idx) => {
        setExpanded(false);
        onNavigate?.(idx);
    };

    return (
        <Navbar
            expand="lg"
            fixed="top"
            expanded={expanded}
            onToggle={() => setExpanded(!expanded)}
            style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.4)' }}
        >
            <Container className="justify-content-center">
                <Navbar.Toggle aria-controls="main-nav">
                    <HiMenu color="var(--accent)" size={26} />
                </Navbar.Toggle>
                <Navbar.Collapse id="main-nav">
                    <Nav className="mx-auto">
                        {sections.map((s, i) => (
                            <Nav.Link
                                key={s.id}
                                className={activeIndex === i ? 'active' : ''}
                                onClick={() => handleClick(i)}
                            >
                                {s.label}
                            </Nav.Link>
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

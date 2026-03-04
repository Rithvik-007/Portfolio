import { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import GameBackground from './components/GameBackground';
import NavbarComponent from './components/Navbar';
import Hero from './components/Hero';
import Work from './components/Work';
import Education from './components/Education';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import './App.css';

const SECTIONS = [
  { id: 'hero', label: 'Home', icon: '🏠' },
  { id: 'work', label: 'Work', icon: '💼' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'achievements', label: 'Achievements', icon: '🏆' },
  { id: 'contact', label: 'Contact', icon: '✉️' },
];

export default function App() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 40 });
  }, []);

  // Smooth snap-scroll: wheel/keyboard → jump one panel at a time
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    let isScrolling = false;
    let currentIdx = 0;

    const goTo = (idx) => {
      const clamped = Math.max(0, Math.min(idx, SECTIONS.length - 1));
      if (clamped === currentIdx && isScrolling) return;
      currentIdx = clamped;
      isScrolling = true;
      const panelWidth = window.innerWidth;
      container.scrollTo({ left: clamped * panelWidth, behavior: 'smooth' });
      // Unlock after animation completes
      setTimeout(() => { isScrolling = false; }, 600);
    };

    const onWheel = (e) => {
      e.preventDefault();
      if (isScrolling) return;
      if (Math.abs(e.deltaY) < 15) return; // ignore tiny scroll
      if (e.deltaY > 0) {
        goTo(currentIdx + 1);
      } else {
        goTo(currentIdx - 1);
      }
    };

    const onKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goTo(currentIdx + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goTo(currentIdx - 1);
      }
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      container.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onScroll = () => {
      const scrollLeft = container.scrollLeft;
      const panelWidth = window.innerWidth;
      const idx = Math.round(scrollLeft / panelWidth);
      setActiveIndex(Math.max(0, Math.min(idx, SECTIONS.length - 1)));

      // Dispatch custom event for GameBackground parallax
      window.dispatchEvent(new CustomEvent('hscroll', { detail: { scrollLeft } }));
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (index) => {
    const container = scrollRef.current;
    if (!container) return;
    const panelWidth = window.innerWidth;
    container.scrollTo({ left: index * panelWidth, behavior: 'smooth' });
  };

  return (
    <>
      <GameBackground />
      <NavbarComponent
        sections={SECTIONS}
        activeIndex={activeIndex}
        onNavigate={scrollToSection}
      />

      {/* Progress bar */}
      <div className="h-progress-track">
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            className={`h-progress-dot ${i === activeIndex ? 'active' : ''} ${i < activeIndex ? 'passed' : ''}`}
            onClick={() => scrollToSection(i)}
            title={s.label}
          >
            <span className="h-progress-label">{s.label}</span>
          </button>
        ))}
        <div
          className="h-progress-fill"
          style={{ width: `${(activeIndex / (SECTIONS.length - 1)) * 100}%` }}
        />
      </div>

      {/* Horizontal scroll container */}
      <div className="h-scroll-container" ref={scrollRef}>
        <div className="h-scroll-track">
          <div className="h-panel" id="hero"><Hero /></div>
          <div className="h-panel" id="work"><Work /></div>
          <div className="h-panel" id="education"><Education /></div>
          <div className="h-panel" id="projects"><Projects /></div>
          <div className="h-panel" id="achievements"><Achievements /></div>
          <div className="h-panel" id="contact"><Contact /></div>
        </div>
      </div>
    </>
  );
}

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

  // Shared across every entry point (wheel, keyboard, navbar, progress dots)
  // so they can't race each other with stale local state.
  const currentIndexRef = useRef(0);
  const isScrollingRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const isMobileRef = useRef(false);
  const goToRef = useRef(() => {});

  // Below 768px, App.css falls back to a normal vertical stack (no
  // horizontal scroll to drive) — see the mobile responsive block there.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => { isMobileRef.current = mq.matches; };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    reducedMotionRef.current = prefersReducedMotion;
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 40, disable: prefersReducedMotion });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const goTo = (idx) => {
      const clamped = Math.max(0, Math.min(idx, SECTIONS.length - 1));
      currentIndexRef.current = clamped;
      setActiveIndex(clamped);

      const behavior = reducedMotionRef.current ? 'auto' : 'smooth';
      if (isMobileRef.current) {
        // No horizontal scroll to drive in the mobile stacked layout —
        // jump to the section's normal document position instead.
        document.getElementById(SECTIONS[clamped].id)?.scrollIntoView({ behavior, block: 'start' });
        return;
      }
      isScrollingRef.current = true;
      container.scrollTo({ left: clamped * window.innerWidth, behavior });
    };
    // Exposed via ref so click handlers (navbar, progress dots) can reuse
    // the exact same locked navigation path as wheel/keyboard.
    goToRef.current = goTo;

    const onWheel = (e) => {
      e.preventDefault();
      if (isScrollingRef.current) return;
      if (Math.abs(e.deltaY) < 15) return; // ignore tiny scroll
      goTo(currentIndexRef.current + (e.deltaY > 0 ? 1 : -1));
    };

    const onKeyDown = (e) => {
      const el = document.activeElement;
      const isTyping = el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
      if (isTyping) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goTo(currentIndexRef.current + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goTo(currentIndexRef.current - 1);
      }
    };

    // Reconciles activeIndex/lock after any scroll settles, including ones
    // not initiated through goTo (e.g. a raw touch swipe or scrollbar drag).
    const onScrollEnd = () => {
      isScrollingRef.current = false;
      const idx = Math.round(container.scrollLeft / window.innerWidth);
      const clamped = Math.max(0, Math.min(idx, SECTIONS.length - 1));
      currentIndexRef.current = clamped;
      setActiveIndex(clamped);
    };

    // Parallax needs continuous scroll position, independent of section tracking.
    const onScroll = () => {
      window.dispatchEvent(new CustomEvent('hscroll', { detail: { scrollLeft: container.scrollLeft } }));
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('scrollend', onScrollEnd);
    container.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('scrollend', onScrollEnd);
      container.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const scrollToSection = (index) => goToRef.current(index);

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

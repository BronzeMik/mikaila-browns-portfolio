'use client';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import {AnimatePresence, motion} from 'motion/react';
import {ArrowUpRight, Menu, X} from 'lucide-react';
import logo from '../public/images/logo.png';
import {Magnetic, ScrollProgress} from './ui';

const links = [
  {id: 'home', label: 'Home'},
  {id: 'services', label: 'Services'},
  {id: 'projects', label: 'Projects'},
  {id: 'demos', label: 'Demos'},
  {id: 'about', label: 'About'},
  {id: 'credentials', label: 'Experience'},
  {id: 'contact', label: 'Contact'}
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // Active-section indicator: the section crossing the middle of the viewport wins.
  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      {rootMargin: '-45% 0px -50% 0px'}
    );
    sections.forEach((s) => io.observe(s));
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => {io.disconnect(); window.removeEventListener('scroll', onScroll);};
  }, []);

  // Lock page scroll and allow Escape to close while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {document.body.style.overflow = prev; window.removeEventListener('keydown', onKey);};
  }, [open]);

  return (
    <>
      <ScrollProgress />
      <header className={'site-header' + (scrolled || open ? ' is-solid' : '')}>
        <div className="nav-shell">
          <a href="#home" className="brand" aria-label="Mikaila Brown — home" onClick={() => setOpen(false)}>
            <Image src={logo} alt="MB — Mikaila Brown" height={64} priority />
          </a>
          <nav className="nav-links" aria-label="Main navigation">
            {links.slice(0, -1).map((l) => (
              <a key={l.id} href={'#' + l.id} className={active === l.id ? 'active' : ''} aria-current={active === l.id ? 'true' : undefined}>
                {l.label}
                {active === l.id && <motion.i layoutId="nav-dot" className="nav-dot" />}
              </a>
            ))}
          </nav>
          <div className="nav-right">
            <Magnetic strength={0.2}>
              <a href="#contact" className="nav-cta">Let’s talk <ArrowUpRight size={16} /></a>
            </Magnetic>
            <button className="menu-toggle" onClick={() => setOpen((v) => !v)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu">
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu"
            initial={{clipPath: 'circle(0% at calc(100% - 36px) 36px)'}} animate={{clipPath: 'circle(150% at calc(100% - 36px) 36px)'}}
            exit={{clipPath: 'circle(0% at calc(100% - 36px) 36px)'}} transition={{duration: 0.55, ease: [0.7, 0, 0.2, 1]}}>
            <nav aria-label="Mobile navigation">
              {links.map((l, i) => (
                <motion.a key={l.id} href={'#' + l.id} className={active === l.id ? 'active' : ''} onClick={() => setOpen(false)}
                  initial={{opacity: 0, y: 28}} animate={{opacity: 1, y: 0}} transition={{delay: 0.15 + i * 0.05, duration: 0.5}}>
                  <small>{String(i + 1).padStart(2, '0')}</small>
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <p className="mobile-menu-note">Independent technology specialist — AI, automation, software &amp; security.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

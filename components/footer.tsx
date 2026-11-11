import Image from 'next/image';
import {Github} from 'lucide-react';
import logo from '../public/images/logo.png';

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <a href="#home" className="brand" aria-label="Back to top"><Image src={logo} alt="MB — Mikaila Brown" height={56} /></a>
        <p>Practical AI, automation, software and secure technology for growing businesses.</p>
        <div className="footer-links">
          <a href="https://github.com/MikailaBrownTech" target="_blank" rel="noopener noreferrer" aria-label="Mikaila Brown on GitHub (opens in a new tab)"><Github size={20} /></a>
          <a href="#home">Back to top ↑</a>
        </div>
        <small>© {new Date().getFullYear()} Mikaila Brown</small>
      </div>
    </footer>
  );
}

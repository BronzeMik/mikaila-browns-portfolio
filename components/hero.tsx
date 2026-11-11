'use client';
import {useRef, useState} from 'react';
import {motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform} from 'motion/react';
import {ArrowDown, ArrowUpRight, BrainCircuit, Cloud, Database, Mail, ShieldCheck, Workflow} from 'lucide-react';
import {Magnetic, SplitHeading} from './ui';

const nodes = [
  {id: 'ai', label: 'AI assistants', hint: 'Turn messy information into answers', x: 300, y: 70, Icon: BrainCircuit, color: '#8B5CF6'},
  {id: 'mail', label: 'Everyday tools', hint: 'Email, calendars & chat stay in sync', x: 500, y: 170, Icon: Mail, color: '#EC4899'},
  {id: 'cloud', label: 'Cloud', hint: 'Reliable foundations that scale', x: 490, y: 380, Icon: Cloud, color: '#22D3EE'},
  {id: 'data', label: 'Your data', hint: 'One trusted source of truth', x: 300, y: 450, Icon: Database, color: '#C4B5FD'},
  {id: 'shield', label: 'Security', hint: 'Protected by design', x: 110, y: 380, Icon: ShieldCheck, color: '#22D3EE'},
  {id: 'flow', label: 'Automations', hint: 'Repetitive work runs itself', x: 100, y: 170, Icon: Workflow, color: '#EC4899'}
];
const HUB = {x: 300, y: 260};

function SystemsGraph() {
  const [hot, setHot] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, {stiffness: 90, damping: 20});
  const smy = useSpring(my, {stiffness: 90, damping: 20});
  const rotY = useTransform(smx, [-0.5, 0.5], [-9, 9]);
  const rotX = useTransform(smy, [-0.5, 0.5], [7, -7]);
  const backX = useTransform(smx, [-0.5, 0.5], [14, -14]);
  const backY = useTransform(smy, [-0.5, 0.5], [14, -14]);
  const frontX = useTransform(smx, [-0.5, 0.5], [-10, 10]);
  const frontY = useTransform(smy, [-0.5, 0.5], [-10, 10]);
  const active = nodes.find((n) => n.id === hot);

  return (
    <div className="graph" onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {mx.set(0); my.set(0); setHot(null);}}>
      <motion.div className="graph-stage" style={{rotateY: rotY, rotateX: rotX}}>
        <motion.div className="graph-back" style={{x: backX, y: backY}} aria-hidden="true">
          <i className="blob b1" /><i className="blob b2" />
          <svg viewBox="0 0 600 520"><circle cx="300" cy="260" r="215" className="ring" /><circle cx="300" cy="260" r="150" className="ring ring-2" /></svg>
        </motion.div>
        <motion.svg className="graph-svg" viewBox="0 0 600 520" role="group" aria-label="Interactive diagram: your tools, data, AI and security connected around one hub" style={{x: frontX, y: frontY}}>
          <defs>
            <linearGradient id="hubGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8B5CF6" /><stop offset="1" stopColor="#EC4899" /></linearGradient>
            <radialGradient id="hubGlow"><stop offset="0.55" stopColor="#8B5CF6" stopOpacity="0.55" /><stop offset="1" stopColor="#8B5CF6" stopOpacity="0" /></radialGradient>
          </defs>
          {nodes.map((n) => (
            <line key={n.id} x1={HUB.x} y1={HUB.y} x2={n.x} y2={n.y} className={'link' + (hot === n.id ? ' hot' : '')} stroke={hot === n.id ? n.color : undefined} />
          ))}
          <circle cx={HUB.x} cy={HUB.y} r="90" fill="url(#hubGlow)" />
          <circle cx={HUB.x} cy={HUB.y} r="50" fill="url(#hubGrad)" />
          <text x={HUB.x} y={HUB.y + 11} textAnchor="middle" className="hub-text">MB</text>
          {nodes.map((n) => (
            <g key={n.id} className="node" tabIndex={0} role="button" aria-label={`${n.label}: ${n.hint}`}
              onPointerEnter={() => setHot(n.id)} onFocus={() => setHot(n.id)} onBlur={() => setHot(null)}
              onClick={() => setHot((h) => (h === n.id ? null : n.id))}>
              <circle cx={n.x} cy={n.y} r={hot === n.id ? 40 : 33} className="node-bg" stroke={n.color} />
              <n.Icon x={n.x - 14} y={n.y - 14} width={28} height={28} color={n.color} strokeWidth={1.7} />
              <text x={n.x} y={n.y + (n.y > 260 ? 58 : -48)} textAnchor="middle" className="node-label">{n.label}</text>
            </g>
          ))}
        </motion.svg>
      </motion.div>
      <p className="graph-caption" aria-live="polite">
        <span className="dot" />{active ? active.hint : 'Hover or tap a node — everything connects to one hub'}
      </p>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const {scrollYProgress} = useScroll({target: ref, offset: ['start start', 'end start']});
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  const reduce = useReducedMotion();

  return (
    <section className="hero" id="home" ref={ref}>
      <div className="hero-bg" aria-hidden="true"><i className="orb o1" /><i className="orb o2" /><i className="orb o3" /><i className="grain" /></div>
      <div className="shell hero-grid">
        <motion.div className="hero-copy" style={reduce ? undefined : {y: textY, opacity: fade}}>
          <motion.p className="eyebrow" initial={{opacity: 0, y: 14}} animate={{opacity: 1, y: 0}} transition={{duration: 0.7}}>
            <span className="pulse" /> Mikaila Brown · Technology consultant
          </motion.p>
          <SplitHeading as="h1" className="hero-title" immediate delay={0.15} text={'Technology that\nmakes work\n*feel lighter.*'} />
          <motion.p className="hero-lede" initial={{opacity: 0, y: 18}} animate={{opacity: 1, y: 0}} transition={{duration: 0.8, delay: 0.9}}>
            I help business owners cut repetitive work, connect the tools they already use, and build secure systems — no technical background needed.
          </motion.p>
          <motion.div className="hero-actions" initial={{opacity: 0, y: 18}} animate={{opacity: 1, y: 0}} transition={{duration: 0.8, delay: 1.05}}>
            <Magnetic><a href="#contact" className="btn btn-primary">Let’s Work Together <ArrowUpRight size={18} /></a></Magnetic>
            <Magnetic><a href="#projects" className="btn btn-ghost">Explore My Work <ArrowDown size={18} /></a></Magnetic>
          </motion.div>
          <motion.ul className="hero-chips" aria-label="What I help with" initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 1.3, duration: 0.8}}>
            {['AI & automation', 'Custom software', 'Cloud & infrastructure', 'Cybersecurity', 'IT consulting'].map((c) => <li key={c}>{c}</li>)}
          </motion.ul>
        </motion.div>
        <motion.div className="hero-scene" style={reduce ? undefined : {y: sceneY}} initial={{opacity: 0, scale: 0.94}} animate={{opacity: 1, scale: 1}} transition={{duration: 1.1, delay: 0.3, ease: [0.2, 0.7, 0.2, 1]}}>
          <SystemsGraph />
        </motion.div>
      </div>
      <a className="scroll-cue" href="#services" aria-label="Scroll to services"><span>Scroll</span><i /></a>
    </section>
  );
}

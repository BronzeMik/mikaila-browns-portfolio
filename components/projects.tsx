'use client';
import {useRef} from 'react';
import {motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform} from 'motion/react';
import {ArrowUpRight, Check, Github, Lock, Search} from 'lucide-react';
import {projects, type Project} from '@/lib/data';
import {Reveal, SplitHeading} from './ui';

/* ---------- Concept visualizations (illustrative mockups, not screenshots) ---------- */
function ResumeVisual() {
  return (
    <div className="mock mock-resume">
      <div className="mock-doc"><i className="avatar" /><b /><b className="s" />{[80, 95, 60, 88, 70].map((w, i) => <u key={i} style={{width: w + '%'}} />)}</div>
      <div className="mock-panel">
        <span className="mock-label">Candidate summary</span>
        {[['Skills match', 82], ['Experience fit', 68], ['Role clarity', 90]].map(([l, v]) => (
          <div className="bar" key={l}><span>{l}</span><i><em style={{'--w': v + '%'} as React.CSSProperties} /></i></div>
        ))}
        <div className="chips"><span>Strengths</span><span>Questions to ask</span></div>
      </div>
    </div>
  );
}
function OnboardingVisual() {
  const steps = ['Request received', 'Accounts created', 'Access assigned', 'Welcome sent'];
  return (
    <div className="mock mock-onboard">
      <span className="mock-label">New hire workflow</span>
      <ol>{steps.map((s, i) => <li key={s} style={{animationDelay: `${i * 0.35}s`}}><span className="tick"><Check size={14} /></span>{s}</li>)}</ol>
      <div className="mock-line" />
    </div>
  );
}
function ShipNoteVisual() {
  return (
    <div className="mock mock-ship">
      <div className="commit"><span className="mock-label">Project activity</span><code>feat: add dashboard filters</code><code>fix: faster page load</code></div>
      <div className="arrow" aria-hidden="true">→</div>
      <div className="post"><span className="mock-label">Draft post</span><u /><u style={{width: '82%'}} /><u style={{width: '58%'}} /><div className="chips"><span>Ready to review</span></div></div>
    </div>
  );
}
function FixItVisual() {
  return (
    <div className="mock mock-fix">
      <div className="search"><Search size={16} /> Why won’t my dishwasher drain?</div>
      {['Service manual — drain pump section', 'Troubleshooting article — clogged filter', 'Parts guide — drain hose'].map((r, i) => <div className="result" key={r} style={{animationDelay: `${i * 0.25}s`}}><i />{r}</div>)}
    </div>
  );
}
function LeadsVisual() {
  return (
    <div className="mock mock-leads">
      <div className="table">
        {[['Company A', 'Strong fit', 'hi'], ['Company B', 'Possible fit', 'mid'], ['Company C', 'Needs research', 'lo']].map(([n, s, c]) => <div key={n} className="row"><span>{n}</span><em className={c}>{s}</em></div>)}
      </div>
      <div className="draft"><span className="mock-label">Outreach draft · for human review</span><u /><u style={{width: '84%'}} /><u style={{width: '64%'}} /></div>
    </div>
  );
}
const visuals = {resume: ResumeVisual, onboarding: OnboardingVisual, shipnote: ShipNoteVisual, fixit: FixItVisual, leads: LeadsVisual} as const;

/* ---------- One project: perspective tilt + parallax depth ---------- */
function ProjectRow({p, i}: {p: Project; i: number}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const Visual = visuals[p.slug];
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, {stiffness: 140, damping: 18});
  const smy = useSpring(my, {stiffness: 140, damping: 18});
  const rotY = useTransform(smx, [-0.5, 0.5], [-10, 10]);
  const rotX = useTransform(smy, [-0.5, 0.5], [8, -8]);
  const {scrollYProgress} = useScroll({target: ref, offset: ['start end', 'end start']});
  const driftSlow = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <article ref={ref} className={`project layout-${i + 1} theme-${p.slug}`} id={'project-' + p.slug}>
      <motion.div className="project-visual" style={reduce ? undefined : {y: driftSlow}}
        initial={{opacity: 0, y: 60, scale: 0.96}} whileInView={{opacity: 1, y: 0, scale: 1}} viewport={{once: true, margin: '0px 0px -10% 0px'}} transition={{duration: 0.9, ease: [0.2, 0.7, 0.2, 1]}}
        onPointerMove={(e) => {
          if (reduce || e.pointerType !== 'mouse') return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => {mx.set(0); my.set(0);}}>
        <motion.div className="project-tilt" style={reduce ? undefined : {rotateY: rotY, rotateX: rotX}}>
          <div className="project-glow" aria-hidden="true" />
          <div className="project-window">
            <div className="window-bar"><i /><i /><i /><span>{p.slug}.app</span></div>
            <div className="window-body"><Visual /></div>
          </div>
          <span className="project-badge">{p.status}</span>
        </motion.div>
        <p className="concept-note">Concept visualization — not a screenshot</p>
      </motion.div>
      <div className="project-copy">
        <Reveal><p className="project-cat"><b>{p.index}</b> {p.category}</p></Reveal>
        <Reveal delay={0.05}><h3>{p.name}</h3></Reveal>
        <Reveal delay={0.1}><p className="project-sub">{p.subtitle}</p></Reveal>
        <Reveal delay={0.15}>
          <dl className="project-story">
            <div><dt>The problem</dt><dd>{p.problem}</dd></div>
            <div><dt>The solution</dt><dd>{p.solution}</dd></div>
          </dl>
          <ul className="tags" aria-label="Focus areas">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
          <div className="project-links">
            {p.protected ? (
              <>
                <a className="btn btn-primary btn-sm" href="#contact"><Lock size={15} /> Request demo access</a>
                <a className="btn btn-ghost btn-sm" href={p.href} target="_blank" rel="noopener noreferrer">Have a password? Open app <ArrowUpRight size={16} /><span className="sr-only"> (opens in a new tab)</span></a>
              </>
            ) : (
              <a className="btn btn-primary btn-sm" href={p.href} target="_blank" rel="noopener noreferrer">{p.hrefLabel} <ArrowUpRight size={16} /><span className="sr-only"> (opens in a new tab)</span></a>
            )}
            {p.repo && <a className="btn btn-ghost btn-sm" href={p.repo} target="_blank" rel="noopener noreferrer"><Github size={16} /> Source code<span className="sr-only"> (opens in a new tab)</span></a>}
          </div>
          {p.protected && <p className="protected-note"><Lock size={13} /> This app is password-protected to prevent AI/API abuse. Ask and I’ll share a demo login.</p>}
        </Reveal>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="shell">
        <div className="section-head on-dark">
          <Reveal><p className="kicker"><span>02</span> Selected projects</p></Reveal>
          <SplitHeading text={'Proof in\n*the making.*'} />
          <Reveal delay={0.1}><p className="section-lede">Five projects, five different problems — each one built to make a real task simpler.</p></Reveal>
        </div>
        <div className="project-stack">{projects.map((p, i) => <ProjectRow key={p.slug} p={p} i={i} />)}</div>
      </div>
    </section>
  );
}

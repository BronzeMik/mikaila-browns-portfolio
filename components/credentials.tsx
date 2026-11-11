'use client';
import {useEffect, useRef} from 'react';
import {animate, motion, useInView, useReducedMotion} from 'motion/react';
import {Award, Cloud, ClipboardCheck, GraduationCap, LockKeyhole, Network, Terminal, Wrench} from 'lucide-react';
import {certifications} from '@/lib/data';
import {Reveal, SplitHeading} from './ui';

const icons = {wrench: Wrench, network: Network, lock: LockKeyhole, clipboard: ClipboardCheck, terminal: Terminal, cloud: Cloud, cap: GraduationCap} as const;

/** Counts up to `to` when scrolled into view; shows the final value immediately with reduced motion. */
function CountUp({to, pad = 1}: {to: number; pad?: number}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, {once: true});
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView || reduce || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, to, {duration: 1.6, ease: 'easeOut', onUpdate: (v) => {el.textContent = String(Math.round(v)).padStart(pad, '0');}});
    return () => controls.stop();
  }, [inView, reduce, to, pad]);
  return <span ref={ref}>{String(to).padStart(pad, '0')}</span>;
}

export function Credentials() {
  let n = 0;
  return (
    <section className="creds" id="credentials">
      <div className="shell">
        <div className="section-head on-dark">
          <Reveal><p className="kicker"><span>05</span> Experience &amp; certifications</p></Reveal>
          <SplitHeading text={'Certified knowledge.\n*Real-world thinking.*'} />
        </div>
        <div className="creds-top">
          <Reveal className="stat stat-big">
            <strong><CountUp to={5} /><sup>+</sup></strong>
            <span>years of IT experience</span>
            <p>Hands-on work across IT operations, cloud, security and automation shapes how I build: with care for reliability and for the people using the technology.</p>
          </Reveal>
          <Reveal delay={0.1} className="stat stat-count">
            <Award size={34} strokeWidth={1.5} />
            <strong><CountUp to={7} pad={2} /></strong>
            <span>professional certifications</span>
          </Reveal>
        </div>
        <div className="cert-groups">
          {certifications.map((g) => (
            <div className="cert-group" key={g.group}>
              <Reveal><h3 className="cert-provider">{g.group}</h3></Reveal>
              <div className="cert-grid">
                {g.items.map((c) => {
                  const Icon = icons[c.icon];
                  n += 1;
                  return (
                    <motion.div className="cert-card" key={c.name} initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true, margin: '0px 0px -8% 0px'}}
                      transition={{duration: 0.6, delay: (n % 4) * 0.07}} whileHover={{y: -8}}>
                      <span className="cert-no">{String(n).padStart(2, '0')}</span>
                      <Icon size={30} strokeWidth={1.5} />
                      <h4>{c.name}</h4>
                      <p>{c.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

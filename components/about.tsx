'use client';
import {useRef} from 'react';
import Image from 'next/image';
import {motion, useReducedMotion, useScroll, useTransform} from 'motion/react';
import {ArrowUpRight} from 'lucide-react';
import {Magnetic, Reveal, SplitHeading} from './ui';

const approach = [
  ['Listen first', 'I start by understanding how your business really runs and where the friction is — before suggesting any technology.'],
  ['Keep it simple', 'The best solution is the one your team actually uses. I favor clear, plain tools over clever, complicated ones.'],
  ['Build it to last', 'Security, reliability and maintainability are part of the plan from day one, not an afterthought.']
] as const;

export function About() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const {scrollYProgress} = useScroll({target: ref, offset: ['start end', 'end start']});
  const photoY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const shapeY = useTransform(scrollYProgress, [0, 1], [-30, 60]);
  const rot = useTransform(scrollYProgress, [0, 1], [-8, 14]);
  return (
    <section className="about" id="about" ref={ref}>
      <div className="shell about-grid">
        <div className="about-visual">
          <motion.div className="about-shape" aria-hidden="true" style={reduce ? undefined : {y: shapeY, rotate: rot}} />
          <motion.div className="about-photo" style={reduce ? undefined : {y: photoY}} initial={{opacity: 0, scale: 0.94}} whileInView={{opacity: 1, scale: 1}} viewport={{once: true}} transition={{duration: 0.9}}>
            <Image src="/images/mikaila-portrait.png" alt="Portrait of Mikaila Brown" fill sizes="(max-width: 900px) 90vw, 40vw" style={{objectFit: 'cover', objectPosition: 'center 22%'}} />
          </motion.div>
          <motion.div className="about-sticker" initial={{opacity: 0, rotate: -14, scale: 0.6}} whileInView={{opacity: 1, rotate: -6, scale: 1}} viewport={{once: true}} transition={{type: 'spring', delay: 0.5, stiffness: 160, damping: 12}}>
            Hi, I’m<br />Mikaila <span>✳</span>
          </motion.div>
        </div>
        <div className="about-copy">
          <Reveal><p className="kicker"><span>04</span> The human behind the tech</p></Reveal>
          <SplitHeading text={'Curious mind.\n*Builder’s heart.*'} />
          <Reveal delay={0.1}>
            <p className="about-lead">I’m an IT professional and software developer who works across automation, AI, cloud and security.</p>
            <p>With five years in IT, I’ve seen how much time people lose to clunky processes and tools that don’t talk to each other. My favorite part of the job is taking a complicated problem and making the solution feel simple.</p>
          </Reveal>
          <div className="approach">
            {approach.map(([t, d], i) => (
              <Reveal key={t} delay={0.1 + i * 0.08} className="approach-item">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <div><h3>{t}</h3><p>{d}</p></div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}><Magnetic><a href="#contact" className="btn btn-primary">Let’s talk about your project <ArrowUpRight size={18} /></a></Magnetic></Reveal>
        </div>
      </div>
    </section>
  );
}

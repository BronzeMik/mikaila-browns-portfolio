'use client';
import {useRef} from 'react';
import {motion, MotionConfig, useMotionValue, useReducedMotion, useScroll, useSpring} from 'motion/react';

const EASE = [0.2, 0.7, 0.2, 1] as const;

/** Respects prefers-reduced-motion for every Motion animation below it. */
export function MotionProvider({children}: {children: React.ReactNode}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Thin gradient bar pinned to the top of the viewport that tracks page scroll. */
export function ScrollProgress() {
  const {scrollYProgress} = useScroll();
  const scaleX = useSpring(scrollYProgress, {stiffness: 140, damping: 28, restDelta: 0.001});
  return <motion.div className="scroll-progress" style={{scaleX}} aria-hidden="true" />;
}

/** Fades and lifts content into place when it scrolls into view. */
export function Reveal({children, delay = 0, y = 32, className, id}: {children: React.ReactNode; delay?: number; y?: number; className?: string; id?: string}) {
  return (
    <motion.div id={id} className={className} initial={{opacity: 0, y}} whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '0px 0px -8% 0px'}} transition={{duration: 0.8, delay, ease: EASE}}>
      {children}
    </motion.div>
  );
}

/**
 * Staggered word-by-word headline. `\n` breaks a line; wrap words in *asterisks*
 * to render them in the accent style, e.g. "Make work\n*feel lighter.*"
 */
export function SplitHeading({text, as: Tag = 'h2', className, delay = 0, immediate = false}: {text: string; as?: 'h1' | 'h2' | 'h3'; className?: string; delay?: number; immediate?: boolean}) {
  const plain = text.replace(/\*/g, '').replace(/\n/g, ' ');
  let accent = false;
  let n = 0;
  const lines = text.split('\n').map((line) =>
    line.split(' ').filter(Boolean).map((raw) => {
      const starts = raw.startsWith('*');
      const ends = raw.endsWith('*') && raw.length > 1;
      if (starts) accent = true;
      const word = raw.replace(/\*/g, '');
      const isAccent = accent;
      if (ends) accent = false;
      return {word, isAccent, i: n++};
    })
  );
  const trigger = immediate ? {animate: {y: 0}} : {whileInView: {y: 0}, viewport: {once: true, margin: '0px 0px -8% 0px'}};
  return (
    <Tag className={className} aria-label={plain}>
      {lines.map((words, li) => (
        <span className="split-line" key={li} aria-hidden="true">
          {words.map((w) => (
            <span className="split-mask" key={w.i}>
              <motion.span className={'split-word' + (w.isAccent ? ' accent' : '')} initial={{y: '112%'}} {...trigger}
                transition={{duration: 0.9, delay: delay + w.i * 0.07, ease: EASE}}>
                {w.word}
              </motion.span>
              {' '}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

/** Wraps a button/link so it gently follows the pointer (mouse only). */
export function Magnetic({children, strength = 0.28}: {children: React.ReactNode; strength?: number}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, {stiffness: 220, damping: 16, mass: 0.4});
  const sy = useSpring(y, {stiffness: 220, damping: 16, mass: 0.4});
  return (
    <motion.span ref={ref} className="magnetic" style={{x: sx, y: sy}}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {x.set(0); y.set(0);}}>
      {children}
    </motion.span>
  );
}

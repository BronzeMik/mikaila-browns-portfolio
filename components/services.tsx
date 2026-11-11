'use client';
import {useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {ArrowUpRight, Plus} from 'lucide-react';
import {Reveal, SplitHeading} from './ui';

const services = [
  {
    id: 'automation', title: 'Business automation', tag: 'Get time back',
    benefit: 'Stop doing the same task twice.',
    body: 'I connect the tools you already use so routine work — follow-ups, approvals, data entry, hand-offs — happens on its own. Your team spends less time on busywork and more on the work that needs a person.',
    example: 'A new customer fills in a form, and their record, welcome email and internal task are created automatically.'
  },
  {
    id: 'ai', title: 'AI-powered tools', tag: 'Find clarity',
    benefit: 'Turn piles of information into answers.',
    body: 'Documents, emails and notes hold useful answers that are hard to find. I build AI-assisted tools that summarize, search and organize that information, with a person always able to review the result.',
    example: 'Ask a question in plain English and get an answer with a link back to the source document.'
  },
  {
    id: 'software', title: 'Custom software', tag: 'Build better',
    benefit: 'Tools shaped around how you work.',
    body: 'When off-the-shelf software forces workarounds, I design and build simple web apps and internal tools that fit your process, so people stop juggling spreadsheets and sticky notes.',
    example: 'One shared dashboard that replaces three spreadsheets and a long email thread.'
  },
  {
    id: 'cloud', title: 'Cloud & cybersecurity', tag: 'Stay ready',
    benefit: 'Solid foundations you can grow on.',
    body: 'Reliable hosting, sensible access controls, backups and monitoring — set up with security in mind from the start, so your systems stay dependable as the business changes.',
    example: 'Moving a fragile, hand-maintained server to managed cloud hosting with backups and access controls.'
  },
  {
    id: 'consulting', title: 'IT consulting', tag: 'Know your next step',
    benefit: 'A clear plan, in plain English.',
    body: 'Not sure where to start? I help you look at what you have, what is slowing you down, and which improvements are worth doing first — without jargon or pressure.',
    example: 'A short working session that ends with a prioritized list of practical next steps.'
  }
] as const;

type Id = (typeof services)[number]['id'];

function Illustration({id}: {id: Id}) {
  switch (id) {
    case 'automation':
      return (
        <svg viewBox="0 0 320 240" role="img" aria-label="Three connected steps running automatically">
          {[60, 160, 260].map((x, i) => (
            <g key={x}><rect x={x - 34} y="88" width="68" height="64" rx="16" className="il-box" style={{animationDelay: `${i * 0.5}s`}} /><circle cx={x} cy="120" r="9" className="il-dot" style={{animationDelay: `${i * 0.5}s`}} /></g>
          ))}
          <path d="M94 120H126M194 120H226" className="il-flow" />
          <path d="M60 88V50M160 88V50M260 88V50M60 50H260" className="il-thin" />
          <path d="M150 38l10 12 18-24" className="il-check" />
        </svg>
      );
    case 'ai':
      return (
        <svg viewBox="0 0 320 240" role="img" aria-label="Scattered information becoming a clear answer">
          {[[40, 50], [70, 100], [34, 150], [76, 192], [56, 124]].map(([x, y], i) => <rect key={i} x={x} y={y} width="46" height="10" rx="5" className="il-scrap" style={{animationDelay: `${i * 0.3}s`}} />)}
          <path d="M130 120h50" className="il-flow" />
          <path d="M214 74l8 22 22 8-22 8-8 22-8-22-22-8 22-8z" className="il-spark" />
          <rect x="196" y="156" width="92" height="9" rx="4.5" className="il-line" /><rect x="196" y="174" width="64" height="9" rx="4.5" className="il-line il-line-2" />
        </svg>
      );
    case 'software':
      return (
        <svg viewBox="0 0 320 240" role="img" aria-label="An application window assembling from building blocks">
          <rect x="48" y="38" width="224" height="164" rx="18" className="il-win" />
          <path d="M48 68h224" className="il-thin" />
          <rect x="68" y="86" width="64" height="94" rx="10" className="il-block b-a" />
          <rect x="144" y="86" width="108" height="40" rx="10" className="il-block b-b" />
          <rect x="144" y="138" width="50" height="42" rx="10" className="il-block b-c" />
          <rect x="202" y="138" width="50" height="42" rx="10" className="il-block b-d" />
        </svg>
      );
    case 'cloud':
      return (
        <svg viewBox="0 0 320 240" role="img" aria-label="A protected cloud">
          <path d="M96 162a38 38 0 0 1 6-75 52 52 0 0 1 100-8 42 42 0 0 1 22 83z" className="il-cloud" />
          <path d="M160 100l32 12v26c0 20-14 32-32 40-18-8-32-20-32-40v-26z" className="il-shield" />
          <path d="M146 140l10 10 18-22" className="il-check" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 320 240" role="img" aria-label="A winding roadmap with milestones">
          <path d="M40 190C90 190 80 120 140 120S200 60 280 56" className="il-road" />
          {[[40, 190], [140, 120], [280, 56]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="11" className="il-milestone" style={{animationDelay: `${i * 0.5}s`}} />)}
        </svg>
      );
  }
}

export function Services() {
  const [active, setActive] = useState<Id>('automation');
  const current = services.find((s) => s.id === active)!;
  return (
    <section className="services" id="services">
      <div className="shell">
        <div className="section-head">
          <Reveal><p className="kicker"><span>01</span> What I do</p></Reveal>
          <SplitHeading text={'Five ways to make\n*work better.*'} />
          <Reveal delay={0.1}><p className="section-lede">Every service starts with the same question: what is getting in your way? Pick one to see what that can look like.</p></Reveal>
        </div>
        <div className="services-grid">
          <ul className="service-list">
            {services.map((s, i) => {
              const open = s.id === active;
              return (
                <li key={s.id} className={'service' + (open ? ' open' : '')} onMouseEnter={() => { if (window.matchMedia('(hover:hover) and (min-width:960px)').matches) setActive(s.id); }}>
                  <button className="service-head" aria-expanded={open} aria-controls={'svc-' + s.id} onClick={() => setActive(s.id)}>
                    <span className="service-no">{String(i + 1).padStart(2, '0')}</span>
                    <span className="service-title">{s.title}</span>
                    <span className="service-tag">{s.tag}</span>
                    <span className="service-plus" aria-hidden="true"><Plus size={22} /></span>
                  </button>
                  <div className="service-body" id={'svc-' + s.id} role="region" aria-label={s.title}>
                    <div className="service-body-inner">
                      <p className="service-benefit">{s.benefit}</p>
                      <p>{s.body}</p>
                      <p className="service-example"><b>What it can look like</b>{s.example}</p>
                      <div className="service-art-inline"><Illustration id={s.id} /></div>
                      <a className="text-link" href="#contact">Talk about this <ArrowUpRight size={16} /></a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <aside className="service-art" aria-hidden="true">
            <AnimatePresence mode="wait">
              <motion.div key={active} className="service-art-card" initial={{opacity: 0, y: 24, rotate: -2}} animate={{opacity: 1, y: 0, rotate: 0}} exit={{opacity: 0, y: -16}} transition={{duration: 0.4}}>
                <Illustration id={current.id} />
                <span>{current.tag}</span>
              </motion.div>
            </AnimatePresence>
          </aside>
        </div>
      </div>
    </section>
  );
}

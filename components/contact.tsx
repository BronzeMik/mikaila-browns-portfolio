import {Mail, ShieldCheck, Sparkles} from 'lucide-react';
import {BookConsultation} from './book-consultation';
import {ContactForm} from './contact-form';
import {Reveal, SplitHeading} from './ui';

export function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-orb" aria-hidden="true" />
      <div className="shell">
        <div className="contact-hero">
          <Reveal><p className="kicker"><span>06</span> Start a conversation</p></Reveal>
          <SplitHeading className="contact-title" text={'Let’s build\n*something better.*'} />
        </div>
        <div className="contact-grid">
          <Reveal className="contact-copy">
            <p className="contact-lead">You don’t need a technical specification. Tell me what’s slowing you down, what you’d like to automate, or the idea you want to bring to life.</p>
            <ul className="contact-points">
              <li><Mail size={18} /> Your message goes straight to me — I reply personally.</li>
              <li><Sparkles size={18} /> No jargon, no pressure, just a clear next step.</li>
              <li><ShieldCheck size={18} /> Your details are only used to respond to you.</li>
            </ul>
            <div className="book-card">
              <h3>Prefer to talk it through?</h3>
              <p>Book a one-hour consultation and we’ll work through your situation together.</p>
              <BookConsultation />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="contact-card"><ContactForm /></Reveal>
        </div>
      </div>
    </section>
  );
}

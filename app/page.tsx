import {About} from '@/components/about';
import {Contact} from '@/components/contact';
import {Credentials} from '@/components/credentials';
import {Demo} from '@/components/demo';
import {Hero} from '@/components/hero';
import {Projects} from '@/components/projects';
import {Services} from '@/components/services';
import {Reveal, SplitHeading} from '@/components/ui';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {Array.from({length: 4}).map((_, i) => (
            <span key={i}>Automate the ordinary <b>✳</b> Build what’s next <b>✳</b> Make room for more <b>✳</b> </span>
          ))}
        </div>
      </div>
      <Services />
      <Projects />
      <section className="demos" id="demos">
        <div className="shell">
          <div className="section-head">
            <Reveal><p className="kicker"><span>03</span> Interactive demos</p></Reveal>
            <SplitHeading text={'Don’t just take\nmy *word* for it.'} />
            <Reveal delay={0.1}><p className="section-lede">Step through a few examples of what a smarter workflow can look like. These are illustrative demos, not live customer systems.</p></Reveal>
          </div>
          <Reveal><Demo /></Reveal>
        </div>
      </section>
      <About />
      <Credentials />
      <Contact />
    </>
  );
}

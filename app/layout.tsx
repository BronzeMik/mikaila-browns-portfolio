import type {Metadata, Viewport} from 'next';
import {Bricolage_Grotesque, DM_Sans, Instrument_Serif} from 'next/font/google';
import './globals.css';
import './sections.css';
import {Header} from '@/components/header';
import {Footer} from '@/components/footer';
import {MotionProvider} from '@/components/ui';

const display = Bricolage_Grotesque({subsets: ['latin'], variable: '--font-display', display: 'swap'});
const serif = Instrument_Serif({subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif', display: 'swap'});
const sans = DM_Sans({subsets: ['latin'], variable: '--font-sans', display: 'swap'});

export const metadata: Metadata = {
  title: {default: 'Mikaila Brown | Technology, Automation & AI Solutions', template: '%s | Mikaila Brown'},
  description: 'Helping businesses simplify operations, automate repetitive work, and build secure, reliable technology. Explore the work of Mikaila Brown.',
  openGraph: {title: 'Mikaila Brown | Better systems. Less busywork.', description: 'Practical automation, AI and software solutions for growing businesses.', type: 'website'}
};
export const viewport: Viewport = {themeColor: '#140824', colorScheme: 'dark light'};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${sans.variable}`}>
      <body id="top">
        <a className="skip-link" href="#services">Skip to content</a>
        <MotionProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}

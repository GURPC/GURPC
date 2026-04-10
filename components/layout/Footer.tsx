import Link from 'next/link';
import { Facebook, Linkedin, Mail, MapPin, Phone, Terminal, ChevronRight, Youtube, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/common/Logo';

const Footer = () => {
  return (
    <footer className="relative bg-slate-50 dark:bg-[#010803] text-slate-700 dark:text-slate-200 border-t border-green-200 dark:border-green-500/10 overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
      
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-tech pointer-events-none" />
      
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand & Mission */}
          <div className="space-y-6">
            <Logo size="large" showSubtitle={true} />
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-light">
              Empowering the next generation of researchers at Green University of Bangladesh through collaboration, mentorship, and publication excellence.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-green-500/40">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500/50 animate-pulse" />
              <span>STATUS: ONLINE</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="font-mono text-sm text-green-600 dark:text-green-400 tracking-wider">[ QUICK LINKS ]</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Conferences & Journals', href: '/conferences' },
                { name: 'Events Calendar', href: '/calendar' },
                { name: 'Success Stories', href: '/stories' },
                { name: 'Submission Guidelines', href: '/guidelines' },
                { name: 'Resources', href: '/resources' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-500 hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-center gap-2 group py-1">
                    <ChevronRight className="h-3 w-3 text-green-500/30 group-hover:text-green-400 group-hover:translate-x-0.5 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-6">
            <h3 className="font-mono text-sm text-green-600 dark:text-green-400 tracking-wider">[ CONTACT ]</h3>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="flex items-start gap-3 group">
                <div className="p-2 rounded-lg bg-green-500/5 border border-green-500/10 group-hover:border-green-500/20 transition-all mt-0.5">
                  <MapPin size={16} className="text-green-500/60" />
                </div>
                <span className="leading-relaxed text-slate-500">
                  Purbachhal American City,<br/>
                  Kanchan, Rupganj,<br/>
                  Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-green-500/5 border border-green-500/10 group-hover:border-green-500/20 transition-all">
                  <Mail size={16} className="text-green-500/60" />
                </div>
                <a href="mailto:gurpc.gub@gmail.com" className="text-slate-500 hover:text-green-600 dark:hover:text-green-400 transition-colors font-mono text-xs">
                  gurpc.gub@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-green-500/5 border border-green-500/10 group-hover:border-green-500/20 transition-all">
                  <Phone size={16} className="text-green-500/60" />
                </div>
                <a href="tel:+8801531361741" className="text-slate-500 hover:text-green-600 dark:hover:text-green-400 transition-colors font-mono text-xs">
                  +880 1531-361741
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us & CTA */}
          <div className="space-y-6">
            <h3 className="font-mono text-sm text-green-600 dark:text-green-400 tracking-wider">[ CONNECT ]</h3>
            <div className="flex flex-wrap gap-3">
              <a 
                href="https://www.facebook.com/GURPC.GUB" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-green-500/5 border border-green-200 dark:border-green-500/10 hover:border-green-400/30 hover:bg-green-500/10 transition-all text-slate-500 hover:text-green-600 dark:hover:text-green-400"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/company/gurpc-gub/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-green-500/5 border border-green-200 dark:border-green-500/10 hover:border-green-400/30 hover:bg-green-500/10 transition-all text-slate-500 hover:text-green-600 dark:hover:text-green-400"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="https://www.youtube.com/@GURPC_Official" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-green-500/5 border border-green-200 dark:border-green-500/10 hover:border-green-400/30 hover:bg-green-500/10 transition-all text-slate-500 hover:text-green-600 dark:hover:text-green-400"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
              <a 
                href="https://green.edu.bd" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-green-500/5 border border-green-200 dark:border-green-500/10 hover:border-green-400/30 hover:bg-green-500/10 transition-all text-slate-500 hover:text-green-600 dark:hover:text-green-400"
                aria-label="GUB Website"
              >
                <Globe size={18} />
              </a>
            </div>
            
            <div className="pt-2">
               <p className="text-xs text-slate-600 mb-3 font-mono">$ join --community gurpc</p>
               <Button asChild className="w-full bg-green-600/80 hover:bg-green-500 text-white font-mono text-sm shadow-lg shadow-green-900/20 hover:shadow-green-500/10 transition-all rounded-lg border border-green-500/20 group">
                <Link href="/join">
                  <Terminal className="mr-2 h-3 w-3" />
                  Become a Member
                  <ChevronRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-green-200 dark:border-green-500/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-600 font-mono">
          <p>© {new Date().getFullYear()} GURPC — Green University Research & Publication Community</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Privacy Policy</Link>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <Link href="/terms" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

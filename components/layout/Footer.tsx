import Link from 'next/link';
import { Facebook, Linkedin, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

const Footer = () => {
  return (
    <footer className="bg-[#0b1d12] text-slate-200 border-t border-green-900/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand & Mission */}
          <div className="space-y-6">
            <Logo size="large" showSubtitle={true} />
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Empowering the next generation of researchers at Green University of Bangladesh through collaboration, mentorship, and publication excellence.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="font-semibold text-white text-lg">Quick Links</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-green-400 transition-colors flex items-center gap-2">About Us</Link></li>
              <li><Link href="/events" className="hover:text-green-400 transition-colors flex items-center gap-2">Events</Link></li>
              <li><Link href="/blog" className="hover:text-green-400 transition-colors flex items-center gap-2">News & Blog</Link></li>
              <li><Link href="/resources" className="hover:text-green-400 transition-colors flex items-center gap-2">Resources</Link></li>
              <li><Link href="/contact" className="hover:text-green-400 transition-colors flex items-center gap-2">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-6">
            <h3 className="font-semibold text-white text-lg">Contact Us</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3 group">
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-green-900/40 transition-colors">
                  <MapPin size={18} className="text-green-500 shrink-0" />
                </div>
                <span className="leading-relaxed">
                  Purbachhal American City,<br/>
                  Kanchan, Rupganj,<br/>
                  Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-green-900/40 transition-colors">
                  <Mail size={18} className="text-green-500 shrink-0" />
                </div>
                <a href="mailto:gurpc.gub@gmail.com" className="hover:text-white transition-colors">
                  gurpc.gub@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us & CTA */}
          <div className="space-y-6">
            <h3 className="font-semibold text-white text-lg">Follow Us</h3>
            <div className="flex gap-3">
              <a 
                href="https://www.facebook.com/GURPC.GUB" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/5 p-3 rounded-full hover:bg-green-600 hover:text-white transition-all text-slate-400 border border-transparent hover:border-green-400/50"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/company/gurpc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/5 p-3 rounded-full hover:bg-green-600 hover:text-white transition-all text-slate-400 border border-transparent hover:border-green-400/50"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
            
            <div className="pt-2">
               <p className="text-xs text-slate-500 mb-3">Ready to start your research journey?</p>
               <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:shadow-green-900/20 transition-all rounded-full">
                <Link href="/join">
                  Become a Member
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-center items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} GURPC — Green University Research & Publication Community.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

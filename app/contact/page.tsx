import { Metadata } from 'next';
import { Mail, MapPin, Phone, Facebook, Linkedin, Youtube, Globe, Clock, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Contact Us - GURPC',
  description: 'Get in touch with Green University Research & Publication Community.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020a04] pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">Contact Us</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
            Have questions about GURPC? Want to collaborate or get involved? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center hover:border-green-300 dark:hover:border-green-700 transition-colors">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
            <a href="mailto:gurpc@green.edu.bd" className="text-sm text-green-600 dark:text-green-400 hover:underline break-all">
              gurpc@green.edu.bd
            </a>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center hover:border-green-300 dark:hover:border-green-700 transition-colors">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Phone</h3>
            <a href="tel:+8801531361741" className="text-sm text-green-600 dark:text-green-400 hover:underline">
              +880 1531-361741
            </a>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Applied Research Coordinator</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center hover:border-green-300 dark:hover:border-green-700 transition-colors">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Location</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Green University of Bangladesh, Purbachal American City, Kanchan, Rupganj, Narayanganj-1461, Dhaka, Bangladesh
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center hover:border-green-300 dark:hover:border-green-700 transition-colors">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Office Hours</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sat — Wed<br/>9:00 AM — 5:00 PM
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Contact Details & Social */}
            <div className="space-y-8">
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                        Whether you want to join our community, collaborate on a research project, submit a paper, or just learn more about what we do — feel free to reach out through any channel below.
                    </p>
                    
                    <div className="space-y-4">
                        <a href="mailto:gurpc@green.edu.bd" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                            <div className="bg-green-100 dark:bg-green-900/30 p-2.5 rounded-lg text-green-600 dark:text-green-400">
                                <Mail size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">gurpc@green.edu.bd</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500">General inquiries & collaboration</p>
                            </div>
                            <ExternalLink size={14} className="ml-auto text-gray-300 dark:text-gray-600 group-hover:text-green-500 transition-colors" />
                        </a>

                        <a href="tel:+8801531361741" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                            <div className="bg-green-100 dark:bg-green-900/30 p-2.5 rounded-lg text-green-600 dark:text-green-400">
                                <Phone size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">+880 1531-361741</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500">Applied Research Coordinator</p>
                            </div>
                            <ExternalLink size={14} className="ml-auto text-gray-300 dark:text-gray-600 group-hover:text-green-500 transition-colors" />
                        </a>

                        <div className="flex items-start gap-4 p-3 rounded-lg">
                            <div className="bg-green-100 dark:bg-green-900/30 p-2.5 rounded-lg text-green-600 dark:text-green-400">
                                <MapPin size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Green University of Bangladesh</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                                    Purbachal American City, Kanchan,<br/>Rupganj, Narayanganj-1461, Dhaka, Bangladesh
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Follow Us</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <a href="https://www.facebook.com/GURPC.GUB" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-700 transition-colors group">
                            <Facebook size={18} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Facebook</p>
                                <p className="text-xs text-gray-400">@GURPC.GUB</p>
                            </div>
                        </a>
                        <a href="https://www.linkedin.com/company/gurpc-gub/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-700 transition-colors group">
                            <Linkedin size={18} className="text-gray-400 group-hover:text-blue-700 transition-colors" />
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">LinkedIn</p>
                                <p className="text-xs text-gray-400">GURPC</p>
                            </div>
                        </a>
                        <a href="https://www.youtube.com/@GURPC_Official" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-700 transition-colors group">
                            <Youtube size={18} className="text-gray-400 group-hover:text-red-600 transition-colors" />
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">YouTube</p>
                                <p className="text-xs text-gray-400">@GURPC_Official</p>
                            </div>
                        </a>
                        <a href="https://green.edu.bd" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-700 transition-colors group">
                            <Globe size={18} className="text-gray-400 group-hover:text-green-600 transition-colors" />
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">GUB Website</p>
                                <p className="text-xs text-gray-400">green.edu.bd</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            {/* Contact Form */}
            <Card className="border-gray-200 dark:border-gray-800">
                <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Send us a Message</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">We&apos;ll get back to you within 24–48 hours.</p>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                            <Input id="name" placeholder="Your name" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <Input id="email" type="email" placeholder="Your email address" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                            <Input id="subject" placeholder="What is this regarding?" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                            <Textarea id="message" placeholder="Type your message here..." className="min-h-[120px]" />
                        </div>
                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white">
                            Send Message
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

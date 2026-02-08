import { Metadata } from 'next';
import { Mail, MapPin, Phone, Facebook, Linkedin } from 'lucide-react';
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
    <div className="container px-4 py-12 mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
            <p className="text-muted-foreground text-lg">
            Have questions? We are here to help.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Get in Touch</h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        Whether you want to join our community, collaborate on a project, or just say hello, feel free to reach out to us.
                    </p>
                    
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full text-green-700 dark:text-green-400">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h3 className="font-semibold">Visit Us</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Green University of Bangladesh<br/>
                                    Purbachal American City, Kanchan, Rupganj, Dhaka.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full text-green-700 dark:text-green-400">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h3 className="font-semibold">Email Us</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    gurpcmn@gmail.com
                                </p>
                            </div>
                        </div>

                         <div className="flex items-start gap-4">
                            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full text-green-700 dark:text-green-400">
                                <Phone size={20} />
                            </div>
                            <div>
                                <h3 className="font-semibold">Call Us</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    +880 1234-567890 (Coordinator)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Follow Us</h3>
                    <div className="flex gap-4">
                        <a href="https://www.facebook.com/GURPC.GUB" target="_blank" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-green-600 hover:text-white transition-colors">
                            <Facebook size={20} />
                        </a>
                        <a href="https://www.linkedin.com/company/gurpc" target="_blank" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-green-600 hover:text-white transition-colors">
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Contact Form */}
            <Card>
                <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Send us a Message</h3>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Name</label>
                            <Input id="name" placeholder="Your name" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <Input id="email" type="email" placeholder="Your email address" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                            <Input id="subject" placeholder="What is this regarding?" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium">Message</label>
                            <Textarea id="message" placeholder="Type your message here..." className="min-h-[120px]" />
                        </div>
                        <Button type="submit" className="w-full">
                            Send Message
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

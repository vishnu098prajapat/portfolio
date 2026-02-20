
"use client";

import React, { useEffect, useRef } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import SocialIcons from '@/components/common/social-icons';
import { Mail, Phone, Send, User, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    console.log('Form data for mailto:', data);

    const subject = encodeURIComponent(`Contact Form Message from ${data.name}`);
    const body = encodeURIComponent(
`Hello Vishnu,

You have received a new message from your portfolio contact form:

Name: ${data.name}
Email: ${data.email}

Message:
${data.message}
`
    );

    const mailtoLink = `mailto:vishanuprajapati888@gmail.com?subject=${subject}&body=${body}`;

    try {
        const mailWindow = window.open(mailtoLink, '_self'); 
        if (!mailWindow) {
            window.location.href = mailtoLink;
        }
    } catch (e) {
        console.error("Error trying to open mailto link with window.open, falling back:", e);
        window.location.href = mailtoLink;
    }


    toast({
      title: 'Email Client Opening... 📬',
      description: "Your message is ready. Please review and send it using your email application.",
      duration: 5000, 
    });
    form.reset();
  };

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const card = cardRef.current;

    if (!section || !title || !card) return;

    const contactInfoChildren = gsap.utils.toArray('.contact-info-item');
    const formFields = gsap.utils.toArray('.form-field-animate');
    const submitButton = gsap.utils.toArray('.submit-button-animate');
    
    gsap.set(card, { opacity: 0 }); // Set initial state with GSAP

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      tl.from(title, { opacity: 0, y: -50, duration: 0.8, ease: 'power3.out' })
        .to(card, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'expo.out' }, "-=0.6")
        .from(contactInfoChildren, { opacity: 0, x: -30, stagger: 0.15, ease: 'power3.out' }, "-=0.5")
        .from(formFields, { opacity: 0, y: 20, stagger: 0.1, ease: 'power3.out' }, "<0.2")
        .from(submitButton, { opacity: 0, y: 20, ease: 'power3.out' }, "<0.2");
    }, section);

    return () => {
        ctx.revert();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-20 sm:py-24 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 ref={titleRef} className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 font-headline">
          <span className="regular-text">Get In </span>
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Touch</span>
        </h2>

        <Card ref={cardRef} className="max-w-4xl mx-auto bg-card/70 backdrop-blur-xl border border-[hsla(var(--border)/0.3)] shadow-2xl rounded-xl">
          <div className="grid md:grid-cols-2">
            <div className="p-6 md:p-8 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 md:rounded-l-xl">
              <h3 className="text-2xl font-semibold text-primary mb-6 font-headline contact-info-item">Contact Information</h3>
              <div className="space-y-4 mb-8">
                <a href="mailto:vishanuprajapati888@gmail.com" className="flex items-center text-card-foreground hover:text-accent transition-colors group contact-info-item">
                  <Mail className="h-5 w-5 mr-3 text-accent group-hover:animate-pulse" />
                  <span>vishanuprajapati888@gmail.com</span>
                </a>
                <div className="flex items-center text-card-foreground group contact-info-item">
                  <Phone className="h-5 w-5 mr-3 text-accent group-hover:animate-pulse" />
                  <a href="tel:+916377749427" className="hover:text-accent transition-colors">+91 6377749427</a>
                </div>
              </div>
              <h4 className="text-lg font-medium text-primary mb-3 contact-info-item">Follow Me</h4>
              <div className="contact-info-item">
                <SocialIcons />
              </div>
            </div>

            <div className="p-6 md:p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl font-semibold text-primary font-headline">Send Me A Message</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="form-field-animate">
                          <FormLabel className="text-card-foreground flex items-center">
                            <User className="h-4 w-4 mr-2 text-muted-foreground" /> Your Name
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your name" {...field} className="bg-background/70 border-input/70 focus:bg-background" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="form-field-animate">
                          <FormLabel className="text-card-foreground flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-muted-foreground" /> Email Address
                          </FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email" {...field} className="bg-background/70 border-input/70 focus:bg-background" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="form-field-animate">
                          <FormLabel className="text-card-foreground flex items-center">
                            <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" /> Your Message
                          </FormLabel>
                          <FormControl>
                            <Textarea placeholder="Type your message here..." {...field} rows={5} className="bg-background/70 border-input/70 focus:bg-background" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground submit-button-animate" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Preparing...
                        </>
                      ) : (
                        <>
                          Send Message <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

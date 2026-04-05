'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createResumeAction } from '@/app/actions';
import { useState } from 'react';
import { Loader2, Plus, Sparkles, Trash2, User, Briefcase, GraduationCap, Wrench, FolderGit2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';

const ResumeFormSchema = z.object({
  personalInfo: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    linkedin: z.string().url('Invalid URL').optional().or(z.literal('')),
    github: z.string().url('Invalid URL').optional().or(z.literal('')),
    portfolioUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  }),
  summary: z.string().optional(),
  experience: z.array(z.object({
    title: z.string().min(1, 'Title is required'),
    company: z.string().min(1, 'Company is required'),
    location: z.string().min(1, 'Location is required'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    description: z.string().min(1, 'Description is required'),
  })),
  education: z.array(z.object({
    degree: z.string().min(1, 'Degree is required'),
    institution: z.string().min(1, 'Institution is required'),
    location: z.string().min(1, 'Location is required'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    description: z.string().optional(),
  })),
  skills: z.array(z.object({
      name: z.string().min(1, 'Skill name is required')
  })),
  projects: z.array(z.object({
    name: z.string().min(1, 'Project name is required'),
    description: z.string().min(1, 'Description is required'),
    technologies: z.array(z.object({ name: z.string() })),
    projectUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  })).optional(),
});

type ResumeFormValues = z.infer<typeof ResumeFormSchema>;

export function ResumeForm({ defaultValues }: { defaultValues: ResumeFormValues }) {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedResume, setGeneratedResume] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(ResumeFormSchema),
    defaultValues: defaultValues || {
        personalInfo: { name: '', email: '', phone: '', linkedin: '', github: '', portfolioUrl: '' },
        experience: [],
        education: [],
        skills: [],
        projects: []
    },
    mode: 'onChange',
  });

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control: form.control, name: 'experience' });
  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control: form.control, name: 'education' });
  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control: form.control, name: 'skills' });
  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({ control: form.control, name: 'projects' });


  const onSubmit = async (data: ResumeFormValues) => {
    setIsLoading(true);
    setGeneratedResume(null);
    try {
        const result = await createResumeAction(data as any);
        if (result.success) {
          setGeneratedResume(result.resumeText || '');
        } else {
          toast({
            variant: 'destructive',
            title: 'An error occurred',
            description: result.error,
          });
        }
    } catch (e) {
        toast({
            variant: 'destructive',
            title: 'Submission failed',
            description: 'Could not connect to the generation service.'
        });
    } finally {
        setIsLoading(false);
    }
  };
  
  const SectionHeader = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
    <div className="flex items-center gap-3 text-lg font-headline font-semibold text-primary">
      {icon}
      <span>{title}</span>
    </div>
  );

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Accordion type="multiple" defaultValue={['personal']} className="w-full border rounded-lg overflow-hidden">
            <AccordionItem value="personal" className="border-none">
                <AccordionTrigger className="hover:no-underline px-4 bg-muted/50">
                    <SectionHeader icon={<User className="w-5 h-5" />} title="Personal Information" />
                </AccordionTrigger>
                <AccordionContent className="p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="personalInfo.name" render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="personalInfo.email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="personalInfo.phone" render={({ field }) => (<FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="personalInfo.linkedin" render={({ field }) => (<FormItem><FormLabel>LinkedIn URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="personalInfo.github" render={({ field }) => (<FormItem><FormLabel>GitHub URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="personalInfo.portfolioUrl" render={({ field }) => (<FormItem><FormLabel>Portfolio URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="summary" className="border-t border-border/40">
                <AccordionTrigger className="hover:no-underline px-4 bg-muted/50"><SectionHeader icon={<User className="w-5 h-5" />} title="Professional Summary" /></AccordionTrigger>
                <AccordionContent className="p-4">
                    <FormField control={form.control} name="summary" render={({ field }) => (<FormItem><FormLabel>Summary</FormLabel><FormControl><Textarea {...field} rows={5} placeholder="Describe your professional highlights..." /></FormControl><FormMessage /></FormItem>)} />
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="experience" className="border-t border-border/40">
              <AccordionTrigger className="hover:no-underline px-4 bg-muted/50"><SectionHeader icon={<Briefcase className="w-5 h-5" />} title="Work Experience" /></AccordionTrigger>
              <AccordionContent className="p-4 space-y-6">
                {expFields.map((field, index) => (
                  <div key={field.id} className="p-4 border rounded-lg space-y-4 relative bg-card/50">
                    <FormField control={form.control} name={`experience.${index}.title`} render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                    <FormField control={form.control} name={`experience.${index}.company`} render={({ field }) => <FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                    <div className="grid md:grid-cols-3 gap-4">
                        <FormField control={form.control} name={`experience.${index}.location`} render={({ field }) => <FormItem><FormLabel>Location</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                        <FormField control={form.control} name={`experience.${index}.startDate`} render={({ field }) => <FormItem><FormLabel>Start Date</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                        <FormField control={form.control} name={`experience.${index}.endDate`} render={({ field }) => <FormItem><FormLabel>End Date</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                    </div>
                    <FormField control={form.control} name={`experience.${index}.description`} render={({ field }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>} />
                    <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => removeExp(index)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendExp({ title: '', company: '', location: '', startDate: '', endDate: '', description: '' })}><Plus className="mr-2 h-4 w-4" /> Add Experience</Button>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="education" className="border-t border-border/40">
              <AccordionTrigger className="hover:no-underline px-4 bg-muted/50"><SectionHeader icon={<GraduationCap className="w-5 h-5" />} title="Education" /></AccordionTrigger>
              <AccordionContent className="p-4 space-y-6">
                {eduFields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg space-y-4 relative bg-card/50">
                        <FormField control={form.control} name={`education.${index}.degree`} render={({ field }) => <FormItem><FormLabel>Degree</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                        <FormField control={form.control} name={`education.${index}.institution`} render={({ field }) => <FormItem><FormLabel>Institution</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                        <div className="grid md:grid-cols-3 gap-4">
                            <FormField control={form.control} name={`education.${index}.location`} render={({ field }) => <FormItem><FormLabel>Location</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                            <FormField control={form.control} name={`education.${index}.startDate`} render={({ field }) => <FormItem><FormLabel>Start Date</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                            <FormField control={form.control} name={`education.${index}.endDate`} render={({ field }) => <FormItem><FormLabel>End Date</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                        </div>
                        <FormField control={form.control} name={`education.${index}.description`} render={({ field }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>} />
                        <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => removeEdu(index)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendEdu({ degree: '', institution: '', location: '', startDate: '', endDate: '', description: '' })}><Plus className="mr-2 h-4 w-4" /> Add Education</Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="skills" className="border-t border-border/40">
              <AccordionTrigger className="hover:no-underline px-4 bg-muted/50"><SectionHeader icon={<Wrench className="w-5 h-5" />} title="Skills" /></AccordionTrigger>
              <AccordionContent className="p-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {skillFields.map((field, index) => (
                      <div key={field.id} className="flex gap-2 items-center">
                        <FormField control={form.control} name={`skills.${index}.name`} render={({ field }) => <FormItem className="flex-grow"><FormControl><Input {...field} placeholder="Skill name" /></FormControl><FormMessage /></FormItem>} />
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeSkill(index)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                      </div>
                    ))}
                </div>
                <Button type="button" variant="outline" size="sm" onClick={() => appendSkill({ name: '' })}><Plus className="mr-2 h-4 w-4" /> Add Skill</Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="projects" className="border-t border-border/40">
                <AccordionTrigger className="hover:no-underline px-4 bg-muted/50"><SectionHeader icon={<FolderGit2 className="w-5 h-5" />} title="Projects" /></AccordionTrigger>
                <AccordionContent className="p-4 space-y-6">
                    {projectFields.map((field, index) => (
                        <div key={field.id} className="p-4 border rounded-lg space-y-4 relative bg-card/50">
                            <FormField control={form.control} name={`projects.${index}.name`} render={({ field }) => <FormItem><FormLabel>Project Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                            <FormField control={form.control} name={`projects.${index}.projectUrl`} render={({ field }) => <FormItem><FormLabel>Project URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                            <FormField control={form.control} name={`projects.${index}.description`} render={({ field }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>} />
                            <FormField 
                              control={form.control} 
                              name={`projects.${index}.technologies`} 
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Technologies (comma-separated)</FormLabel>
                                  <FormControl>
                                    <Input 
                                      {...field} 
                                      value={Array.isArray(field.value) ? field.value.map(t => t.name).join(', ') : ''}
                                      onChange={(e) => field.onChange(e.target.value.split(',').map(s => ({ name: s.trim() })).filter(t => t.name))} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} 
                            />
                            <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => removeProject(index)}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => appendProject({ name: '', description: '', technologies: [], projectUrl: '' })}><Plus className="mr-2 h-4 w-4" /> Add Project</Button>
                </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex justify-end pt-8">
            <Button type="submit" size="lg" disabled={isLoading} className="bg-primary hover:bg-primary/90 px-8">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              {isLoading ? 'Generating...' : 'Generate Resume'}
            </Button>
          </div>
        </form>
      </Form>

      <Dialog open={!!generatedResume} onOpenChange={() => setGeneratedResume(null)}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="font-headline text-2xl text-primary font-bold">Your AI-Generated Resume</DialogTitle>
            <DialogDescription>
              Copy and paste this Markdown text into your favorite document editor.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-hidden px-6">
            <ScrollArea className="h-full w-full rounded-md border bg-muted/30 p-4">
              <pre className="text-sm whitespace-pre-wrap font-body leading-relaxed">{generatedResume}</pre>
            </ScrollArea>
          </div>
           <DialogFooter className="p-6 pt-2">
            <Button className="font-semibold" onClick={() => {
                navigator.clipboard.writeText(generatedResume || '');
                toast({ title: 'Copied!', description: 'Resume text copied to clipboard.' });
            }}>Copy Text</Button>
            <Button variant="outline" onClick={() => setGeneratedResume(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

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
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';

const AiResumeGenerationInputSchema = z.object({
  personalInfo: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    linkedin: z.string().url('Invalid URL').optional(),
    github: z.string().url('Invalid URL').optional(),
    portfolioUrl: z.string().url('Invalid URL').optional(),
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
  skills: z.array(z.string().min(1, 'Skill cannot be empty')),
  projects: z.array(z.object({
    name: z.string().min(1, 'Project name is required'),
    description: z.string().min(1, 'Description is required'),
    technologies: z.array(z.string().min(1, 'Technology cannot be empty')),
    projectUrl: z.string().url('Invalid URL').optional(),
  })).optional(),
});

type ResumeFormValues = z.infer<typeof AiResumeGenerationInputSchema>;

export function ResumeForm({ defaultValues }: { defaultValues: ResumeFormValues }) {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedResume, setGeneratedResume] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(AiResumeGenerationInputSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control: form.control, name: 'experience' });
  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control: form.control, name: 'education' });
  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control: form.control, name: 'skills' });
  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({ control: form.control, name: 'projects' });


  const onSubmit = async (data: ResumeFormValues) => {
    setIsLoading(true);
    setGeneratedResume(null);
    const result = await createResumeAction(data);
    setIsLoading(false);

    if (result.success) {
      setGeneratedResume(result.resumeText);
    } else {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: result.error,
      });
    }
  };
  
  const SectionHeader = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
    <div className="flex items-center gap-3 text-lg font-headline text-primary">
      {icon}
      <span>{title}</span>
    </div>
  );

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Accordion type="multiple" defaultValue={['item-1']} className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <SectionHeader icon={<User />} title="Personal Information" />
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
            
            <AccordionItem value="item-2">
                <AccordionTrigger><SectionHeader icon={<User />} title="Professional Summary" /></AccordionTrigger>
                <AccordionContent className="p-4">
                    <FormField control={form.control} name="summary" render={({ field }) => (<FormItem><FormLabel>Summary</FormLabel><FormControl><Textarea {...field} rows={5} /></FormControl><FormMessage /></FormItem>)} />
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger><SectionHeader icon={<Briefcase />} title="Work Experience" /></AccordionTrigger>
              <AccordionContent className="p-4 space-y-6">
                {expFields.map((field, index) => (
                  <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
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
                <Button type="button" variant="outline" onClick={() => appendExp({ title: '', company: '', location: '', startDate: '', endDate: '', description: '' })}><Plus className="mr-2 h-4 w-4" /> Add Experience</Button>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger><SectionHeader icon={<GraduationCap />} title="Education" /></AccordionTrigger>
              <AccordionContent className="p-4 space-y-6">
                {eduFields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
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
                <Button type="button" variant="outline" onClick={() => appendEdu({ degree: '', institution: '', location: '', startDate: '', endDate: '', description: '' })}><Plus className="mr-2 h-4 w-4" /> Add Education</Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger><SectionHeader icon={<Wrench />} title="Skills" /></AccordionTrigger>
              <AccordionContent className="p-4 space-y-4">
                {skillFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-center">
                    <FormField control={form.control} name={`skills.${index}`} render={({ field }) => <FormItem className="flex-grow"><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeSkill(index)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => appendSkill('')}><Plus className="mr-2 h-4 w-4" /> Add Skill</Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
                <AccordionTrigger><SectionHeader icon={<FolderGit2 />} title="Projects" /></AccordionTrigger>
                <AccordionContent className="p-4 space-y-6">
                    {projectFields.map((field, index) => (
                        <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
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
                                      value={Array.isArray(field.value) ? field.value.join(', ') : ''}
                                      onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()).filter(Boolean))} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )} 
                            />
                            <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => removeProject(index)}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" onClick={() => appendProject({ name: '', description: '', technologies: [], projectUrl: '' })}><Plus className="mr-2 h-4 w-4" /> Add Project</Button>
                </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex justify-end pt-8">
            <Button type="submit" size="lg" disabled={isLoading} className="bg-accent hover:bg-accent/90">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate Resume
            </Button>
          </div>
        </form>
      </Form>

      <Dialog open={!!generatedResume} onOpenChange={() => setGeneratedResume(null)}>
        <DialogContent className="max-w-4xl h-[90vh]">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl text-primary">Your AI-Generated Resume</DialogTitle>
            <DialogDescription>
              Here is the professional resume created by our AI. You can copy and paste it into a document editor for further formatting.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-full w-full rounded-md border p-4 my-4">
            <pre className="text-sm whitespace-pre-wrap font-body">{generatedResume}</pre>
          </ScrollArea>
           <DialogFooter>
            <Button onClick={() => navigator.clipboard.writeText(generatedResume || '')}>Copy Text</Button>
            <Button variant="outline" onClick={() => setGeneratedResume(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

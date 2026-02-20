import { profileData } from '@/lib/profile-data';
import { ResumeForm } from './resume-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function ResumeGeneratorPage() {
  // Map profileData to the format expected by the form
  const defaultValues = {
    ...profileData,
    skills: profileData.skills.map(s => s.name),
    projects: profileData.projects.map(p => ({
        name: p.name,
        description: p.description,
        technologies: p.technologies,
        projectUrl: p.projectUrl || undefined
    }))
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="bg-primary/10 text-primary rounded-full p-3 mb-4">
            <FileText className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">AI Resume Generator</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Fill in or adjust your details below, and let our AI craft a professional, tailored resume for you in seconds.
        </p>
      </div>
      
      <Card>
        <CardContent className="p-4 sm:p-6 md:p-8">
            <ResumeForm defaultValues={defaultValues} />
        </CardContent>
      </Card>
    </div>
  );
}

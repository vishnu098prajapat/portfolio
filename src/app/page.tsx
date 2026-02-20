'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  Briefcase,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ThumbsUp,
  Wrench,
  FileText,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { profileData } from '@/lib/profile-data';
import { type ProfileData, type Project } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const ProfileCard = ({ personalInfo }: { personalInfo: ProfileData['personalInfo'] }) => (
  <Card className="sticky top-8">
    <CardContent className="p-6">
      <div className="flex flex-col items-center text-center">
        <Avatar className="w-32 h-32 mb-4 border-4 border-primary/10">
          <AvatarImage src={PlaceHolderImages.find(p => p.id === 'avatar')?.imageUrl} alt={personalInfo.name} />
          <AvatarFallback>{personalInfo.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-headline font-bold text-primary">{personalInfo.name}</h1>
        <p className="text-muted-foreground mt-1">{personalInfo.title}</p>
        <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
          <MapPin className="w-4 h-4" /> {personalInfo.location}
        </p>

        <div className="flex gap-2 mt-6">
          <Button variant="ghost" size="icon" asChild>
            <a href={`mailto:${personalInfo.email}`} aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href={`tel:${personalInfo.phone}`} aria-label="Phone">
              <Phone className="w-5 h-5" />
            </a>
          </Button>
        </div>
        <Button asChild className="mt-6 w-full" variant="default">
          <Link href="/resume-generator">
            <FileText className="mr-2 h-4 w-4" /> AI Resume Generator
          </Link>
        </Button>
      </div>
    </CardContent>
  </Card>
);

const ProjectCard = ({ project }: { project: Project }) => (
  <Card className="flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
     <CardHeader className="p-0">
        <div className="aspect-[16/9] relative overflow-hidden">
          <Image 
            src={project.imageUrl}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={project.imageHint}
          />
        </div>
      </CardHeader>
    <CardContent className="p-4 flex-grow">
      <h3 className="font-headline text-xl font-semibold mb-2">{project.name}</h3>
      <CardDescription className="text-sm mb-4">{project.description}</CardDescription>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <Badge key={tech} variant="secondary">{tech}</Badge>
        ))}
      </div>
    </CardContent>
    <CardFooter className="p-4 bg-muted/50">
      <div className="flex justify-between w-full">
        {project.projectUrl && (
          <Button variant="ghost" size="sm" asChild>
            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
              View Live <ArrowUpRight className="w-4 h-4 ml-1" />
            </a>
          </Button>
        )}
        {project.githubUrl && (
          <Button variant="ghost" size="icon" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} on GitHub`}>
              <Github className="w-5 h-5" />
            </a>
          </Button>
        )}
      </div>
    </CardFooter>
  </Card>
);

const TimelineItem = ({
  icon,
  title,
  subtitle,
  date,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  date: string;
  description: string;
}) => (
  <div className="flex gap-6">
    <div className="flex flex-col items-center">
      <div className="bg-primary/10 text-primary rounded-full p-2">{icon}</div>
      <div className="flex-grow w-px bg-border my-2"></div>
    </div>
    <div className="pb-8">
      <p className="text-sm text-muted-foreground mb-1">{date}</p>
      <h3 className="font-headline text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground mb-2">{subtitle}</p>
      <p className="text-sm">{description}</p>
    </div>
  </div>
);

const SkillsSection = ({ skills: initialSkills }: { skills: ProfileData['skills'] }) => {
  const [skills, setSkills] = React.useState(initialSkills);

  const handleEndorse = (skillName: string) => {
    setSkills(
      skills.map((skill) =>
        skill.name === skillName ? { ...skill, endorsement: skill.endorsement + 1 } : skill
      )
    );
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {skills.map((skill) => (
        <Card key={skill.name} className="p-4 flex flex-col items-center justify-center text-center">
          <h4 className="font-semibold">{skill.name}</h4>
          <div className="flex items-center gap-2 mt-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-accent hover:text-accent"
              onClick={() => handleEndorse(skill.name)}
            >
              <ThumbsUp className="w-4 h-4 mr-1" />
              {skill.endorsement}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default function Home() {
  const { personalInfo, summary, projects, experience, education, skills } = profileData;
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="lg:col-span-1">
          <ProfileCard personalInfo={personalInfo} />
        </aside>

        <main className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{summary}</p>
            </CardContent>
          </Card>

          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>
            <TabsContent value="projects" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="experience" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Work Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  {experience.map((exp, index) => (
                    <TimelineItem
                      key={index}
                      icon={<Briefcase className="w-5 h-5" />}
                      title={exp.title}
                      subtitle={`${exp.company} - ${exp.location}`}
                      date={`${exp.startDate} - ${exp.endDate}`}
                      description={exp.description}
                    />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="education" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Education</CardTitle>
                </CardHeader>
                <CardContent>
                  {education.map((edu, index) => (
                    <TimelineItem
                      key={index}
                      icon={<GraduationCap className="w-5 h-5" />}
                      title={edu.degree}
                      subtitle={`${edu.institution} - ${edu.location}`}
                      date={`${edu.startDate} - ${edu.endDate}`}
                      description={edu.description || ''}
                    />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="skills" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Skills & Endorsements</CardTitle>
                </CardHeader>
                <CardContent>
                  <SkillsSection skills={skills} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

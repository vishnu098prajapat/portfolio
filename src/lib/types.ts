export interface Project {
  name: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  imageHint: string;
  projectUrl?: string;
  githubUrl?: string;
}

export interface Experience {
  title: string;
  company: string;
  location:string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface ProfileData {
  personalInfo: {
    name: string;
    title: string;
    location: string;
    avatar: string;
    aboutAvatar?: string; // Added separate image for about section
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    portfolioUrl: string;
    resumeUrl: string;
  };
  summary: string;
  bio: string;
  skills: { name: string; endorsement: number }[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
}

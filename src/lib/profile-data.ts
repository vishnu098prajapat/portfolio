import { PlaceHolderImages } from './placeholder-images';
import type { ProfileData } from './types';

export const profileData: ProfileData = {
  personalInfo: {
    name: "Alex Doe",
    title: "Senior Full-Stack Engineer",
    location: "San Francisco, CA",
    avatar: PlaceHolderImages.find(p => p.id === 'avatar')?.imageUrl || '',
    email: "alex.doe@example.com",
    phone: "123-456-7890",
    linkedin: "https://linkedin.com/in/alex-doe",
    github: "https://github.com/alex-doe",
    portfolioUrl: "https://alexdoe.dev",
  },
  summary:
    "Innovative and results-driven Senior Full-Stack Engineer with over 8 years of experience in designing, developing, and managing complex web applications. Proficient in JavaScript, React, Node.js, and cloud technologies. Passionate about creating intuitive user experiences and scalable software solutions. Proven ability to lead projects from conception to completion.",
  skills: [
    { name: "React", endorsement: 25 },
    { name: "Node.js", endorsement: 22 },
    { name: "TypeScript", endorsement: 18 },
    { name: "Next.js", endorsement: 15 },
    { name: "GraphQL", endorsement: 12 },
    { name: "Docker", endorsement: 14 },
    { name: "AWS", endorsement: 10 },
    { name: "Figma", endorsement: 8 },
  ],
  projects: [
    {
      name: "QuantumLeap Analytics",
      description: "A comprehensive data analytics platform for enterprise customers, providing real-time insights and visualizations.",
      technologies: ["React", "D3.js", "Node.js", "PostgreSQL", "AWS"],
      imageUrl: PlaceHolderImages.find(p => p.id === 'project1')?.imageUrl || '',
      imageHint: 'web dashboard',
      projectUrl: "https://example.com",
      githubUrl: "https://github.com/alex-doe/project1",
    },
    {
      name: "ConnectSphere Mobile",
      description: "A cross-platform mobile application for a professional networking community, featuring real-time chat and event management.",
      technologies: ["React Native", "Firebase", "GraphQL", "TypeScript"],
      imageUrl: PlaceHolderImages.find(p => p.id === 'project2')?.imageUrl || '',
      imageHint: 'mobile app',
      projectUrl: "https://example.com",
      githubUrl: "https://github.com/alex-doe/project2",
    },
     {
      name: "E-Commerce Fusion",
      description: "A modern e-commerce platform with a headless architecture, offering a highly customizable shopping experience.",
      technologies: ["Next.js", "Stripe", "Sanity.io", "Tailwind CSS"],
      imageUrl: PlaceHolderImages.find(p => p.id === 'project4')?.imageUrl || '',
      imageHint: 'ecommerce website',
      projectUrl: "https://example.com",
      githubUrl: "https://github.com/alex-doe/project4",
    },
    {
      name: "Insightify BI",
      description: "A business intelligence tool that aggregates data from multiple sources to create interactive and insightful dashboards.",
      technologies: ["Vue.js", "Chart.js", "Python (Flask)", "MongoDB"],
      imageUrl: PlaceHolderImages.find(p => p.id === 'project3')?.imageUrl || '',
      imageHint: 'data visualization',
      projectUrl: "https://example.com",
      githubUrl: "https://github.com/alex-doe/project3",
    },
  ],
  experience: [
    {
      title: "Senior Software Engineer",
      company: "Innovatech Solutions",
      location: "San Francisco, CA",
      startDate: "Jan 2020",
      endDate: "Present",
      description:
        "Led the development of a new SaaS platform, increasing user engagement by 30%. Mentored junior developers and improved code quality through CI/CD pipeline enhancements.",
    },
    {
      title: "Software Engineer",
      company: "Data Dynamics",
      location: "Palo Alto, CA",
      startDate: "Jun 2017",
      endDate: "Dec 2019",
      description:
        "Developed and maintained features for a large-scale data processing application. Optimized backend services, resulting in a 50% reduction in response times.",
    },
    {
      title: "Junior Web Developer",
      company: "Creative Web Agency",
      location: "San Jose, CA",
      startDate: "May 2015",
      endDate: "May 2017",
      description:
        "Built responsive websites for various clients using HTML, CSS, and JavaScript. Collaborated with designers to translate mockups into functional web pages.",
    },
  ],
  education: [
    {
      degree: "Master of Science in Computer Science",
      institution: "Stanford University",
      location: "Stanford, CA",
      startDate: "2013",
      endDate: "2015",
      description: "Focused on artificial intelligence and human-computer interaction. Published a paper on machine learning models for user behavior prediction.",
    },
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California, Berkeley",
      location: "Berkeley, CA",
      startDate: "2009",
      endDate: "2013",
      description: "Graduated with honors. Active member of the university's coding club and participated in several hackathons.",
    },
  ],
};

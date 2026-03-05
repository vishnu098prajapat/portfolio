import type { ProfileData } from './types';

export const profileData: ProfileData = {
  personalInfo: {
    name: "Vishnu Prajapat",
    title: "AI Full Stack Developer",
    location: "India",
    avatar: "/image/m3.JPG",
    email: "vishanuprajapati888@gmail.com",
    phone: "+91 6377749427",
    linkedin: "https://www.linkedin.com/in/vishnuprajapattt/",
    github: "https://github.com/vishnuprajapattt",
    portfolioUrl: "https://vishnu-portfolio.vercel.app",
  },
  summary:
    "Experienced in building complete web applications, from frontend to backend and database, often enhanced with AI to improve speed and quality.",
  skills: [
    { name: "React.js", endorsement: 25 },
    { name: "C++", endorsement: 20 },
    { name: "Python", endorsement: 18 },
    { name: "DSA", endorsement: 15 },
    { name: "Firebase", endorsement: 14 },
    { name: "React", endorsement: 12 },
    { name: "Automation", endorsement: 10 },
  ],
  projects: [
    {
      name: "Sparrowfy",
      description: "A comprehensive SaaS platform for coaching management, optimizing student and schedule tracking with a modern dashboard.",
      technologies: ["React.js", "API", "SaaS"],
      imageUrl: "/image/Untitled design.png",
      imageHint: 'coaching management',
      projectUrl: "https://aiquizcraft.com",
      githubUrl: "#",
    },
    {
      name: "InstaAutomation",
      description: "Automated Instagram interaction tool that handles comment replies and direct messages for improved audience engagement.",
      technologies: ["React", "Automation"],
      imageUrl: "/image/insta.jpg",
      imageHint: 'instagram automation',
      projectUrl: "#",
      githubUrl: "#",
    },
    {
      name: "Resume Builder",
      description: "A web application for creating professional resumes easily with customizable templates and real-time preview.",
      technologies: ["React", "Web App", "Utility"],
      imageUrl: "/image/resume.png",
      imageHint: 'resume builder',
      projectUrl: "https://resume-builder-ten-black.vercel.app/",
      githubUrl: "#",
    },
    {
      name: "Online Gaming Platform",
      description: "A modern online gaming platform featuring a responsive interface and real-time game state management.",
      technologies: ["Vite", "React"],
      imageUrl: "/image/online-game.jpeg",
      imageHint: 'online gaming',
      projectUrl: "http://realonlinegaming.netlify.app",
      githubUrl: "#",
    },
  ],
  experience: [
    {
      title: "Freelance AI Full Stack Developer",
      company: "Self-Employed",
      location: "Remote",
      startDate: "Jan 2023",
      endDate: "Present",
      description:
        "Building end-to-end web applications with AI integrations, focus on automation and user experience.",
    },
  ],
  education: [
    {
      degree: "Bachelor of Technology",
      institution: "Your Institution Name",
      location: "India",
      startDate: "2021",
      endDate: "2025",
      description: "Focusing on Computer Science and Engineering.",
    },
  ],
};
'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating a professional resume based on user profile data.
 *
 * - generateAiResume - A function that handles the resume generation process.
 * - AiResumeGenerationInput - The input type for the generateAiResume function.
 - AiResumeGenerationOutput - The return type for the generateAiResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const ExperienceEntrySchema = z.object({
  title: z.string().describe('Job title or role.'),
  company: z.string().describe('Name of the company.'),
  location: z.string().describe('Location of the company (city, state).'),
  startDate: z.string().describe('Start date of employment (e.g., "Jan 2020").'),
  endDate: z.string().describe('End date of employment (e.g., "Dec 2022" or "Present").'),
  description: z.string().describe('Detailed description of responsibilities and achievements in this role.'),
});

const EducationEntrySchema = z.object({
  degree: z.string().describe('Degree or qualification obtained.'),
  institution: z.string().describe('Name of the educational institution.'),
  location: z.string().describe('Location of the institution (city, state).'),
  startDate: z.string().describe('Start date of education (e.g., "Sep 2018").'),
  endDate: z.string().describe('End date of education (e.g., "May 2022").'),
  description: z.string().optional().describe('Optional description of academic achievements or relevant coursework.'),
});

const ProjectEntrySchema = z.object({
  name: z.string().describe('Name of the project.'),
  description: z.string().describe('Detailed description of the project, including technologies used and outcomes.'),
  technologies: z.array(z.string()).describe('List of technologies used in the project.'),
  projectUrl: z.string().url().optional().describe('Optional URL to the project.'),
});

const AiResumeGenerationInputSchema = z.object({
  personalInfo: z.object({
    name: z.string().describe("User's full name."),
    email: z.string().email().describe("User's email address."),
    phone: z.string().optional().describe("User's phone number."),
    linkedin: z.string().url().optional().describe("URL to user's LinkedIn profile."),
    github: z.string().url().optional().describe("URL to user's GitHub profile."),
    portfolioUrl: z.string().url().optional().describe("URL to user's personal portfolio."),
  }).describe('Personal contact and online presence information.'),
  summary: z.string().optional().describe('An optional professional summary provided by the user. If not provided, the AI will generate one.'),
  experience: z.array(ExperienceEntrySchema).describe('List of work experiences.'),
  education: z.array(EducationEntrySchema).describe('List of educational background entries.'),
  skills: z.array(z.string()).describe('List of technical and soft skills.'),
  projects: z.array(ProjectEntrySchema).optional().describe('List of personal or professional projects.'),
});
export type AiResumeGenerationInput = z.infer<typeof AiResumeGenerationInputSchema>;

// Output Schema
const AiResumeGenerationOutputSchema = z.object({
  resumeText: z.string().describe('The professionally generated resume in a structured text format (e.g., Markdown).'),
});
export type AiResumeGenerationOutput = z.infer<typeof AiResumeGenerationOutputSchema>;


// Helper Function to Summarize text blocks
async function summarizeText(text: string | undefined): Promise<string> {
  if (!text) return "";
  const { output } = await ai.generate({
    prompt: `Summarize the following text into 2-4 concise, impactful bullet points for a resume. Use action verbs and focus on achievements.\n\nText:\n${text}`,
    model: 'googleai/gemini-2.5-flash',
    output: { format: 'text' },
  });
  return output?.text || "Could not summarize.";
}


// Prompt Definition
const generateResumePrompt = ai.definePrompt({
  name: 'generateResumePrompt',
  input: { schema: AiResumeGenerationInputSchema },
  output: { schema: AiResumeGenerationOutputSchema },
  prompt: `You are an expert resume writer. Your task is to generate a professional, modern, and premium-looking resume in Markdown format based on the provided user profile data.\n\nFollow these guidelines:\n1.  **Structure**: The resume should include the following sections in order:\n    *   Contact Information (Name, Email, Phone, LinkedIn, GitHub, Portfolio)\n    *   Summary/Objective\n    *   Experience\n    *   Education\n    *   Skills (Categorize if appropriate, e.g., Programming Languages, Frameworks, Tools)\n    *   Projects (Optional, if provided)\n2.  **Content**:\n    *   For Experience, Education, and Projects, the 'description' fields have been pre-summarized. Use them as provided.\n    *   If the user has not provided a summary, create a compelling one (2-3 sentences) based on their experience and skills.\n    *   Ensure consistent formatting and use strong action verbs.\n3.  **Formatting**:\n    *   Use Markdown headers (e.g., #, ##, ###) for sections.\n    *   Use bullet points for descriptions.\n\nHere is the user's profile data:\n\n# Personal Information\nName: {{{personalInfo.name}}}\nEmail: {{{personalInfo.email}}}{{#if personalInfo.phone}}\nPhone: {{{personalInfo.phone}}}{{/if}}{{#if personalInfo.linkedin}}\nLinkedIn: {{{personalInfo.linkedin}}}{{/if}}{{#if personalInfo.github}}\nGitHub: {{{personalInfo.github}}}{{/if}}{{#if personalInfo.portfolioUrl}}\nPortfolio: {{{personalInfo.portfolioUrl}}}{{/if}}\n\n# Summary\n{{#if summary}}{{{summary}}}{{else}}Based on the profile below, please write a compelling professional summary of 2-3 sentences.{{/if}}\n\n# Experience\n{{#each experience}}\n## {{title}} at {{company}}, {{location}}\n**{{startDate}} - {{endDate}}**\n{{{description}}}\n{{/each}}\n\n# Education\n{{#each education}}\n## {{degree}} at {{institution}}, {{location}}\n**{{startDate}} - {{endDate}}**\n{{#if description}}\n{{{description}}}\n{{/if}}\n{{/each}}\n\n# Skills\n{{#if skills}}\n{{#each skills}}\n- {{{this}}}\n{{/each}}\n{{/if}}\n\n{{#if projects}}\n# Projects\n{{#each projects}}\n## {{name}}{{#if projectUrl}} ({{projectUrl}}){{/if}}\n**Technologies:** {{#each technologies}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}\n{{{description}}}\n{{/each}}\n{{/if}}`,
});


// Flow Definition
const aiResumeGenerationFlow = ai.defineFlow(
  {
    name: 'aiResumeGenerationFlow',
    inputSchema: AiResumeGenerationInputSchema,
    outputSchema: AiResumeGenerationOutputSchema,
  },
  async (input) => {
    // Pre-summarize descriptions in parallel
    const [summarizedExperience, summarizedEducation, summarizedProjects] = await Promise.all([
      Promise.all(input.experience.map(async (exp) => ({ ...exp, description: await summarizeText(exp.description) }))),
      Promise.all(input.education.map(async (edu) => ({ ...edu, description: await summarizeText(edu.description) }))),
      input.projects ? Promise.all(input.projects.map(async (proj) => ({ ...proj, description: await summarizeText(proj.description) }))) : Promise.resolve(undefined),
    ]);

    const processedInput: AiResumeGenerationInput = {
      ...input,
      experience: summarizedExperience,
      education: summarizedEducation,
      projects: summarizedProjects,
    };
    
    const {output} = await generateResumePrompt(processedInput);
    return output!;
  }
);

// Exported Wrapper Function
export async function generateAiResume(input: AiResumeGenerationInput): Promise<AiResumeGenerationOutput> {
  return aiResumeGenerationFlow(input);
}

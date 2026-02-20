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

// Tool Definition: Summarize Qualifications
const summarizeQualificationsTool = ai.defineTool(
  {
    name: 'summarizeQualifications',
    description: 'Summarizes a given block of text, such as a project description, job responsibility, or academic achievement, into concise bullet points suitable for a resume, highlighting achievements and impact.',
    inputSchema: z.object({
      text: z.string().describe('The detailed text to summarize.'),
    }),
    outputSchema: z.string().describe('The summarized text as bullet points, formatted for a resume.'),
  },
  async (input) => {
    const { output } = await ai.generate({
      prompt: `Summarize the following text into 3-5 concise, impactful bullet points, suitable for a professional resume. Focus on quantifiable achievements and responsibilities, using action verbs.\n\nText:\n${input.text}`,
      model: 'googleai/gemini-2.5-flash', // Use a capable model for summarization
      output: { format: 'text' },
    });
    return output?.text || "Could not summarize.";
  }
);


// Prompt Definition
const generateResumePrompt = ai.definePrompt({
  name: 'generateResumePrompt',
  input: { schema: AiResumeGenerationInputSchema },
  output: { schema: AiResumeGenerationOutputSchema },
  tools: [summarizeQualificationsTool],
  prompt: `You are an expert resume writer. Your task is to generate a professional, modern, and premium-looking resume in Markdown format based on the provided user profile data.\n\nFollow these guidelines:\n1.  **Structure**: The resume should include the following sections in order:\n    *   Contact Information (Name, Email, Phone, LinkedIn, GitHub, Portfolio)\n    *   Summary/Objective (If provided, use it. Otherwise, create a compelling one based on experience and skills.)\n    *   Experience\n    *   Education\n    *   Skills (Categorize if appropriate, e.g., Programming Languages, Frameworks, Tools)\n    *   Projects (Optional, if provided)\n2.  **Content**:\n    *   For Experience, Education, and Projects, use the 'summarizeQualifications' tool to condense the 'description' field into concise, action-oriented bullet points. Highlight achievements and quantifiable results.\n    *   Ensure consistent formatting.\n    *   Use strong action verbs.\n    *   Avoid jargon where plain language suffices.\n3.  **Formatting**:\n    *   Use Markdown headers (e.g., #, ##, ###) for sections.\n    *   Use bullet points for descriptions within Experience, Education, and Projects.\n    *   Ensure contact information is clearly presented.\n    *   Skills can be listed as a comma-separated list or categorized with sub-headers.\n\nHere is the user's profile data:\n\n# Personal Information\nName: {{{personalInfo.name}}}\nEmail: {{{personalInfo.email}}}{{#if personalInfo.phone}}\nPhone: {{{personalInfo.phone}}}{{/if}}{{#if personalInfo.linkedin}}\nLinkedIn: {{{personalInfo.linkedin}}}{{/if}}{{#if personalInfo.github}}\nGitHub: {{{personalInfo.github}}}{{/if}}{{#if personalInfo.portfolioUrl}}\nPortfolio: {{{personalInfo.portfolioUrl}}}{{/if}}\n\n{{#if summary}}\n# Summary\n{{{summary}}}\n{{/if}}\n\n# Experience\n{{#each experience}}\n## {{title}} at {{company}}, {{location}}\n**{{startDate}} - {{endDate}}**\n{{summarizeQualifications text=description}}\n{{/each}}\n\n# Education\n{{#each education}}\n## {{degree}} at {{institution}}, {{location}}\n**{{startDate}} - {{endDate}}**\n{{#if description}}\n{{summarizeQualifications text=description}}\n{{/if}}\n{{/each}}\n\n# Skills\n{{#if skills}}\n{{#each skills}}\n- {{{this}}}\n{{/each}}\n{{/if}}\n\n{{#if projects}}\n# Projects\n{{#each projects}}\n## {{name}}{{#if projectUrl}} ({{projectUrl}}){{/if}}\n**Technologies:** {{#each technologies}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}\n{{summarizeQualifications text=description}}\n{{/each}}\n{{/if}}`,
});


// Flow Definition
const aiResumeGenerationFlow = ai.defineFlow(
  {
    name: 'aiResumeGenerationFlow',
    inputSchema: AiResumeGenerationInputSchema,
    outputSchema: AiResumeGenerationOutputSchema,
  },
  async (input) => {
    const {output} = await generateResumePrompt(input);
    return output!;
  }
);

// Exported Wrapper Function
export async function generateAiResume(input: AiResumeGenerationInput): Promise<AiResumeGenerationOutput> {
  return aiResumeGenerationFlow(input);
}

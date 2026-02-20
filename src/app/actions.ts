
'use server';
import { generateAiResume, type AiResumeGenerationInput } from '@/ai/flows/ai-resume-generation-flow';
import { z } from 'zod';

const AiResumeGenerationInputSchema = z.object({
  personalInfo: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    portfolioUrl: z.string().url().optional(),
  }),
  summary: z.string().optional(),
  experience: z.array(z.object({
    title: z.string(),
    company: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    description: z.string(),
  })),
  education: z.array(z.object({
    degree: z.string(),
    institution: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    description: z.string().optional(),
  })),
  skills: z.array(z.string()),
  projects: z.array(z.object({
    name: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    projectUrl: z.string().url().optional(),
  })).optional(),
});

export async function createResumeAction(input: AiResumeGenerationInput) {
    const parsedInput = AiResumeGenerationInputSchema.safeParse(input);
    
    if (!parsedInput.success) {
        return { success: false, error: "Invalid input." };
    }

  try {
    const result = await generateAiResume(parsedInput.data);
    if (!result || !result.resumeText) {
        return { success: false, error: 'AI failed to generate a response.' };
    }
    return { success: true, resumeText: result.resumeText };
  } catch (error) {
    console.error('Error in createResumeAction:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to generate resume. ${errorMessage}` };
  }
}

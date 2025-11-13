import { z } from 'zod';

// User validation schemas
export const updateUserSchema = z.object({
  username: z.string().min(3).max(255).regex(/^[a-z0-9_-]+$/i).optional(),
  email: z.string().email().optional(),
});

// Profile validation schemas
export const updateProfileSchema = z.object({
  display_name: z.string().min(1).max(255).optional(),
  bio: z.string().max(1000).optional(),
  avatar_url: z.string().url().max(500).optional(),
  theme_preferences: z.record(z.any()).optional(),
  custom_css: z.string().max(10000).optional(),
  custom_html: z.string().max(50000).optional(),
  social_links: z.record(z.string().url()).optional(),
});

// IPFS content validation schemas
export const createIpfsContentSchema = z.object({
  cid: z.string().min(1).max(255),
  content_type: z.string().max(50).optional(),
  filename: z.string().max(255).optional(),
  size: z.number().int().positive().optional(),
});

export const updatePinStatusSchema = z.object({
  pinned: z.boolean(),
});

// Webring validation schemas
export const createWebringSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(10).max(1000),
});

// Helper function to validate request body
export function validateBody<T>(schema: z.Schema<T>, data: unknown): { success: true; data: T } | { success: false; error: string } {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      return { success: false, error: errorMessages };
    }
    return { success: false, error: 'Validation failed' };
  }
}

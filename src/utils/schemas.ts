import { z } from "zod";

// Project Schemas
export const ProjectSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Max name length 50" }),
});

export const UpdateProjectSchema = ProjectSchema.extend({
  id: z.string().min(1, { message: "Project ID is required" }),
});

export const GetProjectByIdSchema = z.object({
  id: z.string().min(1, { message: "Project ID  is required" }),
});

export const GetProjectByApiKeySchema = z.object({
  apiKey: z.string().min(1, { message: "API key is required" }),
  userId: z
    .string()
    .min(1, { message: "Unique User ID is required" })
    .optional(),
});

export const DeleteProjectSchema = z.object({
  id: z.string().min(1, { message: "Project ID is required" }),
});

// Flag Schemas

export const FlagSchema = z.object({
  key: z
    .string()
    .min(1, { message: "Key is required" })
    .max(50, { message: "Max key length 50" })
    .regex(new RegExp(/^[A-Za-z0-9\-._]*$/), {
      message:
        "Key must only include letters, numbers, dashes, underscores, and periods.",
    }),
  description: z
    .string()
    .max(250, { message: "Max description length 50" })
    .optional()
    .nullable(),
  percentage: z
    .number()
    .min(0, { message: "Min percentage is 0" })
    .max(100, { message: "Max percentage is 100" }),
});

export const UpdateFlagSchema = FlagSchema.extend({
  id: z.string().min(1, { message: "Flag ID is required" }),
  status: z.boolean(),
});

export const GetAllFlagsSchema = z.object({
  projectId: z.string().min(1, { message: "Project ID is required" }),
});

export const CreateFlagSchema = FlagSchema.extend({
  projectId: z.string().min(1, { message: "Project ID  is required" }),
});

export const DeleteFlagSchema = z.object({
  id: z.string().min(1, { message: "Flag ID is required" }),
});

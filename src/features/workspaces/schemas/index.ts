import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((val) => (val === "" ? "" : val)),
      z.null(),
    ])
    .optional(),
});

export const updateWorkspaceSchema = z.object({
  name: z.string().trim().min(1, "Must be 1 or more characters").optional(),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((val) => (val === "" ? "" : val)),
      z.null(),
    ])
    .optional(),
});

export const joinWorkspaceSchema = z.object({
  code: z.string().min(10, {
    message: "Invalid invite code",
  }),
});

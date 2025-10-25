import { z } from "zod";

export const createJobSchema = z.object({
  jobName: z.string().min(1, "Job name is required"),
  jobType: z.enum(["full_time", "part_time", "contract", "internship"] as const, {
    message: "Please select a job type",
  }),
  jobDescription: z.string().min(10, "Job description must be at least 10 characters"),
  candidatesNeeded: z
    .number({ error: "Must be a number" })
    .min(1, "At least 1 candidate is required"),
  minSalary: z.number({ error: "Must be a number" }).min(1, "Minimum salary is required"),
  maxSalary: z.number({ error: "Must be a number" }).min(1, "Maximum salary is required"),
});

export type CreateJobFromValues = z.infer<typeof createJobSchema>;
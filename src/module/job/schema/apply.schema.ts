import { z } from "zod";
import { Field, Job } from "@/module/job/types/job";

const getSchemaByKey = (key: string): z.ZodTypeAny => {
  const lowerKey = key.toLowerCase();

  if (lowerKey.includes("email")) return z.email("Invalid email format").optional();
  if (lowerKey.includes("link") || lowerKey.includes("url")) return z.url("Invalid URL format").optional();
  if (lowerKey.includes("phone")) return z.string().regex(/^\+?[0-9\s\-()]{7,20}$/, "Invalid phone number format").transform((val) => val.trim()).optional();
  if (lowerKey.includes("date")) return z.coerce.date({ message: "Invalid date format" }).optional();

  return z.string().optional();
}

export const buildApplicationSchema = (job: Job) : z.ZodObject<{ [x: string]: any; }, z.core.$strip> => {
  const shape: Record<string, any> = {};
  const fields = job.application_form?.sections.flatMap(
    (section) => section.fields
  );

  fields?.forEach((field) => {
    const { key, validation } = field;
    const isRequired = validation?.required === true;

    let baseSchema = getSchemaByKey(key);

    if (isRequired) {
      baseSchema = baseSchema.refine(
        (val) => val !== "" && val !== null && val !== undefined,
        { message: `${key.replaceAll('_', ' ').capitalizeWords()} is required` }
      );
    } else {
      baseSchema = z
        .union([baseSchema, z.literal(""), z.null()])
        .optional()
        .nullable();
    }

    shape[key] = baseSchema;
  });

  return z.object(shape);
}

import { Field, Job } from "@/module/job/types/job";
import z from "zod";
import { create } from "zustand";
import { createJobSchema } from "@/module/job/schema/job.schema";

type FormData = z.infer<typeof createJobSchema>;

interface JobState {
  jobs: Job[],
  field: Field[],
  selectedJob: Job | null,
  setSelectedJob: (job: Job | null) => void
  setJobs: (jobs: Job[]) => void,
  setRequiredField: (fieldKey: string, required: boolean | undefined) => void,
  handleCreateJob: (data: FormData) => Promise<void>,
}

export const useJobStore = create<JobState>()(
  (set) => ({
    jobs: [],
    field: [
      { "key": "full_name", "validation": { "required": true } },
      { "key": "photo_profile", "validation": { "required": true } },
      { "key": "gender", "validation": { "required": true } },
      { "key": "domicile", "validation": { "required": false } },
      { "key": "email", "validation": { "required": true } },
      { "key": "phone_number", "validation": { "required": true } },
      { "key": "linkedin_link", "validation": { "required": true } },
      { "key": "date_of_birth", "validation": { "required": false } }
    ],
    selectedJob: null,
    setSelectedJob: (job: Job | null) => set({ selectedJob: job }),
    setJobs: (jobs: Job[]) => set({ jobs }),
    setRequiredField: (fieldKey: string, required: boolean | undefined) => set((state) => ({
      field: state.field.map((field) =>
        field.key === fieldKey
          ? { ...field, validation: { required } }
          : field
      )
    })),
    handleCreateJob: async (data: FormData) => {

    }
  }),
)
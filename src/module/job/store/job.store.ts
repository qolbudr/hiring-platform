import { Job } from "@/module/job/types/job";
import { create } from "zustand";

interface JobState {
  jobs: Job[],
  setJobs: (jobs: Job[]) => void
}

export const useJobStore = create<JobState>()(
  (set) => ({
    jobs: [],
    setJobs: (jobs: Job[]) => set({ jobs }),
  }),
)
import { Job } from "@/module/job/types/job";
import { create } from "zustand";

interface JobState {
  jobs: Job[],
  selectedJob: Job | null,
  setSelectedJob: (job: Job | null) => void
  setJobs: (jobs: Job[]) => void
}

export const useJobStore = create<JobState>()(
  (set) => ({
    jobs: [],
    selectedJob: null,
    setSelectedJob: (job: Job | null) => set({ selectedJob: job }),
    setJobs: (jobs: Job[]) => set({ jobs }),
  }),
)
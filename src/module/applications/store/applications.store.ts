import { BaseStatus } from "@/shared/types/base_status"
import { Application } from "../types/application";
import { create } from "zustand";
import applicationService from "../services/applicationService";

interface ApplicationState {
  status: BaseStatus,
  applications: Application[],
  getApplicationsByJobId: (jobId: string) => Promise<void>
}

export const useApplicationStore = create<ApplicationState>()(
  (set, get) => ({
    status: BaseStatus.initial(),
    applications: [],
    getApplicationsByJobId: async (jobId: string) => {
      try {
        set({ status: BaseStatus.loading() });
        const applications = await applicationService.getApplicationsByJobId(jobId);
        if (applications.length === 0) return set({ status: BaseStatus.empty() });
        set({ applications, status: BaseStatus.success() });
      } catch (error) {
        set({ status: BaseStatus.error((error as Error).message) });
      }
    }
  })
)

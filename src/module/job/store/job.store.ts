import { Field, Job } from "@/module/job/types/job";
import { create } from "zustand";
import { CreateJobFromValues } from "@/module/job/schema/job.schema";
import jobService from "../services/jobService";
import { BaseStatus } from "@/shared/types/base_status";
import { Application, ApplicationAttribute } from "../types/application";

interface JobState {
  status: BaseStatus,
  applyStatus: BaseStatus,
  jobs: Job[],
  job: Job | null,
  field: Field[],
  capturedPhoto: string | null,
  selectedJob: Job | null,
  detailJob: (id: string) => Promise<Job>
  setCapturedPhoto: (photo: string | null) => void,
  setJobs: (jobs: Job[]) => void,
  setSelectedJob: (job: Job | null) => void
  setRequiredField: (fieldKey: string, required: boolean | undefined) => void,
  createJob: (data: CreateJobFromValues) => Promise<void>
  getJob: (name: string) => Promise<void>
  applyJob: (jobId: string, userId: string, data: { [key: string]: any }) => Promise<void>
}

export const useJobStore = create<JobState>()(
  (set, get) => ({
    job: null,
    status: BaseStatus.initial(),
    applyStatus: BaseStatus.initial(),
    jobs: [],
    capturedPhoto: null,
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
    createJob: async (data: CreateJobFromValues) => {
      try {
        const validation = get().field;
        const newJob: Job = {
          title: data.jobName,
          slug: data.jobName.toLowerCase().replaceAll(' ', '-'),
          status: 'active',
          salary_range: {
            min: data.minSalary,
            max: data.maxSalary,
            currency: 'IDR',
            display_text: `${data.minSalary.toCurrency()} - ${data.maxSalary.toCurrency()}`,
          },
          description: data.jobDescription.split('\n'),
          location: 'Remote',
          list_card: {
            badge: 'Active',
            started_on_text: `Started on ${new Date().toLocaleDateString()}`,
            cta: 'Manage Job',
          },
          application_form: {
            sections: [
              {
                title: 'Minimum Profile Information Required',
                fields: validation,
              }
            ],
          }
        }
        set({ status: BaseStatus.loading() });
        await jobService.createJob(newJob);
        await get().getJob('');
        set({ status: BaseStatus.success() });
      } catch (error: any) {
        set({ status: BaseStatus.error(error.message || 'Failed to create job') });
      }
    },
    getJob: async (name: string) => {
      try {
        set({ status: BaseStatus.loading() });
        const jobs = await jobService.getJobs(name);
        if (jobs.length === 0) {
          return set({ jobs, status: BaseStatus.empty('No jobs found') });
        }
        set({ jobs, status: BaseStatus.success() });
      } catch (error: any) {
        set({ status: BaseStatus.error(error.message || 'Failed to fetch jobs') });
      }
    },
    detailJob: async (id: string) => {
      try {
        set({ status: BaseStatus.loading() });
        const job = await jobService.getJobById(id);
        set({ job, status: BaseStatus.success() });
        return job;
      } catch (error: any) {
        set({ status: BaseStatus.error(error.message || 'Failed to fetch job details') });
        throw error;
      }
    },
    applyJob: async (jobId: string, userId: string, data: { [key: string]: any }) => {
      try {
        set({ applyStatus: BaseStatus.loading() });

        const attributes: ApplicationAttribute[] = [];

        Object.entries(data).map(([key, value]) => {
          attributes.push({key, label: key.replaceAll('_', ' ').capitalizeWords(), value: String(value), order: attributes.length + 1});
        });

        const applicationData: Application = {
          job_id: jobId,
          user_id: userId,
          attributes: attributes,
        }
        await jobService.applyJob(applicationData);
        set({ applyStatus: BaseStatus.success() });
      } catch (error: any) {
        set({ applyStatus: BaseStatus.error(error.message || 'Failed to apply for job') });
      }
    },
    setCapturedPhoto: (photo: string | null) => set({ capturedPhoto: photo }),
  }),
)
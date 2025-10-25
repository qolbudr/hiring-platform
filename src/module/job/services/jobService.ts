import apiClient from "@/shared/lib/api";
import { BaseResponse } from "@/shared/types/base_response";
import { Job } from "@/module/job/types/job";

const getJobs = async (name: string): Promise<Job[]> => {
  const response = await apiClient.get<BaseResponse<Job[]>>('/job?search=' + name);
  const body = response.data;
  return body.data;
};

const createJob = async (job: Job): Promise<Job> => {
  const response = await apiClient.post<BaseResponse<Job>>('/job', job);
  const body = response.data;
  return body.data;
};

export default { getJobs, createJob };


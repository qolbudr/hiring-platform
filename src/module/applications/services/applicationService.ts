import apiClient from "@/shared/lib/api";
import { BaseResponse } from "@/shared/types/base_response";
import { Application } from "@/module/applications/types/application";

const getApplicationsByJobId = async (jobId: string): Promise<Application[]> => {
  const response = await apiClient.get<BaseResponse<Application[]>>(`/job/applications/${jobId}`);
  const body = response.data;
  return body.data;
};

export default { getApplicationsByJobId };
'use client'
import { useState } from 'react'
import JobService from '@/module/job/services/jobService'
import { useJobStore } from '@/module/job/store/job.store'
import { BaseStatus } from '@/shared/types/base_status'
import { ca } from 'zod/locales'
import z from 'zod'
import { createJobSchema } from '@/module/job/schema/job.schema'

type CreateJobData = z.infer<typeof createJobSchema>;

export function useJob() {
  const { setJobs } = useJobStore()
  const [status, setStatus] = useState<BaseStatus>(BaseStatus.initial());

  const handleGetJob = async (search?: string) => {
    try {
      setStatus(BaseStatus.loading())
      const jobs = await JobService.getJobs(search || '')
      setJobs(jobs)
      if (jobs.length === 0) return setStatus(BaseStatus.empty('No jobs found'))
      setStatus(BaseStatus.success())
    } catch (error: any) {
      setStatus(BaseStatus.error(error.message || 'Failed to fetch jobs'))
    }
  }

  const handleCreateJob = async (data: CreateJobData) => {
    try {
      setStatus(BaseStatus.loading());
      setStatus(BaseStatus.success());
    } catch (error: any) {
      setStatus(BaseStatus.error(error.message || 'Failed to create job'));
    }
  }

  return { handleGetJob, status, setStatus }
}

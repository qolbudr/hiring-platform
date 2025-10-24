'use client'
import { useState } from 'react'
import JobService from '@/module/job/services/jobService'
import { useJobStore } from '@/module/job/store/job.store'
import { BaseStatus } from '@/shared/types/base_status'

export function useJob() {
  const { setJobs } = useJobStore()
  const [status, setStatus] = useState<BaseStatus>(BaseStatus.initial());

  const handleGetJob = async (search?: string) => {
    try {
      setStatus(BaseStatus.loading())
      const jobs = await JobService.getJobs(search || '')
      setJobs(jobs)
      if(jobs.length === 0) return setStatus(BaseStatus.empty('No jobs found'))
      setStatus(BaseStatus.success())
    } catch (error: any) {
      setStatus(BaseStatus.error(error.message || 'Failed to fetch jobs'))
    }
  }

  return { handleGetJob, status, setStatus }
}

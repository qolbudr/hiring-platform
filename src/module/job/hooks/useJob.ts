'use client'
import { useState } from 'react'
import JobService from '@/module/job/services/jobService'
import { useJobStore } from '@/module/job/store/job.store'

export function useJob() {
  const { setJobs } = useJobStore()
  const [loading, setLoading] = useState(false)

  const handleGetJob = async (search?: string) => {
    try {
      setLoading(true)
      const jobs = await JobService.getJobs(search || '')
      setJobs(jobs)
    } finally {
      setLoading(false)
    }
  }

  return { handleGetJob, loading }
}

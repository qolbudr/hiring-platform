'use client';

import { JobCard } from "@/module/job/components/jobCard";
import { Input } from "@/shared/components/Input";
import { useJobStore } from "@/module/job/store/job.store";
import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Loader } from "@/shared/components/Loader";
import { JobCardDetail } from "@/module/job/components/jobCardDetail";

const JobList = (): React.JSX.Element => {
  const store = useJobStore();

  useEffect(() => {
    store.getJob('');
  }, []);

  const debounced = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => store.getJob(e.target.value),
    300
  );

  return (
    <div className="flex flex-col w-full mx-auto py-8 mt-10 h-full">
      <div className="w-full py-10 px-4 mb-8 border-b border-b-neutral-40">
        <Input
          onChange={debounced}
          placeholder="Search by job details"
          className="max-w-7xl mx-auto"
          suffixicon="uil:search"
        />
      </div>

      <div className="w-full h-full max-w-7xl flex-1 px-4 mx-auto">
        {store.status.isLoading && (
          <div className="flex w-full h-full justify-center items-center py-20">
            <Loader />
          </div>
        )}

        {!store.status.isLoading && store.status.isEmpty && (
          <div className="flex w-full h-full justify-center items-center py-20">
            <div className="text-center">
              <img src="/illustration/empty.png" alt="empty-illustration" className="w-[300px] mb-4" />
              <h3 className="font-bold">No job openings available</h3>
              <h3 className="text-l font-normal">Please wait for the next batch of openings.</h3>
            </div>
          </div>
        )}

        {!store.status.isLoading && !store.status.isEmpty && (
          <div className="flex w-full flex-col h-full lg:flex-row space-y-4 lg:space-x-4">
            <div className="w-full lg:w-1/4 space-y-3">
              {store.jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onClick={() => store.setSelectedJob(job)}
                  isActive={store.selectedJob?.id === job.id}
                />
              ))}
            </div>
            <JobCardDetail job={store.selectedJob} />
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;

'use client';

import { Input } from "@/shared/components/Input";
import { useJobStore } from "@/module/job/store/job.store";
import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Loader } from "@/shared/components/Loader";
import { Button } from "@/shared/components/Button";
import { JobCardAdmin } from "@/module/job/components/jobCardAdmin";
import { useModalStore } from "@/shared/store/modal.store";
import { ModalCreateJob } from "@/module/job/components/modalCreateJob";
import { RadioSelector } from "@/shared/components/RadioSelector";

const JobList = (): React.JSX.Element => {
  const store = useJobStore();
  const modal = useModalStore();

  useEffect(() => {
    store.getJob('', false);
  }, []);

  const debounced = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => store.getJob(e.target.value, false),
    300
  );

  return (
    <>
      <div className="flex flex-col w-full mx-auto py-8 mt-10 h-full">
        <div className="w-full h-full max-w-7xl mt-8 flex-1 px-4 mx-auto">
          <div className="flex w-full flex-col h-full lg:flex-row space-y-4 lg:space-x-4 items-start">
            <div className="flex flex-col w-full h-full lg:w-2/3 space-y-3">
              <Input
                onChange={debounced}
                placeholder="Search by job details"
                className="max-w-7xl mx-auto mb-4"
                suffixicon="uil:search"
              />

              <RadioSelector
                value="all"
                options={[
                  { label: 'All', value: 'all' },
                  { label: 'Active', value: 'active' },
                  { label: 'Inactive', value: 'inactive' },
                  { label: 'Draft', value: 'draft' },
                ]}
                onChange={store.filterJobs}
              />

              {store.status.isLoading && (
                <div className="flex w-full h-full justify-center items-center">
                  <Loader />
                </div>
              )}

              {!store.status.isLoading && store.jobs.length === 0 && (
                <div className="flex w-full h-full justify-center items-center">
                  <div className="text-center">
                    <img src="/illustration/empty.png" alt="empty-illustration" className="w-[300px] mb-4" />
                    <h3 className="font-bold">No job openings available</h3>
                    <h3 className="text-l font-normal">Please wait for the next batch of openings.</h3>
                    <Button onClick={() => modal.openModal('create-job')} className="mt-4" variant="secondary" size="large">Create a new job</Button>
                  </div>
                </div>
              )}

              {!store.status.isLoading && !store.status.isEmpty && (
                <>
                  {store.jobs.map((job) => (
                    <JobCardAdmin
                      key={job.id}
                      job={job}
                      onClick={() => store.setSelectedJob(job)}
                    />
                  ))}
                </>
              )}

            </div>
            <div className="hidden lg:block rounded-2xl w-1/3 h-auto">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-md px-6 py-10">
                <img
                  src="/image-menu.jpg"
                  alt="menu-background"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative flex flex-col justify-center items-center text-center text-white h-full px-4">
                  <h2 className="text-xl font-bold">Recruit the best candidates</h2>
                  <p className="text-m font-bold mt-1">Create jobs, invite, and hire with ease</p>
                  <Button onClick={() => modal.openModal('create-job')} size="large" className="mt-6">Create a new job</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalCreateJob />
    </>
  );
};

export default JobList;

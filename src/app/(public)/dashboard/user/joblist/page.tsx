'use client';

import { JobCard } from "@/module/job/components/jobCard";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { Tags } from "@/shared/components/Tags";
import { useJobStore } from "@/module/job/store/job.store";
import { useJob } from "@/module/job/hooks/useJob";
import { useEffect } from "react";

const JobList = (): React.JSX.Element => {
  const hook = useJob();
  const store = useJobStore();

  useEffect(() => { hook.handleGetJob() }, [])
  
  const handleSearchKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    try {
      if (e.key === 'Enter') {
        const query = e.currentTarget.value;
        hook.handleGetJob(query);
      }
    } catch (error) {
      console.error('Error handling search:', error);
    }
  }

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="w-full shadow-md bg-white flex flex-row justify-center fixed left-0 right-0 top-0 z-10">
        <div className="w-full max-w-7xl p-4 flex justify-end space-x-4 items-center">
          <div className="h-6 border-l border-l-neutral-40"></div>
          <img src="https://ui-avatars.com/api/?name=John+Doe" className="w-10 h-10 rounded-full" alt="user-avatar"></img>
        </div>
      </div>
      <div className="flex flex-1 w-full h-full max-w-7xl mx-auto px-4 py-8 mt-20">
        <div className="flex w-full flex-col h-full lg:flex-row space-y-4 lg:space-x-4">
          <div className="w-full lg:w-1/4 space-y-3">
            <Input onKeyDown={handleSearchKeyDown} placeholder="Search Jobs..." className="mb-4" />
            {
              store.jobs.map((job) => (
                <JobCard key={job.id} />
              ))
            }
          </div>
          <div className="hidden lg:block w-full lg:w-3/4 h-full">
            <div className="w-full border border-neutral-40 rounded-lg p-6 h-full">
              <div className="w-full flex flex-wrap items-start justify-between space-y-6 sm:space-y-0">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 border border-neutral-40 rounded-sm flex items-center justify-center">
                    <img src="/logo.png" alt="jobs-icon" className="w-full"></img>
                  </div>
                  <div className="space-y-2">
                    <Tags text="Full-Time" />
                    <h2 className="font-bold text-xl">UX Designer</h2>
                    <h5 className="font-normal text-neutral-70 text-m">Rakamin</h5>
                  </div>
                </div>
                <Button variant="secondary" className="w-full sm:w-auto">Apply</Button>
              </div>
              <hr className="border-t border-neutral-40 my-6" />
              <ul className="list-disc text-m font-normal list-inside">
                <li>Develop, test, and maintain responsive, high-performance web applications using modern front-end technologies.</li>
                <li>Collaborate with UI/UX designers to translate wireframes and prototypes into functional code.</li>
                <li>Integrate front-end components with APIs and backend services.</li>
                <li>Ensure cross-browser compatibility and optimize applications for maximum speed and scalability.</li>
                <li>Write clean, reusable, and maintainable code following best practices and coding standards.</li>
                <li>Participate in code reviews, contributing to continuous improvement and knowledge sharing.</li>
                <li>Troubleshoot and debug issues to improve usability and overall application quality.</li>
                <li>Stay updated with emerging front-end technologies and propose innovative solutions.</li>
                <li>Collaborate in Agile/Scrum ceremonies, contributing to sprint planning, estimation, and retrospectives.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobList;
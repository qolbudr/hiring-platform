import { Button } from "@/shared/components/Button"
import { Tags } from "@/shared/components/Tags"
import { Job } from "@/module/job/types/job";
import { useRouter } from "next/navigation";

interface JobCardDetailProps extends React.HTMLAttributes<HTMLDivElement> {
  job: Job | null;
}

export const JobCardDetail = ({ job }: JobCardDetailProps): React.JSX.Element => {
  const router = useRouter();

  return <>
    <div className="hidden lg:block w-full lg:w-3/4 h-full">
      {job === null ? (
        <div className="w-full h-full border border-neutral-40 rounded-lg flex items-center justify-center">
          <h5 className="text-m text-neutral-80">Select a job to see the details</h5>
        </div>
      ) :
        <div className="w-full border border-neutral-40 rounded-lg p-6 h-full">
          <div className="w-full flex flex-wrap items-start justify-between space-y-6 sm:space-y-0">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 border border-neutral-40 rounded-sm flex items-center justify-center">
                <img src="/logo.png" alt="jobs-icon" className="w-full"></img>
              </div>
              <div className="space-y-2">
                <Tags text={'Full Time'} />
                <h2 className="font-bold text-xl">{job?.title}</h2>
                <h5 className="font-normal text-neutral-70 text-m">Rakamin</h5>
              </div>
            </div>
            <Button onClick={() => router.replace(`/dashboard/user/apply/${job.id}`)} variant="secondary" className="w-full sm:w-auto">Apply</Button>
          </div>
          <hr className="border-t border-neutral-40 my-6" />
          <ul className="list-disc text-m font-normal list-inside">
            {
              job?.description.map((desc, index) =>
                <li key={index}>{desc}</li>
              )
            }
          </ul>
        </div>
      }
    </div>
  </>
}
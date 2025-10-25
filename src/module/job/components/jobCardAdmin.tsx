import { Icon } from "@iconify/react"
import { Job } from "@/module/job/types/job";
import classNames from "classnames";
import { Tags } from "@/shared/components/Tags";
import { Button } from "@/shared/components/Button";

interface JobCardAdminProps extends React.HTMLAttributes<HTMLDivElement> {
  job: Job;
  onClick?: () => void;
}

export const JobCardAdmin = ({ job, onClick }: JobCardAdminProps): React.JSX.Element => {
  return (
    <div className="w-full p-6 rounded-lg cursor-pointer shadow-md" onClick={onClick}>
      <div className="flex justify-between items-end">
        <div className="space-x-4 space-y-3">
          <Tags text={job.list_card.badge} variant="outline" type="success"/>
          <div className="border inline-flex border-neutral-40 rounded-sm px-4 py-1 text-m text-neutral-90 h-auto">
            {job.list_card.started_on_text}
          </div>
          <h4 className="text-xl font-bold">{job.title}</h4>
          <p className="text-l text-neutral-80">{job.salary_range.display_text}</p>
        </div>
        <Button>{job.list_card.cta}</Button> 
      </div>
    </div>
  )
}
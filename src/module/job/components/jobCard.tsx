import { Icon } from "@iconify/react"

export const JobCard = (): React.JSX.Element => {
  return (
    <div className="w-full border-2 border-primary py-3 px-4 rounded-lg bg-primary-surface cursor-pointer">
      <div className="flex flex-row space-x-4">
        <div className="w-12 h-12 border border-neutral-40 rounded-sm flex items-center justify-center">
          <img src="/logo.png" alt="jobs-icon" className="w-full"></img>
        </div>
        <div className="space-y">
          <h5 className="text-l font-bold">UX Designer</h5>
          <h5 className="text-m font-normal text-neutral-90">Rakamin</h5>
        </div>
      </div>
      <hr className="border-t border-dashed border-neutral-40 my-2" />
      <div className="space-y-2">
        <div className="flex flex-row space-x-1 items-center">
          <Icon icon="uil:location-point" className="text-xl text-neutral-80" />
          <h5 className="text-s text-neutral-80">Jakarta Selatan</h5>
        </div>
        <div className="flex flex-row space-x-1 items-center">
          <Icon icon="uil:money-bill" className="text-xl text-neutral-80" />
          <h5 className="text-s text-neutral-80">Rp7.000.000 - Rp15.000.000</h5>
        </div>
      </div>
    </div>
  )
}
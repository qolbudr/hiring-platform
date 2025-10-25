import { zodResolver } from "@hookform/resolvers/zod";
import { CreateJobFromValues, createJobSchema } from "../schema/job.schema";
import { useForm } from "react-hook-form";
import { Modal } from "@/shared/components/Modal";
import { Button } from "@/shared/components/Button";
import { useJobStore } from "../store/job.store";
import { Input } from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import { TextArea } from "@/shared/components/TextArea";
import { Chip } from "@/shared/components/Chip";

export const ModalCreateJob = () => {
  const store = useJobStore();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<CreateJobFromValues>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      jobType: "full_time",
    },
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  return (
    <Modal
      identifier="create-job"
      title="Job Details"
      cta={[
        <Button onClick={handleSubmit(store.handleCreateJob)} type="submit">Publish Job</Button>
      ]}
    >
      <div className="py-4 px-6 space-y-4">
        <Input
          label="Job Name"
          placeholder="Ex. Front End Engineer"
          {...register("jobName")}
          error={errors.jobName?.message}
          required
        />
        <Select
          {...register("jobType")}
          label="Job Type"
          value={watch("jobType")}
          placeholder="Select job type"
          onSelectValue={(val) => setValue("jobType", val as CreateJobFromValues["jobType"])}
          options={[
            { label: 'Full-time', value: 'full_time' },
            { label: 'Contract', value: 'contract' },
            { label: 'Part-time', value: 'part_time' },
            { label: 'Internship', value: 'internship' },
            { label: 'Freelance', value: 'freelance' },
          ]}
          required
        />
        <TextArea
          rows={5}
          label="Job Description"
          placeholder="Ex." {...register("jobDescription")}
          error={errors.jobDescription?.message}
          required
        />
        <Input
          label="Number of Candidate Needed"
          placeholder="Ex. 2"
          {...register("candidatesNeeded", { valueAsNumber: true })}
          error={errors.candidatesNeeded?.message}
          required
        />
        <hr className="border-t border-dashed border-neutral-40 my-4" />
        <label className="block mb-4 text-s">Job Salary</label>
        <div className="flex space-x-4">
          <Input
            label="Minimum Estimated Salary"
            placeholder="Ex. $50,000"
            {...register("minSalary", { valueAsNumber: true })}
            error={errors.minSalary?.message}
            required
          />
          <Input
            label="Maximum Estimated Salary"
            placeholder="Ex. $70,000"
            {...register("maxSalary", { valueAsNumber: true })}
            error={errors.maxSalary?.message}
            required
          />
        </div>
        <div className="border rounded-lg border-neutral-30 p-4">
          <h4 className="text-m font-bold">Minimum Profile Information Required</h4>
          {
            store.field.map((field, index) =>
              <div key={index} className={`py-4 ${index != store.field.length - 1 ? 'border-b' : ''} border-neutral-40`}>
                <div className="flex items-center space-x-2 mb-2">
                  <p className="text-m flex-1">{field.key.replaceAll('_', ' ').capitalizeWords()}</p>
                  <Chip onClick={() => store.setRequiredField(field.key, true)} label="Mandatory" active={field.validation.required === true} />
                  <Chip onClick={() => store.setRequiredField(field.key, false)} label="Optional" disabled={['full_name', 'email', 'photo_profile'].includes(field.key)} active={field.validation.required === false} />
                  <Chip onClick={() => store.setRequiredField(field.key, undefined)} label="Off" disabled={['full_name', 'email', 'photo_profile'].includes(field.key)} active={field.validation.required === undefined} />
                </div>
              </div>
            )
          }
        </div>
      </div>
    </Modal>
  )
}
'use client';

import { useAuthStore } from "@/module/auth/store/auth.store";
import { buildApplicationSchema } from "@/module/job/schema/apply.schema";
import { useJobStore } from "@/module/job/store/job.store";
import { Button } from "@/shared/components/Button";
import { DatePicker } from "@/shared/components/DatePicker";
import { Input } from "@/shared/components/Input";
import { Loader } from "@/shared/components/Loader";
import { ModalPhotoPicker } from "@/shared/components/ModalPhotoPicker";
import { PhoneInput } from "@/shared/components/PhoneInput";
import { RadioSelector } from "@/shared/components/RadioSelector";
import Select from "@/shared/components/Select";
import { useModalStore } from "@/shared/store/modal.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ApplyPageProps {
  params: Promise<{ id: string }>;
}

const Apply = ({ params }: ApplyPageProps): React.JSX.Element => {
  const [schema, setSchema] = useState<z.ZodObject<any> | null>(null);
  const { id } = React.use(params);
  const store = useJobStore();
  const modal = useModalStore();
  const router = useRouter();
  const authStore = useAuthStore();

  useEffect(() => {
    async function fetchData() {
      const job = await store.detailJob(id);
      if (job) {
        const builtSchema = buildApplicationSchema(job);
        setSchema(builtSchema);
      }
    }

    fetchData();
  }, [])

  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<z.infer<ReturnType<typeof buildApplicationSchema>>>({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onChange",
    defaultValues: {
      gender: 'female',
    },
    reValidateMode: "onBlur",
  });

  const isFormRequired = (key: string): boolean => {
    return store.job?.application_form?.sections[0].fields.find(f => f.key === key)?.validation.required || false;
  }

  const isFormOff = (key: string): boolean => {
    return !(store.job?.application_form?.sections[0].fields.find(f => f.key === key)?.validation.required !== null);
  }

  const onSubmit = async (data: any) => {
    await store.applyJob(id, authStore.user?.id ?? '', data);
    reset();
    router.replace('/dashboard/user/apply/success');
  }

  const openPhotoPicker = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    modal.openModal('photo-picker-modal');
  }

  return <>
    <ModalPhotoPicker {...register('photo_profile')} onChange={(photo) => setValue('photo_profile', photo)} />
    <div className="flex flex-col w-full mx-auto pt-28 pb-10 h-full">
      <div className="w-full h-full max-w-3xl flex-1 px-4 mx-auto">
        {
          store.status.isLoading &&
          <div className="flex w-full h-full justify-center items-center">
            <Loader />
          </div>
        }
        {
          store.status.isSuccess && store.job &&
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full h-full flex flex-col border border-neutral-40">
              <div className="space-x-4 flex items-center pt-10 px-10">
                <button onClick={() => router.back()} className="size-7 rounded-lg cursor-pointer border border-neutral-40 flex items-center justify-center shadow-sm">
                  <Icon icon="uil:arrow-left" className="size-7" />
                </button>
                <h3 className="text-xl font-bold flex-1">Apply {store.job.title} Rakamin</h3>
                <p className="text-m">ℹ️ This field required to fill</p>
              </div>
              <div className="mt-6 space-y-4 px-10 pb-10 flex-1 overflow-auto">
                <p className="text-danger-main text-s font-bold">* Required</p>
                <div className="space-y-2" {...register('photo_profile')}>
                  <label className="block text-s font-bold">Photo Profile</label>
                  <img src={watch('photo_profile') ? watch('photo_profile') as string : `https://ui-avatars.com/api/?name=${authStore.user?.name}`} alt="upload-photo" className="size-32 object-cover rounded-full" />
                  <Button onClick={openPhotoPicker} icon="uil:upload" className="shadow-sm" variant="outline">Take a Picture</Button>
                  {errors.photo_profile?.message && <p className="mt-1 text-red-500 text-s">{errors.photo_profile?.message}</p>}

                </div>
                {!isFormOff('full_name') &&
                  <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    {...register('full_name')}
                    error={errors.full_name?.message as string | undefined}
                    isRequired={isFormRequired('full_name')}
                  />
                }
                {!isFormOff('date_of_birth') &&
                  <DatePicker
                    label="Date of birth"
                    onChangeDate={(date) => {
                      const formattedDate = date.toISOString().split('T')[0];
                      setValue('date_of_birth', formattedDate);
                    }}
                    {...register('date_of_birth')}
                    error={errors.date_of_birth?.message as string | undefined}
                    required={isFormRequired('date_of_birth')}
                  />
                }
                {!isFormOff('gender') &&
                  <RadioSelector
                    value={watch('gender') as string | undefined}
                    onChange={(val) => setValue('gender', val)}
                    label="Pronoun (gender)"
                    required={isFormRequired('gender')}
                    options={
                      [
                        { label: "She/her (Female)", value: "female" },
                        { label: "He/him (Male)", value: "male" }
                      ]
                    }
                  />
                }
                {!isFormOff('domicile') &&
                  <Select
                    {...register('domicile')}
                    value={watch('domicile') as string | undefined}
                    errorMessage={errors.domicile?.message as string | undefined}
                    label="Domicile"
                    isRequired={isFormRequired('domicile')}
                    placeholder="Choose your domicile"
                    options={[
                      { label: 'Kabupaten Aceh Barat - Aceh', value: 'Kabupaten Aceh Barat - Aceh' },
                      { label: 'Kabupaten Badung - Bali', value: 'Kabupaten Badung - Bali' },
                      { label: 'Kabupaten Bantul - DI Yogyakarta', value: 'Kabupaten Bantul - DI Yogyakarta' },
                    ]}
                    onSelectValue={(v) => setValue('domicile', v)}
                  />
                }
                {!isFormOff('phone_number') &&
                  <PhoneInput
                    label="Phone Number"
                    onChangePhone={(value) => setValue('phone_number', value)}
                    error={errors.phone_number?.message as string | undefined}
                    required={isFormRequired('phone_number')}
                  />
                }
                {!isFormOff('email') &&
                  <Input
                    label="Email"
                    {...register('email')}
                    error={errors.email?.message as string | undefined}
                    placeholder="Enter your email address"
                    isRequired={isFormRequired('email')}
                  />
                }
                {!isFormOff('linkedin_link') &&
                  <Input
                    label="Link Linkedin"
                    {...register('linkedin_link')}
                    error={errors.linkedin_link?.message as string | undefined}
                    placeholder="https://linkedin.com/in/username"
                    isRequired={isFormRequired('linkedin_link')}
                  />
                }
              </div>
              <hr className="border-t border-neutral-40" />
              <div className="py-6 px-10 flex justify-end">
                <Button type="submit" variant="secondary" size="large">{store.applyStatus.isLoading ? 'Submitting...' : 'Submit Application'}</Button>
              </div>
            </div>
          </form >
        }
      </div>
    </div>
  </>
}

export default Apply;
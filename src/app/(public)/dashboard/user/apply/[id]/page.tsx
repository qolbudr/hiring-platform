'use client';

import { Button } from "@/shared/components/Button";
import { DatePicker } from "@/shared/components/DatePicker";
import { Input } from "@/shared/components/Input";
import { PhoneInput } from "@/shared/components/PhoneInput";
import { RadioSelector } from "@/shared/components/RadioSelector";
import Select from "@/shared/components/Select";
import { Icon } from "@iconify/react";
import React from "react";

interface ApplyPageProps {
  params: Promise<{ id: string }>;
}

const Apply = ({ params }: ApplyPageProps): React.JSX.Element => {
  const { id } = React.use(params);

  return <>
    <div className="flex flex-col w-full mx-auto pt-28 pb-10 h-full">
      <div className="w-full h-full max-w-3xl flex-1 px-4 mx-auto">
        <div className="w-full h-full flex flex-col border border-neutral-40">
          <div className="space-x-4 flex items-center pt-10 px-10">
            <button className="size-7 rounded-lg cursor-pointer border border-neutral-40 flex items-center justify-center shadow-sm">
              <Icon icon="uil:arrow-left" className="size-7" />
            </button>
            <h3 className="text-xl font-bold flex-1">Apply Front End at Rakamin</h3>
            <p className="text-m">ℹ️ This field required to fill</p>
          </div>
          <div className="mt-6 space-y-4 px-10 pb-10 flex-1 overflow-auto">
            <p className="text-danger-main text-s font-bold">* Required</p>
            <div className="space-y-2">
              <label className="block text-s font-bold">Photo Profile</label>
              <img src="https://ui-avatars.com/api/?name=User" alt="upload-photo" className="size-32 rounded-full" />
              <Button icon="uil:upload" className="shadow-sm" variant="outline">Take a Pitcure</Button>
            </div>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              required
            />
            <DatePicker label="Date of birth" required />
            <RadioSelector 
              label="Pronoun (gender)"
              required
              options={
                [
                  { label: "She/her (Female)", value: "female" },
                  { label: "He/him (Male)", value: "male" }
                ]
              }
            />
            <Select
              label="Domicile"
              required
              placeholder="Choose your domicile"
              options={[
                { label: 'Kabupaten Aceh Barat - Aceh', value: 'Kabupaten Aceh Barat - Aceh' },
                { label: 'Kabupaten Badung - Bali', value: 'Kabupaten Badung - Bali' },
                { label: 'Kabupaten Bantul - DI Yogyakarta', value: 'Kabupaten Bantul - DI Yogyakarta' },
              ]}
              onSelectValue={(v) => { }}
            />
            <PhoneInput
              label="Phone Number"
              required
            />
            <Input
              label="Email"
              placeholder="Enter your email address"
              required
            />
            <Input
              label="Link Linkedin*"
              placeholder="https://linkedin.com/in/username"
              required
            />
          </div>
          <hr className="border-t border-neutral-40" />
          <div className="py-6 px-10 flex justify-end">
            <Button variant="secondary" size="large">Submit Application</Button>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Apply;
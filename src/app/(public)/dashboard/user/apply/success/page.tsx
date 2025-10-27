'use client';

import { Button } from "@/shared/components/Button";
import { useRouter } from "next/navigation";

export const Success: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full mx-auto pt-28 pb-10 h-full">
      <div className="w-full h-full flex justify-center items-center">
        <div className="space-y-2 flex flex-col items-center text-center">
          <img src="/illustration/success.png" alt="success-illustration" className="w-48 mx-auto" />
          <h2 className="text-2xl font-bold">🎉 Your application was sent!</h2>
          <h4 className="text-l">Congratulations! You've taken the first step towards a rewarding career at Rakamin.<br/>We look forward to learning more about you during the application process.</h4>
          <Button className="mt-3" onClick={() => router.replace('/dashboard/user/joblist')} size="large">Go to Dashboard</Button>
        </div>
      </div>
    </div>
  );
}

export default Success;
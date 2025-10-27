'use client'

import React, { useEffect, useMemo } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useApplicationStore } from "@/module/applications/store/applications.store";
import { Loader } from "@/shared/components/Loader";

interface ApplicationsPageProps {
  params: Promise<{ id: string }>;
}

const Applications = ({ params }: ApplicationsPageProps): React.JSX.Element => {
  const { id } = React.use(params);
  const store = useApplicationStore();

  useEffect(() => {
    store.getApplicationsByJobId(id);
  }, [])

  const data = useMemo(
    () =>
      store.applications.map((application) =>
        application.attributes.reduce((acc, attr) => {
          acc[attr.key] = attr.value;
          return acc;
        }, {} as Record<string, string>)
      ),
    [store.applications]
  );

  const columns = useMemo(() => {
    if (!store.applications.length) return [];

    return store.applications[0].attributes
      .filter((attr) => attr.key !== "photo_profile")
      .sort((a, b) => a.order - b.order)
      .map((attr) => ({
        accessorKey: attr.key,
        header: attr.label,
        cell: (info: any) => {
          const value = info.getValue();

          if (attr.key === "gender" && typeof value === "string") {
            return value.capitalizeWords()
          }

          if (attr.key === "date_of_birth" && value) {
            const date = new Date(value);
            return new Intl.DateTimeFormat("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }).format(date);
          }

          if (typeof value === "string" && value.startsWith("http")) {
            return (
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                {value}
              </a>
            );
          }

          return value;
        },
      }));
  }, [store.applications]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col w-full mx-auto py-8 mt-10 h-full">
      <div className="w-full h-full max-w-7xl mt-8 flex-1 px-4 mx-auto">
        {
          store.status.isLoading &&
          <div className="flex w-full h-full justify-center items-center">
            <Loader />
          </div>
        }
        {
          store.status.isEmpty &&
          <div className="flex flex-col w-full h-full justify-center items-center">
            <img src="/illustration/no_applicants.png" alt="empty-illustration" className="w-[300px] mb-4" />
            <div className="text-center">
              <h3 className="font-bold">No candidates found</h3>
              <h3 className="text-m font-normal text-neutral-70">Share your job vacancies so that more candidates will apply.</h3>
            </div>
          </div>
        }
        {store.status.isSuccess && !(store.applications.length === 0) &&
          <>
            <h2 className="text-xl font-bold mb-6">Frontend Developer</h2>
            <div className="p-6 border border-neutral-40 rounded-lg shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600 uppercase text-s font-bold">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th key={header.id} className="p-3 text-left border-b border-neutral-30">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody className="text-gray-700">
                    {table.getRowModel().rows.map((row, idx) => (
                      <tr
                        key={row.id}
                        className={`hover:bg-gray-50 cursor-pointer ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                          }`}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="p-3 border-b border-neutral-30">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  );
}

export default Applications;
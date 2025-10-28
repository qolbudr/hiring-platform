'use client'

import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnOrderState,
  SortingState,
} from "@tanstack/react-table";
import { useApplicationStore } from "@/module/applications/store/applications.store";
import { Loader } from "@/shared/components/Loader";
import { Input } from "@/shared/components/Input";
import { Icon } from "@iconify/react";
import { Button } from "@/shared/components/Button";

interface ApplicationsPageProps {
  params: Promise<{ id: string }>;
}

const Applications = ({ params }: ApplicationsPageProps): React.JSX.Element => {
  const { id } = React.use(params);
  const store = useApplicationStore();

  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const dragCol = useRef<string | null>(null);

  useEffect(() => {
    store.getApplicationsByJobId(id);
  }, []);

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
            return value.replace(/\b\w/g, (c) => c.toUpperCase());
          }

          if ((attr.key === "date_of_birth" || attr.key === "applied_on") && value) {
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
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    state: {
      columnOrder,
      sorting,
      globalFilter,
    },
    onColumnOrderChange: setColumnOrder,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 10,
      }
    }
  });

  useEffect(() => {
    if (columns.length && columnOrder.length === 0) {
      setColumnOrder(columns.map((col) => col.accessorKey as string));
    }
  }, [columns]);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    columnId: string
  ) => {
    dragCol.current = columnId;
    e.dataTransfer.effectAllowed = "move";
  };

  function handleDrop(
    e: React.DragEvent<HTMLTableHeaderCellElement>,
    targetColumnId: string
  ): void {
    e.preventDefault();
    const sourceColumnId = dragCol.current;
    if (!sourceColumnId || sourceColumnId === targetColumnId) return;

    const newOrder = [...columnOrder];
    const fromIndex = newOrder.indexOf(sourceColumnId);
    const toIndex = newOrder.indexOf(targetColumnId);

    if (fromIndex < 0 || toIndex < 0) return;

    newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, sourceColumnId);

    setColumnOrder(newOrder);
    dragCol.current = null;
  }

  return (
    <div className="flex flex-col w-full mx-auto py-8 mt-10 h-full">
      <div className="w-full h-full max-w-7xl mt-8 flex-1 px-4 mx-auto">
        {store.status.isLoading && (
          <div className="flex w-full h-full justify-center items-center">
            <Loader />
          </div>
        )}

        {store.status.isEmpty && (
          <div className="flex flex-col w-full h-full justify-center items-center">
            <img
              src="/illustration/no_applicants.png"
              alt="empty-illustration"
              className="w-[300px] mb-4"
            />
            <div className="text-center">
              <h3 className="font-bold">No candidates found</h3>
              <h3 className="text-m font-normal text-neutral-70">
                Share your job vacancies so that more candidates will apply.
              </h3>
            </div>
          </div>
        )}

        {store.status.isSuccess && store.applications.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-6">Frontend Developer</h2>

            <div className="mb-4">
              <Input
                type="text"
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search candidates..."
                className="w-64"
              />
            </div>

            <div className="p-6 border border-neutral-40 rounded-lg shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600 uppercase text-s font-bold">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="text-left border-b border-neutral-30 relative group select-none"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDrop(e, header.column.id)}
                            style={{ width: header.getSize() }}
                          >
                            <div
                              draggable
                              onDragStart={(e) =>
                                handleDragStart(e, header.column.id)
                              }
                              className="cursor-move p-3 flex items-center justify-between gap-1"
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              {{
                                asc: <Icon icon="mdi:arrow-up" />,
                                desc: <Icon icon="mdi:arrow-down" />,
                              }[header.column.getIsSorted() as string] ?? null}
                            </div>

                            {header.column.getCanResize() && (
                              <div
                                onMouseDown={header.getResizeHandler()}
                                onTouchStart={header.getResizeHandler()}
                                className={`absolute top-0 right-0 h-full w-1 cursor-col-resize bg-transparent group-hover:bg-gray-300 ${header.column.getIsResizing()
                                    ? "bg-primary"
                                    : ""
                                  }`}
                              ></div>
                            )}
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
                          <td
                            key={cell.id}
                            style={{ width: cell.column.getSize() }}
                            className="p-3 border-b border-neutral-30"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between text-m items-center mt-4">
                <div>
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </div>
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
                  <Button variant="outline" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Applications;

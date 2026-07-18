"use client";

import JobCard from "./JobCard";
import { useSearchParams } from "next/navigation";
import { getAllJobsAction } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import { Loader2, SearchX } from "lucide-react";
import ButtonContainer from "./ButtonContainer";

const JobsList = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const jobStatus = searchParams.get("jobStatus") || "all";
  const pageNumber = Number(searchParams.get("page")) || 1;

  const { data, isPending } = useQuery({
    queryKey: ["jobs", search, jobStatus, pageNumber],
    queryFn: () => getAllJobsAction({ search, jobStatus, page: pageNumber }),
  });

  const jobs = data?.jobs || [];
  const count = data?.count || 0;
  const page = data?.page || 0;
  const totalPages = data?.totalPages || 0;

  if (isPending)
    return (
      <div className="py-20 text-center">
        <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading jobs...</p>
      </div>
    );

  if (jobs.length < 1)
    return (
      <div className="rounded-2xl border border-dashed p-20 text-center">
        <SearchX className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

        <h3 className="text-xl font-semibold">No jobs found</h3>

        <p className="mt-2 text-muted-foreground">
          Try changing your search or filters.
        </p>
      </div>
    );

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold capitalize ">
          {count} jobs found
        </h2>
        {totalPages < 2 ? null : (
          <ButtonContainer currentPage={page} totalPages={totalPages} />
        )}
      </div>
      <div className="grid md:grid-cols-2  gap-8">
        {jobs.map((job) => {
          return <JobCard key={job.id} job={job} />;
        })}
      </div>
    </>
  );
};

export default JobsList;

"use client";

import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobStatus } from "@/utils/types";

const SearchForm = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const jobStatus = searchParams.get("jobStatus") || "all";

  const pathname = usePathname();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();

    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    const jobStatus = formData.get("jobStatus") as string;
    params.set("search", search);
    params.set("jobStatus", jobStatus);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-10 rounded-2xl border bg-card p-6 shadow-sm"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Search Jobs</h2>
          <p className="text-sm text-muted-foreground">
            Filter your applications
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[2fr_1fr_auto]">
        <Input
          name="search"
          defaultValue={search}
          placeholder="Search by company or position..."
          className="h-11 rounded-xl"
        />

        <Select defaultValue={jobStatus} name="jobStatus">
          <SelectTrigger className="h-11 rounded-xl capitalize">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {["all", ...Object.values(JobStatus)].map((status) => (
              <SelectItem key={status} value={status} className="capitalize">
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button type="submit" className="h-11 rounded-xl px-8 cursor-pointer">
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;

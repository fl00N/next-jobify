import { JobStatus, JobType } from "@/utils/types";
import {
  Building2,
  CalendarClock,
  BriefcaseBusiness,
  MapPinned,
  Pencil,
} from "lucide-react";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import JobInfo from "./JobInfo";
import DeleteJobBtn from "./DeleteJobBtn";
import { cn } from "@/lib/utils";

function JobCard({ job }: { job: JobType }) {
  const date = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(job.createdAt));

  const statusClasses = {
    pending:
      "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/20",

    interview:
      "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/15 dark:text-blue-400 dark:border-blue-500/20",

    offer:
      "bg-green-100 text-green-700 border-green-200 dark:bg-green-500/15 dark:text-green-400 dark:border-green-500/20",

    declined:
      "bg-red-100 text-red-700 border-red-200 dark:bg-red-500/15 dark:text-red-400 dark:border-red-500/20",
  } as const;

  return (
    <Card className="overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl capitalize">{job.position}</CardTitle>

            <CardDescription className="mt-2 flex items-center gap-2 text-sm">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              {job.company}
            </CardDescription>
          </div>

          <Badge
            variant="outline"
            className={cn(
              "rounded-full border p-3 text-xs font-semibold capitalize",
              statusClasses[job.status as JobStatus],
            )}
          >
            {job.status}
          </Badge>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="grid grid-cols-2 gap-x-6 gap-y-5 py-6 text-sm">
        <JobInfo
          icon={<MapPinned className="h-4 w-4 text-primary" />}
          text={job.location}
        />
        <JobInfo
          icon={<BriefcaseBusiness className="h-4 w-4 text-primary" />}
          text={job.mode}
        />
        <JobInfo
          icon={<CalendarClock className="h-4 w-4 text-primary" />}
          text={date}
        />
      </CardContent>
      <CardFooter className="flex justify-end gap-3 border-t bg-muted/20 p-5">
        <Button asChild size="sm" variant="outline">
          <Link href={`/jobs/${job.id}`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
        <DeleteJobBtn id={job.id} />
      </CardFooter>
    </Card>
  );
}
export default JobCard;

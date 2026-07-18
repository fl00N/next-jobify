import { Skeleton } from "@/components/ui/skeleton";

function LoadingJobs() {
  return (
    <div className="space-y-10">
      <Skeleton className="h-42 w-full rounded-2xl" />

      <div className="grid gap-6 md:grid-cols-2">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="space-y-5 rounded-2xl border p-6">
            <Skeleton className="h-7 w-2/3" />
            <Skeleton className="h-4 w-1/3" />

            <div className="grid grid-cols-2 gap-4 pt-4">
              <Skeleton className="h-10 rounded-xl" />
              <Skeleton className="h-10 rounded-xl" />
              <Skeleton className="h-10 rounded-xl" />
              <Skeleton className="h-10 rounded-xl" />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Skeleton className="h-10 w-20 rounded-xl" />
              <Skeleton className="h-10 w-20 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoadingJobs;

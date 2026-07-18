import { Card, CardContent } from "@/components/ui/card";

import { Skeleton } from "./ui/skeleton";

const StatsLoading = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div className="space-y-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-14" />
        </div>

        <Skeleton className="h-16 w-16 rounded-2xl" />
      </CardContent>
    </Card>
  );
};

export default StatsLoading;

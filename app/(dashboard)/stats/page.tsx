import ChartsContainer from "@/components/ChartsContainer";
import StatsContainer from "@/components/StatsContainer";
import { getChartsAction, getStatsAction } from "@/utils/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const StatsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["stats"],
    queryFn: () => getStatsAction(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["charts"],
    queryFn: () => getChartsAction(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="space-y-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

          <p className="mt-2 text-muted-foreground">
            Track your job search progress at a glance.
          </p>
        </div>

        <StatsContainer />

        <ChartsContainer />
      </section>
    </HydrationBoundary>
  );
};

export default StatsPage;

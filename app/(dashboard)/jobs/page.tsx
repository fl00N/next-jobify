import JobsList from "@/components/JobsList";
import SearchForm from "@/components/SearchForm";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAllJobsAction } from "@/utils/actions";
import { Suspense } from "react";
import LoadingJobs from "@/components/LoadingJobs";

const AllJobsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["jobs", "", "all", 1],
    queryFn: () => getAllJobsAction({}),
  });

  return (
    <Suspense fallback={<LoadingJobs />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SearchForm />
        <JobsList />
      </HydrationBoundary>
    </Suspense>
  );
};

export default AllJobsPage;

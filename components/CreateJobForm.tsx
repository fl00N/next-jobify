"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BriefcaseBusiness, Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { CustomFormField, CustomFormSelect } from "./FormComponents";
import { Button } from "@/components/ui/button";
import { createJobAction } from "@/utils/actions";
import {
  createAndEditJobSchema,
  type CreateAndEditJobType,
  JobMode,
  JobStatus,
} from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function CreateJobForm() {
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    },
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) => createJobAction(values),

    onSuccess: async (data) => {
      if (!data) {
        toast.error("There was an error creating the job.");
        return;
      }

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["jobs"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["stats"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["charts"],
        }),
      ]);

      toast.success("Job created successfully");
      router.push("/jobs");
    },

    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  function onSubmit(values: CreateAndEditJobType) {
    mutate(values);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border bg-card shadow-sm"
    >
      <div className="flex items-start justify-between gap-6 border-b bg-muted/20 p-6 md:p-8">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            New application
          </p>

          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Add a job
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Add the details of a position you have applied for and keep track of
            its progress.
          </p>
        </div>

        <div className="hidden rounded-2xl bg-primary/10 p-3 text-primary sm:block">
          <BriefcaseBusiness className="size-6" />
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid items-start gap-x-6 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
          <CustomFormField
            name="position"
            control={form.control}
            placeholder="e.g. Frontend Developer"
          />

          <CustomFormField
            name="company"
            control={form.control}
            placeholder="e.g. OpenAI"
          />

          <CustomFormField
            name="location"
            control={form.control}
            placeholder="e.g. London, UK"
          />

          <CustomFormSelect
            name="status"
            control={form.control}
            labelText="Job status"
            placeholder="Select a status"
            items={Object.values(JobStatus)}
          />

          <CustomFormSelect
            name="mode"
            control={form.control}
            labelText="Job mode"
            placeholder="Select a working mode"
            items={Object.values(JobMode)}
          />

          <div className="flex h-full items-end">
            <Button
              type="submit"
              disabled={isPending}
              className="h-11 w-full cursor-pointer rounded-xl font-medium shadow-sm"
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Creating job...
                </>
              ) : (
                <>
                  <Plus className="size-4" />
                  Create job
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreateJobForm;

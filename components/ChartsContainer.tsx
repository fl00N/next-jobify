"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import ChartCard from "./ChartsCard";
import { useQuery } from "@tanstack/react-query";
import { getChartsAction } from "@/utils/actions";
import { BarChart3, Loader2 } from "lucide-react";

const chartConfig = {
  count: {
    label: "Applications",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const ChartsContainer = () => {
  const { data, isPending } = useQuery({
    queryKey: ["charts"],
    queryFn: () => getChartsAction(),
  });

  if (isPending)
    return (
      <div className="flex h-80 items-center justify-center">
        <Loader2 className="mr-3 h-6 w-6 animate-spin text-primary" />
        <span className="text-muted-foreground">Loading chart...</span>
      </div>
    );

  return (
    <ChartCard
      title="Applications by Month"
      description="Track how many applications you've submitted over the last six months."
    >
      {!data || data?.length === 0 ? (
        <div className="flex h-80 flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/20">
          <BarChart3 className="mb-4 h-12 w-12 text-muted-foreground" />

          <h3 className="font-semibold">No chart data</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Add a few jobs to see your application trends.
          </p>
        </div>
      ) : (
        <ChartContainer config={chartConfig} className="h-105 w-full">
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 30,
              right: 20,
              bottom: 20,
              left: 0,
            }}
          >
            <CartesianGrid
              horizontal={false}
              strokeDasharray="4 4"
              stroke="var(--border)"
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{
                fill: "var(--muted-foreground)",
                fontSize: 12,
              }}
            />

            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{
                fill: "var(--muted-foreground)",
                fontSize: 12,
              }}
            />

            <ChartTooltip
              cursor={{ fill: "var(--muted)", opacity: 0.3 }}
              content={
                <ChartTooltipContent indicator="dot" className="rounded-xl" />
              }
            />
            <Bar
              dataKey="count"
              fill="var(--color-count)"
              radius={[8, 8, 0, 0]}
              maxBarSize={60}
            >
              <LabelList
                dataKey="count"
                position="top"
                fontSize={12}
                fontWeight={600}
                fill="var(--foreground)"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      )}
    </ChartCard>
  );
};

export default ChartsContainer;

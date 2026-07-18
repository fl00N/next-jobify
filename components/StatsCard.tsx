import { Card, CardContent } from "@/components/ui/card";
import { CalendarCheck2, CircleX, Clock3 } from "lucide-react";

type Props = {
  title: string;
  value: number;
};

const iconMap = {
  "pending jobs": Clock3,
  "interviews set": CalendarCheck2,
  "jobs declined": CircleX,
};

const colorMap = {
  "pending jobs": "bg-amber-500/10 text-amber-600",
  "interviews set": "bg-blue-500/10 text-blue-600",
  "jobs declined": "bg-red-500/10 text-red-600",
};

export default function StatsCard({ title, value }: Props) {
  const Icon = iconMap[title as keyof typeof iconMap];

  return (
    <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground capitalize">{title}</p>

          <h2 className="mt-2 text-4xl font-bold">{value}</h2>
        </div>

        <div
          className={`rounded-2xl p-4 ${
            colorMap[title as keyof typeof colorMap]
          }`}
        >
          <Icon className="h-7 w-7" />
        </div>
      </CardContent>
    </Card>
  );
}

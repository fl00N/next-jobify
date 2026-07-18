import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ChartCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const ChartCard = ({ title, description, children }: ChartCardProps) => {
  return (
    <Card className="group relative overflow-hidden border-border/60 bg-card/80 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-primary/70 to-primary/20" />

      <CardHeader className="space-y-2 px-6 pt-7">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />

          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Monthly Applications
          </span>
        </div>

        <CardTitle className="text-xl font-bold tracking-tight">
          {title}
        </CardTitle>

        <CardDescription className="leading-6">{description}</CardDescription>
      </CardHeader>

      <CardContent className="px-3 pb-5 sm:px-6">{children}</CardContent>
    </Card>
  );
};

export default ChartCard;

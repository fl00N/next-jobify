function JobInfo({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-lg bg-primary/10 p-2 text-primary">{icon}</div>

      <span className="text-sm text-muted-foreground capitalize">{text}</span>
    </div>
  );
}

export default JobInfo;

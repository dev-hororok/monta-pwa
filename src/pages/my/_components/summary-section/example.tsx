export const SummarySectionExaple = () => {
  return (
    <div className="flex gap-2 items-center">
      <div className="w-full flex flex-col items-center justify-center py-2 bg-foreground text-background rounded-md">
        <p>Today Focus</p>
        <p className="text-3xl">0</p>
        <p>0 min</p>
      </div>
      <div className="w-full flex flex-col items-center justify-center py-2 bg-background text-foreground rounded-md">
        <p>Monthly Focus</p>
        <p className="text-3xl">0</p>
        <p>0 min</p>
      </div>
    </div>
  );
};

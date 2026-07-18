import StatsLoading from "@/components/StatsLoading";

function loading() {
  return (
    <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
      <StatsLoading />
      <StatsLoading />
      <StatsLoading />
    </div>
  );
}
export default loading;

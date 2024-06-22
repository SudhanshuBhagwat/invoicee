import Spinner from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center mt-60">
      <div className="flex flex-col items-center space-y-2">
        <Spinner />
        <p>Loading your experience</p>
      </div>
    </div>
  );
}

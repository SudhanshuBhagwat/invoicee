import PreviewCreator from "./components/preview-creator";

export default function Page() {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold">Kitchen Sink</h2>
      <PreviewCreator />
    </div>
  );
}

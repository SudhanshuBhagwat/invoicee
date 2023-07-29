export default async function EntityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex h-screen dark:bg-gray-900`}>
      <div className="flex flex-col flex-1 w-full">
        {children}
      </div>
    </div>
  );
}

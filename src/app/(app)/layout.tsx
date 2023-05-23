import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import Sidebar from "@/components/sidebar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900`}>
      <Sidebar />

      <div className="flex flex-col flex-1 w-full">
        <div className="h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

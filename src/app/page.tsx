import Nav from "@/components/nav";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <div className={``}>
      <Nav user={data.user!} />
      <main className="px-4">HomePage</main>
    </div>
  );
}

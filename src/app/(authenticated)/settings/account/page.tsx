import { Separator } from "@/components/ui/separator";
import { AccountForm } from "../components/account-form";
import { getCurrentUser } from "@/services/database";
import { createClient } from "@/utils/supabase/server";

export default async function SettingsAccountPage() {
  const user = await getCurrentUser(createClient());

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set the details user details so that you
          don't have to invest time while invoicing.
        </p>
      </div>
      <Separator />
      <AccountForm user={user} />
    </div>
  );
}

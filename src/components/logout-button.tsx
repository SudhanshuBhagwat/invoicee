import { handleSignOut } from "@/auth";

export default function LogoutButton() {
  return (
    <form action={handleSignOut}>
      <button>Logout</button>
    </form>
  );
}

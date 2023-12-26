import { Stack, Text } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className={`grid grid-cols-2 gap-4 divide-x-2`}>
      <Stack spacing={3}>
        <Text fontSize="3xl" fontWeight={700}>
          HomePage
        </Text>
      </Stack>
    </div>
  );
}

import Nav from "@/components/nav";
import { Stack, Text } from "@chakra-ui/react";

export default async function Page() {
  return (
    <div className={``}>
      <Nav />
      <main className="px-4">
        <Stack spacing={3}>
          <Text fontSize="3xl" fontWeight={700}>
            HomePage
          </Text>
        </Stack>
      </main>
    </div>
  );
}

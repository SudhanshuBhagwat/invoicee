import { Stack, Text } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";

export default async function Page() {
  return (
    <div className={``}>
      <Navbar />
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

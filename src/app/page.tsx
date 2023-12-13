import Form, { IQuotation } from "@/components/Form";
import Preview from "@/components/Preview";
import TableForm from "@/components/table-form";
import { Entity } from "@/services/database";
import NotesEditor from "@/components/notes-editor";
import { INITIAL_STATE } from "@/store/store";
import { Stack, Text } from "@chakra-ui/react";

interface Props {
  params: { entity: Entity; id: string };
}

export default async function Page({ params }: Props) {
  const quotation: IQuotation = {
    ...INITIAL_STATE,
    note: "",
  };

  return (
    <div className={`grid grid-cols-2 gap-4 divide-x-2`}>
      {/* <Form initial={quotation} type={params.entity}>
        <TableForm />
        <NotesEditor notes={quotation.note} />
      </Form>
      <Preview isSaved={true} /> */}
      <Stack spacing={3}>
        <Text fontSize="3xl" fontWeight={700}>
          (5xl) In love with React & Next
        </Text>
      </Stack>
    </div>
  );
}

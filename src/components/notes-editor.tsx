"use client";

import store from "@/store/store";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import dynamic from "next/dynamic";
import { useState } from "react";
import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default function NotesEditor({ notes }: { notes: any }) {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromRaw(notes))
  );
  const updateNote = store((state) => state.updateNote);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-bold">Editor</p>
      <Editor
        toolbar={{
          options: ["inline", "list"],
          inline: {
            options: ["bold", "italic", "strikethrough"],
          },
          list: {
            options: ["unordered", "ordered"],
          },
        }}
        editorState={editorState}
        onEditorStateChange={(e) => {
          setEditorState(e);
          updateNote(convertToRaw(e.getCurrentContent()));
        }}
        toolbarClassName="border rounded"
        editorClassName="border rounded m-0 px-2"
      />
    </div>
  );
}

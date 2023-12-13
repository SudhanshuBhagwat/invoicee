"use client";

import { EditorState } from "draft-js";
import { useEffect, useState } from "react";
import { convertToHTML, convertFromHTML } from "draft-convert";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import store from "@/store/store";
import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default function NotesEditor({ notes }: { notes: string }) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const updateNote = store((state) => state.updateNote);

  useEffect(() => {
    const contentState = convertFromHTML(notes);
    setEditorState(EditorState.createWithContent(contentState));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // let html = convertToHTML(editorState.getCurrentContent());
      // updateNote(html);
    }
  }, [editorState]);

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
        onEditorStateChange={setEditorState}
        toolbarClassName="border rounded"
        editorClassName="border rounded m-0"
      />
    </div>
  );
}

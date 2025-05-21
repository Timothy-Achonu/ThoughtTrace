"use client";

import React from "react";
import { useAudioRecorder } from "../hooks";
import { Button } from "@/components";
import { MdKeyboardVoice } from "react-icons/md";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createNote } from "@/lib";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { CiTrash } from "react-icons/ci";
import { IoSend } from "react-icons/io5";

const RecordVoiceNote: React.FC = () => {
  const { isRecording, startRecording, stopRecording, discardRecording } =
    useAudioRecorder();

  const handleRecordToggle = () => {
    isRecording ? stopRecording() : startRecording();
  };

  return (
    <div className="">
      <Button
        type="button"
        intent={"outline"}
        className="border-none"
        onClick={handleRecordToggle}
      >
        {isRecording ? (
          "Stop Recording"
        ) : (
          <MdKeyboardVoice className="text-accent-blue text-[3rem] " />
        )}
      </Button>

      {isRecording && (
        <div className="absolute w-full left-0 right-0 top-0 bottom-0 bg-primary-intro flex justify-between px-2 items-center">
          <button type="button" onClick={discardRecording}>
            {" "}
            <CiTrash className="text-red-400 text-[2rem]" />
          </button>

          <button type="button" onClick={stopRecording}>
            {" "}
            <IoSend className="text-accent-blue text-[1.5rem]" />{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export { RecordVoiceNote };

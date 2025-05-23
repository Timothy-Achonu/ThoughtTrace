import { useState, useRef, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createNote, NotesGroupedByDateType, NoteType } from "@/lib";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import dayjs from "dayjs";
import { useNotesContext } from "../context";

const arrangeNotes = (
  notesGroupByDate: NotesGroupedByDateType[] | null,
  newNote: NoteType
) => {
  const today = dayjs().format("DD MMMM YYYY");
  const existingGroup = notesGroupByDate?.find((group) => group.day === today);
  if (existingGroup) {
    return (
      notesGroupByDate?.map((group) =>
        group.day === today
          ? {
              ...group,
              notes: [...group.notes, newNote],
            }
          : group
      ) || null
    );
  } else {
    return notesGroupByDate
      ? [...notesGroupByDate, { day: today, notes: [newNote] }]
      : notesGroupByDate;
  }
};

const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const shouldSaveRef = useRef<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { data: session } = useSession();
  const { setNotes, stateNotes } = useNotesContext();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      shouldSaveRef.current = true;
      setRecordingTime(0); // Reset time
      intervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;

        if (!shouldSaveRef.current) {
          audioChunksRef.current = [];
          setAudioBlob(null);
          setAudioURL(null);
          setRecordingTime(0);
          return;
        }

        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        setAudioBlob(audioBlob);
        const url = URL.createObjectURL(audioBlob);
        const newNote = {
          downloadURL: url,
          user_id: (session as Session).user.id as string,
        };
        console.log({ newNote });
        setAudioURL(url);
        setNotes((prev) => arrangeNotes(prev, newNote));

        const uploadAudioAndCreateNote = async () => {
          try {
            const storage = getStorage();
            const uniqueFileName = `audio/voice-note-${Date.now()}.webm`;
            const storageRef = ref(storage, uniqueFileName);
            const snapshot = await uploadBytes(storageRef, audioBlob);
            const downloadURL = await getDownloadURL(snapshot.ref);
            newNote.downloadURL = downloadURL;
            createNote(newNote);
          } catch (error) {
            console.error("Error uploading audio and creating note:", error);
          }
        };

        uploadAudioAndCreateNote();
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      shouldSaveRef.current = true;
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const discardRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      shouldSaveRef.current = false;
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    audioChunksRef.current = [];
    setAudioBlob(null);
    setAudioURL(null);
    setIsRecording(false);
    setRecordingTime(0);
  };

  return {
    isRecording,
    audioURL,
    audioBlob,
    recordingTime,
    startRecording,
    stopRecording,
    discardRecording,
  };
};

export { useAudioRecorder };

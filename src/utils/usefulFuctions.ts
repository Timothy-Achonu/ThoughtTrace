import { Timestamp } from "@/app/firebase/config";
import dayjs from "dayjs";

export const getFormattedDate = (date: Timestamp | string) => {
  if (!(date as Timestamp)?.seconds) {
    const dateIsSting = date as string;
    return {
      time: dayjs(dateIsSting).format("HH:mm"),
      day: dayjs(dateIsSting).format("DD MMMM YYYY"),
      fullDate: dayjs(dateIsSting).format(),
    };
  }
  const dateIsTimeStamp = date as Timestamp;

  const seconds = dateIsTimeStamp?.seconds || 0;
  const nanoseconds = dateIsTimeStamp?.nanoseconds || 0;
  // Convert to milliseconds
  const milliseconds = seconds * 1000 + nanoseconds / 1_000_000;

  // Create Date object
  const dateFromTimeStamp = new Date(milliseconds);
  return {
    time: dayjs(dateFromTimeStamp).format("HH:mm"),
    day: dayjs(dateFromTimeStamp).format("DD MMMM YYYY"),
    fullDate: dayjs(dateFromTimeStamp).format(),
  };
};

export function formatSecondsToMMSS(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return [
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");  
}


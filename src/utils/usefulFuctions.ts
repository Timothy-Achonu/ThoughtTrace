import { Timestamp } from "@/app/firebase/config";
import dayjs from "dayjs";

export const getFormattedDate = (timestamp: Timestamp) => {
  const seconds = timestamp?.seconds || 0;
  const nanoseconds = timestamp?.nanoseconds || 0;
  // Convert to milliseconds
  const milliseconds = seconds * 1000 + nanoseconds / 1_000_000;

  // Create Date object
  const date = new Date(milliseconds);
  return {
    time: dayjs(date).format("HH:mm"),
    day: dayjs(date).format("DD MMMM YYYY"),
    fullDate: dayjs(date).format(),
  };
};
  
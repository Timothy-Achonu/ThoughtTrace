import { Timestamp } from "@/app/firebase/config";
import dayjs from "dayjs";

export const getFormattedDate = (date: Timestamp | string) => {
  if (isTimestamp(date)) {
    const milliseconds = date.seconds * 1000 + date.nanoseconds / 1_000_000;
    const dateObj = new Date(milliseconds);
    return {
      time: dayjs(dateObj).format("HH:mm"),
      day: dayjs(dateObj).format("DD MMMM YYYY"),
      fullDate: dayjs(dateObj).format(),
    };
  } else {
    const stringDate = date as string;
    return {
      time: dayjs(stringDate).format("HH:mm"),
      day: dayjs(stringDate).format("DD MMMM YYYY"),
      fullDate: dayjs(stringDate).format(),
    };
  }
};

function isTimestamp(value: any): value is Timestamp {
  return (
    value &&
    typeof value === "object" &&
    typeof value.seconds === "number" &&
    typeof value.nanoseconds === "number"
  );
}

export function formatSecondsToMMSS(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return [
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");
}

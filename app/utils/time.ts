import type { Session } from "~/interfaces";

export const formatTime = (date: Date) =>
  date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

export const getTimeDiffInMinutes = (start: Date, end: Date) => {
  return Math.round((end.getTime() - start.getTime()) / 60_000);
};

export const formatDurationFromMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  minutes = minutes % 60;

  return hours > 0
    ? `${hours}h${String(minutes).padStart(2, "0")}m`
    : `${minutes}m`;
};

export const getTotalDuration = (sessions: Session[]) => {
  const totalMinutes = sessions.reduce((acc, session) => {
    return acc + getTimeDiffInMinutes(session.startTime, session.endTime ?? new Date());
  }, 0);
  return formatDurationFromMinutes(totalMinutes);
};

import { differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths } from "date-fns";
import { useMemo } from "react";


const useFormatDate = (date) => {
  const formattedDate = useMemo(() => {
    const now = new Date();
    const past = new Date(date);

    const minutes = differenceInMinutes(now, past);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = differenceInHours(now, past);
    if (hours < 24) return `${hours}h ago`;

    const days = differenceInDays(now, past);
    if (days < 30) return `${days}d ago`;

    const months = differenceInMonths(now, past);
    return `${months}mo ago`;
  }, [date]);

  return formattedDate;
};

export default useFormatDate;


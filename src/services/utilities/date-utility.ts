import { Dayjs } from "dayjs";

export const isBeforeDate = (d1: Dayjs | null, d2: Dayjs | null): boolean => {
  if (!d1 || !d2) return true;
  if (!d1.year() || !d1.month() || !d1.date) return true;
  if (!d2.year() || !d2.month() || !d2.date) return true;

  return d1.isBefore(d2);
};

export const calcTimeToLive = (expiry: Date | string): number => {
  const now = new Date();
  const expectedExpiry = new Date(expiry);
  return expectedExpiry.getTime() - now.getTime();
};

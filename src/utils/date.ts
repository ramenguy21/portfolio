// Dates are stored as ISO strings so they sort correctly; formatting is a
// display concern. UTC everywhere, so a reader's timezone can't shift a day.

export const formatShort = (iso: string) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", {
        timeZone: "UTC",
        month: "short",
        day: "2-digit",
      })
    : "";

/** For indexes spanning several years, where the day is noise. */
export const formatMonthYear = (iso: string) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", {
        timeZone: "UTC",
        month: "short",
        year: "numeric",
      })
    : "";

export const formatLong = (iso: string) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", {
        timeZone: "UTC",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

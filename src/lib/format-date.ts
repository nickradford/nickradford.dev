export const formatDate = (
  date: Date,
  options?: Intl.DateTimeFormatOptions
) => {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
    ...options,
  });
  return dateFormatter.format(date);
};

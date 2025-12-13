const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
});

const getLocalDate = (date: Date) => {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() + offset);
};

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const localDate = getLocalDate(dateObj);
  return dateFormatter.format(localDate);
}

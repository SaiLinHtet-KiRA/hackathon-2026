export default function formatDate(tDate) {
  const date = new Date(tDate);

  return date
    .toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(",", " ·");
}

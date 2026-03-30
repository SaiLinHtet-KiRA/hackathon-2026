export default function formatTime(tDate) {
  const date = new Date(tDate);

  return date.toLocaleTimeString("en-GB", {
    timeZone: "Asia/Bangkok",
    hour12: false,
  });
}

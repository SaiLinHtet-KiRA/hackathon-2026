function formatTime(date) {
  return date.toLocaleTimeString([], { hour12: true });
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

export function getResponseData(dispatchTimeStr) {
  const dispatchTime = new Date(`1970-01-01T${dispatchTimeStr}`);

  const estimatedArrival = addMinutes(dispatchTime, 10);
  const actualArrival = addMinutes(dispatchTime, 8.5);
  const resolutionTime = addMinutes(dispatchTime, 24);

  return [
    ["Unit dispatched", "EMS Unit 22"],
    ["Dispatch time", formatTime(dispatchTime)],
    ["Estimated arrival", `${formatTime(estimatedArrival)} (10 min)`],
    [
      "Actual arrival",
      <span style={{ color: "#22c55e" }}>
        {formatTime(actualArrival)} (8.5 min)
      </span>,
    ],
    ["Resolution time", formatTime(resolutionTime)],
    [
      "Total response time",
      <span style={{ color: "#22c55e" }}>24 minutes</span>,
    ],
  ];
}

export const converTimeToMs = (days = 0, hours = 0, minutes = 0) => {
  let daysToMs = parseInt(days * 86400);
  let hoursToMs = parseInt(hours * 3600);
  let minutesToMs = parseInt(minutes * 60);

  const ms = daysToMs + hoursToMs + minutesToMs;
  return ms;
};

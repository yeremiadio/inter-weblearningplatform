export const getTimeDiff = (start_date, end_date) => {
  let diffMs = new Date(end_date) - new Date(start_date);
  var diffDays = Math.floor(diffMs / 86400000); // days
  var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
  //   console.log(
  //     diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes"
  //   );
  return { days: diffDays, hours: diffHrs, minutes: diffMins };
};

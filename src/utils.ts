import { format } from "date-fns";


export const formatedDate = (data) => {
  const parsedDate = new Date(data);
  return format(parsedDate, 'dd/MM/yyyy');
}

export const sumTimes = (arr) => {
  let totalMinutes = 0;

  arr.forEach(time => {
    // Split time string into hours and minutes, accounting for single-digit minutes
    let [hours, minutes] = time.split(':').map(str => parseInt(str, 10));
    
    // If only minutes are provided (e.g., '2:25' will split into ['2', '25']), set hours to 0
    if (isNaN(minutes)) {
      minutes = hours;
      hours = 0;
    }

    // Add total time in minutes (hours converted to minutes)
    totalMinutes += (hours * 60) + minutes;
  });

  // Convert total minutes back to hours and minutes
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Return time in HH:MM format
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

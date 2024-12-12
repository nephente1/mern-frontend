import { format } from "date-fns";
import { formatDuration, intervalToDuration } from 'date-fns';

export const formatedDate = (data) => {
  const parsedDate = new Date(data);
  return format(parsedDate, 'dd/MM/yyyy HH:mm');
}



// export const formatMinutes = (totalMinutes: number) => {
//   const duration = intervalToDuration({ start: 0, end: totalMinutes * 60 * 1000 });
//   return formatDuration(duration, { format: ['hours', 'minutes'] });
// };

export const formatMinutes = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours > 0 ? `${hours}h ` : ''}${minutes > 0 ? `${minutes}min` : ''}`;
};

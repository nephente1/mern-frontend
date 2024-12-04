import { format } from "date-fns";

export const formatedDate = (data) => {
  const parsedDate = new Date(data);
  return format(parsedDate, 'dd/MM/yyyy HH:mm');
}

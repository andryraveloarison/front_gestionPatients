import { format } from 'date-fns';

export function formatDate(dateString) {
    const date = new Date(dateString);
    // Supprimez la partie heure de la date
    const formattedDate = format(date, 'yyyy-MM-dd');
    return formattedDate;
  }
  
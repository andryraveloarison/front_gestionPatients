import { format } from 'date-fns';

export function formatDate(dateString) {
    const date = new Date(dateString);
    // Supprimez la partie heure de la date
    const formattedDate = format(date, 'yyyy-MM-dd');
    return formattedDate;
  }
  

  export function deFormateDate(dateString) {
    const date = new Date(Date.parse(dateString));

    // Étape 2: Ajout des secondes et des millisecondes
    date.setHours(21); // Définit les heures à 21:00
    date.setMinutes(0); // Réinitialise les minutes à 0
    date.setSeconds(0); // Réinitialise les secondes à 0
    date.setMilliseconds(0); // Réinitialise les millisecondes à 0

    // Étape 3: Formattage de l'objet Date avec le fuseau horaire
    const isoString = date.toISOString(); // Obtient la représentation ISO de la date
    const formattedDate = isoString.slice(0, -5) + '.000'; // Ajoute les millisecondes et ajuste le fuseau horaire

    return formattedDate;
  }

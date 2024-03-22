import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  getLastFiveYears(): string[] {
    const currentYear = new Date().getFullYear();

    // Creates an array with the last five years
    return Array.from({ length: 5 }, (_, i) => String(currentYear - i));
  }

  /**
   * Processes the years input by the user and adds them to the list of years to consider.
   * @param text The user input containing the years.
   */
  getYears(text: string) {
    // New array of strings with the years
    let newText: string[] = [];

    // Regular expression to detect year ranges (e.g., 2010-2015)
    const regexIntervalo = /\b(\d+)-(\d+)\b/g;

    // Replaces year ranges with a list of separate years
    text = text.replace(regexIntervalo, (match, inicio, fim) => {
      // Converts values to numbers
      const inicioNum = parseInt(inicio);
      const fimNum = parseInt(fim);
      // Checks if it's a valid range and if the number of years is less than 50
      if (
        !isNaN(inicioNum) &&
        !isNaN(fimNum) &&
        fimNum > inicioNum &&
        fimNum - inicioNum <= 50
      ) {
        // Adds the years to the new list
        for (let i = inicioNum; i <= fimNum; i++) {
          newText.push(i.toString());
        }
        // Removes the range from the input
        return '';
      } else {
        // Otherwise, returns the range as it is
        return match;
      }
    });

    // Splits the input into multiple strings and removes whitespace
    const trechosRestantes = text
      .split(/\s+/)
      .filter((trecho) => trecho.trim());

    newText.push(...trechosRestantes);

    // Removes duplicates and sorts the list
    newText = [...new Set(newText)].sort();

    return newText;
  }
}

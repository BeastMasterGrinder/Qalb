import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatJournalSentiments(journalData: any[]) {
  if (!Array.isArray(journalData) || journalData.length === 0) {
    return [];
  }

  const formattedEntries: Array<{ sentiment: string; sentence: string }> = [];

  journalData.forEach(journal => {
    if (!journal.sentiments) return;

    const sentimentsObj = typeof journal.sentiments === 'string'
      ? JSON.parse(journal.sentiments)
      : journal.sentiments;

    // Process anger sentiments
    if (sentimentsObj.anger && Array.isArray(sentimentsObj.anger)) {
      sentimentsObj.anger.forEach((item: any) => {
        if (item.en_verse_text) {
          formattedEntries.push({
            sentence: item.en_verse_text,
            sentiment: "anger"
          });
        }
      });
    }

    // Process joy sentiments
    if (sentimentsObj.joy && Array.isArray(sentimentsObj.joy)) {
      sentimentsObj.joy.forEach((item: any) => {
        if (item.en_verse_text) {
          formattedEntries.push({
            sentence: item.en_verse_text,
            sentiment: "joy"
          });
        }
      });
    }

    // Process sadness sentiments
    if (sentimentsObj.sadness && Array.isArray(sentimentsObj.sadness)) {
      sentimentsObj.sadness.forEach((item: any) => {
        if (item.en_verse_text) {
          formattedEntries.push({
            sentence: item.en_verse_text,
            sentiment: "sadness"
          });
        }
      });
    }

    // Process fear sentiments
    if (sentimentsObj.fear && Array.isArray(sentimentsObj.fear)) {
      sentimentsObj.fear.forEach((item: any) => {
        if (item.en_verse_text) {
          formattedEntries.push({
            sentence: item.en_verse_text,
            sentiment: "fear"
          });
        }
      });
    }
  });

  return formattedEntries;
}

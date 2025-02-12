"use server"

import axios from "axios";

export async function getRandomVerse() {
  try {
    const randomVerseKeyReq = await axios.get("https://api.quran.com/api/v4/verses/random", {
      headers: { Accept: "application/json" }
    });
    
    const randomVerseKey = randomVerseKeyReq.data.verse.verse_key;
    
    const randomVerseReq = await axios.get("https://api.quran.com/api/v4/quran/verses/uthmani", {
      headers: { Accept: "application/json" },
      params: { verse_key: randomVerseKey }
    });

    const text = randomVerseReq.data.verses[0].text_uthmani;

    const randomVerseTranslationReq = await axios.get(
      `https://api.quran.com/api/v4/verses/by_key/${randomVerseKey}`,
      {
        headers: { Accept: "application/json" },
        params: {
          language: 'en',
          words: true,
          translations: '131'
        }
      }
    );

    let translation = randomVerseTranslationReq.data.verse.translations[0].text;
    translation = translation.replace(/<sup[^>]*>(.*?)<\/sup>/g, '');

    return { text, translation, key: randomVerseKey };
  } catch (error) {
    console.error("Error fetching verse:", error);
    return null;
  }
}
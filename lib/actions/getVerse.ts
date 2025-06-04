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

    let text = randomVerseReq.data.verses[0].text_uthmani;

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

    console.log(randomVerseTranslationReq.data.verse.translations, randomVerseTranslationReq.data.verse )
    
    // Guard rail for translations
    let translation = "Translation not available";
    if (randomVerseTranslationReq.data.verse.translations && 
        randomVerseTranslationReq.data.verse.translations.length > 0) {
      translation = randomVerseTranslationReq.data.verse.translations[0].text;
      translation = translation.replace(/<sup[^>]*>(.*?)<\/sup>/g, '');
    }

    // Guard rail for text
    if (!text) {
      text = "Verse text not available";
    }

    return { text, translation, key: randomVerseKey };
  } catch (error) {
    console.error("Error fetching verse:", error);
    return null;
  }
}
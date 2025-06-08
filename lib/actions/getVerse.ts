"use server"

import axios from "axios";

// This is the id where of the translation by a person.
// Can get it from https://api.quran.com/api/v4/resources/translations
const resource_id = "85";

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
      `https://api.quran.com/api/v4/translations/${resource_id}/by_ayah/${randomVerseKey}`,
      {
        headers: { Accept: "application/json" },
      }
    );

    
    // Guard rail for translations
    let translation = "Translation not available";
    if (randomVerseTranslationReq.data.translations && 
        randomVerseTranslationReq.data.translations.length > 0) {
      translation = randomVerseTranslationReq.data.translations[0].text;
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
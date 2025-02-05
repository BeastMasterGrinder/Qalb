import axios from "axios";

export const getRandomVerse = async () => {
    let randomVerseKeyReq = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://api.quran.com/api/v4/verses/random",
        headers: {
          Accept: "application/json",
        },
      };
      let randomVerseKey = "";
      try {
        const response = await axios(randomVerseKeyReq);
        // console.log(response.data);
        randomVerseKey = response.data.verse.verse_key;
        // console.log("key:", randomVerseKey)
      } catch (error) {
        console.log(error);
      }
  
      let randomVerseReq = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://api.quran.com/api/v4/quran/verses/uthmani",
        headers: {
          Accept: "application/json",
        },
        params: {
          verse_key: randomVerseKey,
        },
      };
      let text = "";
      try {
        const response = await axios(randomVerseReq);
      //   console.log(response.data.verses);
        // setVerse(response.data.verses[0].text_uthmani);
        text = response.data.verses[0].text_uthmani;
      } catch (error) {
        console.log(error);
      }
        let randomVerseTranslationReq = {
            method: "get",
            maxBodyLength: Infinity,
            url: `https://api.quran.com/api/v4/verses/by_key/${randomVerseKey}`,
            headers: {
                Accept: "application/json",
            },
            params: {
                language: 'en', // language to fetch word translation in specific language
                words: true, // include words of each ayah
                translations: '131', // comma separated ids of translations to load for each ayah
                // add other parameters as needed
            },
        };
      let translation = "";
      try {
        const response = await axios(randomVerseTranslationReq);
        console.log(response.data.verse);
        translation = response.data.verse.translations[0].text;
        translation = translation.replace(/<sup[^>]*>(.*?)<\/sup>/g, '');
      } catch (error) {
        console.log(error);
      }
      return { text: text, translation: translation, key: randomVerseKey };
}
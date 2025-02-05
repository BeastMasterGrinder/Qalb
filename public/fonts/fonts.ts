import localFont from 'next/font/local'

// Quran specific font - optimized for Quranic text
export const quranKareem = localFont({
  src: [
    {
      path: 'Al-QuranAlKareem.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'Al-QuranAlKareem.woff',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-quran-kareem'
})

// Uthmatic Script - Traditional Islamic calligraphy
export const uthmanicScript = localFont({
  src: [
    {
      path: 'KfgqpcHafsUthmanicScriptRegular-1jGEe.ttf',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-uthmanic'
})

// Scheherazade - General Arabic text
export const scheherazade = localFont({
  src: [
    {
      path: 'ScheherazadeRegular.ttf',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-scheherazade'
})

// Decorative Allah/Muhammad calligraphy fonts
export const allahMuhammad = localFont({
  src: [
    {
      path: 'AllahMuhammad2022-axnpx.ttf',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-allah-muhammad'
})

// Ayat Quran - Various styles for Quranic verses
export const ayatQuran = localFont({
  src: [
    {
      path: 'AyatQuran1-5y1Rj.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'AyatQuran2-8OM6D.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: 'AyatQuran3-1jGzg.ttf',
      weight: '600',
      style: 'normal',
    }
  ],
  variable: '--font-ayat-quran'
})

// Aalmaghribi - Decorative Maghribi style
export const aalmaghribi = localFont({
  src: [
    {
      path: 'AalmaghribiIslamic-gwwd1.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'AalmaghribiMuslim-3lajy.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: 'AalmaghribiLarache-4nnxp.ttf',
      weight: '600',
      style: 'normal',
    }
  ],
  variable: '--font-aalmaghribi'
})

// Khebrat Musamim - Modern Arabic font
export const khebratMusamim = localFont({
  src: [
    {
      path: '18 Khebrat Musamim Regular.ttf',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-khebrat'
})

// Ramadhan Karim - Decorative font for special occasions
export const ramadhanKarim = localFont({
  src: [
    {
      path: 'Ramadhankarim-oww20.ttf',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-ramadhan'
})

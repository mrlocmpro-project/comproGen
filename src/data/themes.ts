import { ThemeMeta, ThemeId, CoverYearFineTune } from '../types/monograph';

export const THEME_LIST: ThemeMeta[] = [
  {
    id: 'tech-navy',
    name: 'Tech Navy & Emerald',
    subtitle: 'Solid Navy (#0f172a) & 1px Mint Hairline',
    description: 'Latar biru dongker tua solid (#0f172a), judul putih bersih, aksen garis mint elegan 1px, tata letak dua kolom terstruktur, dan foto arsitektural 16:9 yang bersih tanpa efek HUD.',
    badge: 'TEMA 01 // ARCHITECTURAL NAVY',
    accentColor: '#10b981', // mint / emerald
    bgPreview: '#0f172a',
  },
  {
    id: 'swiss-tangerine',
    name: 'Swiss Editorial & Tangerine',
    subtitle: 'Putih Bersih, Teks Hitam Pekat & Blok Oranye Padat',
    description: 'Latar putih bersih, tipografi display ultra-bold hitam ("Company Profile."), blok vertikal oranye padat di sisi kiri, angka tahun besar vertikal (/2029), dan grid modular Swiss ketat.',
    badge: 'TEMA 02 // SWISS EDITORIAL',
    accentColor: '#ff5722', // vibrant tangerine
    bgPreview: '#ffffff',
  },
  {
    id: 'cyber-crimson',
    name: 'Dark Modern & Crimson 2028',
    subtitle: 'Obsidian Black, Split Photo & Angka Tahun 2028',
    description: 'Latar gelap modern (#0b0f19) dengan tipografi tahun raksasa (2028), aksen merah koral menyala, foto split vertikal elegan, dan tata letak majalah arsitektur dengan penomoran bab tegas.',
    badge: 'TEMA 03 // MODERN EDITORIAL',
    accentColor: '#ff2d55', // vivid crimson
    bgPreview: '#0b0f19',
  },
  {
    id: 'scarlet-circle',
    name: 'Bold Scarlet Circle',
    subtitle: 'Cincin Merah Elegan di Atas Foto Monokrom',
    description: 'Ornamen cincin lingkaran merah besar yang elegan dan bersih di atas foto gedung monokrom, tipografi putih-merah kontras tinggi, serta blok aksen merah solid pada header section.',
    badge: 'TEMA 04 // BOLD SCARLET',
    accentColor: '#dc2626', // scarlet red
    bgPreview: '#f8fafc',
  },
  {
    id: 'sage-wireframe',
    name: 'Sage Wireframe Minimalist',
    subtitle: 'Ivory Bersih, Wireframe 1px & Hijau Sage Lembut',
    description: 'Latar ivory bersih, foto arsitektur dibingkai garis hairline wireframe 1px mengambang, aksen hijau sage lembut, serta ruang kosong luas (airy whitespace) yang sangat tenang dan elegan.',
    badge: 'TEMA 05 // SAGE MINIMALIST',
    accentColor: '#627566', // sage green
    bgPreview: '#fcfbf8',
  },
  {
    id: 'royal-slant',
    name: 'Royal Navy & Tangerine Slant',
    subtitle: 'Royal Navy (#1e3a8a), Tangerine & Parallelogram Miring',
    description: 'Bentuk balok jajaran genjang miring (parallelogram), pola arsir diagonal tipis di sudut cover, judul cover dua warna (Orange & Navy), serta tata letak data editorial dengan pemisah miring dinamis.',
    badge: 'TEMA 06 // ROYAL SLANT',
    accentColor: '#ea580c', // tangerine orange
    bgPreview: '#1e3a8a',
  },
  {
    id: 'hexagon-charcoal',
    name: 'Hexagon Apex & Charcoal',
    subtitle: 'Dark Charcoal (#18181b), Saturated Orange & Hexagon',
    description: 'Foto cover dibingkai dalam bentuk segi enam (hexagon) outline tegas, aksen balok sudut gelap, judul bertumpuk THE COMPANY PROFILE beraksen oranye, dan penanda heksagonal pada lembar isi.',
    badge: 'TEMA 07 // HEXAGON APEX',
    accentColor: '#f97316', // saturated orange
    bgPreview: '#18181b',
  },
  {
    id: 'cobalt-slash',
    name: 'Cobalt Diagonal Slash',
    subtitle: 'Electric Cobalt (#2563eb), Deep Indigo & Ribbon Slash',
    description: 'Potongan pita diagonal dinamis melintasi foto utama, kotak tahun jajaran genjang, tipografi modern eksekutif, infografis matriks arsitektur, dan diagram kurva modern berpresisi tinggi.',
    badge: 'TEMA 08 // COBALT SLASH',
    accentColor: '#2563eb', // electric cobalt
    bgPreview: '#0f172a',
  },
];

export const getThemeMeta = (id: ThemeId): ThemeMeta => {
  return THEME_LIST.find((t) => t.id === id) || THEME_LIST[0];
};

export const getDefaultCoverYearFineTune = (themeId?: ThemeId): CoverYearFineTune => {
  if (themeId === 'hexagon-charcoal') {
    return {
      yOffset: 0,
      xOffset: 0,
      fontSize: 28,
      verticalAlign: 'middle',
      showBadge: true,
      yearOffsetX: 0,
      yearOffsetY: 0,
      yearFontSize: 28,
    };
  }
  return {
    yOffset: 0,
    xOffset: 0,
    fontSize: 28,
    verticalAlign: 'top',
    showBadge: true,
    yearOffsetX: 0,
    yearOffsetY: 0,
    yearFontSize: 28,
  };
};

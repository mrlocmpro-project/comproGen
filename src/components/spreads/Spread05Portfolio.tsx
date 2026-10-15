import React from 'react';
import { CompanyProfileData, TogglesState, ThemeId } from '../../types/monograph';
import { CropMarks, GridOverlay } from '../common/CropMarks';

interface Spread05PortfolioProps {
  data: CompanyProfileData;
  toggles: TogglesState;
  showGrid: boolean;
  amberAccent?: boolean;
  themeId?: ThemeId;
}

const DEFAULT_HERO_IMG =
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80';
const DEFAULT_PRJ_IMG =
  'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80';

export const Spread05Portfolio: React.FC<Spread05PortfolioProps> = ({
  data,
  toggles,
  showGrid,
  themeId = 'tech-navy',
}) => {
  if (!toggles.showProjects) {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-white border border-zinc-200 p-12 text-center text-zinc-500 font-sans mx-auto flex flex-col justify-center items-center">
        <p className="font-headline text-base font-bold text-[#1c1917] tracking-[-0.02em]">
          BAB 05 // BAGIAN PORTOFOLIO DINONAKTIFKAN
        </p>
        <p className="font-editorial-body text-xs mt-2 leading-[1.6]">
          Gunakan Smart Toggle di Left Editor Panel untuk mengaktifkan kembali lembar portofolio proyek.
        </p>
      </article>
    );
  }

  const flagshipImg = data.portfolio.flagship.photoUrl || DEFAULT_HERO_IMG;

  // =========================================================================
  // THEME 1: TECH NAVY
  // =========================================================================
  if (themeId === 'tech-navy') {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#0f172a] text-slate-100 relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
        <CropMarks sheetId="05" bleedText="+ 210 × 297 MM // EDITORIAL DOSSIER" regText="TECH-NAVY // CHAPTER 05" />
        <GridOverlay active={showGrid} />

        {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
        <header className="w-full border-b border-slate-800 pb-2.5 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-slate-400 shrink-0">
          <span className="font-bold text-white">{data.companyName}</span>
          <span>BAB 05 // PORTOFOLIO PROYEK</span>
        </header>

        {/* 2. JUDUL BAB */}
        <section className="border-b border-slate-800 pb-3 shrink-0">
          <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block mb-1">
            Bab 05 // Rekam Jejak Proyek Nasional
          </span>
          <h1 className="font-headline text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-[-0.02em] leading-tight">
            Portofolio Infrastruktur & Bangunan Gedung
          </h1>
        </section>

        {/* 3. DETAIL SPESIFIKASI PROYEK UTAMA */}
        <section className="bg-slate-900/70 border border-slate-800 p-4 shrink-0 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                {data.portfolio.flagship.code || 'KONTRAK UTAMA EPC'}
              </span>
            </div>
            <span className="font-folio-mono text-[10px] text-slate-400 tracking-wider">
              {data.portfolio.flagship.period}
            </span>
          </div>

          <h2 className="font-headline text-lg sm:text-xl font-bold uppercase text-white tracking-[-0.02em] mb-1.5">
            {data.portfolio.flagship.title}
          </h2>
          <p className="font-editorial-body text-[11px] text-[#94a3b8] leading-[1.5] mb-3 line-clamp-2">
            {data.portfolio.flagship.description}
          </p>

          <div className="p-2.5 bg-slate-950/80 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
            <div>
              <span className="text-slate-400 text-[10px] block">Nilai Kontrak:</span>
              <span className="font-bold text-emerald-400">{data.portfolio.flagship.value}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Skala / Luas:</span>
              <span className="font-semibold text-white truncate block">{data.portfolio.flagship.floorArea}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Pemberi Kerja:</span>
              <span className="text-slate-200 truncate block">{data.portfolio.flagship.client}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Status BAST:</span>
              <span className="font-semibold text-emerald-300">{data.portfolio.flagship.bastStatus || '100% Selesai'}</span>
            </div>
          </div>
        </section>

        {/* 4. HERO PROJECT PHOTO SHOWCASE (Besar, Arsitektural, Zero Empty Gap) */}
        <section className="relative w-full h-64 sm:h-72 overflow-hidden bg-slate-950 border border-slate-800 shadow-md shrink-0">
          <img
            src={flagshipImg}
            alt={data.portfolio.flagship.title}
            className="w-full h-full object-cover filter contrast-[1.03] brightness-95"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = DEFAULT_HERO_IMG;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 pointer-events-none" />
          
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between pointer-events-none">
            <div className="bg-slate-950/90 border border-slate-700/80 px-3 py-1.5 backdrop-blur-xs">
              <span className="font-folio-mono text-[10px] text-emerald-400 uppercase tracking-widest block font-bold">
                SHOWCASE UTAMA // ARSITEKTUR STRUKTURAL
              </span>
              <span className="font-headline text-xs font-bold text-white uppercase tracking-[-0.01em]">
                {data.portfolio.flagship.title} — {data.portfolio.flagship.height || 'Grade-A+ Super-Tall'}
              </span>
            </div>
            <div className="hidden sm:block bg-slate-950/90 border border-slate-700/80 px-2.5 py-1 text-right">
              <span className="font-folio-mono text-[9px] text-slate-300 block">
                {data.portfolio.flagship.latLong || 'INDONESIA'}
              </span>
            </div>
          </div>
        </section>

        {/* 5. GRID 4 PROYEK PENDUKUNG (2x2 simetris) */}
        <section className="grid grid-cols-2 gap-3 shrink-0">
          {data.portfolio.sectoralProjects.slice(0, 4).map((p) => (
            <div
              key={p.id}
              className="bg-slate-900/60 border border-slate-800 p-2.5 flex items-center gap-2.5 hover:border-slate-700 transition-colors"
            >
              <div className="w-16 h-14 shrink-0 overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src={p.photoUrl || DEFAULT_PRJ_IMG}
                  alt={p.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = DEFAULT_PRJ_IMG;
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-folio-mono text-[9px] font-bold text-emerald-400 uppercase block truncate">
                  {p.sectorTag}
                </span>
                <h4 className="font-headline text-[11px] font-bold text-white uppercase truncate mt-0.5">
                  {p.title}
                </h4>
                <div className="text-[10px] text-slate-300 font-medium mt-0.5 flex justify-between items-center">
                  <span className="font-bold text-emerald-300">{p.value}</span>
                  <span className="text-[9px] text-slate-400 truncate">{p.specs || p.year}</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
        <footer className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-slate-400 shrink-0">
          <span>{data.contact.comms.website}</span>
          <span className="font-bold text-emerald-400">05 / 06</span>
        </footer>
      </article>
    );
  }

  // =========================================================================
  // THEME 2: SWISS EDITORIAL & TANGERINE
  // =========================================================================
  if (themeId === 'swiss-tangerine') {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-white text-black border-2 border-black relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
        <CropMarks sheetId="05" bleedText="+ 210 × 297 MM // SWISS STRICT GRID" regText="SWISS-TANGERINE // CHAPTER 05" />
        <GridOverlay active={showGrid} />

        {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
        <header className="w-full border-b border-zinc-200 pb-2.5 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-zinc-500 shrink-0">
          <span className="font-bold text-black">{data.companyName}</span>
          <span>BAB 05 // PORTOFOLIO PROYEK</span>
        </header>

        {/* 2. JUDUL BAB */}
        <section className="border-b-2 border-black pb-3 shrink-0">
          <span className="text-xs font-bold text-[#ff5722] uppercase tracking-wider block mb-1">
            Arsip Proyek Strategis
          </span>
          <h1 className="font-headline text-2xl sm:text-3xl font-extrabold text-black uppercase tracking-[-0.02em] leading-tight">
            Portofolio Rekayasa & Konstruksi<span className="text-[#ff5722]">.</span>
          </h1>
        </section>

        {/* 3. DETAIL SPESIFIKASI PROYEK UTAMA */}
        <section className="border-2 border-black bg-zinc-50 p-4 shrink-0 shadow-xs">
          <div className="flex items-center justify-between border-b border-black/20 pb-1.5 mb-2">
            <span className="bg-[#ff5722] text-white px-2 py-0.5 font-folio-mono text-[10px] font-bold uppercase">
              {data.portfolio.flagship.code || 'PROYEK UTAMA #01'}
            </span>
            <span className="font-folio-mono text-[10px] font-bold text-black uppercase">
              {data.portfolio.flagship.period}
            </span>
          </div>

          <h2 className="font-headline text-lg sm:text-xl font-bold uppercase text-black mb-1.5">
            {data.portfolio.flagship.title}
          </h2>
          <p className="font-editorial-body text-[11px] text-[#64748b] leading-[1.5] mb-3 line-clamp-2">
            {data.portfolio.flagship.description}
          </p>

          <div className="bg-white border border-black p-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
            <div>
              <span className="text-zinc-500 text-[10px] block">Nilai:</span>
              <span className="font-bold text-[#ff5722]">{data.portfolio.flagship.value}</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] block">Luas:</span>
              <span className="font-semibold text-black truncate block">{data.portfolio.flagship.floorArea}</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] block">Klien:</span>
              <span className="text-zinc-800 truncate block">{data.portfolio.flagship.client}</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] block">Hasil Audit:</span>
              <span className="font-semibold text-black">100% Selesai Sesuai BAST</span>
            </div>
          </div>
        </section>

        {/* 4. HERO PROJECT PHOTO SHOWCASE */}
        <section className="relative w-full h-64 sm:h-72 overflow-hidden border-2 border-black bg-zinc-100 shadow-xs shrink-0">
          <img
            src={flagshipImg}
            alt={data.portfolio.flagship.title}
            className="w-full h-full object-cover filter grayscale contrast-110"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = DEFAULT_HERO_IMG;
            }}
          />
          <div className="absolute bottom-3 left-3 bg-black text-white px-3 py-1 font-folio-mono text-[10px] font-bold uppercase">
            {data.portfolio.flagship.title} // MONUMEN ARSITEKTUR
          </div>
          <div className="absolute top-3 right-3 bg-[#ff5722] text-white px-2 py-0.5 font-folio-mono text-[9px] font-bold uppercase">
            {data.portfolio.flagship.role || 'MAIN CONTRACTOR'}
          </div>
        </section>

        {/* 5. GRID 4 PROYEK PENDUKUNG */}
        <section className="grid grid-cols-2 gap-3 shrink-0">
          {data.portfolio.sectoralProjects.slice(0, 4).map((p) => (
            <div key={p.id} className="border-2 border-black p-2.5 bg-white flex items-center gap-2.5">
              <div className="w-16 h-14 shrink-0 overflow-hidden border border-black bg-zinc-100">
                <img
                  src={p.photoUrl || DEFAULT_PRJ_IMG}
                  alt={p.title}
                  className="w-full h-full object-cover grayscale"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = DEFAULT_PRJ_IMG;
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-folio-mono text-[9px] font-bold text-[#ff5722] uppercase block truncate">
                  {p.sectorTag}
                </span>
                <h4 className="font-headline text-[11px] font-bold uppercase text-black truncate mt-0.5">
                  {p.title}
                </h4>
                <div className="text-[10px] text-zinc-700 font-semibold mt-0.5 flex justify-between items-center">
                  <span>{p.value}</span>
                  <span className="text-[9px] text-zinc-500 truncate">{p.specs || p.year}</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
        <footer className="pt-3 border-t border-zinc-200 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-zinc-500 shrink-0">
          <span>{data.contact.comms.website}</span>
          <span className="font-bold text-black">05 / 06</span>
        </footer>
      </article>
    );
  }

  // =========================================================================
  // THEME 3: CYBER DARK & CRIMSON 2028
  // =========================================================================
  if (themeId === 'cyber-crimson') {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#0b0f19] text-white border border-slate-800 relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
        <CropMarks sheetId="05" bleedText="+ 210 × 297 MM // DARK EDITORIAL" regText="CYBER-CRIMSON // CHAPTER 05" />
        <GridOverlay active={showGrid} />

        <div className="font-headline absolute top-4 right-8 text-[100px] font-extrabold text-[#ff2d55]/10 leading-none select-none pointer-events-none z-0">
          05
        </div>

        {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
        <header className="w-full pb-2.5 border-b border-slate-800 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-slate-400 relative z-10 shrink-0">
          <span className="font-bold text-white">{data.companyName}</span>
          <span>BAB 05 // PORTOFOLIO PROYEK</span>
        </header>

        {/* 2. JUDUL BAB */}
        <section className="relative z-10 border-b border-slate-800 pb-3 shrink-0">
          <span className="text-xs text-[#ff2d55] uppercase font-bold tracking-wider block mb-1">
            Bab 05 // Portofolio Proyek
          </span>
          <h1 className="font-headline text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-[-0.02em] leading-tight">
            Portofolio Rekayasa Arsitektural & Sipil
          </h1>
        </section>

        {/* 3. DETAIL SPESIFIKASI PROYEK UTAMA */}
        <section className="bg-slate-900/60 border border-slate-800 p-4 relative z-10 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-[#ff2d55] font-bold uppercase tracking-wider block">
              {data.portfolio.flagship.code || 'PROYEK STRATEGIS NASIONAL'}
            </span>
            <span className="font-folio-mono text-[10px] text-slate-400">
              {data.portfolio.flagship.period}
            </span>
          </div>

          <h2 className="font-headline text-lg sm:text-xl font-bold uppercase text-white tracking-[-0.02em] mb-1.5">
            {data.portfolio.flagship.title}
          </h2>
          <p className="font-editorial-body text-[11px] text-[#94a3b8] leading-[1.5] mb-3 line-clamp-2">
            {data.portfolio.flagship.description}
          </p>

          <div className="p-2.5 bg-slate-950/80 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
            <div>
              <span className="text-slate-400 text-[10px] block">Nilai:</span>
              <span className="font-bold text-[#ff2d55]">{data.portfolio.flagship.value}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Skala:</span>
              <span className="font-semibold text-white truncate block">{data.portfolio.flagship.floorArea}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Klien:</span>
              <span className="text-slate-200 truncate block">{data.portfolio.flagship.client}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Status:</span>
              <span className="font-semibold text-[#ff2d55]">Diserahkan Sempurna</span>
            </div>
          </div>
        </section>

        {/* 4. HERO PROJECT PHOTO SHOWCASE */}
        <section className="relative w-full h-64 sm:h-72 overflow-hidden bg-slate-950 border border-slate-800 shadow-md shrink-0 relative z-10">
          <img
            src={flagshipImg}
            alt={data.portfolio.flagship.title}
            className="w-full h-full object-cover filter contrast-[1.05]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = DEFAULT_HERO_IMG;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19]/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-4 bg-[#0b0f19]/90 border border-slate-800 px-3 py-1.5">
            <span className="font-folio-mono text-[9px] text-[#ff2d55] uppercase block font-bold">
              SHOWCASE PROYEK UNGGULAN
            </span>
            <span className="font-headline text-xs font-bold text-white uppercase">
              {data.portfolio.flagship.title}
            </span>
          </div>
        </section>

        {/* 5. GRID 4 PROYEK PENDUKUNG */}
        <section className="grid grid-cols-2 gap-3 relative z-10 shrink-0">
          {data.portfolio.sectoralProjects.slice(0, 4).map((p) => (
            <div key={p.id} className="bg-slate-900/60 border border-slate-800 p-2.5 flex items-center gap-2.5">
              <div className="w-16 h-14 shrink-0 overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src={p.photoUrl || DEFAULT_PRJ_IMG}
                  alt={p.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = DEFAULT_PRJ_IMG;
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-folio-mono text-[9px] font-bold text-[#ff2d55] uppercase block truncate">
                  {p.sectorTag}
                </span>
                <h4 className="font-headline text-[11px] font-bold uppercase text-white truncate mt-0.5">
                  {p.title}
                </h4>
                <div className="text-[10px] text-slate-300 font-medium mt-0.5 flex justify-between items-center">
                  <span className="text-white font-bold">{p.value}</span>
                  <span className="text-[9px] text-slate-400 truncate">{p.specs || p.year}</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
        <footer className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-slate-400 relative z-10 shrink-0">
          <span>{data.contact.comms.website}</span>
          <span className="font-bold text-[#ff2d55]">05 / 06</span>
        </footer>
      </article>
    );
  }

  // =========================================================================
  // THEME 4: BOLD SCARLET CIRCLE
  // =========================================================================
  if (themeId === 'scarlet-circle') {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#f8fafc] text-slate-900 border border-slate-300 relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
        <CropMarks sheetId="05" bleedText="+ 210 × 297 MM // SCARLET EDITORIAL" regText="SCARLET-CIRCLE // CHAPTER 05" />
        <GridOverlay active={showGrid} />

        {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
        <header className="w-full border-b border-slate-200 pb-2.5 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-slate-500 shrink-0">
          <span className="font-bold text-slate-900">{data.companyName}</span>
          <span>BAB 05 // PORTOFOLIO PROYEK</span>
        </header>

        {/* 2. JUDUL BAB */}
        <section className="border-b-2 border-red-600 pb-3 shrink-0">
          <h1 className="font-headline text-2xl sm:text-3xl font-extrabold uppercase text-slate-950 tracking-[-0.02em] leading-tight">
            Portofolio Strategis & Karya Unggulan
          </h1>
        </section>

        {/* 3. DETAIL SPESIFIKASI PROYEK UTAMA */}
        <section className="bg-white border-2 border-slate-900 p-4 shadow-xs shrink-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block">
              {data.portfolio.flagship.code || 'PROYEK UTAMA NASIONAL'}
            </span>
            <span className="font-folio-mono text-[10px] text-slate-500 font-bold">
              {data.portfolio.flagship.period}
            </span>
          </div>

          <h2 className="font-headline text-lg sm:text-xl font-bold uppercase text-slate-950 tracking-[-0.02em] mb-1.5">
            {data.portfolio.flagship.title}
          </h2>
          <p className="font-editorial-body text-[11px] text-[#64748b] leading-[1.5] mb-3 line-clamp-2">
            {data.portfolio.flagship.description}
          </p>

          <div className="p-2.5 bg-slate-50 border border-slate-300 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
            <div>
              <span className="text-slate-500 text-[10px] block">Nilai:</span>
              <span className="font-bold text-red-600">{data.portfolio.flagship.value}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">Skala:</span>
              <span className="font-semibold text-slate-900 truncate block">{data.portfolio.flagship.floorArea}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">Klien:</span>
              <span className="text-slate-700 truncate block">{data.portfolio.flagship.client}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">Kinerja:</span>
              <span className="font-bold text-red-600">Selesai Tepat Waktu</span>
            </div>
          </div>
        </section>

        {/* 4. HERO PROJECT PHOTO SHOWCASE */}
        <section className="relative w-full h-64 sm:h-72 overflow-hidden border-2 border-slate-900 bg-slate-100 shadow-xs shrink-0">
          <img
            src={flagshipImg}
            alt={data.portfolio.flagship.title}
            className="w-full h-full object-cover filter contrast-[1.03]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = DEFAULT_HERO_IMG;
            }}
          />
          <div className="absolute bottom-3 left-3 bg-white/95 border border-slate-900 px-3 py-1.5 shadow-xs">
            <span className="font-folio-mono text-[9px] text-red-600 font-bold uppercase block">
              PORTFOLIO SHOWCASE
            </span>
            <span className="font-headline text-xs font-bold text-slate-900 uppercase">
              {data.portfolio.flagship.title}
            </span>
          </div>
        </section>

        {/* 5. GRID 4 PROYEK PENDUKUNG */}
        <section className="grid grid-cols-2 gap-3 shrink-0">
          {data.portfolio.sectoralProjects.slice(0, 4).map((p) => (
            <div key={p.id} className="bg-white border border-slate-300 p-2.5 flex items-center gap-2.5">
              <div className="w-16 h-14 shrink-0 overflow-hidden border border-slate-400">
                <img
                  src={p.photoUrl || DEFAULT_PRJ_IMG}
                  alt={p.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = DEFAULT_PRJ_IMG;
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-folio-mono text-[9px] text-red-600 font-bold uppercase block truncate">
                  {p.sectorTag}
                </span>
                <h4 className="font-headline text-[11px] font-bold uppercase truncate text-slate-900 mt-0.5">
                  {p.title}
                </h4>
                <div className="text-[10px] text-slate-600 font-medium mt-0.5 flex justify-between items-center">
                  <span className="font-bold text-slate-900">{p.value}</span>
                  <span className="text-[9px] text-slate-500 truncate">{p.specs || p.year}</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
        <footer className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-slate-500 shrink-0">
          <span>{data.contact.comms.website}</span>
          <span className="font-bold text-red-600">05 / 06</span>
        </footer>
      </article>
    );
  }

  // =========================================================================
  // THEME 5: SAGE WIREFRAME MINIMALIST
  // =========================================================================
  if (themeId === 'sage-wireframe') {
    return (
    <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#fcfbf8] text-[#2c332e] border border-[#d6ddd6] relative overflow-hidden transition-all duration-300 shadow-xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
      <CropMarks sheetId="05" bleedText="+ 210 × 297 MM // ARCHITECTURAL MONOGRAPH" regText="SAGE-WIREFRAME // CHAPTER 05" />
      <GridOverlay active={showGrid} />

      {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
      <header className="w-full pb-2.5 border-b border-[#d6ddd6] flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-[#849688] shrink-0">
        <span className="font-bold text-[#1f2621]">{data.companyName}</span>
        <span>BAB 05 // PORTOFOLIO PROYEK</span>
      </header>

      {/* 2. JUDUL BAB */}
      <section className="pb-3 border-b border-[#d6ddd6] shrink-0">
        <span className="text-xs font-bold text-[#627566] uppercase tracking-wider block mb-1">
          Bab 05 // Inventaris Karya Arsitektural
        </span>
        <h1 className="font-headline text-2xl sm:text-3xl font-extrabold uppercase text-[#1f2621] tracking-[-0.02em] leading-tight">
          Portofolio Proyek & Karya Terpilih
        </h1>
      </section>

      {/* 3. DETAIL SPESIFIKASI PROYEK UTAMA */}
      <section className="bg-white border border-[#d6ddd6] p-4 shadow-xs shrink-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-[#627566] uppercase tracking-wider font-bold block">
            {data.portfolio.flagship.code || 'PROYEK UNGGULAN'}
          </span>
          <span className="font-folio-mono text-[10px] text-[#849688]">
            {data.portfolio.flagship.period}
          </span>
        </div>

        <h2 className="font-headline text-lg sm:text-xl font-bold uppercase text-[#1f2621] mb-1.5">
          {data.portfolio.flagship.title}
        </h2>
        <p className="font-editorial-body text-[11px] text-[#64748b] leading-[1.5] mb-3 line-clamp-2">
          {data.portfolio.flagship.description}
        </p>

        <div className="border border-[#d6ddd6] bg-[#fcfbf8] p-2.5 text-[11px] grid grid-cols-2 sm:grid-cols-4 gap-2 text-[#465348]">
          <div>
            <span className="text-[#849688] text-[10px] block">Nilai Kontrak:</span>
            <span className="font-bold text-[#627566]">{data.portfolio.flagship.value}</span>
          </div>
          <div>
            <span className="text-[#849688] text-[10px] block">Skala Luas:</span>
            <span className="font-semibold text-[#1f2621] truncate block">{data.portfolio.flagship.floorArea}</span>
          </div>
          <div>
            <span className="text-[#849688] text-[10px] block">Klien:</span>
            <span className="text-[#849688] truncate block">{data.portfolio.flagship.client}</span>
          </div>
          <div>
            <span className="text-[#849688] text-[10px] block">Kepatuhan Mutu:</span>
            <span className="font-semibold text-[#627566]">Kepatuhan Penuh</span>
          </div>
        </div>
      </section>

      {/* 4. HERO PROJECT PHOTO SHOWCASE */}
      <section className="relative w-full h-64 sm:h-72 overflow-hidden border border-[#c5cec5] bg-stone-100 shadow-xs shrink-0">
        <img
          src={flagshipImg}
          alt={data.portfolio.flagship.title}
          className="w-full h-full object-cover filter contrast-[1.02]"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = DEFAULT_HERO_IMG;
          }}
        />
        <div className="absolute bottom-3 left-3 bg-[#fcfbf8]/95 border border-[#c5cec5] px-3 py-1.5">
          <span className="font-folio-mono text-[9px] text-[#627566] uppercase block font-bold">
            ARCHITECTURAL SHOWCASE
          </span>
          <span className="font-headline text-xs font-bold text-[#1f2621] uppercase">
            {data.portfolio.flagship.title}
          </span>
        </div>
      </section>

      {/* 5. GRID 4 PROYEK PENDUKUNG */}
      <section className="grid grid-cols-2 gap-3 shrink-0">
        {data.portfolio.sectoralProjects.slice(0, 4).map((p) => (
          <div key={p.id} className="bg-white border border-[#d6ddd6] p-2.5 flex items-center gap-2.5">
            <div className="w-16 h-14 shrink-0 overflow-hidden border border-[#d6ddd6]">
              <img
                src={p.photoUrl || DEFAULT_PRJ_IMG}
                alt={p.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = DEFAULT_PRJ_IMG;
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-folio-mono text-[9px] font-bold text-[#627566] block uppercase truncate">
                {p.sectorTag}
              </span>
              <h4 className="font-headline text-[11px] font-bold uppercase truncate text-[#1f2621] mt-0.5">
                {p.title}
              </h4>
              <div className="text-[10px] text-[#849688] font-medium mt-0.5 flex justify-between items-center">
                <span className="font-bold text-[#1f2621]">{p.value}</span>
                <span className="text-[9px] text-[#849688] truncate">{p.specs || p.year}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
      <footer className="pt-3 border-t border-[#d6ddd6] flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-[#849688] shrink-0">
        <span>{data.contact.comms.website}</span>
        <span className="font-bold text-[#1f2621]">05 / 06</span>
      </footer>
      </article>
    );
  }

  // =========================================================================
  // THEME 6: ROYAL NAVY & TANGERINE SLANT
  // =========================================================================
  if (themeId === 'royal-slant') {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-slate-50 text-slate-900 border-2 border-[#1e3a8a] relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
        <CropMarks sheetId="05" bleedText="+ 210 × 297 MM // ROYAL SLANT SPEC" regText="ROYAL-SLANT // CHAPTER 05" />
        <GridOverlay active={showGrid} />

        {/* Diagonal Hatched Accent Pattern */}
        <div
          className="absolute top-0 right-0 w-48 h-28 pointer-events-none opacity-25 z-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, #1e3a8a 0, #1e3a8a 1.5px, transparent 1.5px, transparent 8px)',
          }}
        />

        {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
        <header className="w-full pb-2.5 border-b border-slate-300 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-slate-500 shrink-0 relative z-10">
          <span className="font-bold text-[#1e3a8a]">{data.companyName}</span>
          <span>BAB 05 // PORTOFOLIO PROYEK</span>
        </header>

        {/* 2. JUDUL BAB */}
        <section className="pb-3 border-b-2 border-[#1e3a8a] shrink-0 relative z-10">
          <div className="transform -skew-x-12 bg-[#ea580c] text-white inline-block px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
            <span className="inline-block transform skew-x-12">BAB 05 // ARSIP PROYEK STRATEGIS</span>
          </div>
          <h1 className="font-headline text-2xl sm:text-3xl font-black uppercase text-[#1e3a8a] tracking-[-0.02em] leading-tight">
            Portofolio Rekayasa <span className="text-[#ea580c]">&</span> Konstruksi
          </h1>
        </section>

        {/* 3. DETAIL SPESIFIKASI PROYEK UTAMA */}
        <section className="bg-white border-2 border-[#1e3a8a] p-4 shadow-sm shrink-0 relative z-10">
          <div className="flex items-center justify-between mb-1.5">
            <div className="transform -skew-x-12 bg-[#1e3a8a] text-white px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase">
              <span className="inline-block transform skew-x-12">{data.portfolio.flagship.code || 'PROYEK UNGGULAN'}</span>
            </div>
            <span className="font-folio-mono text-[10px] text-slate-500 font-semibold">
              {data.portfolio.flagship.period}
            </span>
          </div>

          <h2 className="font-headline text-lg sm:text-xl font-black uppercase text-[#1e3a8a] mb-1.5">
            {data.portfolio.flagship.title}
          </h2>
          <p className="font-editorial-body text-[11px] text-slate-600 leading-[1.5] mb-3 line-clamp-2">
            {data.portfolio.flagship.description}
          </p>

          <div className="border border-slate-200 bg-slate-50 p-2.5 text-[11px] grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-800">
            <div>
              <span className="text-slate-500 text-[10px] block">Nilai Kontrak:</span>
              <span className="font-bold text-[#ea580c]">{data.portfolio.flagship.value}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">Skala Luas:</span>
              <span className="font-semibold text-slate-900 truncate block">{data.portfolio.flagship.floorArea}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">Klien:</span>
              <span className="text-slate-600 truncate block">{data.portfolio.flagship.client}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">Kepatuhan HSE:</span>
              <span className="font-semibold text-[#1e3a8a]">Zero LTI / ISO 45001</span>
            </div>
          </div>
        </section>

        {/* 4. HERO PROJECT PHOTO SHOWCASE WITH SLANTED ACCENT */}
        <section className="relative w-full h-64 sm:h-72 overflow-hidden border-2 border-[#1e3a8a] bg-slate-900 shadow-md shrink-0 relative z-10">
          <img
            src={flagshipImg}
            alt={data.portfolio.flagship.title}
            className="w-full h-full object-cover contrast-110"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = DEFAULT_HERO_IMG;
            }}
          />
          <div className="absolute bottom-3 left-3 bg-[#1e3a8a]/95 text-white border-l-4 border-[#ea580c] px-3.5 py-2 shadow-lg">
            <span className="font-folio-mono text-[9px] text-orange-200 uppercase block font-bold">
              PORTFOLIO SHOWCASE
            </span>
            <span className="font-headline text-xs font-black uppercase text-white">
              {data.portfolio.flagship.title}
            </span>
          </div>
        </section>

        {/* 5. GRID 4 PROYEK PENDUKUNG WITH SLANTED ACCENTS */}
        <section className="grid grid-cols-2 gap-3 shrink-0 relative z-10">
          {data.portfolio.sectoralProjects.slice(0, 4).map((p) => (
            <div key={p.id} className="bg-white border-2 border-slate-300 p-2.5 flex items-center gap-2.5 shadow-xs">
              <div className="w-16 h-14 shrink-0 overflow-hidden border border-slate-300 bg-slate-100">
                <img
                  src={p.photoUrl || DEFAULT_PRJ_IMG}
                  alt={p.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = DEFAULT_PRJ_IMG;
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-folio-mono text-[9px] font-bold text-[#ea580c] block uppercase truncate">
                  {p.sectorTag}
                </span>
                <h4 className="font-headline text-[11px] font-black uppercase truncate text-[#1e3a8a] mt-0.5">
                  {p.title}
                </h4>
                <div className="text-[10px] text-slate-500 font-medium mt-0.5 flex justify-between items-center">
                  <span className="font-bold text-slate-900">{p.value}</span>
                  <span className="text-[9px] text-slate-400 truncate">{p.specs || p.year}</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
        <footer className="pt-3 border-t border-slate-300 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-slate-500 shrink-0 relative z-10">
          <span>{data.contact.comms.website}</span>
          <span className="font-bold text-[#ea580c]">05 / 06</span>
        </footer>
      </article>
    );
  }

  // =========================================================================
  // THEME 7: HEXAGON APEX & CHARCOAL
  // =========================================================================
  if (themeId === 'hexagon-charcoal') {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#fbfbfb] text-[#18181b] border-2 border-[#18181b] relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
        <CropMarks sheetId="05" bleedText="+ 210 × 297 MM // HEXAGON APEX SPEC" regText="HEXAGON-CHARCOAL // CHAPTER 05" />
        <GridOverlay active={showGrid} />

        {/* Hexagon Angle Accent */}
        <div
          className="absolute top-0 right-0 w-24 h-24 bg-[#18181b] pointer-events-none z-0"
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
        />

        {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
        <header className="w-full pb-2.5 border-b border-zinc-300 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-zinc-500 shrink-0 relative z-10">
          <span className="font-bold text-[#18181b]">{data.companyName}</span>
          <span>BAB 05 // PORTOFOLIO PROYEK</span>
        </header>

        {/* 2. JUDUL BAB */}
        <section className="pb-3 border-b-2 border-[#18181b] shrink-0 relative z-10">
          <div className="flex items-center gap-1.5 bg-[#18181b] text-white inline-flex px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
            <span className="w-1.5 h-1.5 bg-[#f97316] rotate-45" />
            <span>BAB 05 // ARSIP PROYEK STRATEGIS</span>
          </div>
          <h1 className="font-headline text-2xl sm:text-3xl font-black uppercase text-[#18181b] tracking-[-0.02em] leading-tight">
            Portofolio Rekayasa <span className="text-[#f97316]">&</span> Konstruksi
          </h1>
        </section>

        {/* 3. DETAIL SPESIFIKASI PROYEK UTAMA */}
        <section className="bg-white border-2 border-[#18181b] p-4 shadow-sm shrink-0 relative z-10">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 bg-[#18181b] text-white px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase">
              <span className="w-1 h-1 bg-[#f97316] rotate-45" />
              <span>{data.portfolio.flagship.code || 'PROYEK UNGGULAN'}</span>
            </div>
            <span className="font-folio-mono text-[10px] text-zinc-500 font-semibold">
              {data.portfolio.flagship.period}
            </span>
          </div>

          <h2 className="font-headline text-lg sm:text-xl font-black uppercase text-[#18181b] mb-1.5">
            {data.portfolio.flagship.title}
          </h2>
          <p className="font-editorial-body text-[11px] text-zinc-600 leading-[1.5] mb-3 line-clamp-2">
            {data.portfolio.flagship.description}
          </p>

          <div className="border border-zinc-200 bg-zinc-50 p-2.5 text-[11px] grid grid-cols-2 sm:grid-cols-4 gap-2 text-zinc-800">
            <div>
              <span className="text-zinc-500 text-[10px] block">Nilai Kontrak:</span>
              <span className="font-bold text-[#f97316]">{data.portfolio.flagship.value}</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] block">Skala Luas:</span>
              <span className="font-semibold text-[#18181b] truncate block">{data.portfolio.flagship.floorArea}</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] block">Klien:</span>
              <span className="text-zinc-600 truncate block">{data.portfolio.flagship.client}</span>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] block">Kepatuhan HSE:</span>
              <span className="font-semibold text-[#18181b]">Zero LTI / ISO 45001</span>
            </div>
          </div>
        </section>

        {/* 4. HERO PROJECT PHOTO SHOWCASE WITH HEXAGON BADGE */}
        <section className="relative w-full h-64 sm:h-72 overflow-hidden border-2 border-[#18181b] bg-zinc-900 shadow-md shrink-0 relative z-10">
          <img
            src={flagshipImg}
            alt={data.portfolio.flagship.title}
            className="w-full h-full object-cover contrast-110"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = DEFAULT_HERO_IMG;
            }}
          />
          <div className="absolute bottom-3 left-3 bg-[#18181b]/95 text-white border-l-4 border-[#f97316] px-3.5 py-2 shadow-lg">
            <span className="font-folio-mono text-[9px] text-[#f97316] uppercase block font-bold">
              PORTFOLIO SHOWCASE
            </span>
            <span className="font-headline text-xs font-black uppercase text-white">
              {data.portfolio.flagship.title}
            </span>
          </div>
        </section>

        {/* 5. GRID 4 PROYEK PENDUKUNG */}
        <section className="grid grid-cols-2 gap-3 shrink-0 relative z-10">
          {data.portfolio.sectoralProjects.slice(0, 4).map((p, idx) => (
            <div key={p.id} className="bg-white border-2 border-zinc-200 p-2.5 flex items-center gap-2.5 shadow-xs">
              <div className="w-16 h-14 shrink-0 overflow-hidden border border-zinc-300 bg-zinc-100 relative">
                <img
                  src={p.photoUrl || DEFAULT_PRJ_IMG}
                  alt={p.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = DEFAULT_PRJ_IMG;
                  }}
                />
                <div
                  className="absolute top-1 left-1 w-4 h-4 bg-[#18181b] text-[#f97316] flex items-center justify-center font-mono text-[7px] font-bold"
                  style={{ clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)' }}
                >
                  {idx + 1}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-folio-mono text-[9px] font-bold text-[#f97316] block uppercase truncate">
                  {p.sectorTag}
                </span>
                <h4 className="font-headline text-[11px] font-black uppercase truncate text-[#18181b] mt-0.5">
                  {p.title}
                </h4>
                <div className="text-[10px] text-zinc-500 font-medium mt-0.5 flex justify-between items-center">
                  <span className="font-bold text-zinc-900">{p.value}</span>
                  <span className="text-[9px] text-zinc-400 truncate">{p.specs || p.year}</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
        <footer className="pt-3 border-t border-zinc-300 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-zinc-500 shrink-0 relative z-10">
          <span>{data.contact.comms.website}</span>
          <span className="font-bold text-[#f97316]">05 / 06</span>
        </footer>
      </article>
    );
  }

  // =========================================================================
  // THEME 8: COBALT DIAGONAL SLASH (Default fallback)
  // =========================================================================
  return (
    <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#f8fafc] text-slate-900 border-2 border-[#0f172a] relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
      <CropMarks sheetId="05" bleedText="+ 210 × 297 MM // COBALT SLASH SPEC" regText="COBALT-SLASH // CHAPTER 05" />
      <GridOverlay active={showGrid} />

      {/* Dynamic Cobalt Slash Ribbon */}
      <div
        className="absolute top-0 right-0 w-64 h-24 bg-[#2563eb] opacity-10 pointer-events-none z-0"
        style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}
      />

      {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
      <header className="w-full pb-2.5 border-b border-slate-300 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-slate-500 shrink-0 relative z-10">
        <span className="font-bold text-[#0f172a]">{data.companyName}</span>
        <span>BAB 05 // PORTOFOLIO PROYEK</span>
      </header>

      {/* 2. JUDUL BAB */}
      <section className="pb-3 border-b-2 border-[#0f172a] shrink-0 relative z-10">
        <div className="transform -skew-x-12 bg-[#0f172a] text-white inline-block px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider mb-1.5 border-l-2 border-[#2563eb]">
          <span className="inline-block transform skew-x-12">BAB 05 // INVENTARIS PROYEK STRATEGIS</span>
        </div>
        <h1 className="font-headline text-2xl sm:text-3xl font-black uppercase text-[#0f172a] tracking-[-0.02em] leading-tight">
          Portofolio Rekayasa <span className="text-[#2563eb]">&</span> EPC Korporasi
        </h1>
      </section>

      {/* 3. DETAIL SPESIFIKASI PROYEK UTAMA */}
      <section className="bg-white border-2 border-[#0f172a] p-4 shadow-sm shrink-0 relative z-10">
        <div className="flex items-center justify-between mb-1.5">
          <div className="bg-[#2563eb] text-white px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase">
            <span>{data.portfolio.flagship.code || 'PROYEK UNGGULAN'}</span>
          </div>
          <span className="font-folio-mono text-[10px] text-slate-500 font-semibold">
            {data.portfolio.flagship.period}
          </span>
        </div>

        <h2 className="font-headline text-lg sm:text-xl font-black uppercase text-[#0f172a] mb-1.5">
          {data.portfolio.flagship.title}
        </h2>
        <p className="font-editorial-body text-[11px] text-slate-600 leading-[1.5] mb-3 line-clamp-2">
          {data.portfolio.flagship.description}
        </p>

        <div className="border border-slate-200 bg-slate-50 p-2.5 text-[11px] grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-800">
          <div>
            <span className="text-slate-500 text-[10px] block">Nilai Kontrak:</span>
            <span className="font-bold text-[#2563eb]">{data.portfolio.flagship.value}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block">Skala Luas:</span>
            <span className="font-semibold text-slate-900 truncate block">{data.portfolio.flagship.floorArea}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block">Klien:</span>
            <span className="text-slate-600 truncate block">{data.portfolio.flagship.client}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block">Kepatuhan Mutu:</span>
            <span className="font-semibold text-[#0f172a]">100% On-Time BAST</span>
          </div>
        </div>
      </section>

      {/* 4. HERO PROJECT PHOTO SHOWCASE WITH COBALT SLASH */}
      <section className="relative w-full h-64 sm:h-72 overflow-hidden border-2 border-[#0f172a] bg-slate-900 shadow-md shrink-0 relative z-10">
        <img
          src={flagshipImg}
          alt={data.portfolio.flagship.title}
          className="w-full h-full object-cover contrast-110"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = DEFAULT_HERO_IMG;
          }}
        />
        <div className="absolute bottom-0 right-0 w-72 h-16 bg-[#2563eb] transform -skew-x-20 flex items-center justify-center opacity-95">
          <div className="transform skew-x-20 text-white text-right px-4">
            <span className="font-folio-mono text-[8px] text-sky-200 uppercase block font-bold">
              PORTFOLIO SHOWCASE
            </span>
            <span className="font-headline text-xs font-black uppercase text-white">
              {data.portfolio.flagship.title}
            </span>
          </div>
        </div>
      </section>

      {/* 5. GRID 4 PROYEK PENDUKUNG */}
      <section className="grid grid-cols-2 gap-3 shrink-0 relative z-10">
        {data.portfolio.sectoralProjects.slice(0, 4).map((p) => (
          <div key={p.id} className="bg-white border-2 border-slate-200 p-2.5 flex items-center gap-2.5 shadow-xs">
            <div className="w-16 h-14 shrink-0 overflow-hidden border border-slate-300 bg-slate-100">
              <img
                src={p.photoUrl || DEFAULT_PRJ_IMG}
                alt={p.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = DEFAULT_PRJ_IMG;
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-folio-mono text-[9px] font-bold text-[#2563eb] block uppercase truncate">
                {p.sectorTag}
              </span>
              <h4 className="font-headline text-[11px] font-black uppercase truncate text-[#0f172a] mt-0.5">
                {p.title}
              </h4>
              <div className="text-[10px] text-slate-500 font-medium mt-0.5 flex justify-between items-center">
                <span className="font-bold text-slate-900">{p.value}</span>
                <span className="text-[9px] text-slate-400 truncate">{p.specs || p.year}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
      <footer className="pt-3 border-t border-slate-300 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-slate-500 shrink-0 relative z-10">
        <span>{data.contact.comms.website}</span>
        <span className="font-bold text-[#2563eb]">05 / 06</span>
      </footer>
    </article>
  );
};

import React from 'react';
import { CompanyProfileData, TogglesState, ThemeId } from '../../types/monograph';
import { CropMarks, GridOverlay } from '../common/CropMarks';
import { getPageInfo } from '../../utils/pagination';
import { EyeOff } from 'lucide-react';

interface Spread03TeamProps {
  data: CompanyProfileData;
  toggles: TogglesState;
  showGrid: boolean;
  amberAccent?: boolean;
  themeId?: ThemeId;
}

export const Spread03Team: React.FC<Spread03TeamProps> = ({
  data,
  toggles,
  showGrid,
  themeId = 'tech-navy',
}) => {
  const isEnabled = data.pageVisibility?.team ?? toggles.showTeam ?? true;
  const pageInfo = getPageInfo('team', data.pageVisibility);

  if (!isEnabled) {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[400px] bg-white border border-dashed border-zinc-300 p-12 text-center text-zinc-500 font-sans mx-auto flex flex-col justify-center items-center shadow-xs no-print print:hidden">
        <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mb-3 border border-amber-200">
          <EyeOff className="w-6 h-6" />
        </div>
        <h3 className="font-headline text-base font-bold text-zinc-900 uppercase tracking-[-0.02em]">
          HALAMAN 03 // TIM EKSEKUTIF DINONAKTIFKAN
        </h3>
        <p className="font-editorial-body text-xs text-zinc-600 mt-2 max-w-md leading-relaxed">
          Halaman ini disembunyikan dari preview gabungan dan otomatis diabaikan saat ekspor cetak PDF (@media print). Aktifkan kembali melalui toggle di Panel Editor Kiri.
        </p>
      </article>
    );
  }

  // THEME 1: TECH NAVY
  if (themeId === 'tech-navy') {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#0f172a] text-slate-100 relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
        <CropMarks sheetId={pageInfo.sheetId} bleedText="+ 210 × 297 MM // EDITORIAL DOSSIER" regText="TECH-NAVY // CHAPTER 03" />
        <GridOverlay active={showGrid} />

        {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
        <header className="w-full border-b border-slate-800 pb-2.5 mb-5 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-slate-400 shrink-0">
          <span className="font-bold text-white">{data.companyName}</span>
          <span>BAB 03 // TIM EKSEKUTIF</span>
        </header>

        {/* HEADLINE */}
        <section className="mb-5 border-b border-slate-800 pb-4 shrink-0">
          <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block mb-1">
            Bab 03 // Kepemimpinan Eksekutif & Tim Rekayasa
          </span>
          <h1 className="font-headline text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-[-0.02em]">
            Dewan Direksi & Arsitek Rekayasa
          </h1>
        </section>

        {/* TIER I DIRECTORS GRID (3 Columns in Portrait) */}
        <section className="mb-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Dewan Direksi Utama
              </span>
              <span className="text-xs text-slate-400">Direksi & Komisaris</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4">
              {data.team.tier1.map((mem) => (
                <div key={mem.id} className="border border-slate-800 bg-slate-900/60 p-3.5 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="h-36 sm:h-40 w-full bg-slate-950 border border-slate-800 overflow-hidden mb-3">
                      <img src={mem.photoUrl} alt={mem.name} className="w-full h-full object-cover filter contrast-[1.03] brightness-95" />
                    </div>
                    <h3 className="font-headline text-xs sm:text-sm font-bold text-white uppercase tracking-[-0.02em]">{mem.name}</h3>
                    <p className="text-[11px] text-emerald-400 font-semibold mt-0.5 mb-1.5">{mem.title}</p>
                    <p className="font-editorial-body text-[11px] text-[#94a3b8] leading-[1.4] line-clamp-2">{mem.bio}</p>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-2.5 mt-2 border-t border-slate-800">
                    {mem.tags.map((t, i) => (
                      <span key={i} className="text-[10px] px-1.5 py-0.5 border border-slate-700 bg-slate-950 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TIER II ENGINEERING LEADS (2x2 Grid) */}
          <div className="border-t border-slate-800 pt-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2.5">
              Kepala Divisi & Spesialis Rekayasa
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {data.team.tier2.map((lead) => (
                <div key={lead.id} className="p-3 bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] font-bold text-emerald-400 block mb-0.5 uppercase">{lead.division}</span>
                  <h4 className="font-headline text-xs font-bold text-white uppercase tracking-[-0.02em]">{lead.name}</h4>
                  <p className="font-editorial-body text-[10px] text-[#94a3b8] leading-[1.3] mt-0.5">{lead.title}</p>
                  <div className="mt-1 text-[9px] text-slate-400 font-medium">Pengalaman: {lead.exp}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
        <footer className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-slate-400 shrink-0">
          <span>{data.contact.comms.website}</span>
          <span className="font-bold text-emerald-400">{pageInfo.formatted}</span>
        </footer>
      </article>
    );
  }

  // THEME 2: SWISS EDITORIAL & TANGERINE
  if (themeId === 'swiss-tangerine') {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-white text-black border-2 border-black relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
        <CropMarks sheetId="03" bleedText="+ 210 × 297 MM // SWISS STRICT GRID" regText="SWISS-TANGERINE // CHAPTER 03" />
        <GridOverlay active={showGrid} />

        {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
        <header className="w-full border-b border-zinc-200 pb-2.5 mb-5 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-zinc-500 shrink-0">
          <span className="font-bold text-black">{data.companyName}</span>
          <span>BAB 03 // TIM EKSEKUTIF</span>
        </header>

        <section className="border-b-2 border-black pb-4 mb-5 shrink-0">
          <span className="text-xs font-bold text-[#ff5722] uppercase tracking-wider block mb-1">
            Tata Kelola Korporasi
          </span>
          <h1 className="font-headline text-2xl sm:text-3xl font-extrabold text-black uppercase tracking-[-0.02em] leading-tight">
            Dewan Direksi & Kepemimpinan Rekayasa<span className="text-[#ff5722]">.</span>
          </h1>
        </section>

        {/* TIER I DIRECTORS IN SWISS MODULAR GRID */}
        <section className="mb-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="bg-black text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider mb-3 flex justify-between">
              <span>Dewan Direksi Utama</span>
              <span className="text-[#ff5722]">Dewan Pengawas</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-2 border-black divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black mb-4">
              {data.team.tier1.map((mem) => (
                <div key={mem.id} className="p-3.5 bg-white flex flex-col justify-between">
                  <div>
                    <div className="h-36 sm:h-40 w-full border-2 border-black overflow-hidden mb-3 bg-zinc-100">
                      <img src={mem.photoUrl} alt={mem.name} className="w-full h-full object-cover grayscale contrast-110" />
                    </div>
                    <h3 className="font-headline text-xs sm:text-sm font-bold uppercase text-black tracking-[-0.02em]">{mem.name}</h3>
                    <p className="text-[11px] text-[#ff5722] font-bold uppercase mt-0.5 mb-1.5">{mem.title}</p>
                    <p className="font-editorial-body text-[11px] text-[#64748b] leading-[1.4] line-clamp-2 mb-2">{mem.bio}</p>
                  </div>
                  <div className="pt-2 border-t-2 border-black flex flex-wrap gap-1 text-xs">
                    {mem.tags.map((t, i) => (
                      <span key={i} className="font-semibold bg-zinc-100 border border-black px-1.5 py-0.5 text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TIER II LEADS */}
          <div className="border-2 border-black p-3.5 bg-zinc-50">
            <span className="text-xs font-bold uppercase text-black mb-2 block">
              Kepala Divisi & Spesialis Utama
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {data.team.tier2.map((lead) => (
                <div key={lead.id} className="bg-white border border-black p-2.5">
                  <span className="text-[10px] text-[#ff5722] font-bold block uppercase">{lead.division}</span>
                  <h4 className="font-headline text-xs font-bold uppercase text-black tracking-[-0.02em] mt-0.5">{lead.name}</h4>
                  <p className="font-editorial-body text-[10px] text-[#64748b] leading-[1.3]">{lead.title}</p>
                  <div className="mt-1 text-[9px] font-bold text-zinc-700">Pengalaman: {lead.exp}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
        <footer className="mt-4 pt-3 border-t border-zinc-200 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-zinc-500 shrink-0">
          <span>{data.contact.comms.website}</span>
          <span className="font-bold text-black">{pageInfo.formatted}</span>
        </footer>
      </article>
    );
  }

  // THEME 3: CYBER DARK & CRIMSON 2028
  if (themeId === 'cyber-crimson') {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#0b0f19] text-white border border-slate-800 relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
        <CropMarks sheetId="03" bleedText="+ 210 × 297 MM // DARK EDITORIAL" regText="CYBER-CRIMSON // CHAPTER 03" />
        <GridOverlay active={showGrid} />

        <div className="font-headline absolute top-4 right-8 text-[100px] font-extrabold text-[#ff2d55]/10 leading-none select-none pointer-events-none z-0">
          03
        </div>

        {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
        <header className="w-full border-b border-slate-800 pb-2.5 mb-5 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-slate-400 relative z-10 shrink-0">
          <span className="font-bold text-white">{data.companyName}</span>
          <span>BAB 03 // TIM EKSEKUTIF</span>
        </header>

        <section className="mb-5 relative z-10 border-b border-slate-800 pb-4 shrink-0">
          <span className="text-xs text-[#ff2d55] uppercase font-bold tracking-wider block mb-1">
            Bab 03 // Kepemimpinan Eksekutif
          </span>
          <h1 className="font-headline text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-[-0.02em] leading-tight">
            Dewan Direksi & Talenta Rekayasa Utama
          </h1>
        </section>

        {/* TIER I DIRECTORS */}
        <section className="mb-5 relative z-10 flex-1 flex flex-col justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4">
            {data.team.tier1.map((mem) => (
              <div key={mem.id} className="bg-slate-900/60 border border-slate-800 p-3.5 relative flex flex-col justify-between">
                <div>
                  <div className="h-36 sm:h-40 w-full border-l-4 border-[#ff2d55] overflow-hidden mb-3 bg-slate-950">
                    <img src={mem.photoUrl} alt={mem.name} className="w-full h-full object-cover filter contrast-[1.05] brightness-95" />
                  </div>
                  <h3 className="font-headline text-xs sm:text-sm font-bold uppercase text-white tracking-[-0.02em]">{mem.name}</h3>
                  <p className="text-[11px] text-[#ff2d55] font-bold uppercase mt-0.5 mb-1.5">{mem.title}</p>
                  <p className="font-editorial-body text-[11px] text-[#94a3b8] leading-[1.4] line-clamp-2 mb-2">{mem.bio}</p>
                </div>
                <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-1 text-xs">
                  {mem.tags.map((t, i) => (
                    <span key={i} className="border border-slate-700 bg-slate-950 text-slate-300 px-1.5 py-0.5 text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* TIER II LEADS */}
          <div className="border-t border-slate-800 pt-3">
            <span className="text-xs font-bold text-[#ff2d55] uppercase tracking-wider mb-2.5 block">
              Kepala Spesialis & Pemimpin Proyek
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {data.team.tier2.map((lead) => (
                <div key={lead.id} className="p-2.5 bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] text-[#ff2d55] font-bold block uppercase">{lead.division}</span>
                  <h4 className="font-headline text-xs font-bold uppercase text-white tracking-[-0.02em] mt-0.5">{lead.name}</h4>
                  <p className="font-editorial-body text-[10px] text-[#94a3b8] leading-[1.3]">{lead.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
        <footer className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-slate-400 shrink-0">
          <span>{data.contact.comms.website}</span>
          <span className="font-bold text-[#ff2d55]">{pageInfo.formatted}</span>
        </footer>
      </article>
    );
  }

  // THEME 4: BOLD SCARLET CIRCLE
  if (themeId === 'scarlet-circle') {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#f8fafc] text-slate-900 border border-slate-300 relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
        <CropMarks sheetId="03" bleedText="+ 210 × 297 MM // SCARLET EDITORIAL" regText="SCARLET-CIRCLE // CHAPTER 03" />
        <GridOverlay active={showGrid} />

        {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
        <header className="w-full border-b border-slate-200 pb-2.5 mb-5 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-slate-500 shrink-0">
          <span className="font-bold text-slate-900">{data.companyName}</span>
          <span>BAB 03 // TIM EKSEKUTIF</span>
        </header>

        <section className="border-b-2 border-red-600 pb-4 mb-5 shrink-0">
          <h1 className="font-headline text-2xl sm:text-3xl font-extrabold uppercase text-slate-950 tracking-[-0.02em] leading-tight">
            Dewan Direksi & Tim Rekayasa Struktur
          </h1>
        </section>

        <section className="mb-5 flex-1 flex flex-col justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4">
            {data.team.tier1.map((mem) => (
              <div key={mem.id} className="bg-white border-2 border-slate-900 p-3.5 relative shadow-xs flex flex-col justify-between">
                <div>
                  <div className="h-36 sm:h-40 w-full border-2 border-slate-900 overflow-hidden mb-3 bg-slate-100">
                    <img src={mem.photoUrl} alt={mem.name} className="w-full h-full object-cover filter contrast-[1.03]" />
                  </div>
                  <h3 className="font-headline text-xs sm:text-sm font-bold uppercase text-slate-950 tracking-[-0.02em]">{mem.name}</h3>
                  <p className="text-[11px] text-red-600 font-bold uppercase mt-0.5 mb-1.5">{mem.title}</p>
                  <p className="font-editorial-body text-[11px] text-[#64748b] leading-[1.4] line-clamp-2 mb-2">{mem.bio}</p>
                </div>
                <div className="pt-2 border-t border-slate-200 flex flex-wrap gap-1 text-xs">
                  {mem.tags.map((t, i) => (
                    <span key={i} className="border border-red-200 bg-red-50 text-red-600 px-1.5 py-0.5 text-[10px] font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-2 border-slate-900 bg-white p-3.5">
            <span className="text-xs font-bold uppercase text-red-600 mb-2 block">
              Divisi Rekayasa & Spesialis
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {data.team.tier2.map((lead) => (
                <div key={lead.id} className="p-2.5 border border-slate-200 bg-slate-50">
                  <span className="text-[10px] text-red-600 font-bold block uppercase">{lead.division}</span>
                  <h4 className="font-headline text-xs font-bold uppercase text-slate-950 tracking-[-0.02em] mt-0.5">{lead.name}</h4>
                  <p className="font-editorial-body text-[10px] text-[#64748b] leading-[1.3]">{lead.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
        <footer className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-slate-500 shrink-0">
          <span>{data.contact.comms.website}</span>
          <span className="font-bold text-red-600">{pageInfo.formatted}</span>
        </footer>
      </article>
    );
  }

  // THEME 5: SAGE WIREFRAME MINIMALIST
  if (themeId === 'sage-wireframe') {
    return (
      <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#fcfbf8] text-[#2c332e] border border-[#d6ddd6] relative overflow-hidden transition-all duration-300 shadow-xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
        <CropMarks sheetId="03" bleedText="+ 210 × 297 MM // ARCHITECTURAL MONOGRAPH" regText="SAGE-WIREFRAME // CHAPTER 03" />
        <GridOverlay active={showGrid} />

        {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
        <header className="w-full border-b border-[#d6ddd6] pb-2.5 mb-5 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-[#849688] shrink-0">
          <span className="font-bold text-[#1f2621]">{data.companyName}</span>
          <span>BAB 03 // TIM EKSEKUTIF</span>
        </header>

        <section className="mb-5 pb-4 border-b border-[#d6ddd6] shrink-0">
          <span className="text-xs font-bold text-[#627566] uppercase tracking-wider block mb-1">
            Bab 03 // Tata Kelola Eksekutif
          </span>
          <h1 className="font-headline text-2xl sm:text-3xl font-extrabold uppercase text-[#1f2621] tracking-[-0.02em] leading-tight">
            Dewan Direksi & Arsitek Utama
          </h1>
        </section>

        {/* TIER I DIRECTORS WITH HAIRLINE WIREFRAME */}
        <section className="mb-5 flex-1 flex flex-col justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4">
            {data.team.tier1.map((mem) => (
              <div key={mem.id} className="bg-white border border-[#d6ddd6] p-3.5 shadow-xs relative flex flex-col justify-between">
                <div>
                  <div className="relative mb-3 mx-1">
                    <div className="absolute -top-1.5 -right-1.5 w-full h-full border border-[#627566]/40 pointer-events-none" />
                    <div className="relative z-10 h-36 sm:h-40 w-full border border-[#c5cec5] overflow-hidden bg-stone-100">
                      <img src={mem.photoUrl} alt={mem.name} className="w-full h-full object-cover filter contrast-[1.02]" />
                    </div>
                  </div>
                  <h3 className="font-headline text-xs sm:text-sm font-bold uppercase text-[#1f2621] tracking-[-0.02em]">{mem.name}</h3>
                  <p className="text-[11px] text-[#627566] font-bold uppercase mt-0.5 mb-1.5">{mem.title}</p>
                  <p className="font-editorial-body text-[11px] text-[#64748b] leading-[1.4] line-clamp-2 mb-2">{mem.bio}</p>
                </div>
                <div className="pt-2 border-t border-[#d6ddd6] flex flex-wrap gap-1 text-xs">
                  {mem.tags.map((t, i) => (
                    <span key={i} className="text-[#627566] border border-[#d6ddd6] bg-[#fcfbf8] px-1.5 py-0.5 text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border border-[#d6ddd6] bg-white p-3.5">
            <span className="text-xs font-bold uppercase text-[#627566] mb-2 block">
              Kepala Divisi Teknis & Rekayasa
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {data.team.tier2.map((lead) => (
                <div key={lead.id} className="p-2.5 border border-[#e2e8e2] bg-[#fcfbf8]">
                  <span className="text-[10px] text-[#849688] font-bold block uppercase">{lead.division}</span>
                  <h4 className="font-headline text-xs font-bold uppercase text-[#1f2621] tracking-[-0.02em] mt-0.5">{lead.name}</h4>
                  <p className="font-editorial-body text-[10px] text-[#64748b] leading-[1.3]">{lead.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
        <footer className="mt-4 pt-3 border-t border-[#d6ddd6] flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-[#849688] shrink-0">
          <span>{data.contact.comms.website}</span>
          <span className="font-bold text-[#1f2621]">{pageInfo.formatted}</span>
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
        <CropMarks sheetId="03" bleedText="+ 210 × 297 MM // ROYAL SLANT SPEC" regText="ROYAL-SLANT // CHAPTER 03" />
        <GridOverlay active={showGrid} />

        {/* Diagonal Hatched Accent Pattern */}
        <div
          className="absolute top-0 right-0 w-44 h-24 pointer-events-none opacity-25 z-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, #1e3a8a 0, #1e3a8a 1.5px, transparent 1.5px, transparent 8px)',
          }}
        />

        {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
        <header className="w-full border-b border-slate-300 pb-2.5 mb-5 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-slate-500 shrink-0 relative z-10">
          <span className="font-bold text-[#1e3a8a]">{data.companyName}</span>
          <span>BAB 03 // TIM EKSEKUTIF</span>
        </header>

        <section className="mb-4 pb-3 border-b-2 border-[#1e3a8a] shrink-0 relative z-10">
          <div className="transform -skew-x-12 bg-[#ea580c] text-white inline-block px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
            <span className="inline-block transform skew-x-12">BAB 03 // KEPEMIMPINAN STRUKTURAL</span>
          </div>
          <h1 className="font-headline text-2xl sm:text-3xl font-black uppercase text-[#1e3a8a] tracking-[-0.02em] leading-tight">
            Dewan Direksi <span className="text-[#ea580c]">&</span> Kepemimpinan Rekayasa
          </h1>
        </section>

        {/* TIER I DIRECTORS WITH SLANTED PARALLELOGRAM ACCENTS */}
        <section className="mb-4 flex-1 flex flex-col justify-between relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4">
            {data.team.tier1.map((mem) => (
              <div key={mem.id} className="bg-white border-2 border-[#1e3a8a] p-3.5 shadow-sm relative flex flex-col justify-between">
                <div>
                  <div className="relative mb-3">
                    <div className="h-36 sm:h-40 w-full border border-[#1e3a8a] overflow-hidden bg-slate-100 relative">
                      <img src={mem.photoUrl} alt={mem.name} className="w-full h-full object-cover contrast-105" />
                      {/* Slanted Parallelogram Role Badge */}
                      <div className="absolute top-2 right-2 transform -skew-x-12 bg-[#ea580c] text-white px-2 py-0.5 shadow-xs">
                        <span className="inline-block transform skew-x-12 font-mono text-[9px] font-bold uppercase">
                          {mem.code || 'TIER-1'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-headline text-xs sm:text-sm font-black uppercase text-[#1e3a8a] tracking-tight">{mem.name}</h3>
                  <p className="text-[11px] text-[#ea580c] font-bold uppercase mt-0.5 mb-1.5">{mem.title}</p>
                  <p className="font-editorial-body text-[11px] text-slate-600 leading-[1.4] line-clamp-2 mb-2">{mem.bio}</p>
                </div>
                <div className="pt-2 border-t border-slate-200 flex flex-wrap gap-1 text-xs">
                  {mem.tags.map((t, i) => (
                    <span key={i} className="text-[#1e3a8a] border border-[#1e3a8a]/30 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* TIER 2 LEADS WITH SLANTED DIVIDERS */}
          <div className="border-2 border-[#1e3a8a] bg-white p-3.5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#ea580c] transform -skew-x-12" />
              <span className="text-xs font-black uppercase text-[#1e3a8a] tracking-wider">
                Kepala Divisi Rekayasa & Operasional Khusus
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {data.team.tier2.map((lead) => (
                <div key={lead.id} className="p-2.5 border border-slate-200 bg-slate-50 relative">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[10px] text-[#ea580c] font-bold block uppercase">{lead.division}</span>
                    <span className="text-[9px] font-mono text-slate-400">{lead.exp}</span>
                  </div>
                  <h4 className="font-headline text-xs font-bold uppercase text-[#1e3a8a] tracking-tight">{lead.name}</h4>
                  <p className="font-editorial-body text-[10px] text-slate-600 leading-[1.3]">{lead.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
        <footer className="mt-4 pt-3 border-t border-slate-300 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-slate-500 shrink-0 relative z-10">
          <span>{data.contact.comms.website}</span>
          <span className="font-bold text-[#ea580c]">{pageInfo.formatted}</span>
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
        <CropMarks sheetId="03" bleedText="+ 210 × 297 MM // HEXAGON APEX SPEC" regText="HEXAGON-CHARCOAL // CHAPTER 03" />
        <GridOverlay active={showGrid} />

        {/* Hexagon Angle Accent */}
        <div
          className="absolute top-0 right-0 w-24 h-24 bg-[#18181b] pointer-events-none z-0"
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
        />

        {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
        <header className="w-full border-b border-zinc-300 pb-2.5 mb-5 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-zinc-500 shrink-0 relative z-10">
          <span className="font-bold text-[#18181b]">{data.companyName}</span>
          <span>BAB 03 // TIM EKSEKUTIF</span>
        </header>

        <section className="mb-4 pb-3 border-b-2 border-[#18181b] shrink-0 relative z-10">
          <div className="flex items-center gap-1.5 bg-[#18181b] text-white inline-flex px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
            <span className="w-1.5 h-1.5 bg-[#f97316] rotate-45" />
            <span>BAB 03 // TATA KELOLA KEPEMIMPINAN</span>
          </div>
          <h1 className="font-headline text-2xl sm:text-3xl font-black uppercase text-[#18181b] tracking-[-0.02em] leading-tight">
            Dewan Direksi <span className="text-[#f97316]">&</span> Tim Ahli Utama
          </h1>
        </section>

        {/* TIER I DIRECTORS WITH HEXAGONAL BADGES */}
        <section className="mb-4 flex-1 flex flex-col justify-between relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4">
            {data.team.tier1.map((mem, idx) => (
              <div key={mem.id} className="bg-white border-2 border-[#18181b] p-3.5 shadow-sm relative flex flex-col justify-between">
                <div>
                  <div className="relative mb-3">
                    <div className="h-36 sm:h-40 w-full border border-zinc-300 overflow-hidden bg-zinc-100 relative">
                      <img src={mem.photoUrl} alt={mem.name} className="w-full h-full object-cover contrast-105" />
                      {/* Hexagonal Number Badge */}
                      <div
                        className="absolute top-2 right-2 w-7 h-7 bg-[#18181b] text-[#f97316] flex items-center justify-center font-mono text-[10px] font-bold shadow-md"
                        style={{
                          clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
                        }}
                      >
                        0{idx + 1}
                      </div>
                    </div>
                  </div>
                  <h3 className="font-headline text-xs sm:text-sm font-black uppercase text-[#18181b] tracking-tight">{mem.name}</h3>
                  <p className="text-[11px] text-[#f97316] font-bold uppercase mt-0.5 mb-1.5">{mem.title}</p>
                  <p className="font-editorial-body text-[11px] text-zinc-600 leading-[1.4] line-clamp-2 mb-2">{mem.bio}</p>
                </div>
                <div className="pt-2 border-t border-zinc-200 flex flex-wrap gap-1 text-xs">
                  {mem.tags.map((t, i) => (
                    <span key={i} className="text-zinc-800 border border-zinc-300 bg-zinc-50 px-1.5 py-0.5 text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* TIER 2 LEADS WITH HEXAGON ICONS */}
          <div className="border-2 border-[#18181b] bg-white p-3.5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#f97316] rotate-45" />
              <span className="text-xs font-black uppercase text-[#18181b] tracking-wider">
                Kepala Divisi Teknis & Rekayasa
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {data.team.tier2.map((lead) => (
                <div key={lead.id} className="p-2.5 border border-zinc-200 bg-zinc-50 relative">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[10px] text-[#f97316] font-bold block uppercase">{lead.division}</span>
                    <span className="text-[9px] font-mono text-zinc-500">{lead.exp}</span>
                  </div>
                  <h4 className="font-headline text-xs font-bold uppercase text-[#18181b] tracking-tight">{lead.name}</h4>
                  <p className="font-editorial-body text-[10px] text-zinc-600 leading-[1.3]">{lead.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
        <footer className="mt-4 pt-3 border-t border-zinc-300 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-zinc-500 shrink-0 relative z-10">
          <span>{data.contact.comms.website}</span>
          <span className="font-bold text-[#f97316]">{pageInfo.formatted}</span>
        </footer>
      </article>
    );
  }

  // =========================================================================
  // THEME 8: COBALT DIAGONAL SLASH (Default fallback)
  // =========================================================================
  return (
    <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#f8fafc] text-slate-900 border-2 border-[#0f172a] relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
      <CropMarks sheetId="03" bleedText="+ 210 × 297 MM // COBALT SLASH SPEC" regText="COBALT-SLASH // CHAPTER 03" />
      <GridOverlay active={showGrid} />

      {/* Dynamic Cobalt Slash Ribbon */}
      <div
        className="absolute top-0 right-0 w-64 h-24 bg-[#2563eb] opacity-10 pointer-events-none z-0"
        style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}
      />

      {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
      <header className="w-full border-b border-slate-300 pb-2.5 mb-5 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-slate-500 shrink-0 relative z-10">
        <span className="font-bold text-[#0f172a]">{data.companyName}</span>
        <span>BAB 03 // TIM EKSEKUTIF</span>
      </header>

      <section className="mb-4 pb-3 border-b-2 border-[#0f172a] shrink-0 relative z-10">
        <div className="transform -skew-x-12 bg-[#0f172a] text-white inline-block px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider mb-1.5 border-l-2 border-[#2563eb]">
          <span className="inline-block transform skew-x-12">BAB 03 // KEPEMIMPINAN EKSEKUTIF</span>
        </div>
        <h1 className="font-headline text-2xl sm:text-3xl font-black uppercase text-[#0f172a] tracking-[-0.02em] leading-tight">
          Dewan Direksi <span className="text-[#2563eb]">&</span> Dewan Rekayasa
        </h1>
      </section>

      {/* TIER I DIRECTORS WITH COBALT ACCENTS */}
      <section className="mb-4 flex-1 flex flex-col justify-between relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4">
          {data.team.tier1.map((mem) => (
            <div key={mem.id} className="bg-white border-2 border-[#0f172a] p-3.5 shadow-sm relative flex flex-col justify-between">
              <div>
                <div className="relative mb-3">
                  <div className="h-36 sm:h-40 w-full border border-slate-300 overflow-hidden bg-slate-100 relative">
                    <img src={mem.photoUrl} alt={mem.name} className="w-full h-full object-cover contrast-105" />
                    {/* Cobalt Strip at Bottom of Photo */}
                    <div className="absolute bottom-0 inset-x-0 h-1 bg-[#2563eb]" />
                  </div>
                </div>
                <h3 className="font-headline text-xs sm:text-sm font-black uppercase text-[#0f172a] tracking-tight">{mem.name}</h3>
                <p className="text-[11px] text-[#2563eb] font-bold uppercase mt-0.5 mb-1.5">{mem.title}</p>
                <p className="font-editorial-body text-[11px] text-slate-600 leading-[1.4] line-clamp-2 mb-2">{mem.bio}</p>
              </div>
              <div className="pt-2 border-t border-slate-200 flex flex-wrap gap-1 text-xs">
                {mem.tags.map((t, i) => (
                  <span key={i} className="text-[#0f172a] border border-[#2563eb]/40 bg-sky-50/50 px-1.5 py-0.5 text-[10px]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* TIER 2 LEADS */}
        <div className="border-2 border-[#0f172a] bg-white p-3.5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-1.5 bg-[#2563eb]" />
            <span className="text-xs font-black uppercase text-[#0f172a] tracking-wider">
              Kepala Divisi Rekayasa & Spesialis
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {data.team.tier2.map((lead) => (
              <div key={lead.id} className="p-2.5 border border-slate-200 bg-slate-50 relative">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] text-[#2563eb] font-bold block uppercase">{lead.division}</span>
                  <span className="text-[9px] font-mono text-slate-400">{lead.exp}</span>
                </div>
                <h4 className="font-headline text-xs font-bold uppercase text-[#0f172a] tracking-tight">{lead.name}</h4>
                <p className="font-editorial-body text-[10px] text-slate-600 leading-[1.3]">{lead.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
      <footer className="mt-4 pt-3 border-t border-slate-300 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-slate-500 shrink-0 relative z-10">
        <span>{data.contact.comms.website}</span>
        <span className="font-bold text-[#2563eb]">03 / 06</span>
      </footer>
    </article>
  );
};

import React from 'react';
import { CompanyProfileData, TogglesState, StrategicPillar } from '../../../types/monograph';
import { CropMarks, GridOverlay } from '../../common/CropMarks';

import { PageInfo } from '../../../utils/pagination';

interface Props {
  data: CompanyProfileData;
  toggles: TogglesState;
  showGrid: boolean;
  pageInfo?: PageInfo;
}

export const AboutCyberCrimson: React.FC<Props> = ({ data, toggles, showGrid, pageInfo }) => {
  const isDirectorActive = toggles.showDirectorMessage;
  const isVisionActive = toggles.showVisionMission !== false;

  return (
    <article className="sheet-page page-spread w-full max-w-[794px] min-h-[1123px] bg-[#0b0f19] text-white border border-slate-800 relative overflow-hidden transition-all duration-300 shadow-2xl print:shadow-none print:border-none print:m-0 mx-auto p-8 sm:p-10 flex flex-col justify-between font-sans">
      <CropMarks sheetId={pageInfo?.sheetId || "02"} bleedText="+ 210 × 297 MM // DARK EDITORIAL" regText="CYBER-CRIMSON // CHAPTER 02" />
      <GridOverlay active={showGrid} />

      {/* GIANT WATERMARK CHAPTER NUMBER IN CORNER: 02 */}
      <div className="font-headline absolute top-4 right-8 text-[100px] font-extrabold text-[#ff2d55]/10 leading-none select-none pointer-events-none z-0">
        02
      </div>

      {/* MINIMALIST EDITORIAL HEADER (Hairline 1px) */}
      <header className="w-full pb-2.5 border-b border-slate-800 mb-5 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] uppercase text-slate-400 relative z-10 shrink-0">
        <span className="font-bold text-white">{data.companyName}</span>
        <span>BAB 02 // TENTANG & VISI-MISI</span>
      </header>

      {/* MAGAZINE HEADLINE SECTION */}
      <section className="mb-5 relative z-10 border-b border-slate-800 pb-4 shrink-0">
        <span className="text-xs font-bold uppercase tracking-wider text-[#ff2d55] block mb-1">
          Bab 02 // Visi & Kepemimpinan Eksekutif
        </span>
        <h1 className="font-headline text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-[-0.02em] leading-tight">
          Visi Rekayasa & Kepemimpinan Terpadu
        </h1>
        <p className="font-editorial-body text-xs sm:text-sm text-[#94a3b8] max-w-2xl mt-2 leading-[1.6]">
          {data.manifestoLead}
        </p>
      </section>

      {/* MAIN CONTENT WITH ZERO-GAP REFLOW FOR A4 PORTRAIT */}
      <section className="flex-1 flex flex-col gap-4 relative z-10">
        {/* CONDITIONAL DIRECTOR MESSAGE (Stacked Compact Card) */}
        {isDirectorActive && (
          <div className={`bg-slate-900/60 border border-slate-800 p-4 shadow-sm ${!isVisionActive ? 'flex-1 flex flex-col justify-between' : ''}`}>
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-[#ff2d55] uppercase tracking-wider">
                  Sambutan Direktur Utama
                </span>
                <span className="text-xs text-slate-400">Dewan Direksi</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                {/* Photo with Clean Frame */}
                <div className="w-24 h-28 sm:w-28 sm:h-32 shrink-0 border-l-4 border-[#ff2d55] overflow-hidden bg-slate-950 relative">
                  <img
                    src={data.director.photoUrl}
                    alt={data.director.name}
                    className="w-full h-full object-cover filter contrast-[1.05] brightness-95"
                  />
                  {data.director.badge && (
                    <div className="absolute bottom-0 inset-x-0 bg-[#ff2d55] text-white text-[8px] font-mono text-center py-0.5 font-bold">
                      {data.director.badge}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-headline text-sm font-bold uppercase text-white tracking-[-0.02em]">{data.director.name}</h3>
                      <p className="text-xs text-[#ff2d55] font-bold uppercase mt-0.5">{data.director.title}</p>
                      {data.director.regNo && (
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">{data.director.regNo}</p>
                      )}
                    </div>
                    {data.director.signatureUrl && (
                      <div className="p-1 bg-white/5 border border-slate-700">
                        <img
                          src={data.director.signatureUrl}
                          alt="Tanda Tangan"
                          className="h-8 w-auto max-w-[85px] object-contain filter invert opacity-90"
                        />
                      </div>
                    )}
                  </div>

                  {/* Crimson Quote Card */}
                  <div className="p-2.5 bg-slate-950/80 border-l-2 border-[#ff2d55] mb-2 text-xs italic text-slate-200">
                    "{data.director.quote}"
                  </div>

                  <p className="font-editorial-body text-xs text-[#94a3b8] leading-[1.5]">
                    {data.director.paragraph1}
                  </p>
                  {!isVisionActive && data.director.paragraph2 && (
                    <p className="font-editorial-body text-xs text-[#94a3b8] leading-[1.5] mt-2">
                      {data.director.paragraph2}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VISION & MISSION SECTION */}
        {isVisionActive && (
          <div className="flex-1 bg-slate-900/60 border border-slate-800 p-4 sm:p-5 flex flex-col justify-between transition-all duration-300">
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-[#ff2d55] uppercase tracking-wider">
                  {isDirectorActive ? 'Visi & Misi Strategis' : 'Visi, Misi & Pilar Strategis (Ekspansi Penuh Zero-Gap)'}
                </span>
                <span className="text-xs text-slate-400">Target 2035</span>
              </div>

              {/* Vision Box */}
              <div className="p-4 bg-slate-950/80 border border-[#ff2d55]/40 mb-3">
                <span className="text-[11px] uppercase text-[#ff2d55] font-bold tracking-wider block mb-1">
                  Visi Korporasi 2035
                </span>
                <h2 className="font-headline text-sm sm:text-base font-bold uppercase text-white tracking-[-0.02em] leading-snug">
                  "{data.visionMission.visionStatement}"
                </h2>
              </div>

              {/* Dynamic Mission Pillars Grid */}
              <div className={`grid gap-3 mb-3 ${data.visionMission.pillars.length <= 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4'}`}>
                {data.visionMission.pillars.map((p: StrategicPillar, i: number) => (
                  <div key={p.no || i} className="p-3 bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-headline text-xs font-bold text-[#ff2d55]">0{i + 1}.</span>
                        <span className="text-[10px] uppercase text-slate-400 font-bold">{p.tag || p.category}</span>
                      </div>
                      <h4 className="font-headline text-xs font-bold uppercase text-white tracking-[-0.02em] mb-1">{p.title}</h4>
                      <p className="font-editorial-body text-[11px] text-[#94a3b8] leading-[1.5]">{p.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* HSE Policy if active */}
              {toggles.showHSEPolicy && (
                <div className="p-3 bg-slate-950/80 border border-slate-800">
                  <span className="text-xs font-bold text-[#ff2d55] uppercase tracking-wider block mb-1">
                    {data.visionMission.qhseTitle}
                  </span>
                  <p className="font-editorial-body text-[11px] text-[#94a3b8] leading-[1.5]">
                    {data.visionMission.qhsePolicyText || (
                      <>Pencapaian rekor jam kerja selamat: <strong className="text-white font-semibold">{data.visionMission.safeHours}</strong> dengan penerapan pengawasan K3 berstandar internasional.</>
                    )}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-2.5 border-t border-slate-800 flex flex-wrap justify-between items-center gap-2 text-[11px] text-slate-400">
              <span>BERDIRI: <strong className="text-white font-mono">{data.visionMission.foundedYear || '2008'}</strong></span>
              <span>TENAGA AHLI: <strong className="text-white font-mono">{data.visionMission.expertCount || data.team.engineersCount || '480+'}</strong></span>
              <span className="text-[#ff2d55] font-bold">REKOR K3: {data.visionMission.safeHours}</span>
            </div>
          </div>
        )}
      </section>

      {/* MINIMALIST EDITORIAL FOOTER (Hairline 1px) */}
      <footer className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-folio-mono tracking-[0.08em] text-slate-400 shrink-0">
        <span>{data.contact.comms.website}</span>
        <span className="font-bold text-[#ff2d55]">{pageInfo?.formatted || '02 / 06'}</span>
      </footer>
    </article>
  );
};
